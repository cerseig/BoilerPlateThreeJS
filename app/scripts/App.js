import Sound from './Sound';
import texture10 from './../sources/img/texture10.jpg';
import texture7 from './../sources/img/texture7.jpg';
import texture6 from './../sources/img/texture6.jpg';
import texture4 from './../sources/img/texture4.jpg';
import texture3 from './../sources/img/texture3.jpg';
import crater1 from './../sources/img/crater1.jpg';
import crater2 from './../sources/img/crater2.jpg';
import sweetdreams from './../sources/sounds/sweetdreams.mp3';
import OrbitControls from 'three/examples/js/controls/OrbitControls';

// TODO : add Dat.GUI
// TODO : add Stats

let width = window.innerWidth,
    height = window.innerHeight,
    meteors_array = [],
    meteors_x = [],
    meteors_y = [],
    meteors_z = [],
    orbit_margin = 0.3,
    orbit = new THREE.Group()


const colors = [0x2B6789, 0xBED6D4, 0xE6D27F]

function getRandom(min, max) {
    return Math.floor(Math.random() * max + min);
}

function getRandomColor() {
    var index = getRandom(0, colors.length);
    return colors[index];
}

export default class App {

    constructor() {

        this.meteors_nb = document.getElementById('range_meteors').value
        this.cage_edge = document.getElementById('range_edge').value

        // initialiser le moteur de rendu
        this.renderer = new THREE.WebGLRenderer({antialias: false, alpha: true})
        this.renderer.setSize(width, height)
        this.renderer.setClearColor(0x000000, 0);
        document.getElementById('main').appendChild(this.renderer.domElement)

        // initialiser la scène
        this.scene = new THREE.Scene()

        //initialiser la caméra
        this.camera = new THREE.PerspectiveCamera(50, width/height, 0.1, 2)
        // placer la caméra
        this.camera.position.y = 0.2
        this.camera.position.z = 1
        // ajouter la caméra à la scène
        this.scene.add(this.camera)

        this.createKernel()
        this.createCage()

        let kernelLight = new THREE.DirectionalLight( 0xBED6D4)
        kernelLight.position.set( -1, 1, 2 )
        this.scene.add( kernelLight )
        this.createMeteor()

       /* AUDIO */
       this.audio = new Sound( sweetdreams, 102, .3, () => {
          this.audio.play()
      }, true)

         this.audio.onceAt('orbit explosion 1',8.3, () => {
            orbit.scale.x = 2
            orbit.scale.y = 2
            orbit.scale.z = 2
        }).between('after explosion 1', 8.9, 9, () => {
           orbit.scale.x = 1
           orbit.scale.y = 1
           orbit.scale.z = 1
       }).onceAt('orbit explosion 2', 33.9, () => {
           orbit.scale.x = 2
           orbit.scale.y = 2
           orbit.scale.z = 2
       }).after('after explosion 2', 34.6, () => {
           orbit.scale.x = 1
           orbit.scale.y = 1
           orbit.scale.z = 1
         })

       this.kick = this.audio.createKick({
         frequency: [100, 150],
         decay: 0.5,
         threshold: 0.5,
         onKick: () => {

         },
         offKick: () => {

         }
       })
       this.kick.on()

       let OrbitControls;
       OrbitControls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
       OrbitControls.enableZoom = false;

       window.addEventListener('resize', this.onWindowResize.bind(this), false);
        this.onWindowResize();

       this.renderer.animate( this.render.bind(this) );

       window.scene = this.scene
       window.THREE = THREE

       this.addListeners();
    }

    addListeners() {
        // set number of edge from the cage
        document.getElementById('range_edge').addEventListener('change', () => {
          this.cage_edge = document.getElementById('range_edge').value
          this.scene.remove( this.cage )
          this.createCage()
        })

        // set number of edge from the cage
        document.getElementById('range_meteors').addEventListener('change', () => {
          this.meteors_nb = document.getElementById('range_meteors').value
          for (var i = 0; i < meteors_array.length; i++) {
              orbit.remove(meteors_array[i])
          }
          this.createMeteor()
        })

        // set Volume with range input
        document.getElementById('range_volume').addEventListener('change', () => {
          this.audio.volume = document.getElementById('range_volume').value
        })

        // pause control
        document.getElementById('pause').addEventListener('click', () => {
          this.audio.pause()
        })

        // play control
        document.getElementById('play').addEventListener('click', () => {
          this.audio.play()
        })

        $('#pause').on('click', function() {
            $('#pause').css('display', 'none')
            $('#play').css('display', 'block')
        })
        $('#play').on('click', function() {
            $('#pause').css('display', 'block')
            $('#play').css('display', 'none')
        })

        $('.swipe').mouseup(function() {
        	$(this).blur();
        	var sliderVal = $(this).val();
        	$(this).parent().append('<div class="swipes-ripple-range"></div>');
        	$(this).siblings('.swipes-ripple-range').css('left', 'calc(' + sliderVal + '% - 30px)').delay(310).queue(function(){
        		$(this).remove().dequeue();
        	});
        })

    }

    createKernel() {
        let kernel_shape = new THREE.SphereGeometry(0.08,50, 50)
        let textureLoader = new THREE.TextureLoader();
        let kernel_texture = textureLoader.load(crater1)
        let kernel_material = new THREE.MeshLambertMaterial({color: 0xFFFFFF, emissive: 0x0f121a, map:  kernel_texture})
        this.kernel = new THREE.Mesh( kernel_shape, kernel_material )
        // ajouter l'objet à la scène
        this.scene.add( this.kernel )
    }

    createCage() {
        let cage_shape = new THREE.IcosahedronGeometry(0.20, this.cage_edge)
        let cage_material = new THREE.MeshBasicMaterial({color: 0xBED6D4, wireframe: true})
        this.cage = new THREE.Mesh( cage_shape, cage_material )
        this.scene.add( this.cage )
    }

    createMeteor() {
      for (var i = 0; i < this.meteors_nb; i++) {
        let meteors_shape = new THREE.TetrahedronGeometry(0.004, 1)

        for ( var j = 0; j < meteors_shape.faces.length; j ++ ) {
            meteors_shape.faces[ j ].color.setHex(getRandomColor());
        }

        let meteors_material = new THREE.MeshBasicMaterial({color:0xFFFFFF, vertexColors: THREE.FaceColors})
        this.meteors = new THREE.Mesh( meteors_shape, meteors_material )

        let random = Math.random() * Math.PI * 2
        this.meteors.position.set(Math.cos(random) * (orbit_margin + Math.random() * 0.4), Math.random()*(0.05 - 0) - 0.025, Math.sin(random) * (orbit_margin + Math.random() * 0.4))

        orbit.add( this.meteors );
        this.scene.add( orbit );

        meteors_array.push( this.meteors )
        meteors_y.push(this.meteors.position.y)
      }
    }

    render() {

      this.kernel.scale.x =  1 + ((this.audio.frequencyDataArray[40]/ 255)*1)
      this.kernel.scale.y =  1 + ((this.audio.frequencyDataArray[40] / 255)*1)
      this.kernel.scale.z =  1 + ((this.audio.frequencyDataArray[40] / 255)*1)
      this.cage.rotation.x += 0.005
      this.cage.rotation.y += 0.002
      this.cage.scale.x =  1 + (this.audio.frequencyDataArray[100, 150]/ 255) / 2
      this.cage.scale.y =  1 + (this.audio.frequencyDataArray[100, 150] / 255) / 2
      this.cage.scale.z =  1 + (this.audio.frequencyDataArray[100, 150] / 255) / 2
      orbit.rotation.y += 0.002

      for (var i = 0; i < meteors_array.length; i++) {
        meteors_array[i].rotation.x += Math.random()/10
        meteors_array[i].rotation.y += Math.random()/10
      }

      let topMeteors = meteors_array.slice(0, (this.meteors_nb/3)-1)
      let middleMeteors = meteors_array.slice(this.meteors_nb/3, (this.meteors_nb/3)*2 - 1)
      let bottomMeteors = meteors_array.slice((this.meteors_nb/3)*2, (this.meteors_nb/3)*3 - 1)

      if (this.audio.frequencyDataArray[150] > 100 || this.audio.frequencyDataArray[170] > 50) {
        for (let i = 0; i < topMeteors.length; i++) {
          topMeteors[i].position.y = meteors_y[i] + (this.audio.frequencyDataArray[170]/255) /(10+Math.random())
        }
        for (let i = 0; i < bottomMeteors.length; i++) {
          bottomMeteors[i].position.y = meteors_y[i] - (this.audio.frequencyDataArray[170]/255) /(20+Math.random())
        }
      }

      // on fait le rendu de la scène
      this.renderer.render( this.scene, this.camera )

    }

    onWindowResize() {
    	this.camera.aspect = window.innerWidth / window.innerHeight;
    	this.camera.updateProjectionMatrix();
    	this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
}

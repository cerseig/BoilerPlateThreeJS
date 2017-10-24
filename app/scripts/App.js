import Sound from './Sound';
import texture7 from './../sources/img/texture7.jpg';
import texture6 from './../sources/img/texture6.jpg';
import texture4 from './../sources/img/texture4.jpg';
import texture3 from './../sources/img/texture3.jpg';
import sweetdreams from './../sources/sounds/sweetdreams.mp3';
import OrbitControls from 'three/examples/js/controls/OrbitControls';

// TODO : add Dat.GUI
// TODO : add Stats

let width = window.innerWidth,
    height = window.innerHeight,
    meteors_array = [],
    meteors_nb = 500,
    meteors_x = [],
    meteors_y = [],
    meteors_z = [],
    orbit_margin = 0.3,
    orbit = new THREE.Group()


const light_colors = [0xf2d7dd, 0xece6ed, 0xccd8f2]
const dark_colors = [0xc5bad0, 0xecbdc6, 0xabb8e3]

function getRandom(min, max) {
    return Math.floor(Math.random() * max + min);
}

function getRandomColor() {
    var index = getRandom(0, dark_colors.length);
    return dark_colors[index];
}

export default class App {

    constructor() {

          // initialiser le moteur de rendu
       this.renderer = new THREE.WebGLRenderer()
       this.renderer.setSize(width, height)
       document.getElementById('main').appendChild(this.renderer.domElement)

       // initialiser la scène
       this.scene = new THREE.Scene()
       this.scene.background = new THREE.Color( 0x7187AD );

       //initialiser la caméra
       this.camera = new THREE.PerspectiveCamera(50, width/height, 0.1, 2)
       // placer la caméra
       this.camera.position.z = 1
       // ajouter la caméra à la scène
       this.scene.add(this.camera)

       let kernel_shape = new THREE.SphereGeometry(0.08,50, 50)
       let textureLoader = new THREE.TextureLoader();
       let kernel_texture = textureLoader.load(texture7)
       let kernel_material = new THREE.MeshBasicMaterial({color: 0xffffff, map: kernel_texture})
       this.kernel = new THREE.Mesh( kernel_shape, kernel_material )
       // ajouter l'objet à la scène
       this.scene.add( this.kernel )

       let cage_shape = new THREE.IcosahedronGeometry(0.20, 1)
       let cage_material = new THREE.MeshBasicMaterial({color: 0xf2d7dd, wireframe: true})
       this.cage = new THREE.Mesh( cage_shape, cage_material )
       this.scene.add( this.cage )

       this.audio = new Sound( sweetdreams, 102, .3, () => {
         this.audio.play()
       }, true )
       this.kick = this.audio.createKick({
         frequency: [100, 150],
         decay: 1,
         threshold: 0.5,
         onKick: () => {
             orbit_margin = 0.4
         },
         offKick: () => {
             orbit_margin = 0.3
         }
       })
       this.kick.on()

        for (var i = 0; i < meteors_nb; i++) {
          let meteors_shape = new THREE.TetrahedronGeometry(0.005)
          let meteors_material = new THREE.MeshBasicMaterial({color:0x000000})
          this.meteors = new THREE.Mesh( meteors_shape, meteors_material )
          let random = Math.random() * Math.PI * 2
          this.meteors.position.set(Math.cos(random) * (orbit_margin + Math.random() * 0.6), Math.random()*(0.05 - 0) - 0.025, Math.sin(random) * (orbit_margin + Math.random() * 0.6))
          orbit.add( this.meteors );
          this.scene.add( orbit );
          meteors_array.push( this.meteors )
          meteors_y.push(this.meteors.position.y)
      }

       // initialiser la lumière directionnelle
       this.directionalLight = new THREE.DirectionalLight(0xecbdc6, 1)
       this.directionalLight.position.set( 0.5, 0.5, 0.5)
       // ajouter la lumière à la scène
       this.scene.add( this.directionalLight )

       this.renderBind = this.render.bind(this);
       this.renderBind();

       let OrbitControls;
       OrbitControls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
       OrbitControls.enableZoom = false;

       this.renderer.animate( this.render.bind(this) );
    }

    render() {

      // this.kernel.rotation.x += 0.005
      // this.kernel.rotation.y += 0.005
      this.kernel.scale.x =  1 + ((this.audio.frequencyDataArray[40]/ 255)*2)
      this.kernel.scale.y =  1 + ((this.audio.frequencyDataArray[40] / 255)*2)
      this.kernel.scale.z =  1 + ((this.audio.frequencyDataArray[40] / 255)*2)
      this.cage.rotation.x += 0.005
      this.cage.rotation.y += 0.002
      this.cage.scale.x =  1 + (this.audio.frequencyDataArray[100, 150]/ 255)
      this.cage.scale.y =  1 + (this.audio.frequencyDataArray[100, 150] / 255)
      this.cage.scale.z =  1 + (this.audio.frequencyDataArray[100, 150] / 255)
      orbit.rotation.y += 0.002

    //   for (let i = 0; i < meteors_array.length; i++) {
    //       meteors_array[i].position.x = meteors_x[i] + 0.1
    //       meteors_array[i].position.z = meteors_z[i] + 0.1
    //   }

    //   let topMeteors = meteors_array.slice(0, 99)
    //   let middleMeteors = meteors_array.slice(100, 199)
    //   let bottomMeteors = meteors_array.slice(200, 299)
      //
    //   for (let i = 0; i < topMeteors.length; i++) {
    //     topMeteors[i].position.y = meteors_y[i] + (this.audio.frequencyDataArray[100]/255) /(10+Math.random())
    //   }
    //   for (let i = 0; i < bottomMeteors.length; i++) {
    //     bottomMeteors[i].position.y = meteors_y[i] - (this.audio.frequencyDataArray[100]/255) /(10+Math.random())
    //   }



      // on fait le rendu de la scène
      this.renderer.render( this.scene, this.camera )

    }
}

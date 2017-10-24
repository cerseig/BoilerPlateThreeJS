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
    particles_array = [],
    light_colors = [0xf2d7dd, 0xece6ed, 0xccd8f2],
    dark_colors = [0xc5bad0, 0xecbdc6, 0xabb8e3]

export default class App {

    constructor() {

          // initialiser le moteur de rendu
       this.renderer = new THREE.WebGLRenderer()
       this.renderer.setSize(width, height)
       document.getElementById('main').appendChild(this.renderer.domElement)

       // initialiser la scène
       this.scene = new THREE.Scene()
       this.scene.background = new THREE.Color( 0xffffff );

       //initialiser la caméra
       this.camera = new THREE.PerspectiveCamera(50, width/height, 0.1, 2)
       // placer la caméra
       this.camera.position.z = 1
       // ajouter la caméra à la scène
       this.scene.add(this.camera)

       let kernel_shape = new THREE.SphereGeometry(0.05,50, 50)
       let textureLoader = new THREE.TextureLoader();
       let kernel_texture = textureLoader.load(texture7)
       let kernel_material = new THREE.MeshBasicMaterial({color: 0xffffff, map: kernel_texture})
       this.kernel = new THREE.Mesh( kernel_shape, kernel_material )
       // ajouter l'objet à la scène
       this.scene.add( this.kernel )

       let cage_shape = new THREE.IcosahedronGeometry(0.2, 1)
       let cage_material = new THREE.MeshBasicMaterial({color: 0xf2d7dd, wireframe: true})
       this.cage = new THREE.Mesh( cage_shape, cage_material )
       this.scene.add( this.cage )

        for (var i = 0; i < 300; i++) {
          console.log('test');
            let particles_shape = new THREE.TetrahedronGeometry(0.005)
            let particles_material = new THREE.MeshBasicMaterial({color:0x355D7C})
            this.particles = new THREE.Mesh( particles_shape, particles_material )
            console.log(this.particles);
            this.particles.position.set(Math.random() - 0.5,Math.random()*(0.1 - 0) - 0.05,Math.random()-0.5)
            this.scene.add( this.particles )
            particles_array.push( this.particles )
        }

        this.audio = new Sound( sweetdreams, 102, .3, () => {
          this.audio.play()
        }, true )
        this.kick = this.audio.createKick({
          frequency: [100, 150],
          decay: 1,
          threshold: 0.5,
          onKick: () => {
            cage_material.color.setHex('0xFFFFFF')
          },
          offKick: () => {
            cage_material.color.setHex('0xf2d7dd')
          }
        })
        this.kick.on()

       // initialiser la lumière directionnelle
       this.directionalLight = new THREE.DirectionalLight(0xffffff, 1)
       this.directionalLight.position.set( 200, 100, 200 )
       // ajouter la lumière à la scène
       this.scene.add( this.directionalLight )

       this.renderBind = this.render.bind(this);
       this.renderBind();

       let OrbitControls;
       OrbitControls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

       this.renderer.animate( this.render.bind(this) );
    }

    render() {

      this.kernel.rotation.x += 0.005
      this.kernel.rotation.y += 0.005
      this.kernel.scale.x =  1 + ((this.audio.frequencyDataArray[40]/ 255)*3)
      this.kernel.scale.y =  1 + ((this.audio.frequencyDataArray[40] / 255)*3)
      this.kernel.scale.z =  1 + ((this.audio.frequencyDataArray[40] / 255)*3)
      this.cage.rotation.x += 0.005
      this.cage.rotation.y += 0.002
      this.cage.scale.x =  1 + (this.audio.frequencyDataArray[170]/ 255)
      this.cage.scale.y =  1 + (this.audio.frequencyDataArray[170] / 255)
      this.cage.scale.z =  1 + (this.audio.frequencyDataArray[170] / 255)
      this.renderer.clear();
      // on fait le rendu de la scène
      this.renderer.render( this.scene, this.camera )

    }
}

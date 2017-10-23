import texture4 from '../sources/img/texture4.jpg';

// TODO : add Dat.GUI
// TODO : add Stats

let width = window.innerWidth,
    height = window.innerHeight

export default class App {

    constructor() {

      console.log(this);
          // initialiser le moteur de rendu
       this.renderer = new THREE.WebGLRenderer()
       this.renderer.setSize(width, height)
       document.getElementById('main').appendChild(this.renderer.domElement)

       // initialiser la scène
       this.scene = new THREE.Scene()
       this.scene.background = new THREE.Color( 0xffffff );

       //initialiser la caméra
       this.camera = new THREE.PerspectiveCamera(70, width/height, 0.01, 2)
       // placer la caméra
       this.camera.position.z = 1
       // ajouter la caméra à la scène
       this.scene.add(this.camera)

       let kernel_shape = new THREE.SphereGeometry(0.05,50, 50)
       let textureLoader = new THREE.TextureLoader();
       let kernel_texture = textureLoader.load(texture4)
       console.log(texture4);
       let kernel_material = new THREE.MeshBasicMaterial({color: 0xF9CDAD, emissive: 0x000000, map: kernel_texture})
       this.kernel = new THREE.Mesh( kernel_shape, kernel_material )
       // ajouter l'objet à la scène
       this.scene.add( this.kernel )

       // initialiser la lumière directionnelle
       this.directionalLight = new THREE.DirectionalLight(0xffffff, 1)
       this.directionalLight.position.set( 200, 100, 200 )
       // ajouter la lumière à la scène
       this.scene.add( this.directionalLight )

       this.renderBind = this.render.bind(this);
       this.renderBind();

        this.renderer.animate( this.render.bind(this) );
    }

    render() {

      // requestAnimationFrame( this.renderBind )
      this.kernel.rotation.x += 0.002
      this.kernel.rotation.y += 0.005
      // on fait le rendu de la scène
      this.renderer.render( this.scene, this.camera )
    }

}

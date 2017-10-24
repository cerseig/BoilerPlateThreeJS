import vertexShader from './shader.vert'
import fragmentShader from './shader.frag'
// TODO : add Dat.GUI
// TODO : add Stats

let width = window.innerWidth,
    height = window.innerHeight

export default class Test {

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

       let geometry = new THREE.Geometry();
       geometry.vertices.push(
         new THREE.Vector3(-0.5, -0.5, 0),
         new THREE.Vector3(0.5, -0.5, 0),
         new THREE.Vector3(0.5, 0.5, 0),
         new THREE.Vector3(-0.5, 0.5, 0)
       )
       geometry.faces.push(
          new THREE.Face3( 0, 1, 2 ),
          new THREE.Face3( 3, 0, 2 )
      )

      let material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
      })

      let mesh = new THREE.Mesh(geometry, material)
      this.scene.add(mesh)

       this.renderBind = this.render.bind(this);
       this.renderBind();

       this.renderer.animate( this.render.bind(this) );
    }

    render() {
      // on fait le rendu de la scène
      this.renderer.render( this.scene, this.camera )

    }

}

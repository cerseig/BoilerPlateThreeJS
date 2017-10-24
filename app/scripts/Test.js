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

       var geometry = new THREE.BufferGeometry();
        var vertices = new Float32Array( [
            -0.5,  -0.5, 0,
            0.5, -0.5, 0,
            0, 0.5, 0
        ] );
        geometry.addAttribute('position', new THREE.BufferAttribute( vertices, 3 ) );
        var indices = new Uint32Array( [
            0, 1, 2
        ] );
        geometry.setIndex(  new THREE.BufferAttribute( indices, 1 ) );

        var colors = new Float32Array( indices.length * 3 );
        for ( var i = 0, i3 = 0, len = indices.length; i < len; i++, i3 += 3 ) {
            colors[ i3 + 0 ] = Math.random();
            colors[ i3 + 1 ] = Math.random();
            colors[ i3 + 2 ] = Math.random();
        }
        geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

      let material = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color( 0x00ff00 ) }
        },
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

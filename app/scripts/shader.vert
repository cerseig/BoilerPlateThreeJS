attribute vec3 color;
varying vec4 vColor;
void main() {
       gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
   }

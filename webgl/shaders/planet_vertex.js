varying vec3 N;
varying vec3 pos;
varying mat4 modelM;

void main() {
  
  N = normal;
  pos = position;
  modelM = modelMatrix;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
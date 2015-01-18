varying vec3 N;
varying vec3 pos;
varying mat4 modelM;
varying vec3 cameraPos;

void main() {
  
  // Variables to send to the fragment shader
  N = normal;
  pos = position;
  modelM = modelMatrix;
  cameraPos = cameraPosition;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
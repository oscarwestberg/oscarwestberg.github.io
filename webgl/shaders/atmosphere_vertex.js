varying vec3 pos;
varying mat4 modelM;
varying vec3 N;

void main() {
	pos = position;
	modelM = modelMatrix;
	N = normal;

  	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
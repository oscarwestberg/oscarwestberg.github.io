varying vec3 pos;
varying mat4 modelM;
varying vec3 N;

void main() {
  vec3 c = normalize( vec3( vec4(cameraPosition, 1.0) * modelM ) );
  float lambert = max(dot(c, N), 0.0);

  // Find a way to determine if we're outside the planet or not

  //lambert = smoothStep();
  //smoothstep(-0.1, 0.0, dot(N,L));

	gl_FragColor = vec4(1.0,1.0,1.0, 0.1);
}
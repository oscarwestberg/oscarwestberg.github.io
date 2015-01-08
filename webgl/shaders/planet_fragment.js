// Vertex normal
varying vec3 N;
// Current position on model
varying vec3 pos;
// The matrix acting on the planet geometry
varying mat4 modelM;

// Variables from the JavaScript file
uniform float time;
uniform float level;
uniform vec3 sunPos;
uniform vec4 ambientMaterial;
uniform vec4 diffuseLight;
uniform vec4 diffuseMaterial;
uniform vec3 fallof;
uniform float sealevel;

//-----------------------------------------------------------
// WebGL noise. Src: https://github.com/ashima/webgl-noise
//-----------------------------------------------------------

//
// Description : Array and textureless GLSL 2D/3D/4D simplex 
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
// 

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) { 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

// Permutations
  i = mod289(i); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
  }

//-----------------------------------------------------------
// End of WebGL noise. Src: https://github.com/ashima/webgl-noise
//-----------------------------------------------------------


// Returns fractal noise based on a position
// Altering this too much may complicate calculating the new normal later
// Multiplying the noise levels with too large floats creates undesired results
float noise (vec3 pos) {
  float divider = 0.06;
  float noise = abs((snoise(pos) * 0.5 + 0.5) * divider);
  noise += (snoise(pos * 2.0) * 0.5 + 0.5) * divider/2.0;
  noise += (snoise(pos * 4.0) * 0.5 + 0.5) * divider/4.0;
  noise += level < 40.0 ? ((snoise(pos * 8.0) * 0.5 + 0.5) * divider/4.0) : 0.0;
  noise += level < 20.0 ? ((snoise(pos * 16.0) * 0.5 + 0.5) * divider/16.0) : 0.0;
  noise += level < 14.0 ? ((snoise(pos * 32.0) * 0.5 + 0.5) * divider/32.0) : 0.0;
  noise += level < 8.0 ? ((snoise(pos * 64.0) * 0.5 + 0.5) * divider/64.0) : 0.0;

  return noise;
}

// Returns a normal that uses 3D noise as a bump map
vec3 calculateNewNormal(float F) {
  // Step size for calculating normals with gradients
  float E = 0.001;

  // calculate noise in all dimensions
  float Fx = noise(vec3(pos.x + E, pos.yz));
  float Fy = noise(vec3(pos.x, pos.y + E, pos.z));
  float Fz = noise(vec3(pos.xy, pos.z + E));

  // dF gradient vector
  vec3 dF = vec3(Fx - F, Fy - F, Fz - F) / E;
  vec3 newNormal = normalize(N - dF);

  return newNormal;
}

void main() {
  // Create light vector towards sun, compensate for geometry distortion such as rotation
  vec3 L = normalize( vec3( vec4(sunPos, 1.0) * modelM ) );

  // Calculate noise and new normal
	float F = noise(pos);
  vec3 normal = calculateNewNormal(F);
  
  // Apply Blinn-Phong illumination model, currently without specular highlights
  float lambert = max(dot(L, normal), 0.0);
  vec4 ambientLight = vec4(0.1,0.1,0.1,1.0);
	vec4 intensityDiffuse = diffuseLight * diffuseMaterial * lambert * smoothstep(-0.1, 0.0, dot(N,L));
	vec4 intensityAmbient = ambientLight * diffuseMaterial;

	gl_FragColor = intensityAmbient + intensityDiffuse;
}
// Variables passed on by the vertex shader
varying vec3 N;
varying vec3 pos;
varying mat4 modelM;
varying vec3 cameraPos;

// Variables from the JavaScript file
uniform float time;
uniform float level;
uniform vec3 sunPos;
uniform vec4 diffuseLight;
uniform vec4 diffuseMaterial;
uniform float sealevel;
uniform float noiseIntensity;
uniform float noiseType;
uniform float noiseVariation;
uniform vec3 waterColor;
uniform float renderLevels[8];
uniform vec3 shoreColor;

// Global variables
vec4 ambientLight = vec4(0.1,0.1,0.1,1.0);
float F;

//-----------------------------------------------------------
// WebGL noise. Src: https://github.com/ashima/webgl-noise
// This specific version is from https://github.com/JcBernack/webgl-noise/blob/4e6d073a59d3af949d235ce22d27177597de1f30/src/noise3Dgrad.glsl
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

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v, out vec3 gradient)
{
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
  vec4 m2 = m * m;
  vec4 m4 = m2 * m2;
  vec4 pdotx = vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3));

// Determine noise gradient
  vec4 temp = m2 * m * pdotx;
  gradient = -8.0 * (temp.x * x0 + temp.y * x1 + temp.z * x2 + temp.w * x3);
  gradient += m4.x * p0 + m4.y * p1 + m4.z * p2 + m4.w * p3;
  gradient *= 42.0;

  return 42.0 * dot(m4, pdotx);
}

//-----------------------------------------------------------
// End of WebGL noise. Src: https://github.com/ashima/webgl-noise
//-----------------------------------------------------------


// Returns fractal noise based on a position and gradient
float noise1 (vec3 pos, out vec3 gradient) {
  // Multiplier compensates for sphere size
  float multiplier = 0.02;
  vec3 temp;
  const int levels = 6;

  float noise = snoise(pos * multiplier * 0.6 + noiseVariation, temp) * noiseIntensity * 1.5;
  gradient = temp * noiseIntensity * 1.5;

  for(int i = 2; i <= levels; i++) {
    // divider ensures more and more detailed noise levels
    float divider = pow(2.0, float(i));
    // How much every level of noise contributes to the final value
    float contribution = pow(1.4, float(i));

    // Only render if the camera is close enough
    noise += level < renderLevels[i] ? snoise(pos * divider * multiplier + noiseVariation, temp) * noiseIntensity / contribution : 0.0;
    gradient += level < renderLevels[i] ? temp * noiseIntensity / contribution : vec3(0.0,0.0,0.0);
  }

  return noise;
}

// Returns fractal noise without big continents
float noise2 (vec3 pos, out vec3 gradient) {
  float multiplier = 0.02, noise = 0.0;
  vec3 temp;
  const int levels = 6;
  gradient = vec3(0.0,0.0,0.0);

  for(int i = 0; i <= levels; i++) {
    float divider = pow(2.0, float(i));
    float contribution = pow(1.05, float(i));

    noise += level < renderLevels[i] ? max(snoise(pos * divider * multiplier + noiseVariation, temp),0.0) * noiseIntensity / contribution : 0.0;
    gradient += level < renderLevels[i] ? temp * noiseIntensity / contribution : vec3(0.0,0.0,0.0);
  }

  return noise;
}

float noise3 (vec3 pos, out vec3 gradient) {
  float multiplier = 0.02, noise = 0.0;
  vec3 temp;
  const int levels = 6;
  gradient = vec3(0.0,0.0,0.0);

  for(int i = 0; i <= levels; i++) {
    float divider = pow(2.0, float(i));
    float contribution = pow(1.05, float(i));

    float tempNoise = max(snoise(pos * divider * multiplier + noiseVariation, temp),0.0) * 0.5 / contribution;
    tempNoise = tempNoise > 0.01 ? 0.0 : tempNoise;
    temp = tempNoise > 0.01 ? vec3(0.0,0.0,0.0) : temp;

    noise += level < renderLevels[i] ?  tempNoise : 0.0;
    gradient += level < renderLevels[i] ? temp * noiseIntensity / contribution : vec3(0.0,0.0,0.0);
  }

  return noise;
}

// Calculate water color using the Blinn-Phong shading model
vec4 colorWater(vec3 L) {
  vec4 diffuseColor = vec4(5.0/266.0, 82.0/255.0, 199.0/255.0, 1.0) * (2.0/3.0) + vec4(waterColor, 1.0) * (1.0/3.0);
  vec4 ambientColor = ambientLight * diffuseColor;
  vec4 specularColor = vec4(1.0,1.0,1.0,1.0);

  // Calculate new normal for waves on the water
  vec3 gradient = vec3(0.0,0.0,0.0);
  float Fw = snoise(pos + time * 0.2, gradient);
  // Only render waves if the camera is close enough
  vec3 normal = level < 850.0 ? normalize(N - gradient * 0.02) : N;

  // Diffuse lighting
  float lambert = max(dot(L, normal), 0.0);

  // Specular lighting
  vec3 viewDirection = vec3(vec4(normalize(cameraPos - pos), 1.0) * modelM);
  vec3 halfDir = normalize(viewDirection + L);
  float specularAngle = max(dot(halfDir, normal), 0.0);
  float specular = pow(specularAngle, 16.0);

  // Blend shoreColor with the water's color for shallow waters
  float contribution = smoothstep(sealevel - 0.02, sealevel, F);
  diffuseColor = level < renderLevels[3] ? (1.0 - contribution) * diffuseColor +  contribution * vec4(shoreColor,1.0) : diffuseColor;

  return ambientColor + lambert * diffuseColor + specular * specularColor * 0.35;
}

// Calculate ground color
vec4 colorGround(vec3 gradient, vec3 L) {
  vec3 normal = normalize(N - gradient);

  // Smooth transition from shore color to ground color
  float contribution = smoothstep(sealevel, sealevel + 0.05, F);
  vec4 diffuseColor =  contribution * diffuseMaterial + (1.0 - contribution) * vec4(shoreColor,1.0);

  // Apply Lambertian reflectance
  float lambert = max(dot(L, normal), 0.0);
  vec4 intensityDiffuse = diffuseLight * diffuseColor * lambert * smoothstep(-0.1, 0.0, dot(N,L));

  return intensityDiffuse + ambientLight * diffuseMaterial;
}

void main() {
  // Create light vector towards sun, compensate for geometry distortion such as rotation
  vec3 L = normalize( vec3( vec4(sunPos, 1.0) * modelM ) );
  vec3 gradient;

  // Depending on user input, calculate noise using different functions
  F = noiseType == 1.0 ? noise1(pos, gradient) : F;
  F = noiseType == 2.0 ? noise2(pos, gradient) : F;
  F = noiseType == 3.0 ? noise3(pos, gradient) : F;

  // If the noise level is below the sea level, render water. Otherwise render ground.
	gl_FragColor = sealevel > F ? colorWater(L) : colorGround(gradient, L);
}
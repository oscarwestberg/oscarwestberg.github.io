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
  // noiseVariation - user input, changes current position and thus alters noise
  // pos - current position
  // noiseIntensity - user input, how flat or steep the noise is

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


// Fractal noise based on a position and gradient
float noise1 (vec3 pos, out vec3 gradient) {
  // Initialize variables
  float multiplier = 0.02; // Compensates for sphere size
  vec3 temp; // Vector acting as placeholder for gradient value
  const int levels = 8; // Levels of fractal noise
  float _noiseIntensity = noiseIntensity * 1.7; // * 1.7 to ensure the contintents become large

  // Initiate with a noise value for the continents using a low octave (0.6)
  float noise = snoise(pos * multiplier * 0.6 + noiseVariation, temp) * _noiseIntensity;
  gradient = temp * _noiseIntensity;

  for(int i = 2; i <= levels; i++) {
    float divider = pow(2.0, float(i)); // Used for fractal noise
    float contribution = pow(1.4, float(i)); // How much every level of noise contributes to the final value

    // Only applies noise if the camera is close enough
    noise += level < renderLevels[i] ? snoise(pos * divider * multiplier + noiseVariation, temp) * noiseIntensity / contribution : 0.0;
    gradient += level < renderLevels[i] ? temp * noiseIntensity / contribution : vec3(0.0,0.0,0.0);
  }

  return noise;
}

// Rounder looking fractal noise using abs()
float noise2 (vec3 pos, out vec3 gradient) {
  // Initialize variables
  float noise = 0.0;
  vec3 temp; // Vector acting as placeholder for gradient value
  const int levels = 10; // Levels of fractal noise
  gradient = vec3(0.0,0.0,0.0); // Initialize gradient
  float _noiseIntensity = noiseIntensity * 1.5; // * 1.5 makes this kind of noise compatible with the sliders

  // Variables altering the look of the resulting noise with a rounder look
  float size = 0.2; // Smaller value = larger continents
  float noiseDec = 0.4; // Alters how much the contribution variable increases noise
  float decrease = 0.02; // Because of absolute values, noise needs to be decreased 

  for(int i = 0; i <= levels; i++) {
    float divider = pow(2.0, float(i)) * 0.01; // Used for fractal noise, 0.01 compensates for large sphere size
    float contribution = pow(1.4, float(i)); // How much every level of noise contributes to the final value

    noise += level < renderLevels[i-3] ? abs(snoise(pos * size * divider  + noiseVariation, temp) * _noiseIntensity) / (contribution * noiseDec) - decrease : -decrease;
    gradient += level < renderLevels[i-3] ? temp * _noiseIntensity / contribution : vec3(0.0,0.0,0.0);
  }

  return noise;
}

// Ridged fractal noise
float noise3 (vec3 pos, out vec3 gradient) {
  // Initialize variables
  float noise = 0.0;
  vec3 temp; // Vector acting as placeholder for gradient value
  const int levels = 8; // Levels of fractal noise
  gradient = vec3(0.0,0.0,0.0); // Initialize gradient
  float _noiseIntensity = noiseIntensity * 1.5; // * 1.5 makes this kind of noise compatible with the sliders

  // Variables altering the look of the resulting ridged noise
  float limit = 0.035; // Alter ridge size, bigger value = larger ridges
  float size = 0.6; // Smaller value = larger continents
  float noiseDec = 0.3; // Alters how much the contribution variable increases noise

  for(int i = 0; i <= levels; i++) {
    float divider = pow(2.0, float(i)) * 0.01; // Used for fractal noise, 0.01 compensates for large sphere size
    float contribution = pow(1.4, float(i)); // How much every level of noise contributes to the final value

    noise += limit - abs(snoise(pos * size * divider  + noiseVariation, temp) * _noiseIntensity) / (contribution * noiseDec);
    gradient +=  temp * _noiseIntensity / contribution;
  }

  return noise;
}

// Fractal noise with ridged rivers
float noise4 (vec3 pos, out vec3 gradient) {
  float multiplier = 0.01, noise = 0.0;
  vec3 temp;
  const int levels = 8;
  gradient = vec3(0.0,0.0,0.0);

  for(int i = 0; i <= levels; i++) {
    float divider = pow(2.0, float(i));
    float contribution = pow(1.6, float(i));

    noise += 0.01 - abs(snoise(pos * multiplier * divider* 0.6 + noiseVariation, temp) * noiseIntensity * 1.5) / contribution;
    gradient +=  vec3(0.01,0.01,0.01) - abs(temp * noiseIntensity / contribution);
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
  vec3 normal = level < renderLevels[4]*0.85 ? normalize(N - gradient * 0.02) : N;

  // Diffuse lighting
  float lambert = max(dot(L, normal), 0.0);

  // Specular lighting
  vec3 viewDirection = vec3(vec4(normalize(cameraPos - pos), 1.0) * modelM);
  vec3 halfDir = normalize(viewDirection + L);
  float specularAngle = max(dot(halfDir, normal), 0.0);
  float specular = pow(specularAngle, 16.0);

  // Blend shoreColor with the water's color for shallow waters
  float contribution = smoothstep(sealevel - 0.02, sealevel, F);
  diffuseColor = (1.0 - contribution) * diffuseColor +  contribution * vec4(shoreColor,1.0);

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
  F = noiseType == 4.0 ? noise4(pos, gradient) : F;

  // If the noise level is below the sea level, render water. Otherwise render ground.
	gl_FragColor = sealevel > F ? colorWater(L) : colorGround(gradient, L);
}

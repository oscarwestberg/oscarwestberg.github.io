// Source: http://jsfiddle.net/VsWb9/770/
// Code altered by me

//
// Atmospheric scattering fragment shader
//
// Author: Sean O'Neil
//
// Copyright (c) 2004 Sean O'Neil
//
// Ported for use with three.js/WebGL by James Baicoianu


uniform float fNightScale;

varying vec3 c0;
varying vec3 c1;

void main (void)
{
	vec3 placeholderV = vec3(0.0,0.0,0.0);
	vec3 day = placeholderV * c0;
	vec3 night = fNightScale * placeholderV * placeholderV * placeholderV * (1.0 - c0);

	gl_FragColor = vec4(c1, 1.0) + vec4(day + night, 1.0);

	// I only want some ground atmosphere around the edges of the planet
	// Only values for alpha over a certain threshold are acounted for, these are the values around the edges
	// They are then normalized for a smooth transition
	float alpha = gl_FragColor.x + gl_FragColor.y + gl_FragColor.z;
	float threshold = 0.2;//(atmosphereColor.x + atmosphereColor.y + atmosphereColor.z) * 1.06;

	alpha = max(alpha - threshold,0.0);
	alpha = (alpha / (0.4));

	gl_FragColor.a = alpha;
}
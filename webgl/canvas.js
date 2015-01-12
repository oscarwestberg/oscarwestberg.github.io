// Initialize THREE.js
// https://github.com/mrdoob/three.js
var scene = new THREE.Scene();
var width = window.innerWidth - 200;
var camera = new THREE.PerspectiveCamera( 30, width / window.innerHeight, 0.1, 200 );
var renderer = new THREE.WebGLRenderer({
	antialias: false
});

renderer.setSize( width, window.innerHeight);
document.body.appendChild( renderer.domElement );

// Initialize global variables
var planetGeometry = new THREE.SphereGeometry( 1, 60, 60);
var sunGeometry = new THREE.SphereGeometry( 1, 40, 40);
var atmosphereGeometry = new THREE.SphereGeometry( 1.1, 60, 60);

var clock = new THREE.Clock();
var sunPos = new THREE.Vector3(0, 0, 40);

var placeholderColor = new THREE.Vector4(0,0,0,1);
var fallof = new THREE.Vector3(0.01,0.01,0.01);

// Initialize statistics
// https://github.com/mrdoob/stats.js
var stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild( stats.domElement );

// Initialize UI
$("#atmosphereDensity").noUiSlider({
    range: {
        'min': 0,
        '25%': 1,
        '50%': 2,
        '75%': 3,
        'max': 4
    },
    snap: true,
    start: 2
});

// 0.01 - 0.1
$("#noiseIntensity").noUiSlider({
    range: {
        'min': 1,
        'max': 100
    },
    snap: false,
    start: 50
});

$("#noiseVariation").noUiSlider({
    range: {
        'min': 1,
        'max': 100
    },
    snap: false,
    start: 50
});

$("#sunIntensity").noUiSlider({
    range: {
        'min': 0,
        '25%': 1,
        '50%': 2,
        '75%': 3,
        'max': 4
    },
    snap: true,
    start: 2
});

$("#waterLevel").noUiSlider({
    range: {
        'min': -20,
        'max': 20
    },
    snap: false,
    start: -20
});

$("#atmosphereDensity").Link('lower').to($("#atmosphereDensityValue"));
$("#sunIntensity").Link('lower').to($("#sunIntensityValue"));
$("#waterLevel").Link('lower').to($("#waterLevelValue"));
$("#noiseIntensity").Link('lower').to($("#noiseIntensityValue"));
$("#noiseVariation").Link('lower').to($("#noiseVariationValue"));

// Load shaders
// https://github.com/codecruzer/webgl-shader-loader-js
SHADER_LOADER.load(
    function (data)
    {
    	planetUniforms = {
		    time: { type: "f", value: 0 },
		    level: { type: "f", value: camera.position.length()},
		    sunPos: {type: "v3", value: sunPos},
		    diffuseLight: {type: "v4", value: placeholderColor},
		    diffuseMaterial: {type: "v4", value: placeholderColor},
		    fallof: {type: "v3", value: fallof},
		    sealevel: {type: "f", value: 0},
		    noiseIntensity: {type: "f", value: 0},
		    noiseType: {type: "f", value: 1},
		    noiseVariation: {type: "f", value: 0},
		};

		sunUniforms = {
			diffuseLight: {type: "v4", value : placeholderColor}
		}

        var vShader = data.shader.vertex;
        var fShader = data.shader.fragment;
        var vShaderSun = data.shaderSun.vertex;
        var fShaderSun = data.shaderSun.fragment;
        var vShaderAtmosphere = data.shaderAtmosphere.vertex;
        var fShaderAtmosphere = data.shaderAtmosphere.fragment;

        planetShader = new THREE.ShaderMaterial({
        	uniforms: 		planetUniforms,
		    vertexShader:   vShader,
		    fragmentShader: fShader
		});

        sunShader = new THREE.ShaderMaterial({
        	uniforms: 		sunUniforms,
		    vertexShader:   vShaderSun,
		    fragmentShader: fShaderSun
		});

		atmosphereShader = new THREE.ShaderMaterial({
			vertexShader: 	vShaderAtmosphere, 
			fragmentShader: fShaderAtmosphere,
			transparent: 	true,
			side: 			THREE.BackSide
		});

		initialize();
    }
);

function initialize() {
	// Load mesh
	planetMesh = new THREE.Mesh(planetGeometry, planetShader);
	sunMesh = new THREE.Mesh(sunGeometry, sunShader);
	atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereShader);

	// Add meshes
	scene.add( planetMesh );
	scene.add( sunMesh );
	scene.add( atmosphereMesh );

	// Alter meshes 
	sunMesh.scale.set(3,3,3);
	sunMesh.position.set(sunPos.x,sunPos.y,sunPos.z);

	// Handle user controls
	// https://threejsdoc.appspot.com/doc/three.js/src.source/extras/controls/TrackballControls.js.html
	controls = new THREE.TrackballControls( camera, renderer.domElement);
	controls.target.set( 0, 0, 0 );
	controls.minDistance = 5.0;
	controls.maxDistance = 105;
	controls.zoomSpeed = 0.05;
	controls.rotateSpeed = 0.05;
	controls.noPan = true;

	camera.position.z = 6;
	camera.position.x = -2;

	render();
};


function render() {
	stats.begin();

	var delta = clock.getDelta();
	updateUniforms(delta);

	// Update world
	planetMesh.rotation.y += delta * 0.08;
	controls.update();

	renderer.render( scene, camera );
	stats.end();

	// Call render again
	requestAnimationFrame( render );
};

function updateUniforms(delta) {
	// Update planet uniforms
	planetUniforms.time.value += delta;
	planetUniforms.level.value = camera.position.length();
	planetUniforms.sealevel.value = $("#waterLevel").val()/120;
	planetUniforms.diffuseMaterial.value = new THREE.Vector4($("#planetColorR").val(),$("#planetColorG").val(),$("#planetColorB").val(),1);
	planetUniforms.diffuseLight.value = new THREE.Vector4($("#sunColorR").val(),$("#sunColorG").val(),$("#sunColorB").val(),1);
	planetUniforms.noiseIntensity.value = $("#noiseIntensity").val()/1000;
	planetUniforms.noiseType.value = $("#noiseType").val();
	planetUniforms.noiseVariation.value = $("#noiseVariation").val()/100;

	// Update sun uniforms
	//sunUniforms.lengthCamSun.value = camera.position.distanceTo(sunPos);
	sunUniforms.diffuseLight.value = new THREE.Vector4($("#sunColorR").val(),$("#sunColorG").val(),$("#sunColorB").val(),1);
}

// Update window if resized
$(window).resize(function( event ) {
	width = window.innerWidth - 200;
	renderer.setSize( width, window.innerHeight);
	camera.aspect = width / window.innerHeight;
	camera.updateProjectionMatrix();
});
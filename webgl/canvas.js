// Initialize THREE.js
// https://github.com/mrdoob/three.js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
var LOD = 2;

renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

// Initialize different LOD models
var geometry1 = new THREE.SphereGeometry( 1, 20, 20);
var geometry2 = new THREE.SphereGeometry( 1, 60, 60);
var geometry3 = new THREE.SphereGeometry( 1, 200, 200);

// Initialize glbal variables
clock = new THREE.Clock();

// Load shaders
// https://github.com/codecruzer/webgl-shader-loader-js
SHADER_LOADER.load(
    function (data)
    {
    	var uniforms = {
		    time: { type: "f", value: 0 }//,
		    //resolution: { type: "v2", value: new THREE.Vector2 },
		    //texture: { type: "t", value: THREE.ImageUtils.loadTexture('../img/bot.png') }
		};

        var vShader = data.shader.vertex;
        var fShader = data.shader.fragment;

        shaderMaterial = new THREE.ShaderMaterial({
        	uniforms: 		uniforms,
		    vertexShader:   vShader,
		    fragmentShader: fShader
		});

		initialize();
    }
);

function initialize() {
	// Load meshes
	mesh1 = new THREE.Mesh(geometry1, shaderMaterial);
	mesh2 = new THREE.Mesh(geometry2, shaderMaterial);
	mesh3 = new THREE.Mesh(geometry3, shaderMaterial);

	// Add meshes
	scene.add( mesh1 );
	scene.add( mesh2 );
	scene.add( mesh3 );

	// Only lowest LOD visible at start
	mesh1.visible = false;
	mesh2.visible = false;
	mesh3.visible = true;

	camera.position.z = LOD;

	render();
}


function render() {
	// requestAnimationFrame has advantages over setInterval
	requestAnimationFrame( render );
	renderer.render( scene, camera );

	update();
};

function update() {
	var delta = clock.getDelta();

	mesh1.rotation.x += 1 * delta;
	mesh1.rotation.y += 1 * delta;
	mesh2.rotation.x += 1 * delta;
	mesh2.rotation.y += 1 * delta;
	mesh3.rotation.x += 1 * delta;
	mesh3.rotation.y += 1 * delta;
}

function doKeyDown(evt){
	switch (evt.keyCode) {
	case 38:  /* Up arrow was pressed */
		mesh1.visible = true;
		mesh2.visible = false;
		mesh3.visible = false;
		camera.position.z = LOD;
		break;

	case 37:  /* Left arrow was pressed */
		mesh1.visible = false;
		mesh2.visible = true;
		mesh3.visible = false;
		camera.position.z = LOD;
		break;

	case 39:  /* Right arrow was pressed */
		mesh1.visible = false;
		mesh2.visible = false;
		mesh3.visible = true;
		camera.position.z = LOD;
		break;
	}
}

window.addEventListener('keydown',doKeyDown,true);


// Initialize THREE.js
// https://github.com/mrdoob/three.js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight);
//renderer.setSize( 500, 500);
// Add WebGL-window to page
document.body.appendChild( renderer.domElement );

// var uniforms = {
//     time: { type: "f", value: 0 },
//     resolution: { type: "v2", value: new THREE.Vector2 },
//     texture: { type: "t", value: THREE.ImageUtils.loadTexture('../img/bot.png') }
// };

// Load shaders and execute code
SHADER_LOADER.load(
    function (data)
    {
    	// Using the webgl-shader-loader
    	// https://github.com/codecruzer/webgl-shader-loader-js
        var vShader = data.shader.vertex;
        var fShader = data.shader.fragment;

        var shaderMaterial = new THREE.ShaderMaterial({
		    vertexShader:   vShader,
		    fragmentShader: fShader
		});

		item = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 10), shaderMaterial);
		scene.add( item );
		clock = new THREE.Clock();
		camera.position.z = 5;

		render();
    }
);

function render() {
	// requestAnimationFrame has advantages over setInterval
	requestAnimationFrame( render );
	renderer.render( scene, camera );

	var delta = clock.getDelta();
	item.rotation.x += 1 * delta;
	item.rotation.y += 1 * delta;
}


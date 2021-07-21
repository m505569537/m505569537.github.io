import React, { useEffect } from 'react';
import { Button } from 'antd';
import Stats from '../../jsm/libs/stats.module.js';
import { OrbitControls } from '../../jsm/controls/OrbitControls.js';
import { RGBELoader } from '../../jsm/loaders/RGBELoader.js';
import './style.less';
import gifUrl from '../../public/textures/crate.gif'
// import { useThree, useLoader } from 'react-three-fiber'

import * as THREE from 'three';
function Test() {
    useEffect(()=>{
        init();
			animate();
    })
    let camera, scene, renderer;
			let mesh;
    
			

			function init() {

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 400;

				scene = new THREE.Scene();

				const texture = new THREE.TextureLoader().load(gifUrl);

				const geometry = new THREE.BoxGeometry( 200, 200, 200 );
				const material = new THREE.MeshBasicMaterial( { map: texture } );

				mesh = new THREE.Mesh( geometry, material );
				scene.add( mesh );

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );

				mesh.rotation.x += 0.005;
				mesh.rotation.y += 0.01;

				renderer.render( scene, camera );

			}


    return (
        <div id="container"></div>
    );
}

export default Test;
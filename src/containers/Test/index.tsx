import React, { useEffect } from 'react';
import { Button } from 'antd';
import Stats from '../../jsm/libs/stats.module.js';
import { OrbitControls } from '../../jsm/controls/OrbitControls.js';
import { RGBELoader } from '../../jsm/loaders/RGBELoader.js';
import './style.less';
import gifUrl from '../../public/textures/crate.gif';
import hdrUrl from '../../public/textures/equirectangular/pedestrian_overpass_1k.hdr';

import { FlakesTexture } from '../../jsm/textures/FlakesTexture.js';

// import { useThree, useLoader } from 'react-three-fiber'

import * as THREE from 'three';
function Test() {
    useEffect(()=>{
        init();
			animate();
    });
    let container, stats;

			let camera, scene, renderer;
			let particleLight;


			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 2500 );
				camera.position.set( 0.0, 400, 400 * 3.5 );

				//

				scene = new THREE.Scene();

				let hdrCubeRenderTarget = null;

				new RGBELoader()
					.setDataType( THREE.UnsignedByteType )
					.load( hdrUrl, function ( hdrEquirect ) {

						hdrCubeRenderTarget = pmremGenerator.fromEquirectangular( hdrEquirect );
						hdrEquirect.dispose();
						pmremGenerator.dispose();

						// Materials

						const cubeWidth = 400;
						const numberOfSphersPerSide = 1;
						const sphereRadius = ( cubeWidth / numberOfSphersPerSide ) * 0.8 * 0.5;
						const stepSize = 1.0 / numberOfSphersPerSide;

						const geometry = new THREE.BoxGeometry( 200, 200, 200 );

						let index = 0;

						for ( let alpha = 0; alpha <= 1.0; alpha += stepSize ) {

							for ( let beta = 0; beta <= 1.0; beta += stepSize ) {

								for ( let gamma = 0; gamma <= 1.0; gamma += stepSize ) {

									const diffuseColor = new THREE.Color().setHSL( alpha, 0.5, 0.25 );

									const material = new THREE.MeshPhysicalMaterial( {
										metalness: .9,
roughness: .05,
envMapIntensity: 0.9,
clearcoat: 1,
transparent: true,
// transmission: .95,
opacity: .5,
reflectivity: 0.2,
refractionRatio: 0.985,
ior: 0.9,
side: THREE.BackSide,
										color: diffuseColor,
										// metalness: 0,
										// roughness: 0.5,
										// clearcoat: 1.0 - alpha,
										clearcoatRoughness: 1.0 - beta,
										// reflectivity: 1.0 - gamma,
										envMap: ( index % 2 ) == 1 ? hdrCubeRenderTarget.texture : null
									} );

									index ++;

									const mesh = new THREE.Mesh( geometry, material );

									mesh.position.x = alpha * 400 - 200;
									mesh.position.y = beta * 400 - 200;
									mesh.position.z = gamma * 400 - 200;

									scene.add( mesh );

								}

								index ++;

							}

							index ++;

						}

						scene.background = hdrCubeRenderTarget.texture;

					} );

				function addLabel( name, location ) {

					const textGeo = new THREE.TextGeometry( name, {


						size: 20,
						height: 1,
						curveSegments: 1

					} );

					const textMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
					const textMesh = new THREE.Mesh( textGeo, textMaterial );
					textMesh.position.copy( location );
					scene.add( textMesh );

				}

				addLabel( "+clearcoat", new THREE.Vector3( - 350, 0, 0 ) );
				addLabel( "-clearcoat", new THREE.Vector3( 350, 0, 0 ) );

				addLabel( "+clearcoatRoughness", new THREE.Vector3( 0, - 300, 0 ) );
				addLabel( "-clearcoatRoughness", new THREE.Vector3( 0, 300, 0 ) );

				addLabel( "+reflectivity", new THREE.Vector3( 0, 0, - 300 ) );
				addLabel( "-reflectivity", new THREE.Vector3( 0, 0, 300 ) );

				particleLight = new THREE.Mesh( new THREE.SphereGeometry( 4, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
				scene.add( particleLight );

				// Lights

				scene.add( new THREE.AmbientLight( 0x222222 ) );

				const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
				directionalLight.position.set( 1, 1, 1 ).normalize();
				scene.add( directionalLight );

				const pointLight = new THREE.PointLight( 0xffffff, 2, 800 );
				particleLight.add( pointLight );

				//

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				renderer.outputEncoding = THREE.sRGBEncoding;
				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				renderer.toneMappingExposure = 0.75;

				//

				const pmremGenerator = new THREE.PMREMGenerator( renderer );
				pmremGenerator.compileEquirectangularShader();

				//

				stats = new Stats();
				container.appendChild( stats.dom );

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.minDistance = 200;
				controls.maxDistance = 2000;

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function animate() {

				requestAnimationFrame( animate );

				render();
				stats.update();

			}

			function render() {

				const timer = Date.now() * 0.00025;

				//camera.position.x = Math.cos( timer ) * 800;
				//camera.position.z = Math.sin( timer ) * 800;

				camera.lookAt( scene.position );

				particleLight.position.x = Math.sin( timer * 7 ) * 300;
				particleLight.position.y = Math.cos( timer * 5 ) * 400;
				particleLight.position.z = Math.cos( timer * 3 ) * 300;

				renderer.render( scene, camera );

			}

    return (
        <div id="container"></div>
    );
}

export default Test;
<script lang="ts">
	import { T, useFrame } from '@threlte/core';
	import { AudioListener } from '@threlte/extras';
	import { quadInOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { Quaternion, Vector3, type PerspectiveCamera } from 'three';
	import { cameraStores } from './cameraStores';
	import { rendererStores } from './rendererStores';

	let eyesCamera: PerspectiveCamera | undefined = undefined;
	let sightsCamera: PerspectiveCamera | undefined = undefined;

	$: eyesCamera ? rendererStores.eyesCamera.set(eyesCamera) : '';
	$: sightsCamera ? rendererStores.sightsCamera.set(sightsCamera) : '';

	const { activeCamera } = rendererStores;
	const { eyesPosition, eyesQuat, sightsQuat } = cameraStores;

	const currentCameraPosition = new Vector3().copy($eyesPosition);
	const currentQuat = new Quaternion().copy($eyesQuat);

	const cameraSwapTween = tweened(0);

	$: {
		cameraSwapTween.set(0, { duration: 0 });
		if ($activeCamera === 'eyes') {
			cameraSwapTween.set(1, {
				easing: quadInOut,
				duration: 500
			});
		}

		if ($activeCamera === 'sights') {
			cameraSwapTween.set(1, {
				easing: quadInOut,
				duration: 800
			});
		}
	}

	useFrame(() => {
		if ($activeCamera === 'eyes') {
			currentCameraPosition.lerp($eyesPosition, $cameraSwapTween);
			currentQuat.slerp($eyesQuat, $cameraSwapTween);
		}

		if ($activeCamera === 'sights') {
			currentCameraPosition.copy($eyesPosition);
			currentQuat.slerp($sightsQuat, 0.16);
			// currentQuat.slerp($eyesQuat, $cameraSwapTween);
		}

		// if ($activeCamera === 'debug') {
		// 	rendererStores.debugCamera?.lookAt($eyesPosition);
		// }

		sightsCamera?.position.copy(currentCameraPosition);
		sightsCamera?.quaternion.copy(currentQuat);
	});
</script>

<T.PerspectiveCamera fov={60} near={0.0001} bind:ref={eyesCamera}>
	<AudioListener />
	<!-- <T.CameraHelper args={[ref]} /> -->
</T.PerspectiveCamera>

<T.PerspectiveCamera fov={60} near={0.0001} bind:ref={sightsCamera}>
	<!-- <T.CameraHelper args={[ref]} /> -->
</T.PerspectiveCamera>

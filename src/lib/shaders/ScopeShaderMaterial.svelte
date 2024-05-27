<script lang="ts">
	import { rendererStores } from '$lib/renderer/rendererStores';
	import { customShaderMaterial } from '$lib/shaders/customShaderMaterial';
	import fragmentShader from '$lib/shaders/fragScopeX2.glsl?raw';
	import vertexShader from '$lib/shaders/vertStandard.glsl?raw';
	import { T } from '@threlte/core';
	import { useTexture } from '@threlte/extras';
	import { MeshBasicMaterial } from 'three';

	const { sightsRenderTarget } = rendererStores;
	const reticleSprite = useTexture('/sprites/eotechHolo.png');

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let material: any;

	$: $sightsRenderTarget && $reticleSprite && initializeMaterial();

	const initializeMaterial = async () => {
		const csm = await customShaderMaterial();
		if ($sightsRenderTarget && $reticleSprite && csm) {
			// x2material.needsUpdate = true;
			material = new csm({
				baseMaterial: MeshBasicMaterial,
				map: $sightsRenderTarget.texture,

				uniforms: {
					sight: { value: $reticleSprite },
					scene: { value: $sightsRenderTarget.texture }
				},
				vertexShader,
				fragmentShader
			});
		}
	};
</script>

{#if material}
	<T is={material} />
{/if}

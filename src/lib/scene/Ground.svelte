<script lang="ts">
	import RAPIER from '@dimforge/rapier3d-compat';
	import { T } from '@threlte/core';
	import { useTexture } from '@threlte/extras';
	import { AutoColliders } from '@threlte/rapier';
	import { createNoise2D } from 'simplex-noise';
	import { PlaneGeometry, RepeatWrapping, Texture } from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils';

	const size = 100;
	let nsubdivs = 80;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let heights: any[] = [];

	const geometry = new PlaneGeometry(size, size, nsubdivs, nsubdivs);
	const noise = createNoise2D();
	const vertices = geometry.getAttribute('position').array;

	for (let x = 0; x <= nsubdivs; x++) {
		for (let y = 0; y <= nsubdivs; y++) {
			let height = noise(x / 40, y / 40) * 5 + noise(x / 80, y / 80) * 7 + noise(x / 10, y / 10);

			const vertIndex = (x + (nsubdivs + 1) * y) * 3;
			// @ts-expect-error -- TODO
			vertices[vertIndex + 2] = height;
			const heightIndex = y + (nsubdivs + 1) * x;
			heights[heightIndex] = height;
		}
	}

	// needed for lighting
	geometry.computeVertexNormals();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const scale = new RAPIER.Vector3(size, 1, size);

	let map: Texture;

	(async () => {
		map = await useTexture('models/textures/ground.jpg');
		map.wrapS = RepeatWrapping;
		map.wrapT = RepeatWrapping;
		map.repeat.set(200, 200);
	})();
</script>

<!-- <T.Group position.y={-5}>
	<T.Mesh {geometry} rotation.x={DEG2RAD * -90}>
		<T.MeshStandardMaterial color="#ffffff" />
	</T.Mesh>

	<RigidBody type={'fixed'}>
		<Collider shape={'heightfield'} args={[nsubdivs, nsubdivs, heights, scale]} />
	</RigidBody>
</T.Group> -->

<T.Group position.y={-3}>
	<AutoColliders>
		<T.Mesh rotation.x={-DEG2RAD * 90}>
			<T.PlaneGeometry args={[1000, 1000]} />
			<T.MeshStandardMaterial color="#aaaaaa" {map} />
		</T.Mesh>
	</AutoColliders>
</T.Group>

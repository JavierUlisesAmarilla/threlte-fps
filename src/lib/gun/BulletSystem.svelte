<script lang="ts">
	import { useGameData } from '$lib/systems/_gameData';
	import type { V3 } from '$lib/util/types';
	import { T, useFrame } from '@threlte/core';
	import { Instance, InstancedMesh } from '@threlte/extras';

	let bulletPositions: {
		position: V3;
	}[] = new Array(100).fill({
		position: [0, 0, 0]
	});

	const gameData = useGameData();

	useFrame(() => {
		let c = 0;

		for (const bullet of gameData.bulletData.bulletPhysics) {
			if (bullet && c < 100) {
				const { x, y, z } = bullet.body.translation();
				bulletPositions[c] = {
					position: [x, y, z]
				};
				c++;
			}
		}
	});

	const bulletSize = 0.1;
</script>

<InstancedMesh limit={100} frustumCulled={false}>
	<T.BoxGeometry args={[bulletSize, bulletSize, bulletSize]} />
	<T.MeshBasicMaterial color={'#ffffaa'} />

	{#each bulletPositions as b}
		<Instance position={b.position} />
	{/each}
</InstancedMesh>

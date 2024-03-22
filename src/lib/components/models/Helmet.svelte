<script lang="ts">
	import {T} from '@threlte/core';
	import {useGltf} from '@threlte/extras';
	import {AutoColliders, RigidBody} from '@threlte/rapier';
	import {derived} from 'svelte/store';
	import {Mesh, MeshStandardMaterial} from 'three';
	import {DEG2RAD} from 'three/src/math/MathUtils';

	const gltf = useGltf<{
		nodes: {
			'node_damagedHelmet_-6514': Mesh;
		};
		materials: {
			Material_MR: MeshStandardMaterial;
		};
	}>('models/DamagedHelmet/glTF/DamagedHelmet.gltf');

	const helmet = derived(gltf, (gltf) => {
		if (!gltf || !gltf.nodes['node_damagedHelmet_-6514']) return;
		return gltf.nodes['node_damagedHelmet_-6514'];
	});
</script>

{#if $helmet}
	<T.Group position={[0, 2, -10]} rotation={[90 * DEG2RAD, 0, 0]}>
		<RigidBody>
			<AutoColliders shape={'convexHull'}>
				<T.Mesh castShadow geometry={$helmet.geometry} material={$helmet.material} />
			</AutoColliders>
		</RigidBody>
	</T.Group>

	<!-- <T.Group position={[2.5, 2, 2.5]} rotation={[90 * DEG2RAD, 0, 0]}>
		<RigidBody>
			<AutoColliders shape={'ball'}>
				<T.Mesh castShadow geometry={$helmet.geometry} material={$helmet.material} />
			</AutoColliders>
		</RigidBody>
	</T.Group> -->

	<!-- <T.Group position={[2.5, 2, -2.5]} rotation={[90 * DEG2RAD, 0, 0]}>
		<RigidBody>
			<AutoColliders shape={'cuboid'}>
				<T.Mesh castShadow geometry={$helmet.geometry} material={$helmet.material} />
			</AutoColliders>
		</RigidBody>
	</T.Group> -->

	<!-- <T.Group position={[0, 2, 0]} rotation={[90 * DEG2RAD, 0, 0]}>
		<RigidBody>
			<AutoColliders shape={'trimesh'}>
				<T.Mesh castShadow geometry={$helmet.geometry} material={$helmet.material} />
			</AutoColliders>
		</RigidBody>
	</T.Group> -->

	<!-- <T.Group position={[-2.5, 2, -2.5]} rotation={[90 * DEG2RAD, 0, 0]}>
		<RigidBody>
			<AutoColliders shape={'capsule'}>
				<T.Mesh castShadow geometry={$helmet.geometry} material={$helmet.material} />
			</AutoColliders>
		</RigidBody>
	</T.Group> -->
{/if}

<script lang="ts">
	import { T } from '@threlte/core';
	import { GLTF } from '@threlte/extras';
	import { AutoColliders, RigidBody } from '@threlte/rapier';
</script>

<T.Group position={[2, -2, -5]} rotation={[0, Math.PI, 0]}>
	<RigidBody>
		<AutoColliders shape={'convexHull'}>
			<GLTF url="models/soldier.glb" />
		</AutoColliders>
	</RigidBody>
</T.Group>

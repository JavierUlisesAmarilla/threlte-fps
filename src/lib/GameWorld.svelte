<script lang="ts">
	import Player from '$lib/player/Player.svelte';
	import { T } from '@threlte/core';
	import { Environment } from '@threlte/extras';
	import { World } from '@threlte/rapier';
	import GameSystems from './GameSystems.svelte';
	import Helmet from './components/models/Helmet.svelte';
	import Soldier from './components/models/Soldier.svelte';
	import DebugGame from './debug/DebugGame.svelte';
	import GunSystem from './gun/GunSystem.svelte';
	import Ground from './scene/Ground.svelte';
	import Sky from './scene/Sky.svelte';
</script>

<!-- <Environment files={'spaichingen_hill_1k.hdr'} /> -->
<Environment files={'kloofendal_43d_clear_puresky_2k.hdr'} isBackground />

<!-- <T.AmbientLight intensity={0.4} /> -->

<T.HemisphereLight color={'white'} intensity={0.1} />

<World>
	<GameSystems>
		<Player />
		<GunSystem />
		<Helmet />
		<Soldier />

		<!-- <AutoColliders>
			<T.Mesh position.z={-25} position.y={2}>
				<T.BoxGeometry args={[4, 4, 4]} />
				<T.MeshStandardMaterial color="#444444" />
			</T.Mesh>
		</AutoColliders>

		{#each { length: 10 } as d, x}
			{#each { length: 10 } as rz, z}
				<AutoColliders restitution={0}>
					<T.Mesh position.x={(x - 5) * 20 + 3} position.z={(z - 5) * 50 + 5} position.y={2}>
						<T.BoxGeometry args={[4, 4, 4]} />
						<T.MeshStandardMaterial color="#444444" />
					</T.Mesh>
				</AutoColliders>
			{/each}
		{/each} -->

		<Sky />
		<Ground />
		<!-- <T.AxesHelper args={[10, 10, 10]} /> -->
		<DebugGame />
	</GameSystems>
</World>

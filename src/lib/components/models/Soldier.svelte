<script lang="ts">
	import {GLTF, interactivity} from '@threlte/extras';
	import {AutoColliders} from '@threlte/rapier';

	interactivity();
</script>

<AutoColliders>
	<GLTF
		url="models/soldier.glb"
		interactive
		on:click={() => {
			console.log('User clicked!');
		}}
	/>
</AutoColliders>

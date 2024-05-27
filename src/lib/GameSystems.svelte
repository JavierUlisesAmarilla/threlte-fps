<script lang="ts">
	import ControlsSystem from '$lib/controls/ControlsSystem.svelte';
	import BulletSystem from '$lib/gun/BulletSystem.svelte';
	import SoundSystem from '$lib/sounds/SoundSystem.svelte';
	import { gameData } from '$lib/systems/_gameData';
	import { initBulletSystem } from '$lib/systems/bulletSystem';
	import { initSoundSystem } from '$lib/systems/soundSystem';
	import { useFrame } from '@threlte/core';
	import { setContext } from 'svelte';
	import type { GameSystems } from './systems/_systems';
	import { initControlsSystem } from './systems/controlsSystem';
	import { initGunSystem } from './systems/gunSystem';

	setContext('game-data-ctx', gameData);

	const systems: GameSystems = {
		bulletSystem: initBulletSystem(),
		soundSystem: initSoundSystem(),
		gunSystem: initGunSystem(),
		controlsSystem: initControlsSystem()
	};

	setContext<GameSystems>('game-systems-ctx', systems);

	useFrame(() => {
		systems.bulletSystem.update();
		// systems.bulletSystem.cleanup();
		systems.soundSystem.update();
		systems.gunSystem.update();
		systems.controlsSystem.update();
	});
</script>

<SoundSystem />
<BulletSystem />
<ControlsSystem />
<slot />

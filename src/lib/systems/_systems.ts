import {getContext} from 'svelte';
import type {BulletSystem} from './bulletSystem';
import type {ControlsSystem} from './controlsSystem';
import type {GunSystem} from './gunSystem';
import type {SoundSystem} from './soundSystem';

export type GameSystems = {
	bulletSystem: BulletSystem;
	soundSystem: SoundSystem;
	gunSystem: GunSystem;
	controlsSystem: ControlsSystem;
};

export const useSystem = () => {
	return getContext<GameSystems>('game-systems-ctx');
};

import { getContext } from 'svelte'
import { tweened } from 'svelte/motion'
import type { BulletImpact, BulletPhysics } from './bulletSystem'
import type { GameSound } from './soundSystem'

const bulletData: {
	bulletPhysics: (BulletPhysics | undefined)[]
	bulletImpacts: BulletImpact[]
} = {
	bulletPhysics: [],
	bulletImpacts: []
}

const soundData: {
	impactSounds: GameSound[]
	otherSounds: GameSound[]
} = {
	impactSounds: [],
	otherSounds: []
}

const gunData = {
	orientation: {
		theta: 0,
		phi: 0
	},
	recoil: tweened({ x: 0, y: 0 })
}

const controlsData = {
	mouse: {
		moveX: 0,
		moveY: 0
	}
}

export const gameData = {
	bulletData,
	soundData,
	gunData,
	controlsData
}

export type GameData = typeof gameData

export const useGameData = () => {
	return getContext<GameData>('game-data-ctx')
}

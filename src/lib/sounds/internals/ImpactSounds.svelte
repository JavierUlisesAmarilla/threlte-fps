<script lang="ts">
	import { useGameData } from '$lib/systems/_gameData';
	import { T, useFrame } from '@threlte/core';
	import { PositionalAudio } from '@threlte/extras';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let impact1: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let impact2: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let impact3: any;

	const impactVolume = 3;

	const impactDirectionalCone = {
		coneInnerAngle: 360,
		coneOuterAngle: 360,
		coneOuterGain: 1
	};

	const impactRolloff = 0.1;

	let impactIndex = 0;

	const { soundData } = useGameData();

	const { impactSounds } = soundData;

	$: impactAudio = [impact1, impact2, impact3];

	useFrame(() => {
		if (impactSounds.length > 0) {
			const impactSound = impactSounds.shift();

			impactIndex < impactAudio.length - 1 ? impactIndex++ : (impactIndex = 0);

			impactAudio[impactIndex].stop();

			impactAudio[impactIndex].parent.position.x = impactSound?.origin.x;
			impactAudio[impactIndex].parent.position.y = impactSound?.origin.y;
			impactAudio[impactIndex].parent.position.z = impactSound?.origin.z;
			impactAudio[impactIndex].play();
		}
	});
</script>

<T.Mesh>
	<PositionalAudio
		autostart
		volume={impactVolume}
		refDistance={1}
		src={'/audio/impact2.mp3'}
		bind:ref={impact1}
		directionalCone={impactDirectionalCone}
		rolloffFactor={impactRolloff}
	>
		<!-- <T is={PositionalAudioHelper} args={[ref]} /> -->
	</PositionalAudio>
</T.Mesh>

<T.Mesh>
	<PositionalAudio
		autostart
		refDistance={1}
		volume={impactVolume}
		rolloffFactor={impactRolloff}
		src={'/audio/impact2.mp3'}
		bind:ref={impact2}
		directionalCone={impactDirectionalCone}
	>
		<!-- <T is={PositionalAudioHelper} args={[ref]} /> -->
	</PositionalAudio>
</T.Mesh>

<T.Mesh>
	<PositionalAudio
		autostart
		refDistance={1}
		volume={impactVolume}
		src={'/audio/impact2.mp3'}
		bind:ref={impact3}
		directionalCone={impactDirectionalCone}
		rolloffFactor={impactRolloff}
	>
		<!-- <T is={PositionalAudioHelper} args={[ref]} /> -->
	</PositionalAudio>
</T.Mesh>

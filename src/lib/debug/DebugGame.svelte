<script lang="ts">
	import { rendererStores } from '$lib/renderer/rendererStores';
	import { types } from '@theatre/core';
	import { Debug } from '@threlte/rapier';
	import { Sheet, SheetObject, Studio } from '@threlte/theatre';
	import { useKeyboardControls } from 'svelte-kbc';
	import DebugCamera from './_DebugCamera.svelte';
	import DebugControls from './_DebugControls.svelte';
	import DebugGun from './_DebugGun.svelte';
	import { debugStores } from './debugStores';

	const { activeCamera } = rendererStores;

	export let debugCamera = false;

	const { debugActive } = debugStores;
	const { debugToggle } = useKeyboardControls();

	const debugOff = () => {};
	const debugOn = () => {};

	$: $debugActive ? debugOn() : debugOff();
	$: $debugActive && debugCamera ? activeCamera.set('debug') : activeCamera.set('eyes');

	$: $debugToggle ? debugActive.set(!$debugActive) : '';
</script>

<Studio hide={!$debugActive} />
<Sheet name="debug">
	<SheetObject key="rapier" let:Declare>
		<Declare props={{ wireframe: false }} let:values>
			{#if values.wireframe && $debugActive}
				<Debug />
			{/if}
		</Declare>
	</SheetObject>

	<SheetObject key="camera" let:Declare>
		<Declare props={{ active: false }} let:values>
			{#if values.active && $debugActive}
				<DebugCamera />
			{/if}
		</Declare>
	</SheetObject>

	<SheetObject key="controls" let:Declare>
		<Declare props={{ allowPointerLock: false, allowMouseAim: true }} let:values>
			{#if $debugActive}
				<DebugControls
					allowPointerLock={values.allowPointerLock}
					allowMouseAim={values.allowMouseAim}
				/>
			{/if}
		</Declare>
	</SheetObject>

	<SheetObject key="gun" let:Declare>
		<Declare
			props={{
				ads_allow: true,
				autoShootDebug: {
					active: true,
					rpm: types.number(100, { range: [1, 900], nudgeMultiplier: 10 })
				}
			}}
			let:values
		>
			{#if $debugActive}
				<DebugGun adsAllow={values.ads_allow} autoShoot={values.autoShootDebug} />
			{/if}
		</Declare>
	</SheetObject>
</Sheet>

<script lang="ts">
	import { useSystem } from '$lib/systems/_systems';
	import { requestPointerLockWithUnadjustedMovement } from '$lib/util/pointerLock';
	import { useThrelte } from '@threlte/core';
	import { onDestroy } from 'svelte';
	import { controlStores } from './controlStores';

	const { allowPointerLock, allowMouseAim } = controlStores;
	const { controlsSystem } = useSystem();

	let pointerLocked = false;
	const { renderer } = useThrelte();

	renderer?.domElement.addEventListener('click', async () => {
		if (!pointerLocked && $allowPointerLock) {
			requestPointerLockWithUnadjustedMovement(renderer?.domElement);
		}
		if (pointerLocked && !$allowPointerLock) {
			document.exitPointerLock();
		}
	});

	$: pointerLocked && !allowPointerLock && document.exitPointerLock();

	document.addEventListener(
		'pointerlockchange',
		() => {
			pointerLocked = document.pointerLockElement ? true : false;
		},
		false
	);

	const handleMouseMove = ({ movementX, movementY }: MouseEvent) => {
		if ($allowMouseAim) controlsSystem.mouseMove(movementX, movementY);
	};

	onDestroy(() => {
		document.exitPointerLock();
	});
</script>

<svelte:window on:mousemove={handleMouseMove} />

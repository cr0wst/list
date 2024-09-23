<script lang="ts">
	import List from '$lib/List.svelte';
	import { onMount } from 'svelte';
	import { items } from '$lib/stores';

	let newItemLabel = '';

	let inputRef: HTMLInputElement;

	onMount(loadItems);

	async function loadItems() {
		const res = await fetch('/api');
		$items = await res.json();
	}

	async function addItem() {
		const res = await fetch('/api', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ label: newItemLabel })
		});

		$items = await res.json();
		newItemLabel = '';
		inputRef.focus();
	}
</script>

<div class="flex flex-col w-full p-4 items-center">
	<form class="w-full md:w-3/4 py-2" on:submit|preventDefault={addItem}>
		<input bind:this={inputRef} bind:value={newItemLabel} type="text" class="w-full p-2 mb-2 text-lg rounded-md" placeholder="Enter an Item" />
	</form>
	<List />
</div>
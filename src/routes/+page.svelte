<script lang="ts">
	import List from '$lib/List.svelte';
	import { onMount } from 'svelte';
	import { items } from '$lib/stores';
	import TrashCan from '$lib/TrashCan.svelte';

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

	async function deleteAll() {
		const res = await fetch('/api', {
			method: 'DELETE'
		});

		$items = await res.json();
	}
</script>

<div class="flex flex-col w-full p-4 items-center">
	<form class="w-full md:w-1/2 py-2" on:submit|preventDefault={addItem}>
		<input bind:this={inputRef} bind:value={newItemLabel} type="text"
					 class="w-full p-2 mb-2 text-lg rounded-md bg-slate-600 text-slate-100" placeholder="Enter an Item" />
	</form>
	<List />
	<button class="w-16 p-4 text-slate-700 aspect-square bg-slate-400 fixed bottom-4 right-4 z-20 m-4 rounded-full hover:bg-slate-300 hover:text-slate-600" on:click|preventDefault={deleteAll}>
		<TrashCan/>
	</button>
</div>
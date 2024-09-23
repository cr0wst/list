<script lang="ts">
	import { items } from '$lib/stores';

	async function deleteItem(id: string) {
		const res = await fetch(`/api/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
		});

		$items = await res.json();
	}
</script>

<div class="flex flex-col space-y-2 max-w-3/4 w-full md:w-3/4 m-auto">
	{#each $items as item (item.id)}
		<button class="p-6 bg-slate-100 text-slate-700 rounded shadow hover:bg-slate-50 hover:text-slate-500 cursor-pointer"
						on:click|preventDefault={() => deleteItem(item.id)}
		>
			{item.label}
		</button>
	{/each}
</div>
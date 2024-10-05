<script lang="ts">
	import { items } from '$lib/stores';

	async function deleteItem(id: string) {
		const res = await fetch(`/api/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		$items = await res.json();
	}

	async function toggleItem(id: string, isChecked: boolean) {
		const res = await fetch(`/api/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ isChecked })
		});

		$items = await res.json();
	}

	$: checkedItems = $items.filter(i => i.isChecked);
	$: uncheckedItems = $items.filter(i => !i.isChecked);
</script>

<div class="flex flex-col space-y-2 max-w-3/4 w-full md:w-1/2 m-auto">
	{#each uncheckedItems.sort((a,b) => a.label.localeCompare(b.label)) as item (item.id)}
		<button
			class="p-2 pl-4 text-left text-lg bg-slate-600 text-slate-300 rounded shadow hover:bg-slate-400 hover:text-slate-500 cursor-pointer"
			on:click={() => toggleItem(item.id, !item.isChecked)}>
			{item.label}
		</button>
	{/each}
	{#each checkedItems.sort((a,b) => a.label.localeCompare(b.label)) as item (item.id)}
		<button
			class="p-2 pl-4 text-left text-lg bg-slate-500 text-slate-400 rounded shadow hover:bg-slate-400 hover:text-slate-500 cursor-pointer"
			on:click={() => toggleItem(item.id, !item.isChecked)}>
			{item.label}
		</button>
	{/each}
</div>
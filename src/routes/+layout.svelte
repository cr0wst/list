<script>
	import '../app.css';
</script>

<slot />

<svelte:head>
	<title>Grocery List</title>
</svelte:head>

<style lang="postcss">
    :global(body) {
        @apply bg-slate-700;
    }
</style>
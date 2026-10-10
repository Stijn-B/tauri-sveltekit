<script>
	import '../app.css';

	/** @type {{ children: import('svelte').Snippet }} */
	let { children } = $props();
</script>

{@render children()}

<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex h-full flex-col items-center justify-center">
	{@render children()}
</div>

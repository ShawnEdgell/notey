<script lang="ts">
	import { onDestroy } from 'svelte';
	import NoteItem from '$lib/NoteItem.svelte';
	import { notesStore, type Note } from '$lib/stores/notes';

	let notes: Note[] = [];
	const unsubscribe = notesStore.subscribe((value: Note[]) => {
		notes = value;
	});
	onDestroy(unsubscribe);

	function handleToggle(e: CustomEvent) {
		notesStore.toggle(e.detail.index);
	}
	function handleDelete(e: CustomEvent) {
		notesStore.delete(e.detail.index);
	}
	function handleUpdate(e: CustomEvent) {
		notesStore.update(e.detail.index, e.detail.content);
	}
</script>

<div class="notes mt-4 w-full max-w-md">
	{#each notes as note, i (i)}
		<NoteItem
			{note}
			index={i}
			on:toggle={handleToggle}
			on:delete={handleDelete}
			on:update={handleUpdate}
		/>
	{/each}
</div>

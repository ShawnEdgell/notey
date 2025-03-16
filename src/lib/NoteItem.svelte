<!-- src/lib/NoteItem.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Note } from '$lib/stores/notes';

	export let note: Note;
	export let index: number;
	const dispatch = createEventDispatcher();

	function handleToggle() {
		dispatch('toggle', { index });
	}

	function handleDelete() {
		dispatch('delete', { index });
	}

	function handleUpdate(e: Event) {
		const input = e.target as HTMLInputElement;
		dispatch('update', { index, content: input.value });
	}
</script>

<div class="note-item mb-2 flex items-center gap-2">
	<input
		type="checkbox"
		class="toggle toggle-success"
		checked={note.checked}
		on:change={handleToggle}
	/>
	<input
		type="text"
		class="input input-bordered flex-grow"
		value={note.content}
		on:input={handleUpdate}
	/>
	<button on:click={handleDelete} class="btn btn-sm btn-error"> Delete </button>
</div>

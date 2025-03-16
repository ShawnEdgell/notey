<!-- src/lib/NoteInput.svelte -->
<script lang="ts">
	import { notesStore } from '$lib/stores/notes';
	let newNote = '';

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && newNote.trim()) {
			notesStore.add(newNote.trim());
			newNote = '';
		}
	}
</script>

<div class="w-full max-w-md">
	<input
		type="text"
		placeholder="Type note here and press Enter..."
		class="input input-bordered w-full"
		bind:value={newNote}
		on:keydown={handleKeydown}
	/>
</div>

<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	// Create a writable store for the notes (array of strings)
	const notesStore = writable<string[]>([]);

	// Load notes from localStorage once we're in the browser
	onMount(() => {
		const stored = localStorage.getItem('notes');
		if (stored) {
			notesStore.set(JSON.parse(stored));
		}
		// Subscribe to changes and save to localStorage
		const unsubscribe = notesStore.subscribe((value) => {
			localStorage.setItem('notes', JSON.stringify(value));
		});
		return unsubscribe;
	});

	let newNote = '';

	// Add a note if the input is not empty
	function addNote() {
		if (newNote.trim()) {
			notesStore.update((notes) => [...notes, newNote.trim()]);
			newNote = '';
		}
	}

	// Delete a note at a given index
	function deleteNote(index: number) {
		notesStore.update((notes) => {
			const updated = [...notes];
			updated.splice(index, 1);
			return updated;
		});
	}

	// Update a note's content when edited inline
	function updateNote(index: number, newValue: string) {
		notesStore.update((notes) => {
			const updated = [...notes];
			updated[index] = newValue;
			return updated;
		});
	}
</script>

<div class="w-full max-w-md">
	<!-- Input field for adding a new note -->
	<input
		type="text"
		placeholder="Type note here and press Enter..."
		class="input input-bordered w-full"
		bind:value={newNote}
		on:keydown={(e) => {
			if (e.key === 'Enter') addNote();
		}}
	/>
</div>

<div class="notes mt-4 w-full max-w-md">
	<!-- Loop through the notes store -->
	{#each $notesStore as note, i (i)}
		<div class="note-item mb-2 flex items-center gap-2">
			<!-- Editable input for each note -->
			<input
				type="text"
				class="input input-bordered flex-grow"
				bind:value={note}
				on:input={(e) => updateNote(i, (e.target as HTMLInputElement).value)}
			/>
			<!-- Delete button -->
			<button on:click={() => deleteNote(i)} class="btn btn-error"> Delete </button>
		</div>
	{/each}
</div>

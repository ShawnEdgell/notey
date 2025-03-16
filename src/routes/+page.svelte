<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import NoteInput from '$lib/NoteInput.svelte';
	import NoteList from '$lib/NoteList.svelte';
	import { notesStore } from '$lib/stores/notes';

	onMount(() => {
		// Initialize theme-change for Svelte (pass false)
		themeChange(false);

		// Load saved notes from localStorage
		const stored = localStorage.getItem('notes');
		if (stored) {
			notesStore.set(JSON.parse(stored));
		}

		// Subscribe to store changes to update localStorage
		const unsubscribe = notesStore.subscribe((value) => {
			localStorage.setItem('notes', JSON.stringify(value));
		});
		return unsubscribe;
	});
</script>

<NoteInput />
<NoteList />

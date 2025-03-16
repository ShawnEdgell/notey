// src/lib/stores/notes.ts
import { writable } from 'svelte/store';

export type Note = {
	content: string;
	checked: boolean;
};

function createNotesStore() {
	const { subscribe, update, set } = writable<Note[]>([]);
	return {
		subscribe,
		add: (content: string) => update((notes) => [...notes, { content, checked: false }]),
		delete: (index: number) =>
			update((notes) => {
				const updated = [...notes];
				updated.splice(index, 1);
				return updated;
			}),
		update: (index: number, newContent: string) =>
			update((notes) => {
				const updated = [...notes];
				updated[index] = { ...updated[index], content: newContent };
				return updated;
			}),
		toggle: (index: number) =>
			update((notes) => {
				const updated = [...notes];
				updated[index] = {
					...updated[index],
					checked: !updated[index].checked
				};
				return updated;
			}),
		set
	};
}

export const notesStore = createNotesStore();

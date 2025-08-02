/**
 * Demo mock backend for notes
 * In actual integration, replace with API URLs and .env variables.
 * Ensures UI can be previewed and deployed in isolation for now.
 */

let noteSeed = [
  {
    id: "1",
    title: "Welcome to Notes",
    body: "This is your first note! **Edit me.**",
    tags: ["welcome", "demo"],
    updatedAt: Date.now() - 100000,
  },
  {
    id: "2",
    title: "Try filtering or tagging notes",
    body: "You can filter notes by tags or search by keyword.",
    tags: ["help"],
    updatedAt: Date.now() - 80000,
  },
];

export function getMockNotes() {
  // Shallow clone for demo only
  return noteSeed.map(n => ({ ...n }));
}

export function getMockTags() {
  return Array.from(
    new Set(
      noteSeed.flatMap(n => n.tags)
    )
  );
}

let sequence = 3;

// PUBLIC_INTERFACE
export const NoteService = {
  // PUBLIC_INTERFACE
  getAll: async function() {
    // Simulate network delay
    return new Promise(res => setTimeout(() => res(getMockNotes()), 350));
  },
  // PUBLIC_INTERFACE
  getEmptyNote: function() {
    return {
      id: String(sequence++),
      title: "",
      body: "",
      tags: [],
      updatedAt: Date.now(),
    };
  },
  // PUBLIC_INTERFACE
  saveNote: function(notes, note) {
    const idx = notes.findIndex(n => n.id === note.id);
    if (idx === -1) return [...notes, note];
    const updated = notes.slice();
    updated[idx] = { ...note, updatedAt: Date.now() };
    return updated;
  },
  // PUBLIC_INTERFACE
  deleteNote: function(notes, noteId) {
    return notes.filter(n => n.id !== noteId);
  },
};

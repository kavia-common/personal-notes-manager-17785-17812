export function filterNotes(notes, tag, search) {
  return notes.filter(note => {
    if (tag && !note.tags.includes(tag)) return false;
    if (
      search &&
      !(
        (note.title || "").toLowerCase().includes(search.toLowerCase()) ||
        (note.body || "").toLowerCase().includes(search.toLowerCase())
      )
    )
      return false;
    return true;
  });
}

export function uniqTagsFromNotes(notes) {
  return Array.from(
    new Set(
      notes.flatMap(n => n.tags)
    )
  );
}

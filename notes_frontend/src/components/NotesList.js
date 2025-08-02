import React from "react";
import "../App.css";

// PUBLIC_INTERFACE
function NotesList({ notes, selectedId, onSelect }) {
  if (notes.length === 0)
    return <div className="notesListEmpty">No notes found.</div>;

  return (
    <ul className="notesList">
      {notes.map((note) => (
        <li
          key={note.id}
          className={note.id === selectedId ? "noteItem selected" : "noteItem"}
          onClick={() => onSelect(note.id)}
          tabIndex={0}
          aria-label={`Select note ${note.title}`}
        >
          <div className="noteTitleRow">
            <span className="noteTitle">{note.title || <span className="noteUntitled">Untitled</span>}</span>
            <span className="noteDate">{new Date(note.updatedAt).toLocaleString()}</span>
          </div>
          <div className="notePreview">{note.body.substring(0, 50)}{note.body.length > 50 ? "..." : ""}</div>
          <div className="noteTagRow">
            {note.tags.map(tag => (
              <span className="noteTag" key={tag}>{tag}</span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
export default NotesList;

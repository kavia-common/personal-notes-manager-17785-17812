import React, { useEffect, useRef, useState } from "react";
import "../App.css";

// PUBLIC_INTERFACE
function NoteEditor({ note, onSave, onDelete, allTags }) {
  const [title, setTitle] = useState(note.title || "");
  const [body, setBody] = useState(note.body || "");
  const [tags, setTags] = useState(note.tags || []);
  const [tagInput, setTagInput] = useState("");
  const titleRef = useRef(null);

  useEffect(() => {
    setTitle(note.title || "");
    setBody(note.body || "");
    setTags(note.tags || []);
    setTagInput("");
    // Focus title when switching note
    titleRef.current && titleRef.current.focus();
  }, [note.id]);

  // PUBLIC_INTERFACE
  const handleSave = () => {
    if (!title.trim() && !body.trim()) return;
    onSave({
      ...note,
      title: title.trim(),
      body: body,
      tags,
      updatedAt: Date.now(),
    });
  };

  // PUBLIC_INTERFACE
  const handleDelete = () => {
    if (window.confirm("Delete this note?")) {
      onDelete(note.id);
    }
  };

  // PUBLIC_INTERFACE
  const handleTagAdd = (e) => {
    e.preventDefault();
    if (!tagInput.trim()) return;
    if (!tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  // PUBLIC_INTERFACE
  const handleRemoveTag = (tag) =>
    setTags(tags.filter((t) => t !== tag));

  // Allow Enter to save for power users
  // PUBLIC_INTERFACE
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") handleSave();
  };

  return (
    <div className="noteEditor" onKeyDown={handleKeyDown}>
      <input
        className="input noteTitleInput"
        type="text"
        placeholder="Note title"
        value={title}
        ref={titleRef}
        onChange={e => setTitle(e.target.value)}
        maxLength={100}
        autoFocus
      />
      <textarea
        className="input noteBodyInput"
        placeholder="Write your note here..."
        value={body}
        rows={10}
        onChange={e => setBody(e.target.value)}
      />
      <div className="tagEditorRow">
        <form onSubmit={handleTagAdd} className="tagInputForm">
          <input
            className="input tagInput"
            type="text"
            placeholder="Add tag"
            value={tagInput}
            maxLength={32}
            onChange={e => setTagInput(e.target.value)}
            list="all-tags"
          />
          <datalist id="all-tags">
            {allTags.map(tag => (
              <option value={tag} key={tag} />
            ))}
          </datalist>
          <button className="btn accent tagAddBtn" type="submit">
            + Tag
          </button>
        </form>
        <div className="tagList noteEditorTags">
          {tags.map(tag => (
            <span className="noteTag" key={tag}>
              {tag}
              <span className="removeTagBtn" onClick={() => handleRemoveTag(tag)} title="Remove tag">
                &times;
              </span>
            </span>
          ))}
        </div>
      </div>
      <div className="editorBtnRow">
        <button className="btn primary" onClick={handleSave}>
          Save
        </button>
        <button className="btn secondary" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteEditor;

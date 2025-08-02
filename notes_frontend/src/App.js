import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Sidebar from "./components/Sidebar";
import NotesList from "./components/NotesList";
import NoteEditor from "./components/NoteEditor";
import { getMockNotes, getMockTags, NoteService } from "./mockBackend";
import { filterNotes, uniqTagsFromNotes } from "./utils/noteUtils";

// PUBLIC_INTERFACE
function App() {
  // Authentication state (dummy for now)
  const [user, setUser] = useState(null);
  // Notes and CRUD state
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  // Tagging/filtering/search
  const [availableTags, setAvailableTags] = useState([]);
  const [tagFilter, setTagFilter] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  // -- Authentication --
  // PUBLIC_INTERFACE
  const handleLogin = (userObj) => {
    setUser(userObj);
  };
  // PUBLIC_INTERFACE
  const handleLogout = () => {
    setUser(null);
    setNotes([]);
    setSelectedNoteId(null);
    setTagFilter(null);
    setSearchValue("");
  };

  // Mock: fetch notes and tags on login
  useEffect(() => {
    if (!user) return;
    // Replace with real API in integration step, .env ready
    NoteService.getAll().then((fetchedNotes) => {
      setNotes(fetchedNotes);
      setAvailableTags(uniqTagsFromNotes(fetchedNotes));
    });
  }, [user]);

  // -- Note CRUD, selected note --
  // PUBLIC_INTERFACE
  const handleSelectNote = (noteId) => setSelectedNoteId(noteId);

  // PUBLIC_INTERFACE
  const handleNewNote = () => {
    const newNote = NoteService.getEmptyNote();
    setNotes((prev) => [...prev, newNote]);
    setSelectedNoteId(newNote.id);
  };

  // PUBLIC_INTERFACE
  const handleSaveNote = (note) => {
    setNotes(NoteService.saveNote(notes, note));
    if (!availableTags.includes(note.tags)) {
      setAvailableTags(uniqTagsFromNotes([...notes, note]));
    }
    setSelectedNoteId(note.id);
  };

  // PUBLIC_INTERFACE
  const handleDeleteNote = (noteId) => {
    setNotes(NoteService.deleteNote(notes, noteId));
    setSelectedNoteId(null);
  };

  // -- Tag and Search --
  // PUBLIC_INTERFACE
  const handleTagFilter = (tag) => setTagFilter(tag);
  // PUBLIC_INTERFACE
  const handleClearTagFilter = () => setTagFilter(null);
  // PUBLIC_INTERFACE
  const handleSearch = (e) => setSearchValue(e.target.value);

  const filteredNotes = useMemo(
    () => filterNotes(notes, tagFilter, searchValue),
    [notes, tagFilter, searchValue]
  );
  const selectedNote = notes.find((n) => n.id === selectedNoteId);

  // UI Layout from spec (sidebar, notes list, note details)
  if (!user)
    return (
      <div className="App centerContent">
        <Auth onLogin={handleLogin} />
      </div>
    );
  return (
    <div className="App appGrid">
      <Sidebar
        tags={availableTags}
        activeTag={tagFilter}
        onTagClick={handleTagFilter}
        onClearTag={handleClearTagFilter}
        onLogout={handleLogout}
        user={user}
      />
      <main className="notesListSection">
        <div className="notesListHeader">
          <button className="btn accent" onClick={handleNewNote}>
            + New Note
          </button>
          <input
            type="search"
            className="searchInput"
            placeholder="Search notes..."
            value={searchValue}
            onChange={handleSearch}
            aria-label="Search notes"
          />
        </div>
        <NotesList
          notes={filteredNotes}
          selectedId={selectedNoteId}
          onSelect={handleSelectNote}
        />
      </main>
      <section className="noteDetailSection">
        {selectedNote ? (
          <NoteEditor
            note={selectedNote}
            onSave={handleSaveNote}
            onDelete={handleDeleteNote}
            allTags={availableTags}
          />
        ) : (
          <div className="noteDetailPlaceholder">
            <h2>No note selected</h2>
            <p>Select a note from the list or create a new one.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;

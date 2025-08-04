import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://notes-app-rbx9.onrender.com'; // 🌐 Backend URL here

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  // Fetch notes from Flask backend
  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/notes`);
      setNotes(res.data);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  };

  // Add a new note
  const addNote = async () => {
    if (!newNote.trim()) return;
    try {
      await axios.post(`${BASE_URL}/notes`, { content: newNote });
      setNewNote('');
      fetchNotes();
    } catch (error) {
      console.error('Failed to add note:', error);
    }
  };

  // Delete a note
  const deleteNote = async (content) => {
    try {
      await axios.delete(`${BASE_URL}/notes`, { data: { content } });
      fetchNotes();
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  // On component load, fetch existing notes
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div
      style={{
        maxWidth: 600,
        margin: '40px auto',
        fontFamily: 'Arial, sans-serif',
        background: 'rgba(10,10,10,0.85)',
        minHeight: '100vh',
        padding: 32,
        borderRadius: 24,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        border: '1px solid rgba(255,255,255,0.18)',
        backdropFilter: 'blur(12px)',
        color: '#fff',
      }}
    >
      <h1 style={{ textAlign: 'center', fontWeight: 700, letterSpacing: 2, color: '#fff', textShadow: '0 2px 16px #000' }}>My Notes</h1>
      <div>
        <input
          style={{
            width: '70%',
            padding: '8px',
            fontSize: '1rem',
            background: 'rgba(255,255,255,0.08)',
            border: '1.5px solid rgba(255,255,255,0.25)',
            borderRadius: 8,
            color: '#fff',
            outline: 'none',
            marginBottom: 8,
            backdropFilter: 'blur(8px)',
          }}
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a new note"
          onKeyDown={(e) => {
            if (e.key === 'Enter') addNote();
          }}
        />
        <button
          style={{
            padding: '8px 12px',
            marginLeft: 8,
            fontSize: '1rem',
            background: 'rgba(255,255,255,0.12)',
            color: '#fff',
            border: '1.5px solid rgba(255,255,255,0.25)',
            borderRadius: 8,
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'background 0.2s',
          }}
          onClick={addNote}
        >
          Add
        </button>
      </div>
      <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: 20 }}>
        {notes.map((note, idx) => (
          <li
            key={idx}
            style={{
              marginBottom: 16,
              padding: 16,
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 16,
              border: '1.5px solid rgba(255,255,255,0.18)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.17)',
              backdropFilter: 'blur(8px)',
              color: '#fff',
            }}
          >
            <span style={{ fontSize: '1.1rem', wordBreak: 'break-word' }}>{note.content}</span>
            <button
              style={{
                background: 'rgba(255,0,0,0.15)',
                color: '#fff',
                border: '1.5px solid rgba(255,255,255,0.25)',
                borderRadius: 8,
                padding: '4px 12px',
                cursor: 'pointer',
                marginLeft: 12,
                fontWeight: 600,
                backdropFilter: 'blur(8px)',
                transition: 'background 0.2s',
              }}
              onClick={() => deleteNote(note.content)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

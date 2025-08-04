import React, { useState, useEffect } from 'react';
import axios from 'axios';

// SVG icons
const InfoIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={{verticalAlign: 'middle'}}><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2"/><rect x="11" y="10" width="2" height="6" rx="1" fill="#fff"/><rect x="11" y="7" width="2" height="2" rx="1" fill="#fff"/></svg>
);
const PersonIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={{verticalAlign: 'middle'}}><circle cx="12" cy="8" r="4" stroke="#fff" strokeWidth="2"/><path d="M4 20c0-3.3137 3.134-6 7-6s7 2.6863 7 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
);
const GithubIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={{verticalAlign: 'middle'}}><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z" fill="#fff"/></svg>
);

const BASE_URL = ''; // 🌐 Backend URL here

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);

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
        margin: '40px auto',
        fontFamily: 'Arial, sans-serif',
        background: 'rgba(10,10,10,0.85)',
        minHeight: '100vh',
        padding: '24px 8px',
        borderRadius: 24,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        border: '1.5px solid rgba(255,255,255,0.22)',
        backdropFilter: 'blur(16px)',
        color: '#fff',
        width: '95vw',
        maxWidth: 420,
        transition: 'box-shadow 0.3s',
        position: 'relative',
      }}
    >
      {/* Top bar with icons */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
      }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            aria-label="Instructions"
            onClick={() => setShowInstructions(v => !v)}
            style={{
              background: 'rgba(255,255,255,0.10)',
              border: '1.5px solid rgba(255,255,255,0.22)',
              borderRadius: '50%',
              padding: 6,
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              marginRight: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <InfoIcon />
          </button>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <a href="https://cleof.us/" target="_blank" rel="noopener noreferrer" aria-label="Person" style={{marginRight: 2}}>
            <PersonIcon />
          </a>
          <a href="https://github.com/CleeYOpro/notes-app.git" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GithubIcon />
          </a>
        </div>
      </div>

      {/* Instructions Modal */}
      {showInstructions && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(10,10,10,0.65)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setShowInstructions(false)}
        >
          <div
            style={{
              background: 'rgba(30,30,30,0.97)',
              border: '1.5px solid rgba(255,255,255,0.22)',
              borderRadius: 18,
              padding: 28,
              maxWidth: 340,
              color: '#fff',
              boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
              backdropFilter: 'blur(16px)',
              fontSize: '1.05rem',
              lineHeight: 1.6,
              position: 'relative',
            }}
            onClick={e => e.stopPropagation()}
          >
            <h2 style={{marginTop: 0, marginBottom: 12, fontSize: '1.25rem', textAlign: 'center'}}>How to Use</h2>
            <ul style={{paddingLeft: 18, marginBottom: 0}}>
              <li>Add notes from any device, anywhere, anytime!</li>
              <li>Delete notes instantly with one click.</li>
              <li>Type words like <b>party</b>, <b>cake</b>, or <b>joy</b> and watch them turn into emojis automatically.</li>
              <li>All notes are saved in the cloud and visible to everyone using the app.</li>
              <li>The app works great on desktop and mobile devices.</li>
            </ul>
            <button
              onClick={() => setShowInstructions(false)}
              style={{
                marginTop: 18,
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                padding: '6px 18px',
                background: 'rgba(255,255,255,0.12)',
                color: '#fff',
                border: '1.5px solid rgba(255,255,255,0.22)',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '1rem',
                backdropFilter: 'blur(8px)',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <h1 style={{
        textAlign: 'center',
        fontWeight: 700,
        letterSpacing: 2,
        color: '#fff',
        textShadow: '0 2px 16px #000',
        fontSize: '2.1rem',
        marginBottom: 24
      }}>JotPop</h1>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
      }}>
        <input
          style={{
            flex: 1,
            minWidth: 0,
            padding: '10px',
            fontSize: '1.1rem',
            background: 'rgba(255,255,255,0.10)',
            border: '1.5px solid rgba(255,255,255,0.25)',
            borderRadius: 12,
            color: '#fff',
            outline: 'none',
            marginBottom: 0,
            backdropFilter: 'blur(8px)',
            boxShadow: '0 2px 8px 0 rgba(31,38,135,0.10)',
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
            padding: '10px 16px',
            fontSize: '1.1rem',
            background: 'rgba(255,255,255,0.18)',
            color: '#fff',
            border: '1.5px solid rgba(255,255,255,0.25)',
            borderRadius: 12,
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'background 0.2s',
            fontWeight: 600,
          }}
          onClick={addNote}
        >
          Add
        </button>
      </div>
      <ul style={{
        listStyle: 'none',
        paddingLeft: 0,
        marginTop: 12,
        marginBottom: 0,
        width: '100%',
      }}>
        {notes.map((note, idx) => (
          <li
            key={idx}
            style={{
              marginBottom: 16,
              padding: 16,
              background: 'rgba(255,255,255,0.10)',
              borderRadius: 18,
              border: '1.5px solid rgba(255,255,255,0.22)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.13)',
              backdropFilter: 'blur(8px)',
              color: '#fff',
              wordBreak: 'break-word',
              fontSize: '1.08rem',
              position: 'relative',
            }}
          >
            <span style={{ fontSize: '1.13rem', marginBottom: 4 }}>{note.content}</span>
            <button
              style={{
                background: 'rgba(255,0,0,0.18)',
                color: '#fff',
                border: '1.5px solid rgba(255,255,255,0.25)',
                borderRadius: 8,
                padding: '4px 14px',
                cursor: 'pointer',
                fontWeight: 600,
                backdropFilter: 'blur(8px)',
                transition: 'background 0.2s',
                alignSelf: 'flex-end',
                fontSize: '0.98rem',
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

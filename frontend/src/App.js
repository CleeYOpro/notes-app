import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  // Fetch notes from Flask backend
  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/notes');
      setNotes(res.data);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  };

  // Add a new note
  const addNote = async () => {
    if (!newNote.trim()) return;
    try {
      await axios.post('http://127.0.0.1:5000/notes', { content: newNote });
      setNewNote('');
      fetchNotes();
    } catch (error) {
      console.error('Failed to add note:', error);
    }
  };

  // Delete a note
  const deleteNote = async (content) => {
    try {
      await axios.delete('http://127.0.0.1:5000/notes', { data: { content } });
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
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>My Notes</h1>
      <div>
        <input
          style={{ width: '70%', padding: '8px', fontSize: '1rem' }}
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a new note"
        />
        <button
          style={{ padding: '8px 12px', marginLeft: 8, fontSize: '1rem' }}
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
              marginBottom: 12,
              padding: 10,
              backgroundColor: '#f2f2f2',
              borderRadius: 6,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>{note.content}</span>
            <button
              style={{ background: 'red', color: 'white', border: 'none', padding: '4px 8px', cursor: 'pointer' }}
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

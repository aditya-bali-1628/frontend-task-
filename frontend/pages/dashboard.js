import { useEffect, useState, useCallback } from 'react';
import NavBar from '../components/NavBar';
import NoteForm from '../components/NoteForm';
import EditNoteModal from '../components/EditNoteModal';
import { api } from '../lib/api';
import Router from 'next/router';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  // Check user authentication on mount
  useEffect(() => {
    const u = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!u || !token) {
      Router.push('/');
      return;
    }
    setUser(JSON.parse(u));
    fetchNotes();
  }, []);

  // Fetch all notes
  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api('/notes', { method: 'GET' });
      setNotes(data.notes);
    } catch (err) {
      setError(err.message || 'Error fetching notes');
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new note
  const handleCreate = async (payload) => {
    setLoading(true);
    try {
      const newNote = await api('/notes', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      setNotes((prev) => [newNote.note, ...prev]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Open edit modal (anyone can edit)
  const handleEditOpen = (note) => {
    setEditingNote(note);
  };

  // Update note
  const handleUpdate = async (updatedData) => {
    if (!editingNote) return;
    setLoading(true);
    try {
      const res = await api(`/notes/${editingNote._id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData),
      });
      setNotes((prev) =>
        prev.map((n) => (n._id === editingNote._id ? res.note : n))
      );
      setEditingNote(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete note (anyone can delete)
  const handleDelete = async (note) => {
    setLoading(true);
    try {
      await api(`/notes/${note._id}`, { method: 'DELETE' });
      setNotes((prev) => prev.filter((n) => n._id !== note._id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    Router.push('/');
  };

  return (
    <>
      <NavBar user={user} onLogout={handleLogout} />

      <main className="min-h-screen bg-gray-100 py-10 px-4 md:px-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Dashboard
        </h1>

        {error && (
          <p className="bg-red-100 text-red-700 py-2 px-4 rounded-lg text-center mb-6">
            {error}
          </p>
        )}

        {/* Create Note Section */}
        <section className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Create a Note
          </h2>
          <NoteForm onSubmit={handleCreate} disabled={loading} />
        </section>

        {/* Notes List */}
        <section className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading && <p className="col-span-full text-center">Loading...</p>}
          {!loading && notes.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No notes available
            </p>
          )}

          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition duration-300"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-gray-800">{note.title}</h3>
                {note.isPublic && (
                  <span className="text-green-600 font-medium text-sm">(Public)</span>
                )}
              </div>
              <p className="text-gray-700 mb-2">{note.content}</p>
              <small className="text-gray-500">
                By: {note.owner?.name || 'Unknown'}
              </small>

              <div className="mt-4 flex space-x-3">
                <button
                  onClick={() => handleEditOpen(note)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Edit Modal */}
      {editingNote && (
        <EditNoteModal
          note={editingNote}
          onClose={() => setEditingNote(null)}
          onSave={handleUpdate}
        />
      )}
    </>
  );
}

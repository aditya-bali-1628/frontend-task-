import React, { useState } from 'react';

export default function EditNoteModal({ note, onClose, onSave }) {
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [isPublic, setIsPublic] = useState(note.isPublic);
    const handleSave = () => {
        onSave({ title, content, isPublic });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-96">
                <h2 className="text-xl font-bold mb-4">Edit Note</h2>
                <input
                    className="border p-2 mb-3 w-full rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="border p-2 mb-3 w-full rounded"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <label className="flex items-center mb-3">
                    <input
                        type="checkbox"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}
                        className="mr-2"
                    />
                    Make Public
                </label>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

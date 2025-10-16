import { useState } from 'react';

export default function NoteForm({ onSubmit, initial = {} }) {
  const [title, setTitle] = useState(initial.title || '');
  const [content, setContent] = useState(initial.content || '');
  const [isPublic, setIsPublic] = useState(initial.isPublic || false);

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, isPublic });
    setTitle(''); setContent(''); setIsPublic(false);
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 16 }}>
      <div>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div>
        <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
      </div>
      <div>
        <label>
          <input type="checkbox" checked={isPublic} onChange={e => setIsPublic(e.target.checked)} />
          Public
        </label>
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

const Note = require('../models/Note');
const { validationResult } = require('express-validator');

exports.createNote = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const note = new Note({ ...req.body, owner: req.user._id });
    await note.save();
    res.status(201).json({ message: 'Note created', note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getNotes = async (req, res) => {
  try {
    // admin can see all notes; users see their notes + public notes
    let query;
    if (req.user.role === 'admin') {
      query = {};
    } else {
      query = { $or: [{ owner: req.user._id }, { isPublic: true }] };
    }
    const notes = await Note.find(query).populate('owner', 'name email role').sort({ createdAt: -1 });
    res.json({ notes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate('owner', 'name email role');
    if (!note) return res.status(404).json({ message: 'Note not found' });

    if (note.isPublic) return res.json({ note });
    // if private, only owner or admin
    if (req.user.role !== 'admin' && note.owner._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json({ note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    if (req.user.role !== 'admin' && note.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    note.title = req.body.title ?? note.title;
    note.content = req.body.content ?? note.content;
    if (typeof req.body.isPublic !== 'undefined') note.isPublic = req.body.isPublic;

    await note.save();
    res.json({ message: 'Note updated', note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;

    const note = await Note.findByIdAndDelete(noteId);

    if (!note) return res.status(404).json({ message: 'Note not found' });

    res.json({ message: 'Note deleted', note });
  } catch (err) {
    console.error('Delete note error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

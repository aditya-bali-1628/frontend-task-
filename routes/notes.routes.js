const express = require('express');
const router = express.Router();
const notesCtrl = require('../controllers/notes.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { noteValidator } = require('../utils/validators');

router.use(authenticate);

/**
 * GET /api/v1/notes
 * POST /api/v1/notes
 */
router.route('/')
  .get(notesCtrl.getNotes)
  .post(noteValidator, notesCtrl.createNote);

router.route('/:id')
  .get(notesCtrl.getNoteById)
  .put(noteValidator, notesCtrl.updateNote)
  .delete(notesCtrl.deleteNote);

module.exports = router;

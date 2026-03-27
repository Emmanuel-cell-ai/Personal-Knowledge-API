const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const { 
    createNote, 
    updateNote, 
    getNotes, 
    getNoteById, 
    paginateNotes,
    sortNotes, 
    searchNotes,
    deleteNote
} = require('../controllers/notes.controllers');

// Apply authentication middleware to all routes

router.post('/notes', authenticate, createNote);
router.put('/notes/:id', authenticate, updateNote);
router.get('/notes', authenticate, getNotes);
router.get('/notes/paginate', authenticate, paginateNotes);
router.get('/notes/sort', authenticate, sortNotes);
router.get('/notes/search', authenticate, searchNotes);
router.get('/notes/:id', authenticate, getNoteById);
router.delete('/notes/:id', authenticate, deleteNote);



module.exports = router;

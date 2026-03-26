const express = require('express');
const router = express.Router();
const { 
    createNote, 
    updateNote, 
    getNotes, 
    getNoteById, 
    paginateNotes,
    sortNotes, 
    searchNotes
} = require('../controllers/notes.controllers');



router.post('/notes', createNote);
router.put('/notes/:id', updateNote);
router.get('/notes', getNotes);
router.get('/notes/paginate', paginateNotes);
router.get('/notes/sort', sortNotes);
router.get('/notes/search', searchNotes);
router.get('/notes/:id', getNoteById);


module.exports = router;

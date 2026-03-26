const Note = require('../models/notes.model');
const { createNoteSchema, updateNoteSchema } = require('../validations/notes.validations');


const createNote = async (req, res) => {
    try {
        const {error} = createNoteSchema.validate(req.body);
        if(error){
            return res.status(400).json({message: error.details[0].message});
        }
        const note = new Note(req.body);
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
}

const getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    }
    catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
}

const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message: 'Note not found'});
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }

}


const paginateNotes = async (req, res) => {
    try {
        const {page = 1, limit = 10} = req.query;
        const notes = await Note.find().skip((page - 1) * limit).limit(parseInt(limit));
        res.status(200).json(notes);
    }
    catch (error){
        res.status(500).json({message: 'Server Error'});
    }
}

const sortNotes = async (req, res) => {
    try {
        const {sort = 'createdAt'} = req.query;
        const notes = await Note.find().sort({[sort]: 1});
        res.status(200).json(notes);
    }
    catch (error){
        res.status(500).json({message: 'Server Error'})
    }
}

const searchNotes = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: 'Query is required' });
        }

        const notes = await Note.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } }
            ]
        });

        res.status(200).json(notes);
    }
    catch (error){
        res.status(500).json({message: 'Server Error'})
    }
}

const updateNote = async (req, res) => {
    try {
        const {error} = updateNoteSchema.validate(req.body);
        if(error){
            return res.status(400).json({message: error.details[0].message});
        }
        const note = await Note.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!note){
            return res.status(404).json({message: 'Note not found'});
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

const deleteNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if(!note){
            return res.status(404).json({message: 'Note not found'});
        }
        res.status(200).json({message: 'Note deleted successfully'})
    }
    catch (error){
        res.status(500).json({message: 'Server Error'})
    }
}

module.exports = {
    createNote,
    getNotes,
    getNoteById,
    paginateNotes,
    sortNotes,      
    searchNotes,
    updateNote,
    deleteNote
}

const Note = require('../models/notes.model');
const { createNoteSchema, updateNoteSchema } = require('../validations/notes.validations');

const createHttpError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

const getAuthenticatedUserId = (req) => {
    return req.user._id;
};

const createNote = async (req, res, next) => {
    try {
        const {error} = createNoteSchema.validate(req.body);
        if(error){
            return next(createHttpError(error.details[0].message, 400));
        }

         const existingNote = await Note.findOne({ title: req.body.title, user: getAuthenticatedUserId(req) });
        if (existingNote) {
            return res.status(400).json({ message: 'Note already exists' });
        }
        
        const note = new Note({
            ...req.body,
            user: getAuthenticatedUserId(req)
        });
        await note.save();
        res.status(201).json(note);

        
       
        

    } catch (error) {
        next(error);
    }
}

const getNotes = async (req, res, next) => {
    try {
        const filter = { user: getAuthenticatedUserId(req) };
        const notes = await Note.find(filter);
        res.status(200).json(notes);
    }
    catch (error) {
        next(error);
    }
}

const getNoteById = async (req, res, next) => {
    try {
        const filter = { _id: req.params.id, user: getAuthenticatedUserId(req) };
        const note = await Note.findOne(filter);
        if(!note){
            return next(createHttpError('Note not found', 404));
        }
        res.status(200).json(note);
    } catch (error) {
        next(error);
    }

}

const paginateNotes = async (req, res, next) => {
    try {
        const {page = 1, limit = 10} = req.query;
        const filter = { user: getAuthenticatedUserId(req) };
        const notes = await Note.find(filter).skip((page - 1) * limit).limit(parseInt(limit));
        res.status(200).json(notes);
    }
    catch (error){
        next(error);
    }
}

const sortNotes = async (req, res, next) => {
    try {
        const {sort = 'createdAt'} = req.query;
        const filter = { user: getAuthenticatedUserId(req) };
        const notes = await Note.find(filter).sort({[sort]: 1});
        res.status(200).json(notes);
    }
    catch (error){
        next(error);
    }
}

const searchNotes = async (req, res, next) => {
    try {
        const { query } = req.query;
        if (!query) {
            return next(createHttpError('Query is required', 400));
        }

        const notes = await Note.find({
            user: getAuthenticatedUserId(req),
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } }
            ]
        });

        res.status(200).json(notes);
    }
    catch (error){
        next(error);
    }
}

const updateNote = async (req, res, next) => {
    try {
        const {error} = updateNoteSchema.validate(req.body);
        if(error){
            return next(createHttpError(error.details[0].message, 400));
        }
        const filter = { _id: req.params.id, user: getAuthenticatedUserId(req) };
        const note = await Note.findOneAndUpdate(filter, req.body, {new: true});
        if(!note){
            return next(createHttpError('Note not found', 404));
        }
        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
}

const deleteNote = async (req, res, next) => {
    try {
        const filter = { _id: req.params.id, user: getAuthenticatedUserId(req) };
        const note = await Note.findOneAndDelete(filter);
        if(!note){
            return next(createHttpError('Note not found', 404));
        }
        res.status(200).json({message: 'Note deleted successfully'})
    }
    catch (error){
        next(error);
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

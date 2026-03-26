const joi = require('joi');

const createNoteSchema = joi.object({
    title: joi.string().required(),
    content: joi.string().required(),
    category: joi.string().valid('Personal', 'Work').optional(),
    tags: joi.array().items(joi.string()).optional()    
})

const updateNoteSchema = joi.object({
    title: joi.string().optional(),
    content: joi.string().optional(),
    category: joi.string().valid('Personal', 'Work').optional(),
    tags: joi.array().items(joi.string()).optional()    
})

module.exports = {
    createNoteSchema,
    updateNoteSchema
}
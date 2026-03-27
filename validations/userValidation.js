const joi = require('joi');

const createUserSchema = joi.object({
    email: joi.string().email().required(),
    username: joi.string().min(3).max(30).required(),
    password: joi.string().min(6).required(),
    role: joi.string().valid('user', 'admin').optional()
})

const loginUserSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
})

module.exports = {
    createUserSchema,
    loginUserSchema
}

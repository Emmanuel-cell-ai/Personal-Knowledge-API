const User = require('../models/user.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUserSchema, loginUserSchema } = require('../validations/userValidation');

const createHttpError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

const createUser = async (req, res, next) => {
    console.log('createUser called with body:', req.body);
    const { error, value } = createUserSchema.validate(req.body);
    if (error) {
        return next(createHttpError(error.details[0].message, 400));
    }

    const { username, email, password } = value;

    if (!username || !email || !password) {
        return next(createHttpError('All fields are required', 400));
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(createHttpError('User already exists', 400));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        if (error && error.code === 11000) {
            return next(createHttpError('Email already in use', 400));
        }

        return next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { error, value } = loginUserSchema.validate(req.body);
        if (error) {
            return next(createHttpError(error.details[0].message, 400));
        }

        const { email, password } = value;

        if (!email || !password) {
            return next(createHttpError('All fields are required', 400));
        }

        const user = await User.findOne({ email });
        if (!user) {
            return next(createHttpError('Invalid credentials', 400));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(createHttpError('Invalid credentials', 400));
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
        );

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createUser,
    loginUser
};


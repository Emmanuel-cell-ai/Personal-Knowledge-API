const express = require('express');
const {
    createUser,
    loginUser
} = require('../controllers/usersController');

const Router = express.Router();


Router.post('/register', createUser);
Router.post('/login', loginUser);

module.exports = Router;

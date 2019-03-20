const express = require('express');
const router = express.Router();
const users  = require('./../../Users');

// Get all users
router.get('/', (req, res) => res.json(users));

// Get single user 
router.get('/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    user ? res.json(user) : res.status(400).json({msg: `No member with id ${req.params.id}`});
});

module.exports = users;
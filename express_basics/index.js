const express = require('express');
const path = require('path');
const logger = require('./middleware/logger')
const users  = require('./Users');

const app = express();

// init Middleware
// app.use(logger);

// Get all users
app.get('/api/users', (req, res) => res.json(users));

// Get single user 
app.get('/api/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    user ? res.json(user) : res.status(400).json({msg: `No member with id ${req.params.id}`});
});

// Set a static folder 
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT | 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
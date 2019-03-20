const express = require('express');
const path = require('path');
const users  = require('./Users');

const app = express();

// Get all users
app.get('/api/users', (req, res) => res.json(users));

// Set a static folder 
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT | 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
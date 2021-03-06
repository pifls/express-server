const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const users  = require('./../../Users');

// Get all users
router.get('/', (req, res) => res.json(users));

// Get single user 
router.get('/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    user ? res.json(user) : res.status(400).json({msg: `No member with id ${req.params.id}`});
});

// Create user
router.post('/', (req, res) => {
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        surname: req.body.surname,
        status: req.body.status
    }
    if(!newUser.name || !newUser.surname) {
       return res.status(400).json({ msg: "Please include a name and email"});
    }
    users.push(newUser);
    res.json(users);
});

// Update user
router.put('/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
  
    if (user) {
      const updatedUser = req.body;
      users.forEach(user => {
        if (user.id === parseInt(req.params.id)) {
          user.name = updatedUser.name ? updatedUser.name : user.name;
          user.surname = updatedUser.surname ? updatedUser.surname : user.surname;
  
          res.json({ msg: 'User updated', user });
        }
      });
    } else {
      res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
    }
  });

// Delete user
router.delete('/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
  
    if (user) {
      res.json({
          msg: 'User deleted',
          users: users.filter(user => user.id !== parseInt(req.params.id))
      })
    } else {
      res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
    }
  });

module.exports = router;
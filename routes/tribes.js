var express = require("express"),
  router = express.Router(),
  knex = require('../db/knex'),
  jwt = require('jsonwebtoken');
  require('dotenv').load();

router.get('/', (req, res) => {
  knex('tribes').select()
  .then( (data) => {
    res.json(data)
  })
});

router.get('/:id', (req, res) => {
  var token = jwt.decode(req.headers.authorization.split(' ')[1], process.env.SECRET);
  // Get my all users in my tribe
  knex('tribes')
  .where('id', token.user.tribe_id)
  .then( (data) => {
    console.log(data);
  })
});

router.get('/join/:id', (req, res) => {
  //Join tribe
});

router.get('/leave/:id', (req, res) => {
  //Leave tribe
});

router.delete('/delete', (req, res) => {
  // Authentice as tribe user and delete tribe
})



module.exports = router;

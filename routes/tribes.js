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
  .where('id', req.params.id)
  .then( (data) => {
    console.log(data);
    res.send(data)
  })
});

router.post('/join/:id', (req, res) => {
  if (req.headers.authorization){
    var token = jwt.decode(req.headers.authorization.split(' ')[1], process.env.SECRET);
    // console.log(token);
    //Join tribe
    knex('users')
    .update({tribe_id: req.params.id})
    .where('id', token.user.id)
    .returning('*')
    .then( (data) => {
      knex('tribes')
      .select()
      .where('id', data[0].tribe_id)
      .then( (data) => {
        res.send(data)
      })
    })
  } else {
    res.send('Whoops')
  }
});

router.get('/leave/:id', (req, res) => {
  //Leave tribe
  
});

router.delete('/delete', (req, res) => {
  // Authentice as tribe user and delete tribe
})



module.exports = router;

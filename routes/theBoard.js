var express = require('express');
    router = express.Router(),
    knex = require('../db/knex.js'),
    jwt = require('jsonwebtoken');
    require('dotenv').load();


router.get('/posts', (req,res) => {
  knex('posts')
  .orderBy('points', 'desc')
  .limit(16)
  .then(function (data) {
    res.json(data)
  })
})


router.post('/upvote/:type/:id', (req, res) => {
  var token = req.headers.authorization.split(' ')[1];
  // console.log(req.params.type, req.params.id);
  if (jwt.verify(token, process.env.SECRET)){
    // Knex query to upvote
    knex.raw('UPDATE ' + req.params.type + ' SET points = points+1 WHERE id = ' + req.params.id)
    .then((data)=>{
      console.log('Upvoted');
      res.send(null)
    });
  }
});


router.post('/downvote/:type/:id', (req, res) => {
  var token = req.headers.authorization.split(' ')[1];
  if (jwt.verify(token, process.env.SECRET)){
    // Knex query to downvote
    knex.raw('UPDATE ' + req.params.type + ' SET points = points-1 WHERE id = ' + req.params.id)
    .then((data)=>{
      console.log('Downvoted');
      res.send(null)
    });
  }
});




module.exports = router;

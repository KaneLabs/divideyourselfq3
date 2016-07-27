var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.post('/signin', (req, res) => {
  knex('users')
    .where({email: req.body.email})
    .orWhere({username: req.body.email})
    .first()
    .then(user => {
      // console.log("USER: ", user);
      // If user doesn't exist, or password doesnt match, return false token.
      if(!user) return res.json({token: false, message: "no user"});
      if(!bcrypt.compareSync(req.body.password, user.password, 8)) return res.json({token: false, message: "wrong pw"});
      // log user in with JWT
      token = jwt.sign({user: user}, process.env.SECRET);
      // console.log('user authorized: ', token);
      res.json({token: token, user: user});
    })
    .catch(err => {
      console.log(err);
      res.json({token: false, message: "knex error"});
    });
});

router.post('/signup', (req, res) => {
  knex('users')
    .where('email', req.body.email)
    .orWhere('username', req.body.username)
    .first()
    .then(data => {
      if(data) return res.json({token: false, message: "user exists"});
      var hashedPassword = bcrypt.hashSync(req.body.password,8);
      knex('users')
        .insert({
          email: req.body.email,
          username: req.body.username,
          password: hashedPassword,
        })
        .returning('*')
        .then(user => {
          // console.log("USER: ", user);
          // log user in with JWT
          token = jwt.sign({user: user[0]}, process.env.SECRET);
          res.json({token: token, user: user[0]});
        });
    });
});

router.get('/:id', (req, res) => {
  knex('posts')
  .where('user_id', req.params.id)
  .then( data => {
    res.json(data)
  })
  // Save this for other user's profiles
  // knex.raw('SELECT COALESCE (users.id, posts.user_id) AS user_id, users.username, users.firstName, users.lastName, users.profile_url, posts.title, posts.body, posts.media_url FROM users LEFT JOIN posts ON users.id = posts.user_id WHERE users.id = ' + req.params.id).then(function(data){
  //   console.log(data.rows);
  //   res.json(data.rows)
  // })
});


module.exports = router;

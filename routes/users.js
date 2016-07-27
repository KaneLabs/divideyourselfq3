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
        .then(user => {
          // console.log("USER: ", user);
          // log user in with JWT
          token = jwt.sign({user: user}, process.env.SECRET);
          res.json({token: token, user: {name: user.username, profile: user.profile_url}});
        });
    });
});

router.get('/:id', (req, res) => {
  if (req.headers.authorization){
    var decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET);
    if (decoded.user.id == req.params.id){
      knex('users')
      // .innerJoin('users_favorites', 'users.id', 'users_favorites.user_id')
      .innerJoin('posts', 'users.id', 'posts.user_id')
      .where('users.id', req.params.id)
      .then(data => {
        // console.log("This user's data: ", data);
        res.json(data)
      });
      return
    }
  }
  knex('users')
  .where('users.id', req.params.id)
  .then(data => {
    // console.log("Other users data: ", data);
    res.json(data);
  })
});


module.exports = router;

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
      // If user doesn't exist, or password doesnt match, return false token.
      if(!user || !bcrypt.compareSync(req.body.password, user.password, 8)) return res.json({token: false});
      // log user in with JWT
      token = jwt.sign({user: user}, process.env.SECRET);
      console.log('user authorized');
      res.json({token: token, user: {name: user.username, profile: user.profile_url}});
    })
    .catch(err => {
      console.log(err);
      res.json({token: false});
    });
});

router.post('/signup', (req, res) => {
  knex('users')
    .where('email', req.body.email)
    .orWhere('username', req.body.username)
    .first()
    .then(data => {
      if(data) return res.json({token: false});
      var hashedPassword = bcrypt.hashSync(req.body.password,8);
      console.log(hashedPassword);
      knex('users')
        .insert({
          email: req.body.email,
          username: req.body.email,
          password: hashedPassword,
        })
        .then(data => {
          console.log(data);
          res.json({token: true});
        });
    });
});

module.exports = router;

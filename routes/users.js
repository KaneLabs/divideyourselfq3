var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signin', function (req, res, next) {
  knex('users')
    .where({
      email: req.body.email
    })
    .first()
    .then(function(user) {
      if (user === undefined) {
        // handle: user not authorized
        res.json('not a user');
      } else {
        // check password
        if (bcrypt.compareSync(req.body.password,user.password,8)) {
          // log user in with JWT
          console.log('user authorized');
          res.json('user authorized');
        } else {
          // handle incorrect login password
          console.log('user NOT authorized');
          res.json('user NOT authorized');
        };
      }
    })
    .catch(function(err) {
      console.log(err);
      res.json('not authorized user');
    });
});

router.post('/signup', function(req, res, next) {
  knex('users')
    .where({
      email: req.body.email
    })
    .first()
    .then(function(data) {
      if (data) {
        // email already exists in DB
      } else {
        // sign user up
        var hashedPassword = bcrypt.hashSync(req.body.password,8);
        console.log(hashedPassword);
        knex('users')
          .insert({
            email: req.body.email,
            username: req.body.email,
            password: hashedPassword,
          })
          .then(function(data) {
            console.log(data);
          });
      };
    });
});

module.exports = router;

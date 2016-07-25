var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signin', function (req, res, next) {
  knex('users')
    .where({
      email: req.body.email,
      password: req.body.password
    })
    .first()
    .then(function(user) {
      if (user === undefined) {
        // handle user not authorized
        console.log('not a user');
      } else {
        // log user in with JWT
        console.log('a user');
        res.json(user);
      }
    })
    .catch(function(err) {
      console.log(err);
      res.json('not authorized user');
    });
});

module.exports = router;

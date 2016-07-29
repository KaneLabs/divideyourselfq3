var express = require("express"),
  router = express.Router(),
  knex = require('../db/knex'),
  jwt = require('jsonwebtoken');

router.get('/:id', (req, res) => {
  knex('users_friends')
  .where('user_id', req.params.id)

  .then((data) => {

    // knex("users")
    //   .where()
    //   .select("username", "id", "profile_url")

    res.send(data)
  });
});

router.post('/:id/add', (req, res) => {
  var user = jwt.decode(req.headers.authorization.split(' ')[1]);
  var newFriend;
  knex('users')
  .where('id', req.params.id)
  .then((data) => {
    newFriend = data[0]
    knex('users_friends')
    .insert({
      user_id: user.user.id,
      friend_id: req.params.id,
      friend_firstname: newFriend.firstname,
      profile_url: newFriend.profile_url
    })
    .returning('*')
    .then((inserted) => {
      console.log("ADDED: ", inserted);
      knex('users_friends')
        .insert({
          user_id: req.params.id,
          friend_id: user.user.id,
          friend_firstname: user.user.firstname,
          profile_url: user.user.profile_url
        })
        .then( data => {
          console.log(data);
          res.send(data[0]);
        })
    })
  })
});


module.exports = router;

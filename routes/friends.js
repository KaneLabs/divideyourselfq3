var express = require("express"),
  router = express.Router(),
  knex = require('../db/knex');

router.get('/:id', (req, res) => {
  knex('users_friends')
  .where('user_id', req.params.id)
  .then((data) => {
    console.log(data);
    res.send(data)
  })
})

router.post('/:id/add', (req, res) => {
  knex('users')
  .where('id', req.params.id)
  .then((data) => {
    console.log(data);
    res.send(data);
  })
});
//   knex('users_friends')
//   .insert('')
// })


module.exports = router;

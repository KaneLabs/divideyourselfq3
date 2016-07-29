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
})


module.exports = router;

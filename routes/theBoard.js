var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');

router.post('/upvote/:type/:id', (req, res) => {
  // Knex query to upvote
  knex.raw('UPDATE ' + req.params.type + ' SET points = points + 1 WHERE id = ' + req.params.id);
});


router.post('/downvote/:type/:id', (req, res) => {
  // Knex query to downvote
  knex.raw('UPDATE ' + req.params.type + ' SET points = points - 1 WHERE id = ' + req.params.id);
});

module.exports = router;

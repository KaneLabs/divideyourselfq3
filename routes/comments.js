var express = require("express"),
  router = express.Router(),
  knex = require('../db/knex');

router.post("/create", (req, res) => {
  knex("comments")
    .insert({
      user_id: req.body.user_id,
      post_id: req.body.post_id,
      comment: req.body.comment,
      timestamp: req.body.timestamp
    })
    .then(() => res.send(null));
});

router.post("/update", (req, res) => {
  // check if user has permission
  knex("comments")
    .where("id", req.body.id)
    .update(req.body)
});

router.post("/delete", (req, res) => {
  // check if user has permission
  knex("comments")
    .where("id", req.body.id)
    .del();
});

module.exports = router;

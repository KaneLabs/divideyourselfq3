var express = require("express"),
  router = express.Router(),
  knex = require('../db/knex');

router.post("/create", (req, res) => {
  knex('posts')
    .insert({
      user_id: req.body.user_id,
      title: req.body.title,
      body: req.body.body,
      media_url: req.body.media_url,
      lat: req.body.lat,
      lng: req.body.lng,
      type: 'board',
      timestamp: req.body.timestamp
    })
    .then(() => res.send(null))
})

router.post("/update", (req, res) => {
  // check if user has permission
  knex("posts")
    .where("id", req.body.id)
    .update(req.body)
});

router.post("/delete", (req, res) => {
  // check if user has permission
  knex("posts")
    .where("id", req.body.id)
    .del();
});

module.exports = router;

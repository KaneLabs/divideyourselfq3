var express = require("express"),
  router = express.Router(),
  knex = require('../db/knex'),
  jwt = require("jsonwebtoken");

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
  if(!req.body.post || !req.body.token) return res.json({success: false, message: "no token or id"});
  jwt.verify(req.body.token, process.env.SECRET, (err, data) => {
    if(err) return res.json({success: false, message: "error parsing token"});
    if(data.user.id !== req.body.post.user_id) return res.json({success: false, message: "wrong user"});
    knex("posts")
      .where("id", req.body.post.id)
      .del()
      .then(() => res.json({success: true}));
  });
});

module.exports = router;

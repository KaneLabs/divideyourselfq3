var express = require("express"),
  router = express.Router(),
  knex = require('../db/knex');

var Magic = (num, cb) => {
  var args = [];
  return data => {
    args.push(data);
    if(args.length === num) return cb(args);
  }
};

router.post("/locations", (req, res) => {
  var obj = req.body;
  knex("posts")
    .where("lat", ">", obj.minLat)
    .andWhere("lat", "<", obj.maxLat)
    .andWhere("lng", ">", obj.minLng)
    .andWhere("lng", "<", obj.maxLng)
    .join("users", "posts.user_id", "users.id")
    .then(data => {
      if(!data.length) res.json({message: "no posts in area"});

      // Get all ratings for all posts.
      var magic = Magic(data.length, all => {
        data.map(e => {
          e.votes = all.find(votes => votes.id === e.id);
          return e;
        });
        res.json({posts: data});
      });

      data.forEach(post => {
        knex("posts_votes")
          .where("post_id", post.id)
          .select()
          .then(votes => magic({id: post.id, votes: votes}));
      });

    });
});

module.exports = router;

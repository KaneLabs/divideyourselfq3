var express = require("express"),
  router = express.Router(),
  knex = require('../db/knex');

var Magic = (number, callback) => {
  var argumentArray = [];
  return data => {
    argumentArray.push(data);
    if(argumentArray.length === number) return callback(argumentArray);
  }
};

router.post("/comments", (req, res) => {
  knex("comments")
    .insert({
      user_id: req.body.user_id,
      post_id: req.body.post_id,
      comment: req.body.comment,
      timestamp: req.body.timestamp
    })
    .then(() => res.send(null));
})

router.post("/posts", (req, res) => {
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

router.post("/locations", (req, res) => {
  var obj = req.body;
  knex("posts")
    .select(['posts.*', 'users.id as user_id', "users.username as username"])
    .leftJoin('users', 'posts.user_id', 'users.id')
    .where("lat", ">", obj.minLat)
    .andWhere("lat", "<", obj.maxLat)
    .andWhere("lng", ">", obj.minLng)
    .andWhere("lng", "<", obj.maxLng)
    .then(data => {
      if(!data.length) res.json({message: "no posts in area"});

      // Get all comments for all posts.
      var magic = Magic(data.length, () => {
        res.json({posts: data});
      });

      data.forEach(post => {
        knex("comments")
          .select(["comments.*", "users.id as user_id", "users.username as username", "users.profile_url as profile_url"])
          .leftJoin("users", "comments.user_id", "users.id")
          .where("post_id", post.id)
          .then(comments => {
            post.comments = comments;
            magic();
          });
        // knex("posts_votes")
        //   .select(["posts_votes.*", "users.id as user_id"])
        //   .leftJoin("users", "comments.user_id", "users.id")
        //   .where("post_id", post.id)
        //   .then(votes => {
        //     post.votes = votes;
        //     magic();
        //   });
      });
    });
});

module.exports = router;

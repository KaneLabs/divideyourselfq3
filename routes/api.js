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

      // Get all comments and ratings for all posts.
      var magic = Magic(data.length, () => {
        console.log(data);
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

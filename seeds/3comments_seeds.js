exports.seed = (knex, Promise) => {
  return knex('comments').del()
    .then( () => {
      return Promise.all([
        knex("comments").insert({
          user_id: 2,
          post_id: 1,
          comment: "this is cool",
          timestamp: 1469469344841,
          points: 2
        }),
        knex("comments").insert({
          user_id: 1,
          post_id: 1,
          comment: "thanks dude",
          timestamp: 1469469394841,
          points: 22
        }),
        knex("comments").insert({
          user_id: 2,
          post_id: 1,
          comment: "np just testing",
          timestamp: 1469469424841,
          points: 23
        }),
        knex("comments").insert({
          user_id: 3,
          post_id: 2,
          comment: "u suck",
          timestamp: 1469412403124,
          points: -2
        }),
        knex("comments").insert({
          user_id: 2,
          post_id: 2,
          comment: "rude af",
          timestamp: 1469412463124,
          points: 233
        }),
        knex("comments").insert({
          user_id: 2,
          post_id: 6,
          comment: "this is cool",
          timestamp: 1469469344841,
          points: 2
        }),
        knex("comments").insert({
          user_id: 2,
          post_id: 5,
          comment: "this is cool",
          timestamp: 1469469344841,
          points: 1
        })
      ]);
    });
};

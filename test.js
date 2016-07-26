var knex = require('./db/knex');

knex("posts")
  .join("users", "posts.user_id", "users.id")
  .select()
  .then(data => {
    console.log(data[0]);
  });

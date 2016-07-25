
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts_votes',function(table) {
    table.increments();
    table.integer('post_id').references('id').inTable('posts');
    table.integer('user_id').references('id').inTable('users');
    table.integer('rating');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts_votes');
};

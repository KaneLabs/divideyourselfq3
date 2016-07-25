
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments_votes',function(table) {
    table.increments();
    table.integer('comment_id').references('id').inTable('comments');
    table.integer('rating');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments_votes');
};

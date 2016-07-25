
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(table) {
    table.increments();
    table.integer('user_id').notNullable().references('id').inTable('users');
    table.string('title');
    table.string('type');
    table.text('body');
    table.text('media_url');
    table.integer('respect');
    table.decimal('lat', 15, 3);
    table.decimal('lng', 15, 3);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};

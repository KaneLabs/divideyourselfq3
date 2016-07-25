
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(table) {
    table.increments();
    table.integer('user_id').notNullable().references('id').inTable('users');
    table.string('title').notNullable();
    table.string('type');
    table.text('body').notNullable();
    table.text('media_url').notNullable();
    table.integer('respect');
    table.decimal('lat', 15, 3).notNullable();
    table.decimal('lng', 15, 3).notNullable();
    table.bigInteger('timestamp').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};

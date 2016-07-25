
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users',function(table) {
    table.increments();
    table.string('email').unique();
    table.string('username').unique();
    table.string('password').notNullable();
    table.string('firstname');
    table.string('lastname');
    table.string('image_url').defaultTo('https://s3-us-west-2.amazonaws.com/divideyourself.com/images/1divide-logo.svg');
    // Reference to tribes table
    // table.integer('tribe_id').references('id').inTable('tribe');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};

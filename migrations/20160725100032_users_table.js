
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users',function(table) {
    table.increments();
    table.integer('tribe_id').references('id').inTable('tribe');
    table.string('email').unique().notNullable();
    table.string('username').unique().notNullable();
    table.string('password').notNullable();
    table.boolean('isGod').defaultTo(false);
    table.string('firstname');
    table.string('lastname');
    table.string('profile_url').defaultTo('https://s3-us-west-2.amazonaws.com/divideyourself.com/images/1divide-logo.svg');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};


exports.up = function(knex, Promise) {
  return knex.schema.createTable('tribes', function(table) {
    table.increments();
    table.string('name').unique().notNullable();
    table.text('description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tribes');
};

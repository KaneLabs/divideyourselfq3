
exports.up = function(knex, Promise) {
  return Promise.all([
    // Create 'users' table
    knex.schema.createTable('users',function(table) {
      table.increments();
      table.integer('tribe_id').references('id').inTable('tribes');
      table.string('email').unique().notNullable();
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
      table.boolean('isGod').defaultTo(false);
      table.string('firstname');
      table.string('lastname');
      table.string('profile_url').defaultTo('https://s3-us-west-2.amazonaws.com/divideyourself.com/images/1divide-logo.svg');
    }),
    // Create 'posts' table
    knex.schema.createTable('posts', function(table) {
      table.increments();
      table.integer('user_id').notNullable().references('id').inTable('users');
      table.string('title').notNullable();
      table.string('type');
      table.text('body').notNullable();
      table.text('media_url').notNullable();
      table.decimal('lat', 15, 10).notNullable();
      table.decimal('lng', 15, 10).notNullable();
      table.bigInteger('timestamp').notNullable();
      table.integer('points').defaultTo(0);
    }),
    // Create 'comments' table
    knex.schema.createTable('comments', function(table) {
      table.increments();
      table.integer('user_id').notNullable().references('id').inTable('users');
      table.integer('post_id').notNullable().references('id').inTable('posts');
      table.text('comment').notNullable();
      table.bigInteger('timestamp').notNullable();
      table.integer('points').defaultTo(0);
    }),
    // Create 'tribes' table
    knex.schema.createTable('tribes', function(table) {
      table.increments();
      table.string('name').unique().notNullable();
      table.text('description');
    }),
    // Create 'posts_votes' table
    // knex.schema.createTable('posts_votes',function(table) {
    //   table.increments();
    //   table.integer('post_id').references('id').inTable('posts');
    //   table.integer('user_id').references('id').inTable('users');
    //   table.integer('rating');
    // }),
    // Create 'comments_votes' table
    // knex.schema.createTable('comments_votes',function(table) {
    //   table.increments();
    //   table.integer('comment_id').references('id').inTable('comments');
    //   table.integer('rating');
    // }),
    // Create 'users_favorites' table
    knex.schema.createTable('users_favorites', function(table){
      table.increments();
      table.integer('post_id').references('id').inTable('posts');
      table.integer('user_id').references('id').inTable('users');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.raw('drop table if exists users cascade'),
    knex.raw('drop table if exists posts cascade'),
    knex.raw('drop table if exists comments cascade'),
    knex.raw('drop table if exists tribes cascade'),
    knex.raw('drop table if exists posts_votes cascade'),
    knex.raw('drop table if exists comments_votes cascade'),
    knex.raw('drop table if exists users_favorites cascade')
  ]);
};

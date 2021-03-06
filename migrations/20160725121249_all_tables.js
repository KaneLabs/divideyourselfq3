
exports.up = (knex, Promise) => {
  return Promise.all([
    // Create 'users' table
    knex.schema.createTable('users', (table) => {
      table.increments();
      table.integer('tribe_id');
      table.string('email').unique().notNullable();
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
      table.boolean('isGod').defaultTo(false);
      table.string('firstname');
      table.string('lastname');
      table.string('profile_url').defaultTo('https://s3-us-west-2.amazonaws.com/divideyourself.com/images/1divide-logo.svg');
    }),
    // Create 'posts' table
    knex.schema.createTable('posts', (table) => {
      table.increments();
      table.integer('user_id').notNullable().references('id').inTable('users').onDelete("CASCADE");
      table.string('title').notNullable();
      table.string('type');
      table.text('body').notNullable();
      table.text('media_url').notNullable();
      table.decimal('lat', 15, 10).notNullable();
      table.decimal('lng', 15, 10).notNullable();
      table.bigInteger('timestamp').notNullable();
      table.integer('points').defaultTo(1);
    }),
    // Create 'comments' table
    knex.schema.createTable('comments', (table) => {
      table.increments();
      table.integer('user_id').notNullable().references('id').inTable('users').onDelete("CASCADE");
      table.integer('post_id').notNullable().references('id').inTable('posts').onDelete("CASCADE");
      table.text('comment').notNullable();
      table.bigInteger('timestamp').notNullable();
      table.integer('points').defaultTo(1);
    }),
    // Create 'tribes' table
    knex.schema.createTable('tribes', (table) => {
      table.increments();
      table.string('name').unique().notNullable();
      table.text('description');
      table.string('leader');
    }),
    // Create 'users_favorites' table
    knex.schema.createTable('users_favorites', (table) => {
      table.increments();
      table.integer('post_id').references('id').inTable('posts').onDelete('CASCADE');
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    }),
    knex.schema.createTable('users_friends', (table) => {
      table.increments();
      table.integer('user_id');
      table.integer('friend_id');
      table.string('friend_firstname');
      table.string('profile_url');
    })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.raw('drop table if exists users cascade'),
    knex.raw('drop table if exists posts cascade'),
    knex.raw('drop table if exists comments cascade'),
    knex.raw('drop table if exists tribes cascade'),
    knex.raw('drop table if exists posts_votes cascade'),
    knex.raw('drop table if exists comments_votes cascade'),
    knex.raw('drop table if exists users_favorites cascade'),
    knex.raw('drop table if exists users_friends cascade')
  ]);
};

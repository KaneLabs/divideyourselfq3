
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          id: 1,
          username: 'ryan',
          password: 'ryan',
          email: 'ryan@divideyourself.com'
        }),
        knex('users').insert({
          id: 2,
          username: 'sean',
          password: 'sean',
          email: 'sean@divideyourself.com'
        }),
        knex('users').insert({
          id: 3,
          username: 'brendan',
          password: 'brendan',
          email: 'brendan@divideyourself.com'
        }),
        knex('users').insert({
          id: 4,
          username: 'nathan',
          password: 'nathan',
          email: 'nathan@divideyourself.com'
        }),
        knex('users').insert({
          id: 5,
          username: 'conor',
          password: 'conor',
          email: 'conor@divideyourself.com'
        }),
        knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 6;')
      ]);
    });
};

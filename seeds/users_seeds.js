
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          username: 'ryan',
          password: 'ryan',
          email: 'ryan@divideyourself.com'
        }),
        knex('users').insert({
          username: 'sean',
          password: 'sean',
          email: 'sean@divideyourself.com'
        }),
        knex('users').insert({
          username: 'brendan',
          password: 'brendan',
          email: 'brendan@divideyourself.com'
        }),
        knex('users').insert({
          username: 'nathan',
          password: 'nathan',
          email: 'nathan@divideyourself.com'
        }),
        knex('users').insert({
          username: 'conor',
          password: 'conor',
          email: 'conor@divideyourself.com'
        })
      ]);
    });
};

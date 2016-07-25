
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          username: 'ryan',
          password: 'ryan'
        }),
        knex('users').insert({
          username: 'sean',
          password: 'sean'
        }),
        knex('users').insert({
          username: 'brendan',
          password: 'brendan'
        }),
        knex('users').insert({
          username: 'nathan',
          password: 'nathan'
        }),
        knex('users').insert({
          username: 'conor',
          password: 'conor'
        })
      ]);
    });
};

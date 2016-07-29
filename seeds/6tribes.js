
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tribes').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('tribes').insert({name: 'g[23]', description: 'Only dope shit', leader: 'Ryan'}),
        knex('tribes').insert({name: 'Climbers', description: 'Ape stuff', leader: 'Diddy Kong'}),
        knex('tribes').insert({name: 'Boaters', description: 'Duck stuff', leader: 'Donald Duck'}),
        knex('tribes').insert({name: 'Runners', description: 'Ran so far away.', leader: 'Dave'})
      ]);
    });
};


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tribes').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('tribes').insert({name: '[g23]', description: 'Only dope shit'}),
        knex('tribes').insert({name: 'Climbers', description: 'Ape stuff'}),
        knex('tribes').insert({name: 'Boaters', description: 'Duck stuff'}),
        knex('tribes').insert({name: 'Runners', description: 'Can\'t run away from our sadness'})
      ]);
    });
};

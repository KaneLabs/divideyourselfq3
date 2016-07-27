
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_favorites').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users_favorites').insert({user_id: 2, post_id: 1}),
        knex('users_favorites').insert({user_id: 2, post_id: 2}),
        knex('users_favorites').insert({user_id: 2, post_id: 3}),
        knex('users_favorites').insert({user_id: 1, post_id: 1}),
        knex('users_favorites').insert({user_id: 1, post_id: 3}),
        knex('users_favorites').insert({user_id: 3, post_id: 3}),
      ]);
    });
};

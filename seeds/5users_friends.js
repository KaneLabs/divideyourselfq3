
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_friends').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users_friends').insert({user_id: 1, friend_id: 3}),
        knex('users_friends').insert({user_id: 2, friend_id: 3}),
        knex('users_friends').insert({user_id: 1, friend_id: 3}),
        knex('users_friends').insert({user_id: 3, friend_id: 1}),
        knex('users_friends').insert({user_id: 3, friend_id: 2}),
        knex('users_friends').insert({user_id: 3, friend_id: 5}),
      ]);
    });
};

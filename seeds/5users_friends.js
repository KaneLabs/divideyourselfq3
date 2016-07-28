
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_friends').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users_friends').insert({user_id: 1, friend_id: 3, friend_name: 'Brendan', friend_img: 'https://s3-us-west-2.amazonaws.com/divideyourself.com/images/1divide-logo.svg'}),
        knex('users_friends').insert({user_id: 2, friend_id: 3, friend_name: 'Brendan', friend_img: 'https://s3-us-west-2.amazonaws.com/divideyourself.com/images/1divide-logo.svg'}),
        knex('users_friends').insert({user_id: 1, friend_id: 3, friend_name: 'Brendan', friend_img: 'https://s3-us-west-2.amazonaws.com/divideyourself.com/images/1divide-logo.svg'}),
        knex('users_friends').insert({user_id: 3, friend_id: 1, friend_name: 'Ryan', friend_img: 'https://s3-us-west-2.amazonaws.com/divideyourself.com/images/1divide-logo.svg'}),
        knex('users_friends').insert({user_id: 3, friend_id: 2, friend_name: 'Sean', friend_img: 'https://s3-us-west-2.amazonaws.com/divideyourself.com/images/1divide-logo.svg'}),
        knex('users_friends').insert({user_id: 3, friend_id: 5, friend_name: 'Conor', friend_img: 'https://s3-us-west-2.amazonaws.com/divideyourself.com/images/1divide-logo.svg'}),
      ]);
    });
};

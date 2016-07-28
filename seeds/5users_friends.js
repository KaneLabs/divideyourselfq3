
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users_friends').del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('users_friends').insert({user_id: 1, friend_id: 3, friend_username: 'Brendan', profile_url: 'https://s3-us-west-2.amazonaws.com/divideyourself.com/images/1divide-logo.svg'}),
        knex('users_friends').insert({user_id: 2, friend_id: 3, friend_username: 'Brendan', profile_url: 'https://s3-us-west-2.amazonaws.com/divideyourself.com/images/1divide-logo.svg'}),
        knex('users_friends').insert({user_id: 1, friend_id: 3, friend_username: 'Brendan', profile_url: 'https://s3-us-west-2.amazonaws.com/divideyourself.com/images/1divide-logo.svg'}),
        knex('users_friends').insert({user_id: 3, friend_id: 1, friend_username: 'Ryan', profile_url: 'https://s3-us-west-2.amazonaws.com/divideyourself.com/images/1divide-logo.svg'}),
        knex('users_friends').insert({user_id: 3, friend_id: 2, friend_username: 'Sean', profile_url: 'https://s3-us-west-2.amazonaws.com/divideyourself.com/images/1divide-logo.svg'}),
        knex('users_friends').insert({user_id: 3, friend_id: 5, friend_username: 'Conor', profile_url: 'https://s3-us-west-2.amazonaws.com/divideyourself.com/images/1divide-logo.svg'}),
      ]);
    });
};

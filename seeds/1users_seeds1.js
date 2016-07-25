
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          id: 1,
          username: 'ryan',
          password: '$2a$08$ePsINZIS6CnAl5pPtPBYlepuCDrGDgYtF3U0./Ye3p9E716POnnAO',
          email: 'ryan@divideyourself.com'
        }),
        knex('users').insert({
          id: 2,
          username: 'sean',
          password: '$2a$08$Z2jkL3Gf3OKQZ.LjVqmYuuXDIcpDEYLq8ActHhHVRszpRROJ2mw/.',
          email: 'sean@divideyourself.com'
        }),
        knex('users').insert({
          id: 3,
          username: 'brendan',
          password: '$2a$08$H6OXukenmQ6FVR78oTEBf.TfvRLi64TOgOAg8TEGTsceSowbTXABe',
          email: 'brendan@divideyourself.com'
        }),
        knex('users').insert({
          id: 4,
          username: 'nathan',
          password: '$2a$08$2SCgxOcwsmSMG4vNFOEiSu7uBOa15yzWGAICzHBXDK4YDqhTIUtwO',
          email: 'nathan@divideyourself.com'
        }),
        knex('users').insert({
          id: 5,
          username: 'conor',
          password: '$2a$08$KmvTUOmxgKVWEO13fsZ68uXiGupfJjY/5xOgLG.oo58Cg6LOowwAa',
          email: 'conor@divideyourself.com'
        }),
        knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 6;')
      ]);
    });
};

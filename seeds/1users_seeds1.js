
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then( () => {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          id: 1,
          firstname: 'Ryan',
          lastname: 'Kane',
          username: 'ryan',
          password: '$2a$08$ePsINZIS6CnAl5pPtPBYlepuCDrGDgYtF3U0./Ye3p9E716POnnAO',
          email: 'ryan@divideyourself.com',
          tribe_id: 1
        }),
        knex('users').insert({
          id: 2,
          firstname: 'Sean',
          lastname: 'Murray',
          username: 'sean',
          password: '$2a$08$Z2jkL3Gf3OKQZ.LjVqmYuuXDIcpDEYLq8ActHhHVRszpRROJ2mw/.',
          email: 'sean@divideyourself.com',
          tribe_id: 1
        }),
        knex('users').insert({
          id: 3,
          firstname: 'Brendan',
          lastname: 'Haskins',
          username: 'brendan',
          password: '$2a$08$H6OXukenmQ6FVR78oTEBf.TfvRLi64TOgOAg8TEGTsceSowbTXABe',
          email: 'brendan@divideyourself.com',
          tribe_id: 1
        }),
        knex('users').insert({
          id: 4,
          firstname: 'Nathan',
          lastname: 'Musselman',
          username: 'nathan',
          password: '$2a$08$2SCgxOcwsmSMG4vNFOEiSu7uBOa15yzWGAICzHBXDK4YDqhTIUtwO',
          email: 'nathan@divideyourself.com',
          tribe_id: 1
        }),
        knex('users').insert({
          id: 5,
          firstname: 'Conor',
          lastname: 'Kingston',
          username: 'conor',
          password: '$2a$08$KmvTUOmxgKVWEO13fsZ68uXiGupfJjY/5xOgLG.oo58Cg6LOowwAa',
          email: 'conor@divideyourself.com',
          tribe_id: 1
        }),
        knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 6;')
      ]);
    });
};

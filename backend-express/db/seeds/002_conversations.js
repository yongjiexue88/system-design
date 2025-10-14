exports.seed = async function seed(knex) {
  await knex('conversations').insert([
    {
      id: 'conv-demo',
      user_id: 'user-demo',
      title: 'Welcome conversation',
    },
  ])
}

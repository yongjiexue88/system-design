const bcrypt = require('bcryptjs')

exports.seed = async function seed(knex) {
  await knex('message_embeddings').del()
  await knex('messages').del()
  await knex('conversations').del()
  await knex('users').del()

  const passwordHash = await bcrypt.hash('Password123!', 10)

  await knex('users').insert([
    {
      id: 'user-demo',
      email: 'demo@example.com',
      password_hash: passwordHash,
    },
    {
      id: 'user-kaida',
      email: 'kaida@kaida.com',
      password_hash: await bcrypt.hash('aaaaaaaa', 10),
    },
    {
      id: 'use-x',
      email: 'x@x.com',
      password_hash: await bcrypt.hash('aaaaaaaa', 10),
    },
  ])
}

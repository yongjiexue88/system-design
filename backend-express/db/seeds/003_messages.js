exports.seed = async function seed(knex) {
  await knex('messages').insert([
    {
      id: 'msg-demo-1',
      conversation_id: 'conv-demo',
      role: 'assistant',
      content: "Welcome! You're connected to the local AI agent. Ask me anything to get started.",
    },
  ])
}

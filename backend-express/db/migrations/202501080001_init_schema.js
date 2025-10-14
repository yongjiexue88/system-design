exports.up = async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.string('id').primary()
    table.string('email').notNullable().unique()
    table.string('password_hash').notNullable()
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('conversations', (table) => {
    table.string('id').primary()
    table.string('user_id').notNullable()
    table.string('title').notNullable()
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())

    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
  })

  await knex.schema.createTable('messages', (table) => {
    table.string('id').primary()
    table.string('conversation_id').notNullable()
    table.string('role').notNullable()
    table.text('content').notNullable()
    table.json('metadata').defaultTo(null)
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())

    table.foreign('conversation_id').references('id').inTable('conversations').onDelete('CASCADE')
  })

  await knex.schema.createTable('message_embeddings', (table) => {
    table.string('id').primary()
    table.string('message_id').notNullable().unique()
    table.string('provider').notNullable()
    table.integer('dimensions').notNullable()
    table.text('embedding_json').notNullable()
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())

    table.foreign('message_id').references('id').inTable('messages').onDelete('CASCADE')
  })
}

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists('message_embeddings')
  await knex.schema.dropTableIfExists('messages')
  await knex.schema.dropTableIfExists('conversations')
  await knex.schema.dropTableIfExists('users')
}

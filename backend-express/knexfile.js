const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

const envFiles = [
  path.resolve(__dirname, '../.env'),
  path.resolve(__dirname, '.env'),
  path.resolve(__dirname, '.env.local'),
]

for (const filePath of envFiles) {
  if (fs.existsSync(filePath)) {
    dotenv.config({ path: filePath, override: true })
  }
}

const databasePath = process.env.SQLITE_PATH || path.resolve(__dirname, '../data/app.sqlite3')
const migrationsDirectory = path.resolve(__dirname, './db/migrations')
const seedsDirectory = path.resolve(__dirname, './db/seeds')

const defaultSsl = process.env.DATABASE_SSL === 'false' ? false : { rejectUnauthorized: false }

const buildPgConnection = () => {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error('DATABASE_URL is not configured for production environment')
  }

  try {
    const url = new URL(connectionString)
    const baseConfig = {
      host: url.hostname,
      port: url.port ? Number(url.port) : 5432,
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      database: url.pathname.replace(/^\//, ''),
      ssl: defaultSsl,
    }

    url.searchParams.forEach((value, key) => {
      if (key === 'schema') {
        baseConfig.searchPath = [value]
      }

      if (key === 'application_name') {
        baseConfig.application_name = value
      }
    })

    return baseConfig
  } catch (error) {
    console.warn('Failed to parse DATABASE_URL, falling back to connection string mode:', error)
    return {
      connectionString,
      ssl: defaultSsl,
    }
  }
}

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: databasePath,
    },
    useNullAsDefault: true,
    migrations: {
      directory: migrationsDirectory,
    },
    seeds: {
      directory: seedsDirectory,
    },
    pool: {
      afterCreate(conn, done) {
        conn.run('PRAGMA foreign_keys = ON', done)
      },
    },
  },

  production: {
    client: 'pg',
    connection: buildPgConnection(),
    migrations: {
      directory: migrationsDirectory,
    },
    seeds: {
      directory: seedsDirectory,
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
}

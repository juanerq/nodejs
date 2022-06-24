import dotenv from 'dotenv'
dotenv.config()

const config = {
  port: process.env.PORT,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_DATABASE
}

export default config

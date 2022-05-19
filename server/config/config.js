require('dotenv').config()

module.exports = {
  development: {
    username: "root", //process.env.DATABASE_USER,
    password: "", //process.env.DATABASE_PASSWORD,
    database: "tdquest", //process.env.DATABASE_NAME,
    host: "127.0.0.1", //process.env.DATABASE_HOST,
    dialect: "mysql",
    timezone: "+09:00",
  },
  test: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "mysql",
    timezone: "+09:00"
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "mysql",
    timezone: "+09:00"
  }
}

import 'dotenv/config'

export const config = {
  mysqlConfig: {
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306
  },
  mongoConfig: {
    port: process.env.MONGO_PORT || 27017,
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017'
  },
  serverConfig: {
    port: process.env.SERVER_PORT || 3000
  }
}

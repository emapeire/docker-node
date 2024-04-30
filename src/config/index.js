import 'dotenv/config'

export const config = {
  mysqlConfig: {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306
  },
  serverConfig: {
    port: process.env.PORT || 3000
  }
}

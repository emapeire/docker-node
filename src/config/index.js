import 'dotenv/config'

export const isDockerEnv = process.env.IS_DOCKER_ENV === 'true'

export const config = {
  serverConfig: {
    port: process.env.APP_PORT
  },
  mysqlConfig: {
    host: isDockerEnv ? process.env.MYSQL_CONTAINER_HOST : 'localhost',
    user: process.env.MYSQL_ROOT_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE
  },
  mongoConfig: {
    host: isDockerEnv ? process.env.MONGO_CONTAINER_HOST : 'localhost',
    port: process.env.MONGO_PORT,
    database: process.env.MONGO_DATABASE
  }
}

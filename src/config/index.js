import 'dotenv/config'

export const isDockerEnv = process.env.DOCKER_ENV === 'true'

export const config = {
  mysqlConfig: {
    host: isDockerEnv ? process.env.MYSQL_HOST : 'localhost'
  },
  mongoConfig: {
    host: isDockerEnv ? process.env.MONGO_HOST : 'localhost'
  }
}

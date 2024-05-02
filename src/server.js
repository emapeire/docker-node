import express from 'express'
import { v4 } from 'uuid'
import { connectMongo } from './mongo.js'
import { connectMySQL } from './mysql.js'
import { config } from './config/index.js'

async function server() {
  const { serverConfig } = config

  const app = express()

  const { mongoProduct } = await connectMongo()
  const { mysqlProduct } = await connectMySQL()

  app.get('/', async (_req, res) => {
    res.json({
      id: v4(),
      mongoProduct,
      mysqlProduct
    })
    console.log('✅ Server responded')
  })

  app.listen(serverConfig.port, () => {
    console.log(`✅ Server is running on http://localhost:${serverConfig.port}`)
  })
}

server().catch((err) => console.error(err))

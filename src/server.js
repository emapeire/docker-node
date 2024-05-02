import express from 'express'
import { v4 } from 'uuid'
import { connectMongo } from './mongo.js'
import { connectMySQL } from './mysql.js'

async function server() {
  const app = express()

  const { mongoProduct } = await connectMongo()
  const { mysqlProduct } = await connectMySQL()

  app.get('/', async (_req, res) => {
    res.json({
      id: v4(),
      mongoProduct,
      mysqlProduct
    })
  })

  app.listen(3000, () => {
    console.log('✅ Server is running on http://localhost:3000')
  })
}

server().catch((err) => console.error(err))

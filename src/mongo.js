import mongoose from 'mongoose'
import { config } from './config/index.js'

export const connectMongo = async () => {
  const { mongoConfig } = config

  const mongo = await mongoose.connect(
    `mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`
  )
  console.log(
    '✅ MongoDB connected, database:',
    mongo.connection.db.databaseName
  )

  await mongoose.connection.db.dropDatabase()

  const productSchema = new mongoose.Schema({
    name: String,
    price: Number
  })

  const productModel = mongoose.model('Product', productSchema)

  await productModel.deleteMany({})

  const mongoProduct = await productModel.create({
    name: 'Product 1',
    price: 100
  })

  return { mongoProduct }
}

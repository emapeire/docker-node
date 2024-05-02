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
  console.log('✅ MongoDB: Database dropped')

  const productSchema = new mongoose.Schema({
    name: String,
    price: Number
  })
  console.log('✅ MongoDB: Schema created')

  const productModel = mongoose.model('Product', productSchema)
  console.log('✅ MongoDB: Model created')

  await productModel.deleteMany({})
  console.log('✅ MongoDB: Collection dropped')

  const mongoProduct = await productModel.create({
    name: 'Product 1',
    price: 100
  })
  console.log('✅ MongoDB: Product inserted')

  return { mongoProduct }
}

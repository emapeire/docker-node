import mongoose from 'mongoose'

export const connectMongo = async () => {
  const mongo = await mongoose.connect('mongodb://localhost:27017/test')
  console.log(
    '✅ MongoDB connected, database:',
    mongo.connection.db.databaseName
  )

  await mongoose.connection.db.dropDatabase()

  const productSchema = new mongoose.Schema({
    name: String,
    price: Number
  })

  const productModel =
    mongoose.models.Product || mongoose.model('Product', productSchema)

  await productModel.deleteMany({})

  const mongoProduct = await productModel.create({
    name: 'Product 1',
    price: 100
  })

  return { mongoProduct }
}

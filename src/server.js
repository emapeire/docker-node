import express from 'express'
import mongoose from 'mongoose'
import { v4 } from 'uuid'

const app = express()

// Connect to MongoDB
const mongo = await mongoose.connect('mongodb://docker-mongo:27017/test')
console.log('MongoDB connected:', mongo.connection.db.databaseName)

// Define a schema
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number
})

// Define a model
const ProductModel = mongoose.model('Product', ProductSchema)

// Define the server configuration
app.get('/', async (_req, res) => {
  const newProduct = await ProductModel.create({
    name: 'Product 1',
    price: 100
  })
  res.json({
    id: v4(),
    newProduct
  })
})

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})

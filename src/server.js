import express from 'express'
import mongoose from 'mongoose'
import { createPool } from 'mysql2/promise'
import { v4 } from 'uuid'

const app = express()

// Connect to MongoDB
const mongo = await mongoose.connect('mongodb://localhost:27017/test')
console.log('✅ MongoDB connected, database:', mongo.connection.db.databaseName)

// Define a schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number
})

// Define a model
const productModel = mongoose.model('Product', productSchema)

// Connect to MySQL
const mysql = createPool({
  host: 'localhost',
  user: 'root',
  password: 'pass',
  port: 3306
})
console.log('✅ MySQL connected!')

// Create and select a database if not exists
await mysql.query('CREATE DATABASE IF NOT EXISTS test')
await mysql.query('USE test')

// Create a table if not exists
await mysql.query(`
  CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INT NOT NULL
  )
`)

// Insert a row if it does not exist
await mysql.query(
  `
  INSERT INTO products (name, price)
  SELECT * FROM (SELECT ? AS name, ? AS price) AS tmp
  WHERE NOT EXISTS (
    SELECT name FROM products WHERE name = ? AND price = ?
  ) LIMIT 1;
`,
  ['Product 2', 200, 'Product 2', 200]
)

// Define the server configuration
app.get('/', async (_req, res) => {
  const newProduct = await productModel.create({
    name: 'Product 1',
    price: 100
  })
  const [rows] = await mysql.query('SELECT * FROM products')
  res.json({
    id: v4(),
    mongodbProducts: newProduct,
    mysqlProducts: rows
  })
})

// Start the server
app.listen(3000, () => {
  console.log('✅ Server is running on http://localhost:3000')
})

import express from 'express'
import mongoose from 'mongoose'
import { createPool } from 'mysql2/promise'
import { v4 } from 'uuid'

// Create an Express app
const app = express()

async function server() {
  // Connect to MongoDB
  const mongo = await mongoose.connect('mongodb://localhost:27017/test')
  console.log(
    '✅ MongoDB connected, database:',
    mongo.connection.db.databaseName
  )

  // Define a schema
  const productSchema = new mongoose.Schema(
    {
      name: { type: String, unique: true }, // Ensure name is unique
      price: Number
    },
    {
      timestamps: true // Add timestamps to each document
    }
  )

  // Define a model
  const productModel = mongoose.model('Product', productSchema)

  // Connect to MySQL
  const mysql = createPool({
    host: 'localhost',
    user: 'root',
    password: 'pass',
    port: 3306,
    database: 'test'
  })
  console.log('✅ MySQL connected!')

  // Create a table if not exists
  await mysql.query(`
    CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price INT NOT NULL
    )
  `)

  // Define the server configuration
  app.get('/', async (_req, res) => {
    // Check for duplicate products before inserting
    const [existingProducts] = await mysql.query(
      `SELECT name, price, COUNT(*) as count FROM products GROUP BY name, price HAVING count > 1`
    )

    if (existingProducts.length > 0) {
      // If duplicates exist, truncate the table
      await mysql.query('TRUNCATE TABLE products')
      console.log('Duplicates detected and table truncated')
    }

    // Insert a new product into MySQL if it does not exist
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

    // Insert a new product into MongoDB using an upsert to avoid duplicates
    const mongodbProducts = await productModel.findOneAndUpdate(
      { name: 'Product 1', price: 100 },
      { $setOnInsert: { name: 'Product 1', price: 100 } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    // Select all products from MySQL
    const [mysqlProducts] = await mysql.query('SELECT * FROM products')

    // Return products from both databases
    res.json({
      id: v4(),
      mongodbProducts,
      mysqlProducts
    })
  })

  // Start the server
  app.listen(3000, () => {
    console.log('✅ Server is running on http://localhost:3000')
  })
}

server().catch((err) => console.error(err))

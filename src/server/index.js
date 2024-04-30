import express from 'express'
import mysql from 'mysql2/promise'
import mongoose from 'mongoose'
import { config } from '../config/index.js'

// Destructure the config object
const { mysqlConfig, serverConfig } = config

// Create an express app
const app = express()

// Connect to MySQL
const client = mysql.createPool({
  host: mysqlConfig.host,
  port: mysqlConfig.port,
  user: mysqlConfig.user,
  password: mysqlConfig.password
})

// A simple query to test the connection
const response = await client.query('SHOW DATABASES')
console.log(response)

// Connect to MongoDB
const mongo = await mongoose.connect('mongodb://localhost:27017/dockerdb')
console.log('MongoDB connected', mongo.connection.db.databaseName)

// Create a simple route
app.get('/', (_req, res) => {
  res.send('Hello, world!')
})

// Start the server
app.listen(serverConfig.port, () => {
  console.log(`Server is running on http://localhost:${serverConfig.port}`)
})

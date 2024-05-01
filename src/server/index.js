import express from 'express'
import mysql from 'mysql2/promise'
import mongoose from 'mongoose'
import { v4 } from 'uuid'
import { config } from '../config/index.js'

// Destructure the config object
const { mysqlConfig, mongoConfig, serverConfig } = config

// Create an express app
const app = express()

// Connect to MySQL
// const client = mysql.createPool({
//   host: mysqlConfig.host,
//   port: mysqlConfig.port,
//   user: mysqlConfig.user,
//   password: mysqlConfig.password
// })

// A simple query to test the connection
// const response = await client.query('SHOW DATABASES')
// console.log(response)

// Connect to MongoDB
// const mongo = await mongoose.connect(mongoConfig.uri)
// console.log('MongoDB connected:', mongo.connection.db.databaseName)

// Define a route and send a response with a unique id
app.get('/', (_req, res) => {
  res.json({
    id: v4()
  })
})

// Start the server
app.listen(serverConfig.port, () => {
  console.log(`Server is running on http://localhost:${serverConfig.port}`)
})

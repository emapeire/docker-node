import express from 'express'
import mysql from 'mysql2/promise'
import mongoose from 'mongoose'
import { config } from '../config/index.js'

const { user, password, host, port } = config

const app = express()

// Connect to MySQL
const client = mysql.createPool({
  host,
  port,
  user,
  password
})

// A simple query to test the connection
const response = await client.query('SHOW DATABASES')
console.log(response)

// Connect to MongoDB
const mongo = await mongoose.connect('mongodb://localhost:27017/dockerdb')
console.log('MongoDB connected', mongo.connection.db.databaseName)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})

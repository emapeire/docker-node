import { createPool } from 'mysql2/promise'

export const connectMySQL = async () => {
  const mysql = createPool({
    host: 'localhost' || 'docker-mysql',
    user: 'root',
    password: 'pass',
    port: 3306,
    database: 'test'
  })
  console.log('✅ MySQL connected')

  await mysql.query(
    `CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price INT NOT NULL
    )`
  )

  await mysql.query(
    `INSERT INTO products (name, price)
    SELECT * FROM (SELECT ? AS name, ? AS price) AS tmp
    WHERE NOT EXISTS (
      SELECT name FROM products WHERE name = ? AND price = ?
    ) LIMIT 1;`,
    ['Product 2', 200, 'Product 2', 200]
  )

  const [mysqlProduct] = await mysql.query('SELECT * FROM products')

  return { mysqlProduct }
}

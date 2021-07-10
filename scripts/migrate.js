const path = require('path');
const envPath = path.resolve(process.cwd(), '.env.local');
require('dotenv').config({ path: envPath });

async function getConnection() {
  const mysql = require('mysql2/promise');

  const db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
  });

  return db;
}

async function query(db, query) {
  try {
    const results = await db.execute(query);
    return results
  } catch (e) {
    throw Error(e.message);
  }
}

// Create the Lore database.
async function migrate() {
  const db = await getConnection();

  try {
    await query(db, `
      CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(255),
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        banner VARCHAR(255),
        summary TEXT,
        content TEXT,
        published BOOLEAN DEFAULT FALSE,
        published_at TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)
    console.log('migration ran successfully')
  } catch (e) {
    console.error(e);
    console.error('could not run migration, double check your credentials.');
    process.exit(1);
  }
}

migrate().then(() => process.exit());

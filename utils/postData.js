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

const getPost = async (id) => {
  const db = await getConnection();

  try {
    const [row, fields] = await db.execute(`
      SELECT * FROM posts
      WHERE id = ?`, [id]);
    
    return JSON.stringify(row[0]);
  } catch(e) {
    console.error(e);
    console.error(`Unable to load post with id: ${id}.`);
  }
};

const getPostBySlug = async (slug) => {
  const db = await getConnection();

  try {
    const [row, fields] = await db.execute(`
      SELECT * FROM posts
      WHERE slug = ?
      LIMIT 1`, [slug]);
    
    return JSON.stringify(row[0]);
  } catch(e) {
    console.error(e);
    console.error(`Unable to load post with slug: ${slug}.`);
  }
};

const getPosts = async () => {
  const db = await getConnection();

  try {
    const [rows, fields] = await db.execute(`
      SELECT * FROM posts
      ORDER BY published_at DESC;`
    );
    return rows;
  } catch(e) {
    console.error(e);
    console.error('Could not get posts.');
    return [];
  }
}

const getPublishedPosts = async () => {
  const db = await getConnection();

  try {
    const [rows, fields] = await db.execute(`
      SELECT * FROM posts
      WHERE published = 1
      ORDER BY published_at DESC;`
    );
    return rows;
  } catch(e) {
    console.error(e);
    console.error('Could not get posts.');
    return [];
  }
};

const createPost = async (userId, title, slug, banner, summary, content, published) => {
  const db = await getConnection();

  let publishedAt = null;
  if(published) {
    publishedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  try {
    await db.execute(`
      INSERT INTO posts (user_id, title, slug, banner, summary, content, published, published_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, title, slug, banner, summary, content, published, publishedAt]);
  } catch (e) {
    console.error(e);
    console.error('Could not create post.');
  }
};

const updatePost = async (id, title, slug, summary, content, published, publishedChanged) => {
  const db = await getConnection();

  try {
    let query = '';
    let publishedAt = null;
    if(publishedChanged) {
      query = `
        UPDATE posts
        SET title = ?, slug = ?, summary = ?, content = ?, published = ?, published_at = ?
        WHERE id = ?
      `;
      if(published) {
        publishedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
      }
  
    } else {
      query = `
        UPDATE posts
        SET title = ?, slug = ?, summary = ?, content = ?
        WHERE id = ?
      `;

      const results = await db.execute(query, [title, slug, summary, content, id]);
      return results;
    }
  } catch(e) {
    console.error(e);
    console.error('Could not update post.');
  }
}

const deletePost = async (id) => {
  const db = await getConnection();

  try {
    await db.execute(`
      DELETE FROM posts
      WHERE id = ?`, [id]);
  } catch(e) {
    console.error(e);
    console.error(`Unable to delete post with id: ${id}.`);
  }
}

module.exports = {
  getPosts,
  getPublishedPosts,
  getPost,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost
}
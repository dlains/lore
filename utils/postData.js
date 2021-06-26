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

const getPosts = async (published = true) => {
  const db = await getConnection();

  try {
    const [rows, fields] = await db.execute(`
      SELECT * FROM posts
      WHERE published = ?
      ORDER BY published_at DESC;`,
      [published]
    );
    return rows;
  } catch(e) {
    console.error(e);
    console.error('Could not insert post.');
    return [];
  }
};

const createPost = async (userId, title, slug, summary, content, published) => {
  const db = await getConnection();

  let publishedAt = null;
  if(published) {
    publishedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  try {
    const results = await db.execute(`
      INSERT INTO posts (user_id, title, slug, summary, content, published, published_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, title, slug, summary, content, published, publishedAt]);
  } catch (e) {
    console.error(e);
    console.error('Could not insert post.');
  }
};

// Original Fauna code after this point.

const fauna = require('faunadb'), q = fauna.query;
const client = new fauna.Client({ secret: process.env.FAUNA_SECRET });

const getPost = async (id) => {
  const post = await client.query(q.Get(q.Ref(q.Collection('posts'), id)));
  post.id = post.ref.id;
  delete post.ref;
  return post;
};

const getPostBySlug = async (slug) => {
  const post = await client.query(q.Get(q.Match(q.Index('post_by_slug'), [slug])));
  post.id = post.ref.id;
  delete post.ref;
  return post;
};


const updatePost = async (id, title, slug, summary, content, published, publishedAt) => {
  if(published === false) {
    publishedAt = null;
  }

  return await client.query(q.Update(q.Ref(q.Collection('posts'), id), {
    data: { title, slug, summary, content, published, publishedAt }
  }));
}

const deletePost = async (id) => {
  return await client.query(q.Delete(q.Ref(q.Collection('posts'), id)));
}

module.exports = {
  getPosts,
  getPost,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost
}
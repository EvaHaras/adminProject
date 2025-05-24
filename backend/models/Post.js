
const db = require('../config/db');

const createPost = async ({ title, content, isAdminOnly, userId }) => {
  const [result] = await db.execute(
    'INSERT INTO posts (title, content, isAdminOnly, userId) VALUES (?, ?, ?, ?)',
    [title, content, isAdminOnly, userId]
  );
  return result.insertId;
};

const getAllPosts = async () => {
  const [rows] = await db.execute('SELECT * FROM posts');
  return rows;
};

const getPostById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM posts WHERE id = ?', [id]);
  return rows[0];
};

const updatePost = async (id, data) => {
  const { title, content } = data;
  await db.execute('UPDATE posts SET title = ?, content = ? WHERE id = ?', [
    title,
    content,
    id
  ]);
};

const deletePost = async (id) => {
  await db.execute('DELETE FROM posts WHERE id = ?', [id]);
};

const getAdminOnlyPosts = async () => {
  const [rows] = await db.execute(
    'SELECT posts.*, users.id as userId, users.username FROM posts JOIN users ON posts.userId = users.id WHERE isAdminOnly = true'
  );
  return rows;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getAdminOnlyPosts
};

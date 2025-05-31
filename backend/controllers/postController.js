

const pool = require('../config/db');

exports.getAllPosts = async (req, res) => {
  try {
    const [posts] = await pool.query(
      `SELECT posts.*, users.id AS userId, users.username, users.role
       FROM posts
       JOIN users ON posts.UserId = users.id`
    );
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts', error: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM posts WHERE id = ?`,
      [req.params.id]
    );

    const post = rows[0];
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.isAdminOnly && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied to admin-only post' });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error getting post', error: err.message });
  }
};

exports.createPost = async (req, res) => {
  const { title, content, isAdminOnly } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO posts (title, content, isAdminOnly, UserId) VALUES (?, ?, ?, ?)`,
      [title, content, isAdminOnly === 1 ? 1 : 0, req.user.id]
    );

    const [newPostRows] = await pool.query(
      `SELECT * FROM posts WHERE id = ?`,
      [result.insertId]
    );

    res.status(201).json(newPostRows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error creating post', error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  const { title, content, isAdminOnly } = req.body;
  try {
    const [rows] = await pool.query(
      `SELECT * FROM posts WHERE id = ?`,
      [req.params.id]
    );
    const post = rows[0];
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.UserId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not allowed to edit this post' });
    }

    await pool.query(
      `UPDATE posts SET title = ?, content = ?, isAdminOnly = ? WHERE id = ?`,
      [title, content, isAdminOnly ? 1 : 0, req.params.id]
    );

    const [updatedRows] = await pool.query(
      `SELECT * FROM posts WHERE id = ?`,
      [req.params.id]
    );

    res.json(updatedRows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error updating post', error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM posts WHERE id = ?`,
      [req.params.id]
    );
    const post = rows[0];
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.UserId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not allowed to delete this post' });
    }

    await pool.query(
      `DELETE FROM posts WHERE id = ?`,
      [req.params.id]
    );

    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting post', error: err.message });
  }
};

exports.adminOnlyPosts = async (req, res) => {
  try {
    const [posts] = await pool.query(
      `SELECT posts.*, users.id AS userId, users.username
       FROM posts
       JOIN users ON posts.UserId = users.id
       WHERE posts.isAdminOnly = 1`
    );
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching admin-only posts', error: err.message });
  }
};

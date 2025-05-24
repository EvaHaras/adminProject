
const db = require('../config/db');

const createUser = async ({ username, email, password, role }) => {
  const [result] = await db.execute(
    'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
    [username, email, password, role || 'user']
  );
  return result.insertId;
};

const findUserByEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

const findUserById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

const getAllUsers = async () => {
  const [rows] = await db.execute('SELECT id, username, email, role FROM users');
  return rows;
};

const updateUser = async (id, data) => {
  const { username, email, password, role } = data;
  await db.execute(
    'UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE id = ?',
    [username, email, password, role, id]
  );
};

const deleteUserById = async (id) => {
  await db.execute('DELETE FROM users WHERE id = ?', [id]);
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
  updateUser,
  deleteUserById
};


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    // Проверка, есть ли уже пользователь с таким email
    const [existingUsers] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashed, role || 'user']
    );

    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const user = users[0];

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const userPayload = { id: user.id, username: user.username, email: user.email, role: user.role };
    const accessToken = generateAccessToken(userPayload);
    const refreshToken = generateRefreshToken(userPayload);

    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

exports.refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, data) => {
    if (err) return res.sendStatus(403);
    try {
      const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [data.id]);
      if (users.length === 0) return res.sendStatus(401);

      const user = users[0];
      const userPayload = { id: user.id, username: user.username, email: user.email, role: user.role };
      const accessToken = generateAccessToken(userPayload);
      res.json({ accessToken });
    } catch (error) {
      res.status(500).json({ message: 'Error during token refresh', error: error.message });
    }
  });
};

exports.logout = (req, res) => {
  res.clearCookie('refreshToken').json({ message: 'Logged out' });
};

exports.deleteUser = async (req, res) => {
  try {
    await pool.query('DELETE FROM users WHERE id = ?', [req.user.id]);
    res.clearCookie('refreshToken').json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const [users] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (users.length === 0) return res.status(404).json({ message: 'No user with this email' });

    const fakeResetToken = `RESET-TOKEN-FOR-${users[0].id}`;

    res.json({ message: 'Password reset link sent (emulated)', token: fakeResetToken });
  } catch (err) {
    res.status(500).json({ message: 'Reset failed', error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const [users] = await pool.query(
      'SELECT id, username, email, role FROM users WHERE id = ?',
      [id]
    );
    if (users.length === 0) return res.status(404).json({ message: 'User not found' });

    res.json(users[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

exports.deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const [users] = await pool.query('SELECT id FROM users WHERE id = ?', [id]);
    if (users.length === 0) return res.status(404).json({ message: 'User not found' });

    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, role } = req.body;

  try {
    const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    if (users.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = users[0];
    const updates = [];
    const params = [];

    if (username) {
      updates.push('username = ?');
      params.push(username);
    }

    if (email) {
      updates.push('email = ?');
      params.push(email);
    }

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updates.push('password = ?');
      params.push(hashed);
    }

    if (role) {
      // Проверка прав: только админ может менять роль
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Only admin can change user roles' });
      }
      updates.push('role = ?');
      params.push(role);
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: 'No data provided for update' });
    }

    params.push(id);
    const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
    await pool.query(sql, params);

    res.json({ message: 'User updated' });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT id, username, email, role FROM users'
    );
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
};
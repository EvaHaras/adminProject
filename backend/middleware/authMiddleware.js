

// const jwt = require('jsonwebtoken');
// const User = require('../models/User'); 

// const authenticateToken = async (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const accessToken = authHeader && authHeader.split(' ')[1];
//   const refreshToken = req.cookies.refreshToken;

//   // if (!accessToken) {
//     return res.status(401).json({ message: 'No access token provided' });
//   }

//   jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
//     if (!err) {
//       req.user = user;
//       return next(); 
//     }

//     if (err.name === 'TokenExpiredError') {
//       if (!refreshToken) {
//         return res.status(401).json({ message: 'Access token expired. No refresh token' });
//       }

//       jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (refreshErr, refreshPayload) => {
//         if (refreshErr) {
//           return res.status(401).json({ message: 'Invalid or expired refresh token' });
//         }

//         const userFromDb = await User.findByPk(refreshPayload.id);
//         if (!userFromDb) {
//           return res.status(401).json({ message: 'User not found' });
//         }

//         const newAccessToken = jwt.sign(
//           {
//             id: userFromDb.id,
//             email: userFromDb.email,
//             role: userFromDb.role
//           },
//           process.env.ACCESS_TOKEN_SECRET,
//           { expiresIn: '15m' }
//         );

//         res.setHeader('x-access-token', newAccessToken);
//         req.user = {
//           id: userFromDb.id,
//           email: userFromDb.email,
//           role: userFromDb.role
//         };

//         return next();
//       });
//     } else {
//       return res.status(403).json({ message: 'Invalid access token' });
//     }
//   });
// };

// module.exports = authenticateToken;


const jwt = require('jsonwebtoken');
const pool = require('../config/db'); // подключение через mysql2/promise

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) {
    return res.status(401).json({ message: 'No access token provided' });
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (!err) {
      req.user = user;
      return next();
    }

    if (err.name === 'TokenExpiredError') {
      if (!refreshToken) {
        return res.status(401).json({ message: 'Access token expired. No refresh token provided' });
      }

      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (refreshErr, refreshPayload) => {
        if (refreshErr) {
          return res.status(401).json({ message: 'Invalid or expired refresh token' });
        }

        // 👇 Заменяем findByPk на ручной SQL-запрос
        const [rows] = await pool.query('SELECT id, email, role FROM users WHERE id = ?', [refreshPayload.id]);
        const userFromDb = rows[0];

        if (!userFromDb) {
          return res.status(401).json({ message: 'User not found' });
        }

        const newAccessToken = jwt.sign(
          {
            id: userFromDb.id,
            email: userFromDb.email,
            role: userFromDb.role
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '15m' }
        );

        res.setHeader('x-access-token', newAccessToken);
        req.user = {
          id: userFromDb.id,
          email: userFromDb.email,
          role: userFromDb.role
        };

        return next();
      });
    } else {
      return res.status(403).json({ message: 'Invalid access token' });
    }
  });
};

module.exports = authenticateToken;

// const express = require('express');
// const dotenv = require('dotenv');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const sequelize = require('./config/db');

// const authRoutes = require('./routes/authRoutes');
// const postRoutes = require('./routes/postRoutes');

// dotenv.config();

// const app = express();

// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));
// app.use(express.json());
// app.use(cookieParser());

// // Роуты
// app.use('/auth', authRoutes);
// app.use('/posts', postRoutes);

// const PORT = process.env.PORT || 5000;

// (async () => {
//   try {
//     await sequelize.sync({ alter: true }); // можно использовать {force: true} для пересоздания
//     app.listen(PORT, () => {
//       console.log(`Server started on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error('Error starting server:', err);
//   }
// })();


// index.js
// const express = require('express');
// const dotenv = require('dotenv');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const sequelize = require('./config/db');

// const authRoutes = require('./routes/authRoutes');
// const postRoutes = require('./routes/postRoutes');


// const swaggerUi = require('swagger-ui-express');
// const swaggerSpec = require('./swagger/swaggerConfig');

// dotenv.config();

// const app = express();

// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));
// app.use(express.json());
// app.use(cookieParser());

// app.use('/auth', authRoutes);
// app.use('/posts', postRoutes);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// if (process.env.NODE_ENV !== 'test') {
//   const PORT = process.env.PORT || 5000;
//   sequelize.sync().then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server started on port ${PORT}`);
//     });
//   });
// }

// module.exports = app;

const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swaggerConfig');

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;

  (async () => {
    try {
      console.log('DB initialized, starting server');

      app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
      });
    } catch (err) {
      console.error('Failed to start server:', err.message);
      process.exit(1);
    }
  })();
}

module.exports = app;

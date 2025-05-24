

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);


router.delete('/delete', authenticateToken, authController.deleteUser);

router.get('/users', authenticateToken, allowRoles('admin'), authController.getAllUsers);
router.get('/users/:id', authenticateToken, allowRoles('admin'), authController.getUserById);
router.put('/users/:id', authenticateToken, allowRoles('admin'), authController.updateUser);
router.delete('/users/:id', authenticateToken, allowRoles('admin'), authController.deleteUserById);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Реєстрація нового користувача
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: user123
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       201:
 *         description: Користувач зареєстрован
 *       500:
 *         description: Помилка реєстрації
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Вхід користувача
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Вдалий вхід, повертається accessToken
 *       401:
 *         description: Невірні дані користувача
 *       500:
 *         description: Помилка сервера при вході
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Аутентифікація та керування користувачами 
 */

/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Отримати усіх користувачів
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список користувачів
 *       403:
 *         description: Недостатньо прав
 */

/**
 * @swagger
 * /auth/users/{id}:
 *   get:
 *     summary: Отримати користувача по ID
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Користувач знайден
 *       404:
 *         description: Користувача не знайдено
 */

/**
 * @swagger
 * /auth/users/{id}:
 *   put:
 *     summary: Оновити користувача
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Оновлено
 *       403:
 *         description: Немає прав
 */

/**
 * @swagger
 * /auth/users/{id}:
 *   delete:
 *     summary: Видалити користувача по ID
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Видалено
 *       403:
 *         description: Немає прав
 */

module.exports = router;

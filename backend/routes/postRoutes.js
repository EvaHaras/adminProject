const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticateToken = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');

router.use(authenticateToken);


/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Робота з постами
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Створити пост
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               isAdminOnly:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Пост створенно
 */
router.post('/', authenticateToken, postController.createPost);

/**
 * @swagger
 * /posts/admin-only:
 *   get:
 *     summary: Отримати пости тільки для адмінів
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Тільки для адмінів
 *       403:
 *         description: Немає прав
 */
router.get('/admin-only', authenticateToken, allowRoles('admin'), postController.adminOnlyPosts);


/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Отримати всі пости
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список постів
 */
router.get('/', authenticateToken, postController.getAllPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Отримати пост по ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Пост знайдено
 *       404:
 *         description: Пост не знайдено
 */
router.get('/:id', authenticateToken, postController.getPostById);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Оновити пост
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Пост оновлено
 *       403:
 *         description: Немає прав
 */
router.put('/:id', authenticateToken, postController.updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Видалити пост
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Пост видалено
 *       403:
 *         description: Немає доступу
 */
router.delete('/:id', authenticateToken, postController.deletePost);



module.exports = router;

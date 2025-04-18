import express from 'express';
import { check } from 'express-validator';
import * as categoryController from '../controllers/categoryController.js';
import auth from '../middleware/auth.js';
import roleCheck from '../middleware/roleCheck.js';

const router = express.Router();

/**
 * @swagger
 * /api/categories:
 *   get:
 *     tags: [Categories]
 *     description: Get all categories
 *     responses:
 *       200:
 *         description: A list of categories
 */
router.get('/', categoryController.getAllCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     tags: [Categories]
 *     description: Get category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category details
 *       404:
 *         description: Category not found
 */
router.get('/:id', categoryController.getCategory);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     tags: [Categories]
 *     description: Create a new category
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - slug
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 */
router.post('/', [
  auth,
  roleCheck(['admin']),
  check('name', 'Le nom est requis').not().isEmpty(),
  check('slug', 'Le slug est requis').not().isEmpty(),
  check('description', 'La description est requise').not().isEmpty()
], categoryController.createCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     tags: [Categories]
 *     description: Update a category
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
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Category not found
 */
router.put('/:id', [
  auth,
  roleCheck(['admin']),
  check('name', 'Le nom est requis').not().isEmpty(),
  check('slug', 'Le slug est requis').not().isEmpty(),
  check('description', 'La description est requise').not().isEmpty()
], categoryController.updateCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     tags: [Categories]
 *     description: Delete a category
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
 *         description: Category deleted
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Category not found
 */
router.delete('/:id', [
  auth,
  roleCheck(['admin'])
], categoryController.deleteCategory);

export default router;

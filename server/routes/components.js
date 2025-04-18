import express from 'express';
import { check } from 'express-validator';
import {
  getAllComponents,
  getComponent,
  createComponent,
  updateComponent,
  deleteComponent
} from '../controllers/componentController.js';
import auth from '../middleware/auth.js';
import roleCheck from '../middleware/roleCheck.js';

const router = express.Router();

/**
 * @swagger
 * /api/components:
 *   get:
 *     tags: [Components]
 *     description: Get all components
 *     responses:
 *       200:
 *         description: A list of components
 */
router.get('/', getAllComponents);

/**
 * @swagger
 * /api/components/{id}:
 *   get:
 *     tags: [Components]
 *     description: Get a component by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Component details
 *       404:
 *         description: Component not found
 */
router.get('/:id', getComponent);

/**
 * @swagger
 * /api/components:
 *   post:
 *     tags: [Components]
 *     description: Create a new component
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
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               specs:
 *                 type: object
 *     responses:
 *       201:
 *         description: Component created
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
  check('category', 'La catégorie est requise').not().isEmpty()
], createComponent);

/**
 * @swagger
 * /api/components/{id}:
 *   put:
 *     tags: [Components]
 *     description: Update a component
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
 *               specs:
 *                 type: object
 *     responses:
 *       200:
 *         description: Component updated
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Component not found
 */
router.put('/:id', [
  auth,
  roleCheck(['admin']),
  check('name', 'Le nom est requis').not().isEmpty()
], updateComponent);

/**
 * @swagger
 * /api/components/{id}:
 *   delete:
 *     tags: [Components]
 *     description: Delete a component
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
 *         description: Component deleted
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Component not found
 */
router.delete('/:id', [
  auth,
  roleCheck(['admin'])
], deleteComponent);

export default router;

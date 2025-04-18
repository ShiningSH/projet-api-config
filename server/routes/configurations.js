import express from 'express';
import { check } from 'express-validator';
import * as configurationController from '../controllers/configurationController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * /api/configurations:
 *   get:
 *     tags: [Configurations]
 *     description: Get all configurations (admin gets all, users get only their own)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of configurations
 *       401:
 *         description: Not authenticated
 */
router.get('/', auth, configurationController.getAllConfigurations);

/**
 * @swagger
 * /api/configurations/{id}:
 *   get:
 *     tags: [Configurations]
 *     description: Get configuration by ID
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
 *         description: Configuration details
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Configuration not found
 */
router.get('/:id', auth, configurationController.getConfiguration);

/**
 * @swagger
 * /api/configurations:
 *   post:
 *     tags: [Configurations]
 *     description: Create a new configuration
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
 *               - components
 *             properties:
 *               name:
 *                 type: string
 *               components:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Configuration created
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Not authenticated
 */
router.post('/', [
  auth,
  check('name', 'Le nom est requis').not().isEmpty(),
  check('components', 'Les composants sont requis').isArray({ min: 1 })
], configurationController.createConfiguration);

/**
 * @swagger
 * /api/configurations/{id}:
 *   put:
 *     tags: [Configurations]
 *     description: Update a configuration
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
 *               components:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Configuration updated
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Configuration not found
 */
router.put('/:id', [
  auth,
  check('name', 'Le nom est requis').not().isEmpty()
], configurationController.updateConfiguration);

/**
 * @swagger
 * /api/configurations/{id}:
 *   delete:
 *     tags: [Configurations]
 *     description: Delete a configuration
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
 *         description: Configuration deleted
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Configuration not found
 */
router.delete('/:id', auth, configurationController.deleteConfiguration);

export default router;

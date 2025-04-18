
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const componentController = require('../controllers/componentController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /api/components:
 *   get:
 *     tags: [Components]
 *     description: Get all components
 *     security:
 *       - bearerAuth: []
 */
router.get('/', auth, componentController.getAllComponents);

/**
 * @swagger
 * /api/components/{id}:
 *   get:
 *     tags: [Components]
 *     description: Get component by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:id', auth, componentController.getComponent);

/**
 * @swagger
 * /api/components:
 *   post:
 *     tags: [Components]
 *     description: Create a new component
 *     security:
 *       - bearerAuth: []
 */
router.post('/', [
  auth,
  check('name', 'Name is required').not().isEmpty(),
  check('categoryId', 'Category ID is required').not().isEmpty(),
  check('price', 'Price must be a positive number').isFloat({ min: 0 })
], componentController.createComponent);

router.put('/:id', [
  auth,
  check('name', 'Name is required').not().isEmpty(),
  check('price', 'Price must be a positive number').isFloat({ min: 0 })
], componentController.updateComponent);

router.delete('/:id', auth, componentController.deleteComponent);

module.exports = router;

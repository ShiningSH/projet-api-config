
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const merchantController = require('../controllers/merchantController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

/**
 * @swagger
 * /api/merchants:
 *   get:
 *     tags: [Merchants]
 *     description: Get all merchants
 *     responses:
 *       200:
 *         description: A list of merchants
 */
router.get('/', merchantController.getAllMerchants);

/**
 * @swagger
 * /api/merchants/{id}:
 *   get:
 *     tags: [Merchants]
 *     description: Get merchant by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Merchant details
 *       404:
 *         description: Merchant not found
 */
router.get('/:id', merchantController.getMerchant);

/**
 * @swagger
 * /api/merchants:
 *   post:
 *     tags: [Merchants]
 *     description: Create a new merchant
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
 *               - website
 *               - logoUrl
 *             properties:
 *               name:
 *                 type: string
 *               website:
 *                 type: string
 *               logoUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Merchant created
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
  check('website', 'Le site web est requis').not().isEmpty().isURL(),
  check('logoUrl', 'Le logo est requis').not().isEmpty().isURL()
], merchantController.createMerchant);

/**
 * @swagger
 * /api/merchants/{id}:
 *   put:
 *     tags: [Merchants]
 *     description: Update a merchant
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
 *               website:
 *                 type: string
 *               logoUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Merchant updated
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Merchant not found
 */
router.put('/:id', [
  auth,
  roleCheck(['admin']),
  check('name', 'Le nom est requis').not().isEmpty(),
  check('website', 'Le site web est requis').not().isEmpty().isURL(),
  check('logoUrl', 'Le logo est requis').not().isEmpty().isURL()
], merchantController.updateMerchant);

/**
 * @swagger
 * /api/merchants/{id}:
 *   delete:
 *     tags: [Merchants]
 *     description: Delete a merchant
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
 *         description: Merchant deleted
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Merchant not found
 */
router.delete('/:id', [
  auth,
  roleCheck(['admin'])
], merchantController.deleteMerchant);

module.exports = router;

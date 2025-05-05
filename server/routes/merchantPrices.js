import express from 'express';
import { check } from 'express-validator';
import * as merchantPriceController from '../controllers/merchantPriceController.js';
import auth from '../middleware/auth.js';
import roleCheck from '../middleware/roleCheck.js';

const router = express.Router();

/**
 * @swagger
 * /api/merchantPrices:
 *   get:
 *     tags: [MerchantPrices]
 *     description: Get all merchant prices
 *     parameters:
 *       - in: query
 *         name: componentId
 *         schema:
 *           type: string
 *         description: Filter by component ID
 *       - in: query
 *         name: merchantId
 *         schema:
 *           type: string
 *         description: Filter by merchant ID
 *     responses:
 *       200:
 *         description: A list of merchant prices
 */
router.get('/', merchantPriceController.getAllMerchantPrices);

/**
 * @swagger
 * /api/merchantPrices/{id}:
 *   get:
 *     tags: [MerchantPrices]
 *     description: Get merchant price by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Merchant price details
 *       404:
 *         description: Merchant price not found
 */
router.get('/:id', merchantPriceController.getMerchantPrice);

/**
 * @swagger
 * /api/merchantPrices:
 *   post:
 *     tags: [MerchantPrices]
 *     description: Create a new merchant price
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - merchantId
 *               - componentId
 *               - price
 *               - url
 *             properties:
 *               merchantId:
 *                 type: string
 *               componentId:
 *                 type: string
 *               price:
 *                 type: number
 *               url:
 *                 type: string
 *               inStock:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Merchant price created
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
  check('merchantId', 'L\'ID du marchand est requis').not().isEmpty(),
  check('componentId', 'L\'ID du composant est requis').not().isEmpty(),
  check('price', 'Le prix doit être un nombre positif').isFloat({ min: 0 }),
  check('url', 'L\'URL est requise').not().isEmpty().isURL()
], merchantPriceController.createMerchantPrice);

/**
 * @swagger
 * /api/merchantPrices/{id}:
 *   put:
 *     tags: [MerchantPrices]
 *     description: Update a merchant price
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
 *               price:
 *                 type: number
 *               url:
 *                 type: string
 *               inStock:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Merchant price updated
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Merchant price not found
 */
router.put('/:id', [
  auth,
  roleCheck(['admin']),
  check('price', 'Le prix doit être un nombre positif').isFloat({ min: 0 }),
  check('url', 'L\'URL est requise').not().isEmpty().isURL()
], merchantPriceController.updateMerchantPrice);

/**
 * @swagger
 * /api/merchantPrices/{id}:
 *   delete:
 *     tags: [MerchantPrices]
 *     description: Delete a merchant price
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
 *         description: Merchant price deleted
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Merchant price not found
 */
router.delete('/:id', [
  auth,
  roleCheck(['admin'])
], merchantPriceController.deleteMerchantPrice);

export default router;

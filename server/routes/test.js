import express from 'express';
const router = express.Router();

/**
 * @swagger
 * /api/test:
 *   get:
 *     tags:
 *       - Test
 *     summary: Test route
 *     responses:
 *       200:
 *         description: Route de test OK
 */
router.get('/', (req, res) => {
  res.send('Test OK');
});

export default router;

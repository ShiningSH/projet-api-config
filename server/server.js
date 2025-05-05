import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import testRoutes from './routes/test.js';
// 🚫 autres routes temporairement désactivées
// import authRoutes from './routes/auth.js';
// import componentsRoutes from './routes/components.js';
// import categoriesRoutes from './routes/categories.js';
// import merchantsRoutes from './routes/merchants.js';
// import merchantPricesRoutes from './routes/merchantPrices.js';
// import configurationsRoutes from './routes/configurations.js';
// import usersRoutes from './routes/users.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PC Configurator API',
      version: '1.0.0',
      description: 'API for PC component configuration',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/test.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
fs.writeFileSync('./swagger-output.json', JSON.stringify(swaggerDocs, null, 2));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Test route uniquement
app.use('/api/test', testRoutes);

// Static frontend (si présent)
app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur serveur' });
});

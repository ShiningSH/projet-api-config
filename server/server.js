import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import componentsRoutes from './routes/components.js';
import categoriesRoutes from './routes/categories.js';
import merchantsRoutes from './routes/merchants.js';
import merchantPricesRoutes from './routes/merchantPrices.js';
import configurationsRoutes from './routes/configurations.js';
import usersRoutes from './routes/users.js';

dotenv.config();

const app = express();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PC Configurator API',
      version: '1.0.0',
      description: 'API for PC component configuration'
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./server/routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/components', componentsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/merchants', merchantsRoutes);
app.use('/api/merchant-prices', merchantPricesRoutes);
app.use('/api/configurations', configurationsRoutes);
app.use('/api/users', usersRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Could not connect to MongoDB:', err));

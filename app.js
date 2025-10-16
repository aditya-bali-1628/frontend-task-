require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const authRoutes = require('./routes/auth.routes');
const notesRoutes = require('./routes/notes.routes');
const errorHandler = require('./middleware/error.middleware');

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// Root route (always before 404)
app.get("/", (req, res) => {
  res.send("Welcome to MERN Auth API backend!");
});

// Basic API version route
app.get('/api', (req, res) => res.json({ version: 'v1', status: 'ok' }));

// Swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'MERN Notes API', version: '1.0.0' },
    servers: [{ url: `http://localhost:${process.env.PORT || 5000}` }]
  },
  apis: ['./routes/*.js']
};
const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/notes', notesRoutes);

// Fallback 404 (after all routes)
app.use((req, res) => res.status(404).json({ message: 'Not found' }));

// Global error handler
app.use(errorHandler);

module.exports = app;

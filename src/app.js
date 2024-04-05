import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import routes from './routes/index.js';

// Initialize configuration
dotenv.config();

// Create Express server
const app = express();
const port = process.env['APP_PORT'] || 3001;

// Express configuration
app.use(cors()); // Enable CORS
app.use(helmet()); // Enable Helmet
app.use(express.json()); // Enable JSON body parser

// Use routes
app.use(routes);

app.listen({ port }, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const fileRoutes = require('./routes/file.route');

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
app.use('/files', fileRoutes);

app.listen({ port }, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});

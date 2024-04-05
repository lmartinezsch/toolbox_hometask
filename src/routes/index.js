import express from 'express';
import fileRoutes from './file.route.js';

const router = express.Router();

router.use('/files', fileRoutes);

export default router;

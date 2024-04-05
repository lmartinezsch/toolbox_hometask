const express = require('express');
const fileRoutes = require('./file.route');

const router = express.Router();

router.use('/files', fileRoutes);

module.exports = router;

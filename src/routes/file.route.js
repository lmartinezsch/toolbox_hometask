const express = require('express');
const FileController = require('../controllers/file.controller');
const FileService = require('../services/file.service');
const router = express.Router();

const fileService = new FileService();
const fileController = new FileController(fileService);

router.get('/data', fileController.getDataFiles);
router.get('/list', fileController.getFileList);

module.exports = router;

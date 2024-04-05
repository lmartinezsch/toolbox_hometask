import express from 'express';
import FileController from '../file/file.controller.js';
import FileService from '../file/file.service.js';

const router = express.Router();

const fileService = new FileService();
const fileController = new FileController(fileService);

router.get('/data', fileController.getDataFiles);
router.get('/list', fileController.getFileList);

export default router;

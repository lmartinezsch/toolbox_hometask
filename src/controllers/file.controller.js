const { NotFoundError } = require('../errors/errors');

class FileController {
  constructor(fileService) {
    this.fileService = fileService;
  }

  getDataFiles = async (req, res) => {
    try {
      const { fileName } = req.query;
      const data = await this.fileService.getData(fileName);
      res.json(data);
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };

  getFileList = async (req, res) => {
    try {
      const data = await this.fileService.getFileNames();
      res.json(data);
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };
}

module.exports = FileController;

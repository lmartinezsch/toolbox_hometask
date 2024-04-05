const chai = require('chai');
const chaiHttp = require('chai-http');
const { NotFoundError } = require('../../src/file/errors/errors');
const FileController = require('../../src/file/file.controller');

chai.use(chaiHttp);
const expect = chai.expect;

describe('FileController', () => {
  let fileController;

  beforeEach(() => {
    fileController = new FileController({
      getData: async (fileName) => {
        if (fileName === 'existingFile') {
          return { data: 'file data' };
        }
        throw new NotFoundError('File not found');
      },
      getFileNames: async () => ['file1', 'file2'],
    });
  });

  describe('getDataFiles', () => {
    it('should return file data if file exists', async () => {
      const req = { query: { fileName: 'existingFile' } };
      const res = { json: (data) => data };
      const result = await fileController.getDataFiles(req, res);
      expect(result).to.deep.equal({ data: 'file data' });
    });

    it('should return 404 error if file does not exist', async () => {
      const req = { query: { fileName: 'nonExistingFile' } };
      const res = {
        status: (code) => ({
          json: (data) => data,
        }),
      };
      const result = await fileController.getDataFiles(req, res);
      expect(result).to.deep.equal({ error: 'File not found' });
    });
  });

  describe('getFileList', () => {
    it('should return list of file names', async () => {
      const req = {};
      const res = { json: (data) => data };
      const result = await fileController.getFileList(req, res);
      expect(result).to.deep.equal(['file1', 'file2']);
    });
  });
});

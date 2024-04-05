import chai from 'chai';
import sinon from 'sinon';
import FileController from '../../src/file/file.controller.js';
import { NotFoundError } from '../../src/file/errors/errors.js';

const expect = chai.expect;

describe('FileController', () => {
  describe('getDataFiles', () => {
    it('should return file data if file exists', async () => {
      const fileServiceMock = {
        getData: sinon
          .stub()
          .withArgs('test3.csv')
          .resolves([
            {
              file: 'test3.csv',
              lines: [
                {
                  text: 'hWMIdiyuwDYERAfGZr',
                  number: 316,
                  hex: '46e50cc08bee266daeebc28e9b7e4f48',
                },
                {
                  text: 'NpuFRaEqpNfsaQifBwOp',
                  number: 7619185,
                  hex: '80b5a55cec91e17fe74346f7beb7ff7d',
                },
                {
                  text: 'w',
                  number: 6.625202740350738e31,
                  hex: 'da5a3f68e59b6690e1dffe47c91bf95e',
                },
              ],
            },
          ]),
        getFileNames: sinon
          .stub()
          .resolves(['test1.csv', 'test2.csv', 'test3.csv']),
      };

      const req = { query: { fileName: 'test3.csv' } };
      const res = { json: sinon.spy() };

      const controller = new FileController(fileServiceMock);
      await controller.getDataFiles(req, res);

      expect(res.json.calledOnce).to.be.true;
      expect(
        res.json.calledWith([
          {
            file: 'test3.csv',
            lines: [
              {
                text: 'hWMIdiyuwDYERAfGZr',
                number: 316,
                hex: '46e50cc08bee266daeebc28e9b7e4f48',
              },
              {
                text: 'NpuFRaEqpNfsaQifBwOp',
                number: 7619185,
                hex: '80b5a55cec91e17fe74346f7beb7ff7d',
              },
              {
                text: 'w',
                number: 6.625202740350738e31,
                hex: 'da5a3f68e59b6690e1dffe47c91bf95e',
              },
            ],
          },
        ]),
      ).to.be.true;
    });

    it('should return 404 error if file does not exist', async () => {
      const fileServiceMock = {
        getData: sinon.stub().rejects(new NotFoundError('File not found')),
        getFileNames: sinon.stub().resolves(['test1.csv', 'test2.csv']),
      };

      const req = { query: { fileName: 'nonExistingFile' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      const controller = new FileController(fileServiceMock);
      await controller.getDataFiles(req, res);

      expect(res.status.calledOnceWith(404)).to.be.true;
      expect(res.json.calledOnceWith({ error: 'File not found' })).to.be.true;
    });
  });

  describe('getFileList', () => {
    it('should return list of file names', async () => {
      const fileServiceMock = {
        getFileNames: sinon.stub().resolves(['test1.csv', 'test2.csv']),
      };

      const req = {};
      const res = { json: sinon.spy() };

      const controller = new FileController(fileServiceMock);
      await controller.getFileList(req, res);

      expect(res.json.calledOnceWith(['test1.csv', 'test2.csv'])).to.be.true;
    });
  });
});

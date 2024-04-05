import { expect, assert } from 'chai';
import sinon from 'sinon';
import FileService from '../../src/file/file.service.js';
import FileClient from '../../src/external/file.client.js';

describe('FileService', () => {
  let fileService;
  let getFileNamesStub;
  let getDataStub;

  beforeEach(() => {
    fileService = new FileService();
    getFileNamesStub = sinon.stub(FileClient, 'getFileNames');
    getDataStub = sinon.stub(FileClient, 'getData');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getData', () => {
    it('should return all file data if no fileName is provided', async () => {
      getFileNamesStub.resolves({ files: ['test2.csv', 'test3.csv'] });

      getDataStub
        .onFirstCall()
        .resolves(
          'file,text,number,hex\ntest2.csv,hello,123,abc\ntest2.csv,world,456,def\n',
        )
        .onSecondCall()
        .resolves(
          'file,text,number,hex\ntest3.csv,foo,789,ghi\ntest3.csv,bar,101,xyz\n',
        );

      const result = await fileService.getData();

      expect(result).to.deep.equal([
        {
          file: 'test2.csv',
          lines: [
            { text: 'hello', number: 123, hex: 'abc' },
            { text: 'world', number: 456, hex: 'def' },
          ],
        },
        {
          file: 'test3.csv',
          lines: [
            { text: 'foo', number: 789, hex: 'ghi' },
            { text: 'bar', number: 101, hex: 'xyz' },
          ],
        },
      ]);
    });
  });

  describe('getFileNames', () => {
    it('should return file names from FileClient', async () => {
      const expectedFileNames = { files: ['file1.txt', 'file2.txt'] };
      getFileNamesStub.resolves(expectedFileNames);

      const result = await fileService.getFileNames();

      assert.deepEqual(result, expectedFileNames);
    });

    it('should throw an error if FileClient.getFileNames throws an error', async () => {
      const expectedError = new Error('Unable to get file names');
      getFileNamesStub.rejects(expectedError);

      try {
        await fileService.getFileNames();
        assert.fail('Expected an error to be thrown');
      } catch (error) {
        assert.strictEqual(error, expectedError);
      }
    });
  });

  describe('getFileData', () => {
    it('should return parsed file data for a given file name', async () => {
      const fileData =
        'file,text,number,hex\ntest.csv,hello,123,abc\ntest.csv,world,456,def\n';
      const parsedData = [
        {
          file: 'test.csv',
          lines: [
            { text: 'hello', number: 123, hex: 'abc' },
            { text: 'world', number: 456, hex: 'def' },
          ],
        },
      ];

      getDataStub.resolves(fileData);

      const result = await fileService.getFileData('test.csv');

      expect(result).to.deep.equal(parsedData);
    });

    it('should return an empty array if FileClient.getData throws an error', async () => {
      getDataStub.rejects(new Error('Failed to fetch data'));

      const result = await fileService.getFileData('test.csv');

      expect(result).to.be.an('array').that.is.empty;
    });
  });

  describe('parseResponse', () => {
    it('should parse file data into the correct format', () => {
      const fileData =
        'file,text,number,hex\ntest.csv,hello,123,abc\ntest.csv,world,456,def\n';
      const expectedParsedData = [
        {
          file: 'test.csv',
          lines: [
            { text: 'hello', number: 123, hex: 'abc' },
            { text: 'world', number: 456, hex: 'def' },
          ],
        },
      ];

      const result = fileService.parseResponse(fileData);

      expect(result).to.deep.equal(expectedParsedData);
    });

    it('should handle empty lines in file data', () => {
      const fileData = 'file,text,number,hex\n\n\ntest.csv,hello,123,abc\n';
      const expectedParsedData = [
        {
          file: 'test.csv',
          lines: [{ text: 'hello', number: 123, hex: 'abc' }],
        },
      ];

      const result = fileService.parseResponse(fileData);

      expect(result).to.deep.equal(expectedParsedData);
    });

    it('should handle missing fields in file data', () => {
      const fileData =
        'file,text,number,hex\ntest.csv,hello,123\ntest.csv,world,456,def\n';
      const expectedParsedData = [
        {
          file: 'test.csv',
          lines: [{ text: 'world', number: 456, hex: 'def' }],
        },
      ];

      const result = fileService.parseResponse(fileData);

      expect(result).to.deep.equal(expectedParsedData);
    });
  });
});

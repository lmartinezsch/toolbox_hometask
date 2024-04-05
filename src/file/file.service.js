const FileClient = require('../external/file.client');

class FileService {
  async getData(fileName) {
    const fileNames = await this.getFileNames();
    let responses = await Promise.all(
      fileNames.files.map((name) => this.getFileData(name)),
    );

    if (fileName) {
      responses = responses
        .flat()
        .filter((response) => response.file === fileName);
    }

    return responses.flat();
  }

  async getFileNames() {
    try {
      return FileClient.getFileNames();
    } catch (e) {
      throw new Error(e);
    }
  }

  async getFileData(name) {
    try {
      const fileData = await FileClient.getData(name);
      return this.parseResponse(fileData);
    } catch (e) {
      console.log(`Error to get file data from ${name}: ${e.message}`);
      return [];
    }
  }

  parseResponse(fileData) {
    const lines = fileData.split('\n').slice(1);
    const result = {};

    lines.forEach((line) => {
      const [file, text, number, hex] = line.split(',');

      if (file && text && number && hex) {
        result[file] = result[file] || [];
        result[file].push({ text, number: parseInt(number), hex });
      }
    });

    return Object.keys(result).map((file) => ({
      file,
      lines: result[file],
    }));
  }
}

module.exports = FileService;

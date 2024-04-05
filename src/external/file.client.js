const axios = require('axios');

class FileClient {
  static async getFileNames() {
    const { data } = await axios.get(
      process.env['TBX_EXTERNAL_API'] + '/v1/secret/files',
      {
        headers: { Authorization: process.env['TBX_EXTERNAL_TOKEN'] },
      },
    );

    return data;
  }

  static async getData(name) {
    const { data } = await axios.get(
      process.env['TBX_EXTERNAL_API'] + `/v1/secret/file/${name}`,
      {
        headers: { Authorization: process.env['TBX_EXTERNAL_TOKEN'] },
      },
    );

    return data;
  }
}

module.exports = FileClient;

class FileController {

    constructor(fileService) {
        this.fileService = fileService
    }

    getFiles = async (req, res) => {
        try {
            const data = await this.fileService.getData()
            res.json(data)
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(error.statusCode).json({error: error.message})
            } else {
                res.status(500).json({error: error.message})
            }
        }
    }

}

module.exports = FileController
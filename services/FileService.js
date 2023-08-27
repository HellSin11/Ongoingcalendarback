const uuid = require('uuid');
const path = require('path');
const fs = require('fs');


class FileService {
    async saveFile(file) {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve('./public/images', fileName);
            await file.mv(filePath);
            return fileName;
        } catch (e) {
            console.log(e);
        }
    }

    async removeFile(fileName) {
        try {
            const filePath = path.resolve('./public/images', fileName);
            await fs.unlink(filePath, e => {
                console.error(e);
            })
            return fileName;
        } catch (e) {
            console.log(e);
            return e;
        }
    }
}

module.exports = new FileService();
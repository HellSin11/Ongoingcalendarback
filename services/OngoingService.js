const FileService= require('./FileService.js')
const Ongoing = require('../models/Ongoing')


class OngoingService {
    async create (ongoing, day, picture, owner) {
        const fileName = await FileService.saveFile(picture);
        const createdOngoing = await Ongoing.create({name: ongoing, day, picture: fileName, owner});
        return createdOngoing;
    }

    async getAll () {
        const ongoings = await Ongoing.find()
        return ongoings;
    }

    async getByOwner (owner) {
        if (!owner) {
            throw new Error('Owner не вказан!');
        }
        const ongoings = await Ongoing.find({owner})
        return ongoings;
    }

    async update (ongoing, file) {
        if (!ongoing.path) {
            throw new Error("Name не вказан")
        }
        let fileName = null;
        if (file) {
            await FileService.removeFile(ongoing.path);
            fileName = await FileService.saveFile(file);
        }
        const newOngoing = {
            picture: fileName ?? ongoing.path,
            name: ongoing.name,
            day: ongoing.day,
        }
        const updatedOngoing = await Ongoing.findOneAndUpdate({picture: ongoing.path}, newOngoing, {new: true});
        return updatedOngoing;

    }

    async delete (nameOngoing) {
        if (!nameOngoing) {
            throw new Error('nameOngoing не вказан!');
        }
        const ongoing = await Ongoing.findOneAndDelete({picture: nameOngoing});
        await FileService.removeFile(nameOngoing);
        return ongoing;
    }
}

module.exports = new OngoingService();

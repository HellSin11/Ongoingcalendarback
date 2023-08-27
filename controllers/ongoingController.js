const OngoingService = require('../services/OngoingService.js')
class OngoingController {
    async create (req, res) {
        try {
            if (!req.files) {
                return res.status(400).json({message: "No file uploaded"})
            }
            if (!req.body) {
                return res.status(400).json({message: "Name or day is empty"})
            }
            const ongoing = await OngoingService.create(req.body.name, req.body.day, req.files.poster, req.body.ownerId)
            res.status(200).json({message:'Success uploaded!'});
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getAll (req, res) {
        try {
            const ongoings = await OngoingService.getAll();
            return res.json(ongoings);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getByOwner (req, res) {
        try {
            const ongoings = await OngoingService.getByOwner(req.headers.owner)
            return res.json(ongoings);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async update (req, res) {
        try {
            if (!req.body) {
                return res.status(400).json({message: "Name or day is empty"})
            }
            let file = null;
            if (req.files) {
                file = req.files.poster;
            }
            const ongoing = await OngoingService.update(req.body, file)
            return res.json(ongoing)
        } catch (e) {
            res.json(500, {message: e});
        }
    }

    async delete (req, res) {
        try {
            const {name} = req.params;
            const ongoing = await OngoingService.delete(name);
            return res.json(ongoing);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

module.exports = new OngoingController();
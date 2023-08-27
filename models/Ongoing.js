const mongoose = require('mongoose')

const Ongoing = new mongoose.Schema({
    name: {type: String, required: true},
    day: {type: String, required: true},
    picture: {type: String},
    owner: {type: String, ref: 'User'}
})

module.exports = mongoose.model('Ongoing', Ongoing);


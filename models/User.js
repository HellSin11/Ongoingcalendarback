const {Schema, model} = require('mongoose');

const User = new Schema({
    fullName: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false, required: true},
    activationLink: {type: String},
    roles: [{type: String, ref: "Role"}]
})

module.exports = model('User', User);


const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema ({
    name: {
        type: String,
        maxLength: 50,
        require: true
    },
    company: {
        type: String,
        maxLength: 50,
        require: true
    },
    address: {
        type: String,
        maxLength: 50,
    },
    phone: {
        type: Number,
        maxLength: 15,
    },
    email: {
        type: String,
        maxLength: 50,
        require: true
    },
    password: {
        minLength:8,
        type: String,
        maxLength: 100,
        require: true
    },

})


module.exports = {
    UserSchema: mongoose.model('Users', UserSchema),
};
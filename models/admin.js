const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Admin Schema
const AdminSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    registerDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = Admin = mongoose.model('admin', AdminSchema)
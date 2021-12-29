const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '../.env'})

// Model
const Admin = require('../models/admin')

// Login API
exports.login = (req, res) => {
    const { username, password } = req.body

    // Simple validation
    if (!username || !password) {
        return res.status(400).json({ msg: 'Please enter all the fields' })
    }

    Admin
    .findOne({ username })
    .then(admin => {
        // Check if admin does not exist
        if (!admin) {
            res.status(400).json({ msg: 'Admin does not exist' })
        }

        // Check if admin is active
        if (!admin.active) {
            res.status(400).json({ msg: 'This account was removed' })
        }

        // Validate Password
        bcrypt
        .compare(password, admin.password)
        .then(isMatch => {
            if (!isMatch) {
                res.status(400).json({ msg: 'Invalid Credentials' })
            }

            jwt.sign({ id: admin.id }, process.env.JWT_SECRET, (err, token) => {
                if (err) throw err
                res.status(200).json({
                    token,
                    username: admin.username
                })
            })
        })
    })
    .catch(err => {
        console.log(err)
        res.status(400).json({ msg: 'Something went wrong' })
    })
}

// User API
exports.user = (req, res) => {
    const { id } = req.user

    Admin
    .findById(id)
    .then(admin => {
        if (!admin.active) {
            res.status(400).json({ msg: 'Admin account is not active' })
        }
        res.status(200).json({ msg: 'Admin account is active' })
    })
    .catch(err => {
        console.log(err)
        res.status(400).json({ msg: 'Something went wrong' })
    })
}
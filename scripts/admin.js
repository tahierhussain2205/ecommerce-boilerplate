/*
    Script to enter the admin creds into the admin table.
    When a new admin creds are entered, the previous admin creds will become inactive.
*/

const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const prompt = require('prompt-sync')()
require('dotenv').config({ path: '../.env'})

// Admin Model
const Admin = require('../models/admin')

let username = ''
let password = ''
// Regex for validation of Username & Password
const usernameRegex = /^[a-zA-Z0-9]{6,16}$/
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/

console.log('The username must contain only alphabets and numbers.')
while (!username) {
    username = prompt('Enter Username: ')
    if (!usernameRegex.test(username)) {
        username = ''
        console.log('Invalid Username. Please try again.')
    }
}

console.log('The password must contain 6 to 16 characters, with atleast one number and one special character.')
while (!password) {
    password = prompt('Enter Password: ')
    if (!passwordRegex.test(password)) {
        password: ''
        console.log('Invalid Password. Please try again.')
    }
}

const salt = bcrypt.genSaltSync(10)

// Encrypting the password
const passwordHash = bcrypt.hashSync(password, salt)

// Mongo URI
const db = process.env.MONGO_URI

// make a connection
mongoose.connect(db)

// get reference to database
const conn = mongoose.connection

conn.on('error', console.error.bind(console, 'connection error:'))

conn.once('open', () => {
    console.log('Connection Successful!')

    Admin
    .updateMany({ active: true }, { $set: { active: false } })
    .then(() => {
        console.log('Previous admin account(s) are inactive.')
        const newAdmin = new Admin({
            username,
            password: passwordHash
        })
    
        newAdmin
        .save()
        .then(() => {
            console.log('Admin account has been successfully created')
            conn.close()
        })
        .catch(err => {
            console.error(err)
            conn.close()
        })
    })
    .catch(err => {
        console.log(err)
        conn.close()
    })
})



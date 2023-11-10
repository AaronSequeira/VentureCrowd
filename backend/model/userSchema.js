const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    pwd:{
        type: String,
        required: true
    },
    cpwd:{
        type: String,
        required: true
    },
})

userSchema.pre('save', async function(next) {
    // console.log("Inside pre-save")
    if(this.isModified('pwd')){               //this references instance 'userSchema'
        this.pwd = await bcrypt.hash(this.pwd , 12)
        this.cpwd = await bcrypt.hash(this.pwd , 12)
    }
    next()
})


const User = mongoose.model('USER' , userSchema)

module.exports = User


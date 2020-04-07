const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Requires Fullname'],
        trim: true
    },
    username: {
        type: String,
        required: [true, 'Requires Username'],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Requires Password']
    }
});

const User = mongoose.model('User', userSchema, 'User');

module.exports = User;
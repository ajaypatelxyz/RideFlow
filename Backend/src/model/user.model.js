const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minLength: 3,
        },
        lastName: {
            type: String,
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    }
}, {
    timestamps: true
})

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
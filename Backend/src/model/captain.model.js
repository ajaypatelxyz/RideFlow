const mongoose = require('mongoose')

const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minLength: 3
        },
        lastName: {
            type:String
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minLength: 3
        },
        plate: {
            type: String,
            required: true,
            minLength: 3
        },
        capacity: {
            type: Number,
            required: true,
            min: 1
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['bike', 'car', 'auto']
        }
    },
    location: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    }
}, {
    // timestamps: true
})

const captainModel = mongoose.model("Captain", captainSchema);

module.exports = captainModel
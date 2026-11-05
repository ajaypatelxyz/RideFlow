const crypto = require('crypto')
const rideModel = require('../model/ride.model');
const mapService = require('./map.service')

const getOtp = (num) => {
    if (!Number.isInteger(num) || num < 1 || num > 14) {
        throw new Error('OTP length must be an integer between 1 and 14')
    }

    const min = Math.pow(10, num - 1)
    const max = Math.pow(10, num)

    return crypto.randomInt(min, max).toString()
}

const getFare = async(pickup, destination) => {

    if(!pickup || !destination){
        throw new Error('Pickup and destination are required')
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const distanceInKm = distanceTime.distance.value / 1000;
    const durationInMinutes = distanceTime.duration.value / 60;

    const baseFare = {
        auto: 30,
        car: 50,
        motorcycle: 20
    }

    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 8
    }

    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1.5
    }

    const fare = {
        auto: Math.round(baseFare.auto + (distanceInKm * perKmRate.auto) + (durationInMinutes * perMinuteRate.auto)),
        car: Math.round(baseFare.car + (distanceInKm * perKmRate.car) + (durationInMinutes * perMinuteRate.car)),
        motorcycle: Math.round(baseFare.motorcycle + (distanceInKm * perKmRate.motorcycle) + (durationInMinutes * perMinuteRate.motorcycle))
    }

    return fare
}

const createRide = async({user, pickup, destination, vehicleType}) => {

    if(!user || !pickup || !destination || !vehicleType){
        throw new Error('All field is required')
    }

    const fare = await getFare(pickup, destination);

    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType]
    })

    return ride;

}

module.exports = {getFare, createRide, getOtp}
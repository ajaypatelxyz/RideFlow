const captainModel = require('../model/captain.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const blacklistTokenModel = require('../model/blacklistToken.model')

const registerCaptain = async(req, res) => {

    const {fullName, email, password, vehicle} = req.body;

    const isCaptainAlreadyExists = await captainModel.findOne({
        email
    })

    if(isCaptainAlreadyExists){
        return res.status(401).json({
            message: "User already exists"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const captain = await captainModel.create({
        fullName,
        email,
        password: hashPassword,
        vehicle
    })

    const token = jwt.sign({
        _id: captain._id
    }, process.env.JWT_SECRET, {expiresIn: "24h"})

    res.cookie("token", token)

    res.status(201).json({
        message: "Captain register successfully",
        captain: {
            _id: captain._id,
            fullName: captain.fullName,
            email: captain.email,
            vehicle: captain.vehicle
        }
    })

}

const loginCaptain = async(req, res) => {

    const {email, password} = req.body;

    const captain = await captainModel.findOne({
        email
    }).select("+password");

    if(!captain){
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }

    const isValidPassword = await bcrypt.compare(password, captain.password);

    if(!isValidPassword){
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        _id: captain._id
    }, process.env.JWT_SECRET, {expiresIn: "24h"})

    res.cookie("token", token)

    res.status(200).json({
        message: "Captain login successfully",
        captain: {
            _id: captain._id,
            fullName: captain.fullName,
            email: captain.email
        }
    })

}

const getCaptainProfile = async(req, res) => {

    return res.status(200).json(req.captain)

}

const logoutCaptain = async(req, res) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    res.clearCookie("token");

    if(!token){
        return res.status(200).json({
            message: "Captain already logged out"
        })
    }

    const isBlacklisted = await blacklistTokenModel.findOne({token});

    if(isBlacklisted){
        return res.status(200).json({
            message: "Captain already logged out"
        })
    }

    await blacklistTokenModel.create({token});

    res.status(200).json({
        message: "Captain logout successfully"
    })

}

module.exports = {registerCaptain, loginCaptain, logoutCaptain, getCaptainProfile}
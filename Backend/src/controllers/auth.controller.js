const userModel = require('../model/user.model');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const registerUser = async(req, res) => {

    const {fullName, email, password} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if(isUserAlreadyExists){
        return res.status(401).json({
            message: "User already exists"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashPassword
    })

    const token = jwt.sign({
        _id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token);

    res.status(201).json({
        message: "User register successfully",
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    })

}

const loginUser = async(req, res) => {

    const {email, password} = req.body;

    const user = await userModel.findOne({
        email
    }).select("+password")

    if(!user){
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword){
        return res.status(401).json({
            message: "Invalid user and password"
        })
    }

    const token = jwt.sign({
        _id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token);

    res.status(200).json({
        message: "User login successfully",
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    })

}

const logoutUser = async(req, res) => {

    // const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    res.clearCookie("token");

    res.status(200).json({
        message: "User logout successfully"
    })

}

module.exports = {registerUser, loginUser, logoutUser}
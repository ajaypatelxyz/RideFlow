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

module.exports = {registerUser}
const mongoose = require('mongoose');

const connectDB = async() => {
    
    try{
        await mongoose.connect("mongodb://localhost:27017/Uber")
        console.log("Connected to DB");
    }catch(error){
        console.log(error)
    }
}

module.exports = connectDB;
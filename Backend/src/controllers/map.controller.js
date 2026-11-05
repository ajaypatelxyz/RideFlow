const mapService = require('../services/map.service')
const {validationResult} = require('express-validator')

const getCoordinates = async(req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {address} = req.query

    try{

        const coordinates = await mapService.getAddressCoordinate(address)
        res.status(200).json(coordinates)

    }catch(error){

        res.status(404).json({
            message: "Coordinates not found"
        })

    }

}

const getDistanceTime = async(req, res) => {

    try{

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const {origin, destination} = req.query();

        const distanceTime = await mapService.getDistanceTime(origin, destination);

        res.status(200).json(distanceTime)

    }catch(error){

        res.status(500).json({
            message: "Internal server error"
        })

    }

}

const getAutoCompleteSuggestion = async(req, res) => {

    try{

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const {input} = req.query()

        const suggestion = await mapService.getAutoCompleteSuggestions(input)

        res.status(200).json(suggestion)

    }catch(error){

        res.status(500).json({
            message: "Internal server error"
        })

    }

}

module.exports = {getCoordinates, getDistanceTime, getAutoCompleteSuggestion}
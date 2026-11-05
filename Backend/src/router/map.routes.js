const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const mapController = require('../controllers/map.controller')
const {query} = require('express-validator')

const router = express.Router()

router.get('/get-coordinate',
    query('address').isString().isLength({min: 3}),
    authMiddleware.authUser, mapController.getCoordinates)

router.get('/get-distance-time',
    query('origin').isString().isLength({min: 3}),
    query('destination').isString().isLength({min: 3}),
    authMiddleware.authUser,
    mapController.getDistanceTime
)

router.get('/get-suggestion',
    query('input')
        .isString().withMessage('Input must be a string')
        .bail()
        .trim()
        .notEmpty().withMessage('Input is required')
        .bail()
        .isLength({min: 3}).withMessage('Input must be at least 3 characters'),
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggestion
)

module.exports = router
const express = require('express');
const captainController = require('../controllers/captain.controller')
const captainMiddleware = require('../middleware/captain.middleware')

const router = express.Router();

router.post('/captain/register', captainController.registerCaptain)

router.post('/captain/login', captainController.loginCaptain)

router.post('/captain/profile', captainMiddleware.captainMiddleware, captainController.getCaptainProfile)

router.get('/captain/logout', captainController.logoutCaptain)

module.exports = router;
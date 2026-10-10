const express = require('express')
const authRouter = express.Router()
const auth = require('../controllers/authController')

authRouter.post('/login', auth)

module.exports =authRouter
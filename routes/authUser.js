const express = require('express')
const { handleRegisterUser, handleLoginUser } = require('../controllers/authUser')

const router = express.Router()

router.post('/register', handleRegisterUser)
router.post('/login', handleLoginUser)

module.exports = router
const express = require('express')

const userControllers = require('../controllers/user')

const router = express.Router()

router.post('/', userControllers.handleCreateUser)
router.get('/', userControllers.handleGetUsers)
router.get('/:id', userControllers.handleGetUser)
router.put('/:id', userControllers.handleUpdateUser)
router.delete('/:id', userControllers.handleDeleteUser)

module.exports = router
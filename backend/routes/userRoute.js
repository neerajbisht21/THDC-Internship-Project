const express = require('express')
const { registerEmployee, loginUserAsEmployee, loginUserAsAdmin, LogoutUser } = require('../controllers/UserController')

const router = express.Router()

router.post("/register" , registerEmployee)
router.post('/login', loginUserAsEmployee);
router.get("/logout",LogoutUser)

module.exports = router;
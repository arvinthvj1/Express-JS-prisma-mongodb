const express = require('express');
const { createUser, deleteUser, updateUser, login } = require('../controllers/userController');
const { authenticateToken } = require('../auth/authProvider');

const router = express.Router();

router.post("/register",createUser);
router.post("/login",login);

router.use(authenticateToken);


router.post("/updateUser",updateUser);
router.delete("/deletebyemail",deleteUser);



module.exports = router;











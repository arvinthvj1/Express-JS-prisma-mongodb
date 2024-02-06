const express = require('express');
const { createUser, findUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.post("/createUser",createUser);

router.get("/findbyemail",findUser);

router.delete("/deletebyemail",deleteUser);



module.exports = router;











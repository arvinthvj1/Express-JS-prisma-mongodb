const express = require('express');
const { createUser, findUser, deleteUser, updateUser } = require('../controllers/userController');

const router = express.Router();

router.post("/createUser",createUser);
router.post("/updateUser",updateUser);
router.get("/findbyemail",findUser);

router.delete("/deletebyemail",deleteUser);



module.exports = router;











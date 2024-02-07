const express = require('express');
const { createUser, findUser, deleteUser, updateUser } = require('../controllers/userController');

const router = express.Router();

router.post("/register",createUser);
router.get("/login",findUser);

// router.use(auth);
router.post("/updateUser",updateUser);


router.delete("/deletebyemail",deleteUser);



module.exports = router;











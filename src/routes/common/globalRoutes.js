const express = require('express');
const { commonCrudHandler } = require('../../controllers/common/globalData');

const router = express.Router();

router.post("/:page",commonCrudHandler);


module.exports = router;
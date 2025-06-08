const express = require('express');
const router = express.Router();

const { updateFavoriteJobs } = require("../controllers/userController");

router.update("/likedjobs", updateFavoriteJobs);


module.exports = router;
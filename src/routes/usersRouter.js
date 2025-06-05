const express = require('express');
const router = express.Router();

const { createOneUser, logIn } = require("../controllers/userController");

router.post("/createuser", createOneUser);
router.post("/login", logIn);

module.exports = router;

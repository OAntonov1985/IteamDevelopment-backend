const express = require('express');
const router = express.Router();

const { createOneUser, logIn, logOut } = require("../controllers/authController");

router.post("/createprofile", createOneUser);

router.post("/login", logIn);

router.post("/logout", logOut);

module.exports = router;
const express = require('express');
const router = express.Router();

const { getAllJobs, getOneJob, searchJobs } = require("../controllers/jobsController");

router.get("/", getAllJobs);

router.get("/job-details/:id", getOneJob);

router.get("/job-search", searchJobs);



module.exports = router;
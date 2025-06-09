const Job = require('../models/jobModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require("../utils/appError");

const getAllJobs = catchAsync(async (req, res, next) => {
    const { industry } = req.query;
    let matchQuery = {};

    if (industry && industry.toLowerCase() !== 'all') {
        matchQuery = { industry: industry.toLowerCase() };
    }

    const jobs = await Job.aggregate([
        { $match: matchQuery },
        { $sample: { size: 20 } }
    ]);

    if (!jobs || jobs.length === 0) {
        return next(new AppError('Вакансій не знайдено за вказаними критеріями.', 404));
    }

    res.status(200).json({
        status: 'success',
        results: jobs.length,
        data: {
            jobs
        }
    });

});

const getOneJob = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const selectedJob = await Job.findById(id);

    if (!selectedJob) {
        return next(new AppError(`Вакансію по ID ${id} не знайдено.`, 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            selectedJob
        }
    });
});

const searchJobs = catchAsync(async (req, res, next) => {
    const { positionName, industry } = req.query;
    let filter = {};

    if (positionName) {
        filter.positionName = { $regex: positionName, $options: 'i' };
    }

    if (industry) {
        const lowerCaseIndustry = industry.toLowerCase();

        if (lowerCaseIndustry !== 'all') {
            filter.industry = lowerCaseIndustry;
        }
    }

    const jobs = await Job.find(filter);

    if (!jobs || jobs.length === 0) {
        return next(new AppError('Вакансій за вашим запитом не знайдено.', 404));
    }

    res.status(200).json({
        status: 'success',
        results: jobs.length,
        data: {
            jobs
        }
    });
});

module.exports = { getAllJobs, getOneJob, searchJobs };
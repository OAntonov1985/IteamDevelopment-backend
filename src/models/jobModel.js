const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, 'Назва компанії є обов\'язковою'],
        trim: true
    },
    positionName: {
        type: String,
        required: [true, 'Назва посади є обов\'язковою'],
        trim: true
    },
    salary: {
        type: mongoose.Schema.Types.Mixed,
        required: [true, 'Зарплата є обов\'язковою']
    },
    description: {
        type: String,
        required: [true, 'Опис посадових обов\'язків є обов\'язковим'],
        trim: true
    },
    industry: {
        type: String,
        required: [true, 'Індустрія є обов\'язковою'],
        enum: ['it', 'business', 'construction'],
        lowercase: true,
        trim: true
    }
}, {
    timestamps: true
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
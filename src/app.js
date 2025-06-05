const express = require("express");
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const AppError = require("./utils/appError");
const createError = require("./utils/errorController");

const usersRouter = require("./routes/usersRouter");

const app = express();
app.set('trust proxy', 1);

app.use(mongoSanitize());



app.use(express.json());

app.use(morgan("dev"));


app.use(cors({
    origin: [
        "http://localhost:3000",
        'https://ortodont-clinic-frontend.vercel.app',
        /^http:\/\/192\.168\.0\.\d+:\d+$/,
    ],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use('/api/users', usersRouter);


app.all("*", (req, res, next) => {
    next(new AppError(`Cant find url ${req.originalUrl}`, 404));
});

app.use(createError);
module.exports = app;
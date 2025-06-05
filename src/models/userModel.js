const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Будь ласка введіть прізвище ім*я по батькові!'],
        unique: false
    },
    email: {
        type: String,
        required: [true, 'Будь ласка введіть пошту'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Пошта не валідна. Будь ласка введіть валідну пошту example@gmail.com']
    },
    password: {
        type: String,
        required: [true, "Будь ласка введіть пароль"],
        select: false,
        minlength: 6
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Будь ласка підтвердіть введений пароль'],
        select: false,
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Паролі не співпадають!'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },

}, {
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});


userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const Employee = mongoose.model("User", userSchema);

module.exports = Employee;

const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/user.model');

const userRoute = Router();

userRoute.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userAlreadyExists = await UserModel.findOne({ email });
        if (userAlreadyExists?.email) {
            res.send({ 'msg': 'user already exists' })
        }
        else {
            bcrypt.hash(password, 8, async function (err, hash) {
                await UserModel.create({ email, password: hash });
                res.send({ 'msg': 'user successfully signed up' });
            })
        }
    }
    catch (err) {
        console.log('Something went wrong: ', err);
        res.send({ 'err': 'something went wrong' });
    }
});

userRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (user?.email) {
            const hashed_password = user.password;

            bcrypt.compare(password, hashed_password, function (err, result) {
                if (result) {
                    const token = jwt.sign({ userID: user._id }, 'hush');
                    res.send({ 'msg': 'Login successful', 'token': token });
                } else {
                    res.send({ 'msg': 'Invalid password' });
                }
            })
        }
        else {
            res.send({ 'msg': 'Invalid email address' })
        }
    }
    catch (err) {
        console.log('Something went wrong: ', err);
        res.send({ 'err': 'something went wrong' });
    }
});

module.exports = userRoute;
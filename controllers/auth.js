const { response } = require('express');
const { compare, generateSalt, hashPassword } = require('../helpers/auth');
const { createUser, getOneByEmail, updateLastLoginTime } = require('../models/user');
const jwt = require("jsonwebtoken");
const { tokenMaxAgeInSeconds } = require('../constans');

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await getOneByEmail(email);
        const isPasswordMatch = compare(password, user.password, user.salt);
        if (!isPasswordMatch) {
            throw new Error("Password doesn't match");
        }

        if (user.is_blocked) {
            throw new Error("User is blocked");
        }

        await updateLastLoginTime(user.email);
        const token = await jwt.sign({ id: user.id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: tokenMaxAgeInSeconds });
        
        return res.status(200).json({ id: user.id, token: token },
        );
    } catch {
        return res.status(401).json({
            message: "Either user name or password isn't correct"
        })
    }
};

const register = async (req, res = response) => {
    const { email, password, username } = req.body;
    const salt = generateSalt();
    const hash = hashPassword(password, salt);

    try {
        await createUser({ email: email, password: hash.password, username: username, salt: salt })
        res.status(201).json({message: 'user created'})
    }
    catch (e) {
        console.log(e);
        res.status(500).json({message: 'internal server error'})
    }
};

module.exports = { login, register };
const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validationResult } = require('express-validator');
const { login, register } = require('../controllers/auth');


const validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
}

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateInput
], login);

router.post('/register', [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateInput
], register);

module.exports = router;
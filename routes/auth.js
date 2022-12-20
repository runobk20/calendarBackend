/*
    Rutas de usuario / auth
    host + /api/auth
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/fieldValidator');
const { validateJWT } = require('../middlewares/JWTvalidator');

router.post(
	'/new',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Email is required').isEmail(),
		check('password', 'Password should be longer than 6 characters').isLength({
			min: 6,
		}),
		validateFields
	],
	createUser
);

router.post(
    '/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Incorrect password').isLength({min: 6}),
		validateFields
    ] ,
    loginUser);

router.get('/renew', validateJWT, renewToken);

module.exports = router;

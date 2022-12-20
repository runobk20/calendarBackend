const {response, request} = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {

    const token = req.header('x-token')
    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'Not token found on petition'
        });
    }

    try {

        const {uid, name} = jwt.verify(token, process.env.TOKKEN_PRIVATE);

        req.uid = uid;
        req.name = name;

        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid Token'
        })
    }


    next();
}

module.exports = {
    validateJWT
}
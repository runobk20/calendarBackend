const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {

    return new Promise((resolve, reject) => {

        const payload = {uid, name};

        jwt.sign(payload, process.env.TOKKEN_PRIVATE, {
            expiresIn: '2h'
        }, (err, token) => {
            if(err) {
                console.log(err);;
                reject('Can not generate token')
            }

            resolve(token);
        })
    }).catch((err) => {
        console.log(err);
    })
}


module.exports = {
    generateJWT
}
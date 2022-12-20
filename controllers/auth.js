const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async(req, res = response) => {

    const {email, password} = req.body;

    
    try {
        let user = await User.findOne({email});

        if(user) {
            return res.status(400).json({
                ok: false,
                msg: 'Email in use, please use another one'
            })
        }

        user = new User(req.body);

        //Encriptar contaseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
            
        await user.save();

        //Generar token
        const token = await generateJWT(user.id, user.name);
    
        return res.status(201).json({
            ok: true, 
            uid: user.id,
            name: user.name,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Please contact an Admin'
        });
    }

}

const loginUser = async(req, res = response) => {

    const {email, password} = req.body;

    try {

        let user = await User.findOne({email});
        
        if(!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Check your credentials, something is wrong.'
            });
        }

        //Confirmar contraseñas
        const validPassword = bcrypt.compareSync(password, user.password);

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect password'
            });
        }

        //Generar token
        const token = await generateJWT(user.id, user.name);

        return res.status(200).json({
            ok: true, 
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Please contact an Admin'
        });
    }
}

const renewToken = async(req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    const token = await generateJWT(uid, name);

    return res.json({
        ok: true,
        uid,
        name,
        token
    })
}

module.exports = {
    createUser,
    loginUser,
    renewToken   
}
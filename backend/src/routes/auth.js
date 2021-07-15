const router = require('express').Router();
const connection = require('../database/connection');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {loginValidation, registerValidation} = require('../validation');


router.post('/register', async (req, res) => {

    try {
        const {name, email, password} = req.body;
        const id = crypto.randomBytes(8).toString('HEX');

        // validate informations with Joi
        const {error} = registerValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        // Verify email in database
        const emailExists = await connection('users').select('email').where("email", email);
        if (emailExists.length != 0) return res.status(400).send('Email already exists');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await connection('users').insert({
            id: id,
            name: name,
            email: email,
            password: hashedPassword,
        }).catch(function(error) {
            if (error) return res.status(400).send('Erro ao gravar no banco');
        });
        res.send('success');

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
    

});

router.post('/login', async (req, res) => {

    try {
        const {email, password} = req.body;

        // validate informations with Joi
        const {error} = loginValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        // Verify if email exists
        const user = await connection('users').select('*').where("email", email).first();
        if (!user) return res.status(400).send('Email not found');

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send('Invalid password');

        // creating a token
        const token = jwt.sign({ _id: user.id }, process.env.JWT_PASSWORD);
        res.header('Authorization', token).send(token)
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
    

});

module.exports = router;
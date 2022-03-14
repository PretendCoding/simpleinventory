// Imports
if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config();
}
const express = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const router = express.Router();

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.xsu8f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

router.get('/', checkNotAuthentication, (req, res) => {
    res.render('register');
});

router.post('/', checkNotAuthentication, async (req, res) => {
    
    const client = new MongoClient(uri);

    
    try {
        
        await client.connect();

        const oldUser = await client.db("simple_inventory").collection("users").findOne({email: req.body.email});

        if (oldUser !== null) {
            throw 'A user already exists with this email';
        } else {        
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            
            const data = {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            }

            await client.db("simple_inventory").collection("users").insertOne(data);
        }

    } catch (error) {
        console.log(error);
        await client.close();
        res.redirect('/register');
        return;
    } finally {
        await client.close();
    }
    
    res.redirect('/login');
    
});

function checkNotAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }

    next();
}

module.exports = router;
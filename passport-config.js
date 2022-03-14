if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config();
}
const { MongoClient, ObjectId } = require('mongodb');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.xsu8f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

async function getUserByEmail(email) {
    
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const cursor = client.db("simple_inventory").collection("users").findOne({email: email});

        const result = await cursor;

        return result;

    } catch (error) {
        console.log(error)
    } finally {
        await client.close();
    }
}

async function getUserById(id) {
    
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const _id = new ObjectId(id);

        const cursor = client.db("simple_inventory").collection("users").findOne({_id: _id});

        const result = await cursor;

        return result;

    } catch (error) {
        console.log(error)
    } finally {
        await client.close();
    }
}

function initalize(passport) {

    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email);
        if (user == null) {
            return done(null, false, {message: 'No user with that email'});
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, {message:'Password incorrect'});
            }
        } catch (error) {
            return done(error);
        }
    }
    passport.use( new LocalStrategy({usernameField: 'email'}, authenticateUser));
    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser(async (id, done) => {
        const user = await getUserById(id);
        return done(null, user);
    });
}

module.exports = initalize;
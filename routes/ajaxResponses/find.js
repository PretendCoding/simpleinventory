// Imports
if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config();
}
const express = require('express');
const { MongoClient } = require('mongodb');

const router = express.Router();

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.xsu8f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

router.post("/", async (req, res) => {
    
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const cursor = client.db("simple_inventory").collection("inventory").find({});

        const results = await cursor.toArray();

        res.send(results);

    } catch (error) {
        console.log(error)
    } finally {
        await client.close();
    }
    
});

module.exports = router;
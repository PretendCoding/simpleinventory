// Imports
if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config();
}
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const router = express.Router();

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.xsu8f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

router.post("/", async (req, res) => {
    
    const client = new MongoClient(uri);

    // Since we can't import mongodb on the client, if we pass the _id as a string it'll fail, so if we have that present, it's going to be a string
    // and we need to convert it to something the DB can read
    if (req.body._id) {
        req.body._id = new ObjectId(req.body._id);
    }

    try {
        await client.connect();

        // const cursor = client.db("simple_inventory").collection("inventory").find(req.body);

        const result = await client.db("simple_inventory").collection("inventory").updateOne({_id:req.body._id}, {$set:req.body});

        res.send(result);

    } catch (error) {
        console.log(error)
    } finally {
        await client.close();
    }
    
});

module.exports = router;
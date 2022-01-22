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

    const data = {
        itemId: req.body.itemId,
        name: req.body.name,
        unitMeasurement: req.body.unitMeasurement,
        quantity: req.body.quantity
    }

    try {
        await client.connect();
        const insertedItem = await client.db("simple_inventory").collection("inventory").insertOne(data);
        
        const cursor = await client.db("simple_inventory").collection("inventory").findOne(insertedItem.insertedId);

        res.send(cursor);

    } catch (error) {
        console.log(error)
    } finally {
        await client.close();
    }
    
});

module.exports = router;
// Imports
const express = require('express');
const fileupload = require('express-fileupload');
const path = require('path');

const router = express.Router();
const app = express();

app.use(fileupload());

router.post("/", async (req, res) => {

    const image = req.files.image;
    const fileName = req.files.image.name;

    const imagePath = path.join(__dirname, '..', '..', 'public/images/itemImages', fileName);

    image.mv(imagePath, (error) => {
        if (error) {
            console.error(error);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({status: 'error', message: error}));
        }

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({status: 'success', path: '/images/itemImages/' + fileName}));
    });
    
});

module.exports = router;
const express = require('express');
const router = express.Router();
const fs = require('fs');
const uniqueIdGenerator = require('unique-id-generator');

/**
 * normal get without id
 */
router.get('/', (req, res, next) => {
    fs.readFile('./jsonData/data.json', (error, data) => {
        res.status(200).json({
            message: "GET request handlers",
            datiLetti: JSON.parse(data)
        })
    });
});

/**
 * get with json ID
 */
router.get('/:jsonID', (req, res, next) => {
    const jsonID = req.params.jsonID;
    fs.readFile('./jsonData/'+jsonID+'.json', (error, data) => {
        if (error) {
            setResponseMessage(res, 404);
        } else {
            setResponseMessage(res, 200, {
                message: "GET request successfully end",
                object: JSON.parse(data)
            });
        }
    });
});

router.post('/', (req, res, next) => {
    var jsonID = uniqueIdGenerator({prefix:"id-"});
    fs.writeFile('./jsonData/'+jsonID+'.json', "First creation", (error) => {
        if (error) { throw error } else {
            setResponseMessage(res, 201, {
                message: "POST request successfully end",
                howToUse: "Make your request to /json/yourID",
                yourID: jsonID
            });
        }
    });
});

/**
 * normal put without id
 */
router.put('/:jsonID', (req, res, next) => {
    const jsonID = req.params.jsonID;
    if (fs.existsSync('./jsonData/'+jsonID+'.json')) {
        fs.writeFile('./jsonData/'+jsonID+'.json', JSON.stringify(req.body), (error) => {
            if (error) { throw error } else {
                setResponseMessage(res, 200, {
                    message: "PUT request successfully end",
                    object: req.body
                });
            }
        });   
    } else {
        setResponseMessage(res, 404);
    }
});

/**
 * patch with json ID
 */
router.delete('/:jsonID', (req, res, next) => {
    const jsonID = req.params.jsonID;
    res.status(200).json({
        message: "DELETE request handle"
    })
});

/**
 * function that set the return message
 * @param {Response} res
 * @param {INT} status 
 * @param {STRING} message 
 */
function setResponseMessage(res, status, message) {
    res.status(status).json(message)
}

module.exports = router;
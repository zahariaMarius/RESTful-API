const express = require('express');
const fs = require('fs');
const router = express.Router();

/**
 * normal get without id
 */
router.get('/', (req, res, next) => {
    fs.readFile('./jsonData/data.json',  function(error, data) {
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
    fs.readFile('./jsonData/'+jsonID+'.json',  function(error, data) {
        if (error) {
            res.status(404).json({})
        } else {
            res.status(200).json({
                message: "GET request handlers",
                datiLetti: JSON.parse(data)
            })
        }
    });
});

/**
 * normal post without id
 */
router.post('/', (req, res, next) => {
    const jsonData = {
        nome: req.body.nome,
        cognome: req.body.cognome
    };
    res.status(201).json({
        message: "POST request handle",
        object: jsonData
    })
});

/**
 * patch with json ID
 */
router.patch('/:jsonID', (req, res, next) => {
    const jsonID = req.params.jsonID;
    res.status(200).json({
        message: "PATCH request handle"
    })
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

module.exports = router;
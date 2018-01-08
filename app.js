const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const jsonRoutes = require('./api/routers/json');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('X-Powered-By', 'Node.js, Express');
    res.header('X-Version', '1.0.1');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use('/json', jsonRoutes);

app.use((req, res, next) => {
    const error = new Error('Page not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status | 500);
    res.json({
        message: error.message
    })
});

module.exports = app;
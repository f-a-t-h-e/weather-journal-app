// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// putting a port 
const port = 8080;

// Setup Server
const server = app.listen(port, () => {
    console.log('online');
    console.log(`on port : ${port}`);
});

// return the 'projectData'



const data = [];

app.post('/sendFeelings', sendData);

function sendData(req, res) {
    datatwo = {
        zipcode: req.body.zipcode,
        feelings: req.body.feelings
    };
    console.log(datatwo)
    console.log(req.body);
    data.push(req.body);

}

app.post('/sendapi', takeApi);

function takeApi(req, res) {
    projectData = req.body
    console.log(projectData)
}

app.get('/apdateui', updateUi);

function updateUi(req, res) {
    res.send(projectData)
        // console.log('heretwo')
    console.log(projectData)
}
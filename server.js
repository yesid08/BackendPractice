const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./network/routes');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
routes(app);


const uri = "mongodb+srv://yesid08:<password>@learningcluster0.sqdth.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.listen(6001);
console.log('The application is listening in http://localhost:6001');
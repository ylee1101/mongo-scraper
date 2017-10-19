// dependencies
var express = require("express");
var mongojs = requre("mongojs");
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cheerio = require("cheerio");
var request = require("request");

// initialize express
var app = express();

// set up the my app with static public folder
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

// i am not sure if i have to make app.js file in public folder and use this
// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

// connecting to mongoDB
mongoose.connect('mongodb://localhost/data');


 



var PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log("app is listening on PORT: " + PORT);
});

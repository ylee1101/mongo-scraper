// dependencies
var express = require("express");
// var mongojs = require("mongojs");
var bodyParser = require('body-parser');
var morgan = require("morgan");
var mongoose = require('mongoose');

// for Note and Article model files
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// scraping tools
var request = require("request");
var cheerio = require("cheerio");

// initialize express
var app = express();

// set up the my app with static public folder
app.use(express.static("public"));

// to handle only string or array
app.use(bodyParser.urlencoded({ extended: false }));

// needs to go through morgan & env = development env
app.use(morgan("dev"));

// set default path but do i really need this?????
// app.use("/", function(req, res){
//     res.send()
// })

// set up for handlebars
var exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// connecting to mongodb
mongoose.connect('mongodb://heroku_65242qm6:tsqjlntipi06rokeiok79hbfel@ds227865.mlab.com:27865/heroku_65242qm6');

// notification when app is connected or error
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});
  
  // Once logged in to the db through mongoose, log a success message
db.once("open", function() {
    console.log("Mongoose connection successful.");
});

// // for any mongoose errors
// db.on('error', console.error.bind(console, 'connection error:'));

// // for logging successful message
// db.once('open', function() {
//     console.log("mongoose connection successful");
// });

// import routes
var routes = require("./controllers/scraper_controller.js");
app.use("/", routes);

var PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log("app is listening on PORT: " + PORT);
});

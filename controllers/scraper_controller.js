// dependencies
var express = require("express");
var router = express.Router();
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// for Note and Article model files
var Note = require("../models/Note.js");
var Article = require("../models/Article.js");

router.get("/", function(req, res) {
  res.render("index");
});

// to get the articles scraped and save in db and show them in list
router.get("/savedarticles", function(req, res){
    // grab every doc in the articles array
    Article.find({}, function(error, doc){
        if (error) {
            console.log(error);
        }
        // send the doc to the browser
        else {
            var articleObject = {
                articles: doc
            };
            res.render("savedarticles", articleObject);
        }
    });
});

// a GET request to scrape the nytimes website
router.post("/scrape", function(req, res){
    // we need to use cheerio to grab the body of the html with request
    request("http://www.nytimes.com/", function(error, response, html){
        // need to load into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(html);

        // create an empty array for temp saving and howing scraped articles
        var scrapedArticles = {};

        // grab every <h2 class ="story-heading"> !!CHECK!! if story-heading doesnt work, try article h2 or h2
        $("article h2").each(function(i, element){
            // save an empty result object
            var result = {};

            // add the text and href of link and save them as properties of the result object
            result.title = $(this).children("a").text();

            console.log("What is the result title? " + result.title);

            result.link = $(this).children("a").attr("href");

            scrapedArticles[i] = result;
        });

        console.log("Scraped articles object built in good shape: " + scrapedArticles);

        var articleObject = {
            articles: scrapedArticles
        };
        res.render("index", articleObject);
    });
});

// app.get("/scrape", function(req, res) {
//     // First, we grab the body of the html with request
//     axios.get("http://www.echojs.com/").then(function(response) {
//       // Then, we load that into cheerio and save it to $ for a shorthand selector
//       var $ = cheerio.load(response.data);
  
//       // Now, we grab every h2 within an article tag, and do the following:
//       $("article h2").each(function(i, element) {
//         // Save an empty result object
//         var result = {};
  
//         // Add the text and href of every link, and save them as properties of the result object
//         result.title = $(this)
//           .children("a")
//           .text();
//         result.link = $(this)
//           .children("a")
//           .attr("href");
  
//         // Create a new Article using the `result` object built from scraping
//         db.Article
//           .create(result)
//           .then(function(dbArticle) {
//             // If we were able to successfully scrape and save an Article, send a message to the client
//             res.send("Scrape Complete");
//           })
//           .catch(function(err) {
//             // If an error occurred, send it to the client
//             res.json(err);
//           });
//       });
//     });
//   });

router.post("/save", function(req, res){
    console.log("This is the title: " + req.body.title);
    var newArticleObject = {};
    newArticleObject.title = req.body.title;
    newArticleObject.link = req.body.link;
    
    var entry = new Article(newArticleObject);
    console.log("We can save the article: " + entry);

    // save the entry to the db
    entry.save(function(err, doc){
        if (err) {
            console.log(err);
        } 
        else {
            console.log(doc);
        }
    });
    // direct back to saved articles section
    res.redirect("/savedarticles");
});

// delete section
router.get("/delete/:id", function(req, res) {
    
      console.log("ID is getting read for delete" + req.params.id);
    
      console.log("Able to activate delete function.");
    
      Article.findOneAndRemove({"_id": req.params.id}, function (err, offer) {
        if (err) {
          console.log("Not able to delete:" + err);
        } else {
          console.log("Able to delete, Yay");
        }
        res.redirect("/savedarticles");
      });
});

// note section
router.get("/notes/:id", function(req, res) {
    
      console.log("ID is getting read for delete" + req.params.id);
    
      console.log("Able to activate delete function.");
    
      Note.findOneAndRemove({"_id": req.params.id}, function (err, doc) {
        if (err) {
          console.log("Not able to delete:" + err);
        } else {
          console.log("Able to delete, Yay");
        }
        res.send(doc);
      });
});

// grab articles by its ObjectId
router.get("/articles/:id", function(req, res) {
    
      console.log("ID is getting read" + req.params.id);
    
      // Using the id passed in the id parameter, prepare a query that finds the matching one in our db
      Article.findOne({"_id": req.params.id})
    
      .populate('notes')
    
      .exec(function(err, doc) {
        if (err) {
          console.log("Not able to find article and get notes.");
        }
        else {
          console.log("We are getting article and maybe notes? " + doc);
          res.json(doc);
        }
      });
});

// Create a new note or replace an existing note
router.post("/articles/:id", function(req, res) {
    
      // Create a new note and pass the req.body to the entry
      var newNote = new Note(req.body);
      // And save the new note the db
      newNote.save(function(error, doc) {
        if (error) {
          console.log(error);
        } 
        else {
          // Use the article id to find it and then push note
          Article.findOneAndUpdate({ "_id": req.params.id }, {$push: {notes: doc._id}}, {new: true, upsert: true})
    
          .populate('notes')
    
          .exec(function (err, doc) {
            if (err) {
              console.log("Cannot find article.");
            } else {
              console.log("On note save we are getting notes? " + doc.notes);
              res.send(doc);
            }
          });
        }
      });
});

// Export routes for server.js to use.
module.exports = router;


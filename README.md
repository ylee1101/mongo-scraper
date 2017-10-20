# mongo-scraper

control F "CHECK" if app is not working and change it

Overview

In this assignment, you'll create a web app that lets users view and leave comments on the latest news. But you're not going to actually write any articles; instead, you'll flex your Mongoose and Cheerio muscles to scrape news from another site.
Before You Begin

Create a GitHub repo for this assignment and clone it to your computer. Any name will do -- just make sure it's related to this project in some fashion.
Run npm init. When that's finished, install and save these npm packages:
express
express-handlebars
mongoose
body-parser
cheerio
request

In order to deploy your project to Heroku, you must set up an mLab provision. mLab is remote MongoDB database that Heroku supports natively. Follow these steps to get it running:
Create a Heroku app in your project directory.
Run this command in your Terminal/Bash window:
* `heroku addons:create mongolab`

* This command will add the free mLab provision to your project.
You'll need to find the URI string that connects Mongoose to mLab. Run this command to grab that string:
* `heroku config | grep MONGODB_URI`

* Notice the value that appears after `MONGODB_URI =>`. This is your URI string. Copy it to a document for safekeeping.
When you’re ready to connect Mongoose with your remote database, simply paste the URI string as the lone argument of your mongoose.connect() function. That’s it!
Watch this demo of a possible submission. See the deployed demo application here.
Your site doesn't need to match the demo's style, but feel free to attempt something similar if you'd like. Otherwise, just be creative!
Instructions
Create an app that accomplishes the following:
Whenever a user visits your site, the app should scrape stories from a news outlet of your choice and display them for the user. Each scraped article should be saved to your application database. At a minimum, the app should scrape and display the following information for each article:
 * Headline - the title of the article

 * Summary - a short summary of the article

 * URL - the url to the original article

 * Feel free to add more content to your database (photos, bylines, and so on).
Users should also be able to leave comments on the articles displayed and revisit them later. The comments should be saved to the database as well and associated with their articles. Users should also be able to delete comments left on articles. All stored comments should be visible to every user.
Beyond these requirements, be creative and have fun with this!
Tips

Go back to Saturday's activities if you need a refresher on how to partner one model with another.
Whenever you scrape a site for stories, make sure an article isn't already represented in your database before saving it; we don't want duplicates.
Don't just clear out your database and populate it with scraped articles whenever a user accesses your site.
If your app deletes stories every time someone visits, your users won't be able to see any comments except the ones that they post.
Helpful Links

MongoDB Documentation
Mongoose Documentation
Cheerio Documentation
Minimum Requirements

Attempt to complete homework assignment as described in instructions. If unable to complete certain portions, please pseudocode these portions to describe what remains to be completed.
Hosting on Heroku

Now that we have a backend to our applications, we use Heroku for hosting. Please note that while Heroku is free, it will request credit card information if you have more than 5 applications at a time or are adding a database.
Please see Heroku’s Account Verification Information for more details.

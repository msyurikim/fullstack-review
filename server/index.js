const express = require('express');
let app = express();

//I imported these modules:
const Promise = require('bluebird');
let getRepos = require('../helpers/github').getReposByUsername;
let db = require('../database/index');
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/../client/dist'));

//solves problem of empty request body:
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  getRepos(req.body.username, (data) => {
    Promise.resolve(JSON.parse(data))
      .then( (repos) => {
        db.save(repos);
      })
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        res.status(404).end();
      });
  });

});

//doesn't work if url is not /repos --> why?
app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.fetch()
    .then( (repos) => {
      //need to stringify data before passing it to response object
      res.end(JSON.stringify(repos));
    })
    .catch(err => {
      console.log(err);
      res.status(404).end();
    });

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


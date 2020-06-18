const mongoose = require('mongoose');
//https://mongoosejs.com/docs/connections.html
//open a pending connection to "fetcher" database running on localhost
mongoose.connect('mongodb://localhost/fetcher');

//get notified if we connect successfully/ connection error
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error: '));
// db.once('open', console.log.bind(console, 'success!'));

//create schema with/without new keyword
let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: {
    type: Number,
    unique: true
  },
  reponame: String,
  username: String,
  popularity: Number
});

//compile schema into a Model --> makes collection 'repos' in database fetcher
let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  repos.forEach((repo) => {
    var newRepo = new Repo ({
      id: repo.id,
      reponame: repo.name,
      username: repo.owner.login,
      popularity: repo.watchers,   // or watchers.count?
      url: repo.html_url
    });

    newRepo.save()
      //.then()
      .catch(err => console.error(err));

  });

}

let fetch = () => {
  //find() is method for Model class (same method exists for Query class), returns query
  //sort() is method for Query class, returns query
  //limit() is method for Query class, specifies max number of documents query will return
  //then() method for Query class, executes query, returning a Promise
  return Repo.find().sort( {popularity: 'desc'} ).limit(25)
    .then(repos => {
      console.log('repos inside fetch', repos);
      return repos;
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports.save = save;
module.exports.fetch = fetch;
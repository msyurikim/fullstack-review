const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    // method: 'GET',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  //body = data returned from request as a string
  //... then what is res?
  request.get(options, (err, res, body) => {
    if (err) {
      console.log(err);
    } else {
      callback(body);
    }
  });

}

module.exports.getReposByUsername = getReposByUsername;
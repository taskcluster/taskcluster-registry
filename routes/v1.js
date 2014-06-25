var path        = require('path');
var Promise     = require('promise');
var debug       = require('debug')('registry:routes:v1');
var base        = require('taskcluster-base');


/**
 * API end-point for version v1/
 *
 * In this API implementation we shall assume the following context:
 * {
 *   Image:       // Instance of Image from data.js
 *   Repository:  // Instance of Repository from data.js
 *   publisher:   // Publisher from base.Exchanges
 *   auth:        // Instance of taskcluster.Auth
 * }
 */
var api = new base.API({
  title:        "TaskCluster Registry",
  description:  ["Docker registry implementation"].join('\n')
});

// Export api
module.exports = api;

// Declare ping
api.declare({
  method:         'get',
  route:          '/_ping',
  name:           'ping',
  title:          "Ping Server",
  description: [
    "Ping the registry server to see if it's exists."
  ].join('\n')
}, function(req, res) {
  //
  res.setHeader('X-Docker-Registry-Standalone', 'true');
  res.reply(200, true);
});


api.declare({
  method:         'post',
  route:          '/users',
  name:           'createUser',
  title:          "Create User",
  description: [
    "Used by `docker login` when it attempts to create a user",
    "this is not a valid end-point and will always return `400`.",
    "Users are managed by `auth.taskcluster.net`."
  ].join('\n')
}, function(req, res) {
  // Prompt docker to do GET /v1/users, we shall validate clientId/accessToken
  // there instead. As this will print out "Login Succeeded", where as
  // returning 201 here will print out: "Account created...." with a message
  // that tells the user to activate the account.
  res.status(400).json("Username or email already exists");
});

api.declare({
  method:         'get',
  route:          '/users',
  name:           'getusers',
  title:          "Get Users",
  description: [
    "User by `docker login` to validate that a user exists"
  ].join('\n')
}, function(req, res) {
  var token = req.headers['authorization'].substr(6);
  var auth  = new Buffer(token, 'base64').toString();
  var authparts   = auth.split(':');
  var clientId    = authparts[0];
  var accessToken = authparts[1];
  debug("Authenticating user: " + clientId + " and " + accessToken);
  // TODO: validate clientId and accessToken, by loading client from
  // this.auth.getCredentials()
  // Do 401 if authorization failed
  // To 200 if authorization worked
  console.log(req.body);
  res.status(200).json("User list maintained by auth.taskcluster.net");
});


// Load handlers defined in repositories and images
//require('./repositories');
//require('./images');
var api         = require('./v1');
var debug       = require('debug')('registry:routes:repositories');
var S3Stream    = require('streaming-s3');


// Set authorization token to be used...
var setToken = function(res) {
  res.setHeader('X-Docker-Endpoints',  "localhost:4541");
  res.setHeader('X-Docker-Token',      "magic-token");
  res.setHeader('WWW-Authenticate',    "magic-token");
};

api.declare({
  method:         'get',
  route:          '/repositories/:userId/:repository/images',
  name:           '',
  title:          "",
  description: [
    "TODO: Figure out what this does"
  ].join('\n')
}, function(req, res) {
  // Return list of images (and tags)
  // in format: [{id: "..."}, {id: "...", Tag: "..."}]
});


api.declare({
  method:         'put',
  route:          '/repositories/:userId/:repository/',
  name:           '',
  title:          "",
  description: [
    "TODO: Figure out what this does"
  ].join('\n')
}, function(req, res) {
  // Create repository
  // Update list of images held by repository or something like that...
});


api.declare({
  method:         'put',
  route:          '/repositories/:userId/:repository/images',
  name:           '',
  title:          "",
  description: [
    "TODO: Figure out what this does"
  ].join('\n')
}, function(req, res) {
  // Update list of images held by repository or something like that...
  res.reply(204, "");
});



api.declare({
  method:         'get',
  route:          '/repositories/:userId/:repository/tags/',
  name:           '',
  title:          "",
  description: [
    "TODO: Figure out what this does"
  ].join('\n')
}, function(req, res) {
  // Return list of tags
});


api.declare({
  method:         'get',
  route:          '/repositories/:userId/:repository/tags/:tag',
  name:           '',
  title:          "",
  description: [
    "TODO: Figure out what this does"
  ].join('\n')
}, function(req, res) {
  // Report imageId from tags
});


api.declare({
  method:         'put',
  route:          '/repositories/:userId/:repository/tags/:tag',
  name:           '',
  title:          "",
  description: [
    "TODO: Figure out what this does"
  ].join('\n')
}, function(req, res) {
  // Add tag to repo
});


var api         = require('./v1');
var debug       = require('debug')('registry:routes:images');
var S3Stream = require('streaming-s3');


// USE api.declare like in repositories

/*
Authentication issue:
See: https://medium.com/@quayio/your-docker-image-ids-are-secrets-and-its-time-you-treated-them-that-way-f55e9f14c1a4

Basically most docker registries assumes that if you have an imageId then you
have the right to fetch the image.
This reasonable, if we ensure that people can't overwrite existing image layers.

A push goes as follows:

GET /v1/_ping
PUT /v1/repositories/:userId/:repository/
    [{id: "..."}, {id: "...", Tag: "..."}]
    Authenticated with base64(<clientId>:<accessToken>) in authorization header
    Returns a token that is used to authenticate the /v1/images/... requests
    This token could carry <clientId>, <accessToken>, <userId> and <repository>.
    (the returned token could also carry an HMAC signature)
    Note, clientId is what docker uses to authenticate with it has nothing to
    do with userId... Except that each clientId is associated a set of scopes
    in taskcluster-auth that specifies with userId/repositories the clientId
    is allowed to push/pull to/from

For each layer:
GET /v1/images/:imageId/json
    (To see if the layer already exists)
    We may want to force reupload to validate that the uploader is in possession
    of a specific layer. Even though the layer already exists. Specifically,
    this would be smart if we use the repositories property on the Image
    entities from data.js to track which repositories an image belongs to.
    Note, with reuploading we should only upload to validate checksum, not
    overwrite the existing data on S3.

PUT: /v1/images/:imageId/json
PUT: /v1/images/:imageId/layer
PUT: /v1/images/:imageId/checksum
    (To validate uploaded layer)

PUT: /v1/repositories/:userId/:repository/tags/:tag
    (To upload tag)

PUT /v1/repositories/:userId/:repository/images
    []
    (add the empty-set of images to the repository)

*/


app.get('/v1/images/:imageId/json', function(req, res) {
  // Reply with JSON from image or do 404
  res.reply(200, {});
});
app.put('/v1/images/:imageId/json', function(req, res) {
  // Put to JSON from image
});

app.put('/v1/images/:imageId/layer', function(req, res) {
  // Stream layer to S3 and do checksum
  // reply is 200
  // use S3Stream and do sha256 sum while streaming to S3 in chunks...
});

app.put('/v1/images/:imageId/checksum', function(req, res) {
  // Validate checksum of image is correct, if not (and image is validated)
  // delete image
});


app.get('/v1/images/:imageId/layer', function(req, res) {
  // Redirect to signed S3 url
});

app.get('/v1/images/:imageId/ancestry', function(req, res) {
  // Get ancestry from azure table
});



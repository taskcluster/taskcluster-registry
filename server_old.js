var express = require('express');
var _       = require('lodash');
var bodyParser      = require('body-parser');
var path = require('path');
var aws   = require('aws-sdk-promise');
var Promise = require('promise');

var S3Stream = require('streaming-s3');
var uploadOptions = {
  concurrentParts:  3,
  waitTime:         120000,
  retries:          5,
  maxPartSize:      7*1024*1024,
};
var s3_accessKey = process.env.AWS_ACCESS_KEY_ID;
var s3_secretKey = process.env.AWS_SECRET_ACCESS_KEY;

var s3 = new aws.S3({
  accessKeyId:      process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey:  process.env.AWS_SECRET_ACCESS_KEY,
  region:           'us-west-2',
  params: {
    Bucket:         'test-bucket-for-any-garbage'
  }
});
var signUrl = Promise.denodeify(s3.getSignedUrl.bind(s3));


var app = express();
/**


GET: /v1/_ping
GET: /v1/images/:imageId/json
PUT: /v1/images/:imageId/json
  JSON description of image, including parentId
PUT: /v1/images/:imageId/layer
  Binary data
PUT: /v1/images/:imageId/checksum
  x-docker-checksum-payload (sha256 checksum)

PUT: /v1/repositories/:userId/:repository/tags/:tag
  (put latest tag)
  "imageId" (JSON encoded string)

PUT /v1/repositories/:userId/:repository/images
  [{id: "..."}, {id: "...", Tag: "..."}]
GET: /v1/images/:imageId/layer
  Binary data

GET /v1/repositories/:userId/:repository/images
  [{id: "..."}, {id: "...", Tag: "..."}]




Pushing:

GET: /v1/_ping

PUT /v1/repositories/:userId/:repository/
  [{id: "..."}, {id: "...", Tag: "..."}]
   - declare intend to upload (ie. add images to repository)
   - return authentication token for use with rest rest of the request

--- Put layer

GET: /v1/images/:imageId/json
   - Return JSON description of image if exists
   - Security concern, lookup if user is authorized to access image

PUT: /v1/images/:imageId/json
  JSON description of image, including parentId
   - Store JSON (don't overwrite)
   - Validate if exists

PUT: /v1/images/:imageId/layer
  Binary data


PUT: /v1/images/:imageId/checksum
  x-docker-checksum-payload (sha256 checksum)

--- Put tag

PUT: /v1/repositories/:userId/:repository/tags/:tag
  (put latest tag)
  "imageId" (JSON encoded string)

--- Validate

PUT /v1/repositories/:userId/:repository/images


*/

/*
// Parse JSON
app.use(bodyParser.json());

// Add utilities to the res function
app.use(function(req, res, next) {
  // TODO:  All GET requests for /v1/images/.. should have cache control
  // see https://github.com/dotcloud/docker-registry/blob/95344d5545cd16c519ed7eedcfce1876d9f4dad2/docker_registry/images.py#L39
  res.reply = function(code, json) {
    this.setHeader('Cache-Control', 'no-cache');
    this.setHeader('Expires',       '-1');
    this.setHeader('Content-Type',  'application/json');
    this.json(code, json);
  };
  // set token for /v1/repositories requests
  res.setToken = function() {
    this.setHeader('X-Docker-Endpoints',  "localhost:4541");
    this.setHeader('X-Docker-Token',      "magic-token");
    this.setHeader('WWW-Authenticate',    "magic-token");
  };
  next();
});



*/






app.use(function(req, res, next) {
  console.log("--------------------------");
  console.log(req.method + ": " + req.url);
  /*console.log(JSON.stringify(req.headers, null, 2));
  if(req.body) {
    console.log(JSON.stringify(req.body, null, 2));
  }*/
  console.log("--------------------------");
  next();
});

app.put(/^\/v1\/(.*)\/checksum$/, function(req, res) {
  console.log("--------------------------");
  console.log(req.method + ": " + req.url);
  console.log(JSON.stringify(req.headers, null, 2));
  if(req.body) {
    console.log(JSON.stringify(req.body, null, 2));
  }
  console.log("--------------------------");
  res.send(200);
});


app.get("/v1/images/1c7f181e78b90d347996d754ffa38c4c6b395e7cf0388bffffbda00365b45077/json", function(req, res) {
  signUrl('getObject', {
    Bucket:       'test-bucket-for-any-garbage',
    Key:          "v1/images/1c7f181e78b90d347996d754ffa38c4c6b395e7cf0388bffffbda00365b45077/json"
  }).then(function(url) {
    console.log("Redirecting to: " + url);
    res.redirect(303 , url);
  });
  //res.json(200, {"id":"1c7f181e78b90d347996d754ffa38c4c6b395e7cf0388bffffbda00365b45077","parent":"511136ea3c5a64f264b78b5433614aec563103b4d4702f3ba7d4d2698e22c158","created":"2014-02-03T17:31:03.23817072Z","container":"5b46b2136d5c377bd7b1dc96769848fc4349ee0c3695e417ed7cb412965d0d3d","container_config":{"Hostname":"5b46b2136d5c","Domainname":"","User":"","Memory":0,"MemorySwap":0,"CpuShares":0,"AttachStdin":false,"AttachStdout":false,"AttachStderr":false,"PortSpecs":null,"Tty":false,"OpenStdin":false,"StdinOnce":false,"Env":["HOME=/","PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"],"Cmd":["/bin/sh","-c","#(nop) MAINTAINER Tianon Gravi \u003cadmwiggin@gmail.com\u003e - mkimage-debootstrap.sh -i iproute,iputils-ping,ubuntu-minimal -t saucy.tar.xz saucy http://archive.ubuntu.com/ubuntu/"],"Dns":null,"Image":"511136ea3c5a64f264b78b5433614aec563103b4d4702f3ba7d4d2698e22c158","Volumes":null,"VolumesFrom":"","WorkingDir":"","Entrypoint":null,"NetworkDisabled":false,"Privileged":false},"docker_version":"0.6.3","author":"Tianon Gravi \u003cadmwiggin@gmail.com\u003e - mkimage-debootstrap.sh -i iproute,iputils-ping,ubuntu-minimal -t saucy.tar.xz saucy http://archive.ubuntu.com/ubuntu/","config":{"Hostname":"5b46b2136d5c","Domainname":"","User":"","Memory":0,"MemorySwap":0,"CpuShares":0,"AttachStdin":false,"AttachStdout":false,"AttachStderr":false,"PortSpecs":null,"Tty":false,"OpenStdin":false,"StdinOnce":false,"Env":["HOME=/","PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"],"Cmd":null,"Dns":null,"Image":"511136ea3c5a64f264b78b5433614aec563103b4d4702f3ba7d4d2698e22c158","Volumes":null,"VolumesFrom":"","WorkingDir":"","Entrypoint":null,"NetworkDisabled":false,"Privileged":false},"architecture":"x86_64","Size":0});
});

app.put('/v1/repositories/user/repo/tags/latest', function(req, res) {
  res.send(200);
});

app.put('/v1/repositories/user/repo/images', bodyParser.json(), function(req, res) {
  console.log("JSON: " + JSON.stringify(req.body, null, 2));
  res.setHeader('X-Docker-Token', "magic-token");
  res.setHeader('X-Docker-Endpoints', "localhost:4541");
  res.send(204);
});

app.put(/^\/v1\/(.*)$/, bodyParser.json(), function(req, res) {
  console.log("# PUT /v1/")
  if (req.headers['content-type'] == 'application/json') {
    console.log(JSON.stringify(req.body, null, 2));
    res.setHeader('X-Docker-Token', "magic-token");
    res.setHeader('X-Docker-Endpoints', "localhost:4541");
    res.send(200);
    return;
  }

  var prefix = req.url.substr(1);
  console.log("Uploading to: " + prefix);
  //console.log("ContentType:  " + req.headers['content-type']);

  var putstream = new S3Stream(req, s3_accessKey, s3_secretKey, {
    Bucket:       'test-bucket-for-any-garbage',
    Key:          prefix,
    ContentType:  req.headers['content-type'] || 'application/octet-stream'
  }, uploadOptions);

  putstream.on('finished', function(result, stats) {
    //console.log("Response:");
    //console.log(JSON.stringify(result, null, 2));
    //console.log(JSON.stringify(stats, null, 2));
    res.setHeader('X-Docker-Token', "magic-token");
    res.setHeader('X-Docker-Endpoints', "localhost:4541");
    res.send(200);
  });

  putstream.on('error', function(err) {
    //console.log("putstream Error: ");
    //console.log(err);
    res.send(500, "Internal Server Error");
  });

  putstream.begin();
  /*
  signUrl('putObject', {
    Key:          prefix,
    ContentType:  'application/json',
    Expires:      300000
  }).then(function(url) {
    url = url.replace("https://", "http://");
    console.log("Redirecting to: " + url);
    res.redirect(307, url);
  });*/
});

app.use(bodyParser.json());



app.post('/v1/users/', function(req, res) {
  console.log("# /v1/users/");
  res.send(201, "OK");
});

app.put('/v1/repositories/user/repo/', function(req, res) {
  console.log("# /v1/repositories/user/repo/");
  res.setHeader('X-Docker-Token', "magic-token");
  res.setHeader('X-Docker-Endpoints', "localhost:4541");
  res.send(200, "OK");
});

app.get('/v1/_ping', function(req, res) {
  console.log("# _ping");
  res.json(200, {
    standalone:   true
  });
});

app.listen(4541, function() {
  console.log("Listening on port: " + 4541);
});
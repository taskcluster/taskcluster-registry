#!/usr/bin/env node
var path        = require('path');
var Promise     = require('promise');
var debug       = require('debug')('registry:bin:server');
var base        = require('taskcluster-base');
var taskcluster = require('taskcluster-client');
var data        = require('../registry/data');
var v1          = require('../routes/v1');

/** Launch server */
var launch = function(profile) {
  // Load configuration
  var cfg = base.config({
    defaults:     require('../config/defaults'),
    profile:      require('../config/' + profile),
    envs: [
      'registry_publishMetaData',
      'taskcluster_authBaseUrl',
      'taskcluster_credentials_clientId',
      'taskcluster_credentials_accessToken',
      'aws_accessKeyId',
      'aws_secretAccessKey',
      'azureTable_accountUrl',
      'azureTable_accountName',
      'azureTable_accountKey'
    ],
    filename:     'taskcluster-registry'
  });

  // Configure Image and Repository entities
  var Image = data.Image.configure({
    tableName:        cfg.get('registry:imageTableName'),
    credentials:      cfg.get('azureTable')
  });
  var Repository = data.Repository.configure({
    tableName:        cfg.get('registry:repositoryTableName'),
    credentials:      cfg.get('azureTable')
  });

  return Promise.all(
    base.validator(),
    Image.createTable(),
    Repository.createTable()
  ).then(function(values) {
    // Create taskcluster authentication client
    var auth = new taskcluster.Auth({
      baseUrl:      cfg.get('taskcluster:authBaseUrl'),
      credentials:  cfg.get('taskcluster:credentials')
    });
    // Create API router and publish reference if needed
    return v1.setup({
      context: {
        Image:          Image,
        Repository:     Repository,
        auth:           auth
      },
      validator:        values[0],
      authBaseUrl:      cfg.get('taskcluster:authBaseUrl'),
      credentials:      cfg.get('taskcluster:credentials'),
      publish:          cfg.get('registry:publishMetaData') === 'true',
      baseUrl:          cfg.get('server:publicUrl') + '/v1',
      referencePrefix:  'registry/v1/api.json',
      aws:              cfg.get('aws')
    });
  }).then(function(router) {
    // Create app
    var app = base.app({
      port:           Number(process.env.PORT || cfg.get('server:port'))
    });

    // Mount API router
    app.use('/v1', router);

    // Create server
    return app.createServer();
  });
};

// If server.js is executed start the server
if (!module.parent) {
  // Find configuration profile
  var profile = process.argv[2];
  if (!profile) {
    console.log("Usage: server.js [profile]")
    console.error("ERROR: No configuration profile is provided");
  }
  // Launch with given profile
  launch(profile).then(function() {
    debug("Launched server successfully");
  }).catch(function(err) {
    debug("Failed to start server, err: %s, as JSON: %j", err, err, err.stack);
    // If we didn't launch the server we should crash
    process.exit(1);
  });
}

// Export launch in-case anybody cares
module.exports = launch;
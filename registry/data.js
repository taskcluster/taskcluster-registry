var base = require('taskcluster-base');

/** Configure a image Entity subclass */
var Image = base.Entity.configure({
  mapping: [
    {
      key:              'PartitionKey',
      property:         'imageId',
      type:             'string'
    }, {
      // This is always hardcoded to 'image'
      key:              'RowKey',
      type:             'string',
      hidden:           true
    }, {
      key:              'version',
      type:             'string'
    }, {
      key:              'description',
      type:             'json'
    }, {
      key:              'checksum',
      type:             'string'
    }, {
      key:              'validated',
      type:             'json'
    }, {
      key:              'repositories',
      type:             'json'
    }, {
      key:              'ancestry',
      type:             'json'
    }
  ]
});

// RowKey constant for images, used as we don't need a RowKey
var IMAGE_ROW_KEY_CONST = 'image';

// Export Image
exports.Image = Image;

/** Configure a repository Entity subclass */
var Repository = base.Entity.configure({
  mapping: [
    {
      key:              'PartitionKey',
      property:         'repository',
      type:             'string'
    }, {
      // This is always hardcoded to 'repository'
      key:              'RowKey',
      type:             'string',
      hidden:           true
    }, {
      key:              'version',
      type:             'string'
    }, {
      key:              'images',
      type:             'json'
    }, {
      key:              'targs',
      type:             'json'
    }
  ]
});

// RowKey constant for repository, used as we don't need a RowKey
var REPOSITORY_ROW_KEY_CONST = 'repository';

// Export Repository
exports.Repository = Repository;
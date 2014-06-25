module.exports = {
  // Registry Specific configuration
  registry: {
    // Publish references
    publishMetaData:                'false',

    // Name of Image table in azure table storage
    imageTableName:                 'TestImages',

    // Name of Repository table in azure table storage
    repositoryTableName:            'TestRepositories'
  },

  // Server configuration
  server: {
    // Public URL from which the server can be accessed (used for persona)
    // and given to client in end-points header
    publicUrl:                      'http://registry.taskcluster.net',

    // Port to listen for requests on
    port:                           undefined
  },

  // Credentials and baseUrls for TaskCluster components
  taskcluster: {
    // BaseUrl for auth, if default built-in baseUrl isn't to be used
    authBaseUrl:                    undefined,

    // Access credentials
    credentials: {
      clientId:                     undefined,
      accessToken:                  undefined
    }
  },

  // Azure table credentials (usually configured using environment variables)
  azureTable: {
    accountUrl:                     null,
    accountName:                    null,
    accountKey:                     null
  },

  // AWS SDK configuration for publication of schemas and references
  aws: {
    // Access key id (typically configured using environment variables)
    accessKeyId:                    undefined,

    // Secret access key (typically configured using environment variables)
    secretAccessKey:                undefined,

    // Default AWS region, this is where the S3 bucket lives
    region:                         'us-west-2',

    // Lock API version to use the latest API from 2013, this is fuzzy locking,
    // but it does the trick...
    apiVersion:                     '2014-01-01'
  }
};
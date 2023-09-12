const AWS = require('aws-sdk');
const keys = require('../config/keys');

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: keys.s3AccessKeyId,
    secretAccessKey: keys.s3SecretAccessKey,
  },
  region: 'us-west-2',
});

module.exports = app => {
  app.get('/api/upload', (req, res) => {
    s3.getSignedUrl('putObject', {
      Bucket: 'my-blog-bucket-123',
      ContentType: 'jpeg',
    });
  });
};

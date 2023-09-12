const AWS = require('aws-sdk');
const uuid = require('uuid/v5');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: keys.s3AccessKeyId,
    secretAccessKey: keys.s3SecretAccessKey,
  },
  region: 'us-west-2',
});

module.exports = app => {
  app.get('/api/upload', requireLogin, (req, res) => {
    const _key = `${req.user.id}/${uuid()}.jpeg`;

    s3.getSignedUrl('putObject', {
      Bucket: 'my-blog-bucket-123',
      ContentType: 'image/jpeg',
      Key: _key,
    }, (err, url) => res.send({ key: _key, url }));
  });
};

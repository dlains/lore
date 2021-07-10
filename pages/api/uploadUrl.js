import aws from 'aws-sdk';

export default async function handler(req, res) {
  try {
    const spacesEndpoint = new aws.Endpoint(process.env.SPACES_ENDPOINT);

    // TODO: Change to non-deprecated setup.
    const s3 = new aws.S3({
      endpoint: spacesEndpoint,
      accessKeyId: process.env.SPACES_KEY,
      secretAccessKey: process.env.SPACES_SECRET
    });

    const post = await s3.createPresignedPost({
      ACL: 'public-read',
      Bucket: process.env.SPACES_BUCKET,
      ContentType: req.query.type,
      Fields: {
        key: `media/${req.query.file}`,
        acl: 'public-read'
      },
      Expires: 60,
    });
  
    res.status(200).json(post);
  } catch(error) {
    console.error(error);
  }
}
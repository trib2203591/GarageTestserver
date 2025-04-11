import { PutBucketCorsCommand, S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
    region: 'garage', 
    endpoint: 'http://localhost:3900',
    credentials: {
        accessKeyId: 'GK0a637988d31fb3dcf44f7eea',
        secretAccessKey: '64641c8dce3bbd73c14cf16a0a6ba4b71e263a65e051005ded6ebed9ed60433e',
    },
    forcePathStyle: true, // Important for Garage compatibility
});

await s3.send(new PutBucketCorsCommand({
  Bucket: 'test-bucket',
  CORSConfiguration: {
    CORSRules: [
      {
        AllowedHeaders: ['*'],
        AllowedMethods: ['GET', 'PUT', 'POST'],
        AllowedOrigins: ['*'],
        ExposeHeaders: ['ETag'],
        MaxAgeSeconds: 3000,
      },
    ],
  },
}));
// server.js
import express from 'express';
import { S3Client, PutObjectCommand, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { getUploadPresignedURL } from './write.js';


const s3 = new S3Client({
  endpoint: "http://localhost:3900",
  region: "garage",
  credentials: {
      accessKeyId: "GK0a637988d31fb3dcf44f7eea",
      secretAccessKey: "64641c8dce3bbd73c14cf16a0a6ba4b71e263a65e051005ded6ebed9ed60433e"
  },
  forcePathStyle: true
});

const app = express();
const PORT = 3000;

app.use(express.static('public')); 

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});



app.get('/get-presigned-url', async (req, res) => {
    const { filename } = req.query;
    const {signedURL, key} = await getUploadPresignedURL('test-bucket', filename);
    res.json({ signedURL, key });
});

app.get('/list-images', async (req, res) => {
    try {
      const command = new ListObjectsV2Command({
        Bucket: 'test-bucket',
      });
  
      const result = await s3.send(command);
      const images = [];
  
      if (result.Contents) {
        for (const obj of result.Contents) {
          const getCommand = new GetObjectCommand({
            Bucket: 'test-bucket',
            Key: obj.Key,
          });
  
          const url = await getSignedUrl(s3, getCommand, { expiresIn: 300 }); // 5 minutes
          images.push(url);
        }
      }
  
      res.json({ images });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to list images' });
    }
  });
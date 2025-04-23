// server.js
import express from 'express';
import { ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import { deleteObject } from './test/deleteObject.js';
import { s3Instance, bucketName } from './s3client.js';
import { getUploadPresignedURL } from './test/getSignedUrl.js';


const app = express();
const PORT = 3000;

app.use(express.static('public')); 
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});



app.get('/get-presigned-url', async (req, res) => {
    const { filename } = req.query;
    const {signedURL, key} = await getUploadPresignedURL(bucketName, filename);
    res.json({ signedURL, key });
});

app.get('/list-images', async (req, res) => {
    try {
      const command = new ListObjectsV2Command({
        Bucket: bucketName,
      });
  
      const result = await s3Instance.send(command);
      const images = [];
      if (result.Contents) {
        for (const obj of result.Contents) {
  
          const url = "http://aws-s3-bucket.103.221.220.183.nip.io:3902/" + obj.Key;
          images.push(url);
        }
      }
  
      res.json({ images });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to list images' });
    }
  });

app.delete('/delete-image', async (req, res) => {
  try {
    console.log(req.body);
    const { key } = req.body;
    await deleteObject({ bucketName, key });
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete images' });
  }
});
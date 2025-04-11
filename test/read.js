import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";

const streamPipeline = promisify(pipeline);

const s3 = new S3Client({
    endpoint: "http://localhost:3900",
    region: "garage",
    credentials: {
        accessKeyId: "GK0a637988d31fb3dcf44f7eea",
        secretAccessKey: "64641c8dce3bbd73c14cf16a0a6ba4b71e263a65e051005ded6ebed9ed60433e"
    },
    forcePathStyle: true
});

async function downloadImage() {
  const command = new GetObjectCommand({
    Bucket: "test-bucket",
    Key: "image.jpg",
  });

  const response = await s3.send(command);

  await streamPipeline(response.Body, fs.createWriteStream("downloaded.jpg"));
  console.log("✅ Image downloaded to downloaded.jpg");
}

downloadImage().catch(console.error);
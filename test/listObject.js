import { s3Instance } from "../s3client.js";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { bucketName } from "../s3client.js";

const listObjectCommand = new ListObjectsV2Command({
    Bucket: bucketName,
});
const { Contents } = await s3Instance.send(listObjectCommand);
  const contentsList = Contents.map((c) => ` • ${c.Key}`).join("\n");
  console.log("\nHere's a list of files in the bucket:");
  console.log(`${contentsList}\n`);
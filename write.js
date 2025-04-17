import { S3Client, PutObjectCommand, ListObjectsCommand, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { GetBucketCorsCommand, PutBucketCorsCommand } from "@aws-sdk/client-s3";
import { randomUUID, sign } from "crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";

const s3 = new S3Client({
    endpoint: "http://localhost:3900",
    region: "garage",
    credentials: {
        accessKeyId: "GK0a637988d31fb3dcf44f7eea",
        secretAccessKey: "64641c8dce3bbd73c14cf16a0a6ba4b71e263a65e051005ded6ebed9ed60433e"
    },
    forcePathStyle: true
});
s3.middlewareStack.addRelativeTo(
    (next, context) => async (args) => {
      if (args.request && args.request.headers) {
        delete args.request.headers["x-amz-sdk-checksum-algorithm"];
        delete args.request.headers["x-amz-checksum-crc32"];
        delete args.request.headers["x-amz-checksum-crc32c"];
        delete args.request.headers["x-amz-checksum-sha1"];
        delete args.request.headers["x-amz-checksum-sha256"];
      }
      return next(args);
    },
    {
      relation: "before",
      toMiddleware: "awsAuthMiddleware",
      name: "stripChecksumHeadersMiddleware",
    }
  );

    export const getUploadPresignedURL = async (bucketName, filename) => {
        const prefix = randomUUID();
        const key = `${prefix}-${filename}`;
        const getPutSignedURLCommand = new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            ChecksumAlgorithm: null
        });
        const signedURL = await getSignedUrl(s3, getPutSignedURLCommand, { expiresIn: 300 });

        return {signedURL, key};
    }

    export const getDeletePresignedURL = async (bucketName, filename) => {
        const prefix = randomUUID();
        const key = `${prefix}-${filename}`;
        const getPutSignedURLCommand = new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            ChecksumAlgorithm: null
        });
        const signedURL = await getSignedUrl(s3, getPutSignedURLCommand, { expiresIn: 300 });

        return {signedURL, key};
    }

const getPutSignedURLCommand = new PutObjectCommand({
    Bucket: "test-bucket",
    Key: "3gER9rs.jpg",
    ContentType: "image/jpeg"
});

const getGetSignedURLCommand = new GetObjectCommand({
    Bucket: "test-bucket",
    Key: "3gER9rs.jpg"
})







// const command = new PutObjectCommand({
//     Bucket: "test-bucket",
//     Key: "test3.png",
//     Body: fs.readFileSync("./test3.jpg"),
//     ContentType: "image/*",
    
// });


const listObjectCommand = new ListObjectsV2Command({
    Bucket: "test-bucket"
});

const { Contents } = await s3.send(listObjectCommand);
  const contentsList = Contents.map((c) => ` • ${c.Key}`).join("\n");
  console.log("\nHere's a list of files in the bucket:");
  console.log(`${contentsList}\n`);

// const GetCORS = new GetBucketCorsCommand({
//     Bucket: "test-bucket",
//   });
//   const { CORSRules } = await s3.send(GetCORS);
//   console.log(JSON.stringify(CORSRules));
//   CORSRules.forEach((cr, i) => {
//     console.log(
//       `\nCORSRule ${i + 1}`,
//       `\n${"-".repeat(10)}`,
//       `\nAllowedHeaders: ${cr.AllowedHeaders}`,
//       `\nAllowedMethods: ${cr.AllowedMethods}`,
//       `\nAllowedOrigins: ${cr.AllowedOrigins}`,
//       `\nExposeHeaders: ${cr.ExposeHeaders}`,
//       `\nMaxAgeSeconds: ${cr.MaxAgeSeconds}`,
//     );
//   });

//   await s3.send(
//     new PutBucketCorsCommand({
//       Bucket: "test-bucket",
//       CORSConfiguration: {
//         CORSRules: [
//           {
//             // Allow all headers to be sent to this bucket.
//             AllowedHeaders: ["*"],
//             // Allow only GET and PUT methods to be sent to this bucket.
//             AllowedMethods: ["HEAD",
//             "GET",
//             "PUT",
//             "POST",
//             "DELETE"],
//             // Allow only requests from the specified origin.
//             AllowedOrigins: ["*"],
//             // Allow the entity tag (ETag) header to be returned in the response. The ETag header
//             // The entity tag represents a specific version of the object. The ETag reflects
//             // changes only to the contents of an object, not its metadata.
//             ExposeHeaders: ["ETag"],
//             // How long the requesting browser should cache the preflight response. After
//             // this time, the preflight request will have to be made again.
//             MaxAgeSeconds: 3600
//           },
//         ],
//       },
//     }),
//   );

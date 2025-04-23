import { S3Client } from "@aws-sdk/client-s3";

import dotenv from "dotenv";
dotenv.config();

const s3 = new S3Client({
    endpoint: process.env.GARAGE_S3_END_POINT,
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
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


export const s3Instance = s3;
export const bucketName = process.env.BUCKET_NAME;

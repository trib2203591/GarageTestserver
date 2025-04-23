import { s3Instance, bucketName } from "../s3client.js";
import { PutBucketCorsCommand } from "@aws-sdk/client-s3";

  await s3Instance.send(
    new PutBucketCorsCommand({
      Bucket: bucketName,
      CORSConfiguration: {
        CORSRules: [
          {
            // Allow all headers to be sent to this bucket.
            AllowedHeaders: ["*"],
            // Allow only GET and PUT methods to be sent to this bucket.
            AllowedMethods: ["HEAD",
            "GET",
            "PUT",
            "POST",
            "DELETE"],
            // Allow only requests from the specified origin.
            AllowedOrigins: ["*"],
            // Allow the entity tag (ETag) header to be returned in the response. The ETag header
            // The entity tag represents a specific version of the object. The ETag reflects
            // changes only to the contents of an object, not its metadata.
            ExposeHeaders: ["ETag"],
            // How long the requesting browser should cache the preflight response. After
            // this time, the preflight request will have to be made again.
            MaxAgeSeconds: 3600
          },
        ],
      },
    }),
  );
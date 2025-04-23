import { s3Instance, bucketName } from "../s3client.js";
import { GetBucketCorsCommand } from "@aws-sdk/client-s3";

const GetCORS = new GetBucketCorsCommand({
    Bucket: bucketName,
  });
  const { CORSRules } = await s3Instance.send(GetCORS);
  console.log(JSON.stringify(CORSRules));
  CORSRules.forEach((cr, i) => {
    console.log(
      `\nCORSRule ${i + 1}`,
      `\n${"-".repeat(10)}`,
      `\nAllowedHeaders: ${cr.AllowedHeaders}`,
      `\nAllowedMethods: ${cr.AllowedMethods}`,
      `\nAllowedOrigins: ${cr.AllowedOrigins}`,
      `\nExposeHeaders: ${cr.ExposeHeaders}`,
      `\nMaxAgeSeconds: ${cr.MaxAgeSeconds}`,
    );
  });
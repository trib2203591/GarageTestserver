import { s3Instance } from "../s3client.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID, sign } from "crypto";

export const getUploadPresignedURL = async (bucketName, filename) => {
    const prefix = randomUUID();
    const key = `${prefix}-${filename}`;
    const getPutSignedURLCommand = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        ChecksumAlgorithm: null
    });
    const signedURL = await getSignedUrl(s3Instance, getPutSignedURLCommand, { expiresIn: 300 });

    return {signedURL, key};
}
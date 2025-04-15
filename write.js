import { S3Client, PutObjectCommand, ListObjectsCommand, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
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


export const getUploadPresignedURL = async (bucketName, filename) => {
    const prefix = randomUUID();
    const key = `${prefix}-${filename}`;
    const getPutSignedURLCommand = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        ContentType: "image/*"
    });

    const signedURL = await getSignedUrl(s3, getPutSignedURLCommand, { expiresIn: 3000 });
    const result = {
        key,
        signedURL
    }
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







const command = new PutObjectCommand({
    Bucket: "test-bucket",
    Key: "test3.png",
    Body: fs.readFileSync("./test3.jpg"),
    ContentType: "image/*",
    
});

await s3.send(command);

const listObjectCommand = new ListObjectsV2Command({
    Bucket: "test-bucket"
});


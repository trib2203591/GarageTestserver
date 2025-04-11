import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
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

const command = new PutObjectCommand({
    Bucket: "test-bucket",
    Key: "3gER9rs.jpg",
    Body: fs.readFileSync("./3gER9rs.jpg"),
    ContentType: "image/jpeg"
});

s3.send(command)
    .then((response) => {
        console.log("Image uploaded successfully:", response);
    })
    .catch((error) => {
        console.error("Error uploading image:", error);
    });
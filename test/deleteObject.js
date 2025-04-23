
import { DeleteObjectCommand, S3ServiceException, waitUntilObjectNotExists } from "@aws-sdk/client-s3";
import { s3Instance } from "../s3client.js";


export const deleteObject = async ({ bucketName, key }) => {
    try {
        await s3Instance.send(
            new DeleteObjectCommand({
                Bucket: bucketName,
                Key: key,
            }),
        );

        console.log(
            `The object "${key}" from bucket "${bucketName}" was deleted, or it didn't exist.`,
        );
    } catch (caught) {
        if (
            caught instanceof S3ServiceException &&
            caught.name === "NoSuchBucket"
        ) {
            console.error(
                `Error from S3 while deleting object from ${bucketName}. The bucket doesn't exist.`,
            );
        } else if (caught instanceof S3ServiceException) {
            console.error(
                `Error from S3 while deleting object from ${bucketName}.  ${caught.name}: ${caught.message}`,
            );
        } else {
            throw caught;
        }
    }
};

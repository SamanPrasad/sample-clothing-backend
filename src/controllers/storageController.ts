import AWS from "aws-sdk";
import dotenv from "dotenv";
import { Request, Response } from "express";
dotenv.config();

export const getS3url = async (req: Request, res: Response) => {
  const s3Client = new AWS.S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `products/${Date.now()}.jpg`, // unique filename
    Expires: 60,
    ContentType: "image/jpeg",
  };

  const uploadURL = await s3Client.getSignedUrlPromise("putObject", params);
  res.send({ uploadURL });
};

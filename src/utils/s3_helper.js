/* eslint-disable require-jsdoc */
import dotenv from 'dotenv'
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config()

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.BUCKET_SECRET_KEY
  },
  region: process.env.BUCKET_REGION
})

class s3_helper {
  static async s3_objPut(Key, Body, ContentType) {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key,
      Body,
      ContentType
    }
    const command = new PutObjectCommand(params)
    try {
      await s3.send(command)
      return true
    } catch (error) {
      return false
    }
  }

  static async generateUrl(img) {
    const getObjectParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: img
    }
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return url
  }
}

export default s3_helper

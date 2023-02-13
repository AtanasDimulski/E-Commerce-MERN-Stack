const {S3Client, PutObjectCommand} = require("@aws-sdk/client-s3")
require('dotenv').config()

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
})

 async function paramsFunction(files) {
    let params = files.map(file =>{
        return {
            Bucket: bucketName,
            Key: file.originalname,
            Body: file.buffer
        }
    })
    
    await Promise.all(
        params.map((param) => s3.send(new PutObjectCommand(param)))
    )
}

module.exports = paramsFunction

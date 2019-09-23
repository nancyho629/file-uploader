require('dotenv').config()
// require AWS SDK for Node.js
const AWS = require('aws-sdk')
const fs = require('fs')

// Config AWS
AWS.config.update({region: 'us-east-1'})
// console.log(AWS)

const s3 = new AWS.S3({apiVersion: '2006-03-01'})
console.log(s3)

const uploadParams = {
  Bucket: process.env.BUCKET_NAME,
  Key: 'anything',
  Body: '',
  ACL: 'public-read'
}

const fileStream =
fs.createReadStream(process.argv[2])

fileStream.on('error', function (err) {
  console.log('file error', err)
})

uploadParams.Body = fileStream

s3.upload(uploadParams, function (err, data) {
  if (err) {
    console.log('Error', err)
  } else if (data) {
    console.log('Upload Success', data.Location)
  }
})

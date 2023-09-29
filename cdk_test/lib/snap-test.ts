import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as s3 from 'aws-cdk-lib/aws-s3'

export class S3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id)

    new s3.Bucket(this, 'sampleID', {
      bucketName: '2023-09-24-sample-bucket',
      versioned: true,
    })
  }
}

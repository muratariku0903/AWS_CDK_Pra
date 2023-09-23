import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as s3 from 'aws-cdk-lib/aws-s3'

export class S3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // s3 bucket
    new s3.Bucket(this, 'msS3bucketId', {
      bucketName: 'ms-s3-bucket-oppai',
    })
  }
}

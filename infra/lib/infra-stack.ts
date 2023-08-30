import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
// import * as s3 from 'aws-cdk-lib/aws-s3'
// import * as db from 'aws-cdk-lib/aws-dynamodb'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as cloudWatch from 'aws-cdk-lib/aws-cloudwatch'

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // S3
    // const bucket = new s3.Bucket(this, 'murataTestS3Bucket', {
    //   bucketName: 'murata-test-s3-bucket',
    //   versioned: false,
    //   publicReadAccess: false,
    // })
    // console.log(bucket)

    // dynamoDB
    // const table = new db.Table(this, 'murataTestDynamoDB', {
    //   tableName: 'murata-test-dynamoDB-sex',
    //   readCapacity: 3,
    //   writeCapacity: 3,
    //   partitionKey: { name: 'sex', type: db.AttributeType.STRING },
    // })

    // lambda
    const func = new lambda.Function(this, 'murataTestLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('../services/'),
      functionName: 'murataTestFunction',
    })
    console.log(func)

    // cloudwatch for lambda
    const watch = new cloudWatch.Alarm(this, 'murataTestCloudWatch', {
      evaluationPeriods: 1,
      threshold: 1,
      metric: func.metricErrors(),
    })
    console.log(watch)
  }
}

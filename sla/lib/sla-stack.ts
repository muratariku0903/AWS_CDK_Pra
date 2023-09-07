import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import path = require('path')

export class SlaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // s3 using l2 constructs
    new s3.Bucket(this, 'slaS3Bucket', {
      bucketName: 'sla-s3-bucket',
    })

    // // s3 bucket using l1 constructs
    // new s3.CfnBucket(this, 'L1S3Bucket', {
    //   bucketName: 'l1s3bucket',
    //   versioningConfiguration: { status: 'Enabled' },
    // })

    // iam
    const role = new iam.Role(this, 'slaIAM', {
      roleName: 'slaLambdaRole',
      description: 'role for lambda to access s3 bucket',
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    })
    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'))

    // lambda
    const slaFunction = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'slaLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: path.join(__dirname, '../handlers/sla.ts'),
      role: role,
    })

    // apigateway
    const slaApi = new apigateway.LambdaRestApi(this, 'slaApi', {
      handler: slaFunction,
      restApiName: 'slaApi',
      deploy: true,
      proxy: false,
    })
    const status = slaApi.root.addResource('slaStatus')
    status.addMethod('GET')
  }
}

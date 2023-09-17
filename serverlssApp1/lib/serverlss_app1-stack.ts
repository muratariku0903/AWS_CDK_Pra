import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as s3n from 'aws-cdk-lib/aws-s3-notifications'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import path = require('path')

export class ServerlssApp1Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const roleForLambda = new iam.Role(this, 'sa1RoleId', {
      roleName: 'lambdaRole',
      description: 'role for lambda service',
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    })
    roleForLambda.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'))
    roleForLambda.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'))
    roleForLambda.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('CloudWatchFullAccess'))

    const sa1Lambda = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'sa1LambdaId', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: path.join(__dirname, '../handlers/sa1.ts'),
      role: roleForLambda,
    })
    sa1Lambda.node.addDependency(roleForLambda)

    const sa1Bucket = new s3.Bucket(this, 'sa1BucketId', {
      bucketName: 'sa1-s3-bucket',
    })
    sa1Bucket.addEventNotification(s3.EventType.OBJECT_CREATED, new s3n.LambdaDestination(sa1Lambda))

    new dynamodb.Table(this, 'sa1DynamoDBId', {
      tableName: 'sa1-table',
      partitionKey: { name: 'id', type: dynamodb.AttributeType.NUMBER },
    })
  }
}

import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as iam from 'aws-cdk-lib/aws-iam'

export class IAMRoleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // iam role
    new iam.Role(this, 'msRoleId', {
      roleName: 'msRoleForLambda',
      description: 'role for to access S3 bucket',
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    })
  }
}

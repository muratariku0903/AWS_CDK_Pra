import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as iam from 'aws-cdk-lib/aws-iam'

export class SecurityStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const role = new iam.Role(this, 'tmpRoleId', {
      roleName: 'ec2Role',
      description: 'role for EC2',
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
    })
    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'))

    new cdk.CfnOutput(this, 'exportTmpRoleId', {
      value: role.roleArn,
      description: 'iam role for ec2',
      exportName: 'exportedIamRoleForEC2',
    })
  }
}

import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as ssm from 'aws-cdk-lib/aws-ssm'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class SsmStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    new ssm.StringParameter(this, 'tmpSsmParameters', {
      parameterName: '/vpc/vpcId',
      stringValue: 'vpc-0fe46a5698d534422',
    })
  }
}

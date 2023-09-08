import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as ec2 from 'aws-cdk-lib/aws-ec2'

export class CwStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // create an s3 bucket
    const bucket = new s3.Bucket(this, 'CWS3', {
      versioned: true,
      bucketName: 'cw-s3',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    })

    // create a vpc
    const vpc = new ec2.Vpc(this, 'CwVpc', {
      natGateways: 0,
      vpcName: 'CwVpc',
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'ingress',
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: 'application',
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
        {
          cidrMask: 28,
          name: 'rds',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
      ],
    })

    // create an RDS instance
    const rds = new cdk.aws_rds.DatabaseInstance(this, 'CwRds', {
      engine: cdk.aws_rds.DatabaseInstanceEngine.MYSQL,
      vpc: vpc,
      databaseName: 'CwRds',
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      },
    })
  }
}

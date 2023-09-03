import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as ec2 from 'aws-cdk-lib/aws-ec2'

export class WebServerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // vpc and subnet
    const vpc = new ec2.Vpc(this, 'murataWebServerVPCId', {
      vpcName: 'murataWebServerVPC',
      ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
      natGateways: 0,
    })

    // security group
    const sgName = 'allowHttpTraffic'
    const sg = new ec2.SecurityGroup(this, 'murataWebServerSGId', {
      vpc: vpc,
      securityGroupName: sgName,
      allowAllOutbound: true,
    })
    sg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), sgName)
  }
}

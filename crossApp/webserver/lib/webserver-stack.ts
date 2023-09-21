import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import { readFileSync } from 'fs'
import * as ssm from 'aws-cdk-lib/aws-ssm'

export class WebserverStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, {
      ...props,
      env: {
        account: '262115391162',
        region: 'ap-northeast-1',
      },
    })

    const vpcId = ssm.StringParameter.valueFromLookup(this, '/vpc/vpcId')

    const vpc = ec2.Vpc.fromLookup(this, 'newVpc', { vpcId: vpcId })
    const sg = new ec2.SecurityGroup(this, 'tmpSg', {
      vpc: vpc,
      securityGroupName: 'allow http traffic',
      allowAllOutbound: true,
    })
    sg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'allow http traffic')

    const demoEc2 = new ec2.Instance(this, 'tmpEC2', {
      vpc: vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
      securityGroup: sg,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: new ec2.AmazonLinuxImage({ generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2 }),
      keyName: 'murata-key-02',
    })

    const userData = readFileSync('./lib/userdata.sh', 'utf-8')
    demoEc2.addUserData(userData)
  }
}

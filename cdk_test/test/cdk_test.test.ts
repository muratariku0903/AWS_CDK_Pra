import * as cdk from 'aws-cdk-lib'
import { Match, Template } from 'aws-cdk-lib/assertions'
import * as CdkTest from '../lib/cdk_test-stack'
import { CdkTestStack } from '../lib/cdk_test-stack'
import { S3Stack } from '../lib/snap-test'

// assertion test
// test('S3 test', () => {
//   const app = new cdk.App()
//   // WHEN
//   const stack = new CdkTest.CdkTestStack(app, 'MyTestStack')
//   // THEN
//   const template = Template.fromStack(stack)
//   template.hasResourceProperties('AWS::S3::Bucket', {
//     BucketName: '2023-09-24-sample-bucket',
//     VersioningConfiguration: {
//       Status: 'Enabled',
//     },
//   })
// })

// snapshot test
describe('snapshot test', () => {
  test('s3 snapshot test', () => {
    const app = new cdk.App()
    const stack = new S3Stack(app, 'sampleID')

    const template = Template.fromStack(stack)
    expect(template.toJSON()).toMatchSnapshot()
  })
})

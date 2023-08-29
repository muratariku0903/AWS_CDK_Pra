#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { InfraStack } from '../lib/infra-stack'

const app = new cdk.App()
new InfraStack(app, 'InfraStack', {
  // env: { account: '262115391162', region: 'ap-northeast-1' },
})

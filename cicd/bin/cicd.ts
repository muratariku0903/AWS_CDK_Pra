#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { CicdStack } from '../lib/cicd-stack'

const app = new cdk.App()
new CicdStack(app, 'CicdStack', {
  env: {
    account: '262115391162',
    region:'ap-northeast-1'
  }
})

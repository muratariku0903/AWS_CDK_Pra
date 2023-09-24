#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { TpStack } from '../lib/tp-stack'

const app = new cdk.App()
new TpStack(app, 'TpStack', {
  terminationProtection: false,
})

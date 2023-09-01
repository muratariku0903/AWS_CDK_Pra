#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { SlaStack } from '../lib/sla-stack'

const app = new cdk.App()
new SlaStack(app, 'SlaStack', {})

import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { CodePipeline, CodePipelineSource, ShellStep, ManualApprovalStep } from 'aws-cdk-lib/pipelines'
import { PipelineAppStage } from './app-stage-stack'

export class CicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // aws ci-cd project
    const pipeline = new CodePipeline(this, 'demopipeline', {
      pipelineName: 'murapipe',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('muratariku0903/AWS_CDK_Pra', 'master', {
          authentication: cdk.SecretValue.secretsManager('github-pipeline-token', { jsonField: 'github-token' }),
        }),
        commands: ['cd cicd', 'npm ci', 'npm run build', 'npx cdk synth'],
        primaryOutputDirectory: 'cicd/cdk.out',
      }),
      dockerEnabledForSynth: true,
      dockerEnabledForSelfMutation: true,
    })

    const testStage = pipeline.addStage(
      new PipelineAppStage(this, 'test', {
        env: { account: '262115391162', region: 'ap-northeast-1' },
      })
    )

    const prodStage = pipeline.addStage(
      new PipelineAppStage(this, 'prod', {
        env: { account: '262115391162', region: 'ap-northeast-1' },
      })
    )
  }
}

import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines'

export class CicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // aws ci-cd project
    new CodePipeline(this, 'demopipeline', {
      pipelineName: 'murapipe',
      synth: new ShellStep('synth', {
        input: CodePipelineSource.gitHub('muratariku0903/AWS_CDK_Pra', 'main'),
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
      }),
    })
  }
}

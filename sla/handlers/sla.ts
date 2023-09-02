import { S3 } from 'aws-sdk'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

const s3 = new S3()

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const bucketName = 'sla-s3-bucket'
  const fileKey = 'sample.json'

  try {
    // s3からJSONファイルを読み込む
    const data = await s3.getObject({ Bucket: bucketName, Key: fileKey }).promise()

    // データを文字列に変換
    const content = data.Body!.toString('utf-8')

    // 文字列をJSONに変換
    const jsonContent = JSON.parse(content)

    console.log(jsonContent)

    return {
      statusCode: 200,
      body: JSON.stringify(jsonContent),
    }
  } catch (e) {
    console.error(e)

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'internal server error.' }),
    }
  }
}

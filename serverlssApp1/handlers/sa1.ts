import { S3, DynamoDB } from 'aws-sdk'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

const s3 = new S3()
const dynamoDB = new DynamoDB()

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const bucketName = 'sa1-s3-bucket'
  const fileKey = 'sa1-sample.json'
  const tableName = 'sa1-table'

  try {
    // s3からJSONファイルを読み込む
    const data = await s3.getObject({ Bucket: bucketName, Key: fileKey }).promise()
    if (!data) {
      throw new Error('fail get data from s3')
    }

    // データを文字列に変換
    const content = data.Body!.toString('utf-8')

    // 文字列をJSONに変換
    const jsonContent = JSON.parse(content)
    console.log(jsonContent)
    const id = jsonContent['id'].toString()
    const name = jsonContent['name'].toString()
    const age = jsonContent['age'].toString()

    // dynamoDBに格納するデータ形式を用意
    const saveItem: DynamoDB.Put['Item'] = {
      id: {
        N: id,
      },
      name: {
        S: name,
      },
      age: {
        N: age,
      },
    }
    console.log(saveItem)

    await dynamoDB.putItem({ TableName: tableName, Item: saveItem }).promise()

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'success' }),
    }
  } catch (e) {
    console.error(e)

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'internal server error.' }),
    }
  }
}

import { document } from "../utils/dynamodbClient";


export const handle = async (event) => {
    const userid = event.pathParameters.userid;
    
    try {
        const result = await document.query({
            TableName: "table_create",
            KeyConditionExpression: "userid = :id",
            ExpressionAttributeValues: {
                ":id": userid,
            },
        }).promise();
        console.log(result);
        
        return {
            statusCode: 201,
            body: JSON.stringify({
                message: result.Items,
            }),
            headers: {
                "Content-type": "application/json",
            },
        }
    } catch (e) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: `Erro: ${e}`,
            }),
            headers: {
                "Content-type": "application/json",
            },
        }
    }
}
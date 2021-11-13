import { document } from "../utils/dynamodbClient";

interface ICreate {
    id: string;
    title: string;
    deadline: Date;
};

export const handle = async (event) => {
    // console.log(event);

    const { id, title, deadline } = JSON.parse(event.body) as ICreate;
    const userid = event.pathParameters.userid;

    try {
        const result = await document.put({
            TableName: "table_create",
            Item: {
                userid,
                id,
                title,
                done: false,
                deadline: new Date(deadline),
            },
        }).promise();

        console.log(result);

        return {
            statusCode: 201,
            body: JSON.stringify({
                message: "Created!!!",
                table: result
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
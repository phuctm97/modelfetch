import handle from "@modelfetch/aws-lambda";

import server from "./server";

export const handler: AWSLambda.LambdaFunctionURLHandler = handle(server);

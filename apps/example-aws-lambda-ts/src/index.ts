import handle from "@modelfetch/aws-lambda";

import server from "./server";

export const handler: AWSLambda.Handler = handle(server);

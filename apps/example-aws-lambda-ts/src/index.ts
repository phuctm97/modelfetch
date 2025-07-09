import type { Handler } from "aws-lambda";

import handle from "@modelfetch/aws-lambda";

import server from "./server";

export const handler: Handler = handle(server);

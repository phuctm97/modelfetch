import handle from "@modelfetch/vercel";

import server from "./server";

const handler = handle(server);

export const GET = handler;
export const POST = handler;
export const DELETE = handler;

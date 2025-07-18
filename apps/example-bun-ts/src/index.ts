import handle, { getEndpoint } from "@modelfetch/bun";

import server from "./server.ts";

const bunServer = handle(server);

console.log(`MCP server is available at ${getEndpoint(bunServer)}`);

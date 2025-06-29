import handle, { getEndpoint } from "@modelfetch/node";

import server from "./server";

handle(server, (address) => {
  console.log(`MCP server is available at ${getEndpoint(address)}`);
});

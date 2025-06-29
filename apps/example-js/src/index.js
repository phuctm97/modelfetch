import handle from "@modelfetch/node";

import server from "./server.js";

handle(server, ({ port }) => {
  console.log(`MCP server is available at http://localhost:${port}/mcp`);
});

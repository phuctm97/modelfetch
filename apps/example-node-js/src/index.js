import handle, { getListeningAddress } from "@modelfetch/node";

import server from "./server.js";

handle(server, (addressInfo) => {
  console.log(
    `The MCP server is listening at ${getListeningAddress(addressInfo)}`,
  );
});

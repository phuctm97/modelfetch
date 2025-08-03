import handle from "@modelfetch/supabase";

import server from "./server.ts";

handle("mcp-server", server);

# @modelfetch/cloudflare

Cloudflare Workers runtime adapter for building MCP servers with ModelFetch.

## Installation

```bash
npm install @modelfetch/cloudflare
```

## Usage

Create a Worker with your MCP server:

```typescript
// worker.ts
import handle from "@modelfetch/cloudflare";
import server from "./server";

export default {
  fetch: handle(server),
};
```

With additional Cloudflare configurations:

```typescript
// worker.ts
import handle from "@modelfetch/cloudflare";
import server from "./server";

export default {
  fetch: handle(server),
  scheduled(event, env, ctx) {
    // Handle cron triggers
  },
  queue(batch, env, ctx) {
    // Handle queue events
  },
};
```

## API

### `handle(server)`

Creates a Cloudflare Workers fetch handler from a ModelFetch server.

- `server`: A ModelFetch server instance

Returns a fetch function compatible with Cloudflare Workers.

## License

MIT

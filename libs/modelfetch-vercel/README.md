# @modelfetch/vercel

Vercel runtime adapter for building MCP servers with ModelFetch.

## Installation

```bash
npm install @modelfetch/vercel
```

## Usage

Create an API route in your Vercel app:

```typescript
// app/api/mcp/route.ts
import handle from "@modelfetch/vercel";
import server from "./server";

export const runtime = "edge"; // or "nodejs"

const handler = handle(server);
export const GET = handler;
export const POST = handler;
export const DELETE = handler;
```

## API

### `handle(server)`

Creates a Vercel-compatible handler from a ModelFetch server.

- `server`: A ModelFetch server instance

Returns a handler function compatible with Vercel's runtime.

## License

MIT

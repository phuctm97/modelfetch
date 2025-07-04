# @modelfetch/vercel

Vercel runtime adapter for building MCP servers with ModelFetch.

## Installation

```bash
npm install @modelfetch/vercel
```

## Usage

### Edge Runtime (Recommended)

Create an API route in your Vercel app:

```typescript
// app/api/mcp/route.ts (Next.js App Router)
import handle from "@modelfetch/vercel";
import server from "./server";

export const runtime = "edge";

export const GET = handle(server);
export const POST = handle(server);
```

### Node.js Runtime

```typescript
// app/api/mcp/route.ts (Next.js App Router)
import handle from "@modelfetch/vercel";
import server from "./server";

export const runtime = "nodejs";

export const GET = handle(server);
export const POST = handle(server);
```

### Pages Router

For Next.js Pages Router:

```typescript
// pages/api/mcp.ts
import type { PageConfig } from "next";
import handle from "@modelfetch/vercel";
import server from "./server";

export const config: PageConfig = {
  runtime: "edge", // or "nodejs"
};

export default handle(server);
```

## API

### `handle(server)`

Creates a Vercel-compatible handler from a ModelFetch server.

- `server`: A ModelFetch server instance

Returns a handler function compatible with Vercel's runtime.

## License

MIT

# `@modelfetch/supabase`

[![npm version](https://img.shields.io/npm/v/@modelfetch/supabase)](https://www.npmjs.com/package/@modelfetch/supabase)
[![npm license](https://img.shields.io/npm/l/@modelfetch/supabase)](https://www.npmjs.com/package/@modelfetch/supabase)
[![docs](https://img.shields.io/badge/docs-modelfetch.com-blue)](https://www.modelfetch.com/docs/runtime/supabase)

Deploy MCP servers to Supabase.

## Installation

```bash
deno add jsr:@modelfetch/supabase
```

## Usage

```typescript
import handle from "@modelfetch/supabase";
import server from "./server.ts"; // Import your McpServer

// Run as a Supabase Edge Function
Deno.serve(handle("mcp-server", server));
```

## API Reference

### `handle(name, server)`

Starts the MCP server

- **name**: Required [Supabase Edge Function](https://supabase.com/docs/guides/functions) name
- **server**: Required [`McpServer`](https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#server) instance from [`@modelcontextprotocol/sdk`](https://github.com/modelcontextprotocol/typescript-sdk)

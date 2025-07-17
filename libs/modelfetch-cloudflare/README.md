# `@modelfetch/cloudflare`

[![npm version](https://img.shields.io/npm/v/@modelfetch/cloudflare.svg)](https://www.npmjs.com/package/@modelfetch/cloudflare)
[![npm license](https://img.shields.io/npm/l/@modelfetch/cloudflare.svg)](https://www.npmjs.com/package/@modelfetch/cloudflare)
[![docs](https://img.shields.io/badge/docs-modelfetch.com-blue)](https://www.modelfetch.com/docs/runtime/cloudflare)

Deploy MCP servers to Cloudflare.

## Installation

```npm
npm install @modelfetch/cloudflare
```

## Usage

```typescript
import handle from "@modelfetch/cloudflare";
import server from "./server"; // Import your McpServer

// Export as a Cloudflare Worker fetch handler
export default {
  fetch: handle(server),
} satisfies ExportedHandler<Env>;
```

## API Reference

### `handle(server)`

Creates a Cloudflare Worker fetch handler from an [`McpServer`](https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#server) instance

- **server**: Required [`McpServer`](https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#server) instance from [`@modelcontextprotocol/sdk`](https://github.com/modelcontextprotocol/typescript-sdk)

# `@modelfetch/netlify`

[![npm version](https://img.shields.io/npm/v/@modelfetch/netlify.svg)](https://www.npmjs.com/package/@modelfetch/netlify)
[![jsr version](https://img.shields.io/jsr/v/@modelfetch/netlify.svg)](https://jsr.io/@modelfetch/netlify)
[![npm license](https://img.shields.io/npm/l/@modelfetch/netlify.svg)](https://www.npmjs.com/package/@modelfetch/netlify)
[![docs](https://img.shields.io/badge/docs-modelfetch.com-blue)](https://www.modelfetch.com/docs/runtime/netlify)

Deploy MCP servers to Netlify.

## Installation

```bash
npm install @modelfetch/netlify
```

## Usage

```typescript
import handle from "@modelfetch/netlify";
import server from "./server.ts"; // Import your McpServer

// Export as a Netlify Edge Function handler
export default handle(server);
```

## API Reference

### `handle(server)`

Creates a Netlify Edge Function handler from an [`McpServer`](https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#server) instance

- **server**: Required [`McpServer`](https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#server) instance from [`@modelcontextprotocol/sdk`](https://github.com/modelcontextprotocol/typescript-sdk)

# `@modelfetch/fastly`

[![npm version](https://img.shields.io/npm/v/@modelfetch/fastly)](https://www.npmjs.com/package/@modelfetch/fastly)
[![npm license](https://img.shields.io/npm/l/@modelfetch/fastly)](https://www.npmjs.com/package/@modelfetch/fastly)
[![docs](https://img.shields.io/badge/docs-modelfetch.com-blue)](https://www.modelfetch.com/docs/runtime/fastly)

Deploy MCP servers to Fastly.

## Installation

```bash
npm install @modelfetch/fastly
```

## Usage

```typescript
import handle from "@modelfetch/fastly";
import server from "./server"; // Import your McpServer

// Run as a Fastly Compute service
handle(server);
```

## API Reference

### `handle(server)`

Starts the MCP server

- **server**: Required [`McpServer`](https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#server) instance from [`@modelcontextprotocol/sdk`](https://github.com/modelcontextprotocol/typescript-sdk)

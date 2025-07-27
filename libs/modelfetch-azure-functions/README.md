# `@modelfetch/azure-functions`

[![npm version](https://img.shields.io/npm/v/@modelfetch/azure-functions)](https://www.npmjs.com/package/@modelfetch/azure-functions)
[![npm license](https://img.shields.io/npm/l/@modelfetch/azure-functions)](https://www.npmjs.com/package/@modelfetch/azure-functions)
[![docs](https://img.shields.io/badge/docs-modelfetch.com-blue)](https://www.modelfetch.com/docs/runtime/azure-functions)

Deploy MCP servers to Azure Functions.

## Installation

```bash
npm install @modelfetch/azure-functions
```

## Usage

```typescript
import handle from "@modelfetch/azure-functions";
import server from "./server.js"; // Import your McpServer

// Run as an Azure Functions app
handle(server);
```

## API Reference

### `handle(server)`

Starts the MCP server

- **server**: Required [`McpServer`](https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#server) instance from [`@modelcontextprotocol/sdk`](https://github.com/modelcontextprotocol/typescript-sdk)

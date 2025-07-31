# `@modelfetch/gcore`

[![npm version](https://img.shields.io/npm/v/@modelfetch/gcore)](https://www.npmjs.com/package/@modelfetch/gcore)
[![npm license](https://img.shields.io/npm/l/@modelfetch/gcore)](https://www.npmjs.com/package/@modelfetch/gcore)
[![docs](https://img.shields.io/badge/docs-modelfetch.com-blue)](https://www.modelfetch.com/docs/runtime/gcore)

Deploy MCP servers to Gcore.

## Installation

```bash
npm install @modelfetch/gcore
```

## Usage

```typescript
import handle from "@modelfetch/gcore";
import server from "./server"; // Import your McpServer

// Run as a Gcore FastEdge HTTP application
handle(server);
```

## API Reference

### `handle(server)`

Starts the MCP server

- **server**: Required [`McpServer`](https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#server) instance from [`@modelcontextprotocol/sdk`](https://github.com/modelcontextprotocol/typescript-sdk)

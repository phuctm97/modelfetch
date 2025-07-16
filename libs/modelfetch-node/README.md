# `@modelfetch/node`

[![npm version](https://img.shields.io/npm/v/@modelfetch/node.svg)](https://www.npmjs.com/package/@modelfetch/node)
[![npm license](https://img.shields.io/npm/l/@modelfetch/node.svg)](https://www.npmjs.com/package/@modelfetch/node)
[![docs](https://img.shields.io/badge/docs-modelfetch.com-blue)](https://www.modelfetch.com/docs/runtime/node)

Run simple MCP servers with Node.js.

## Installation

```bash
npm install @modelfetch/node
```

## Usage

### Start The Server

```typescript
import handle from "@modelfetch/node";
import server from "./server"; // Import your McpServer

// Run as a Node.js HTTP server
handle(server);
```

### Log The Endpoint

```typescript
import handle, { getEndpoint } from "@modelfetch/node";
import server from "./server"; // Import your McpServer

// Run as a Node.js HTTP server
handle(server, (address) => {
  // Log the endpoint when the server starts listening
  console.log(`MCP server is available at ${getEndpoint(address)}`);
});
```

### Specify Custom Port

```typescript
import handle, { getEndpoint } from "@modelfetch/node";
import server from "./server"; // Import your McpServer

// Run as a Node.js HTTP server
handle(
  server,
  (address) => {
    console.log(`MCP server is available at ${getEndpoint(address)}`);
  },
  // Customize server options
  { port: 8080 },
);
```

## API Reference

### `handle(server, callback?, options?)`

Starts the MCP server

- **server**: Required [`McpServer`](https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#server) instance from [`@modelcontextprotocol/sdk`](https://github.com/modelcontextprotocol/typescript-sdk)
- **callback**: Optional listening callback that receives the server [`AddressInfo`](https://nodejs.org/api/net.html#serveraddress)
- **options**: Optional configuration object
  - **port**: Custom port number (default: `3000`)
  - **hostname**: Custom hostname (default: `"localhost"`)
  - **createServer**: Custom server factory from `node:http`, `node:https`, or `node:http2`
  - **serverOptions**: Custom server options from `node:http`, `node:https`, or `node:http2`

### `getEndpoint(address)`

Gets the MCP server endpoint from the server [`AddressInfo`](https://nodejs.org/api/net.html#serveraddress)

- **address**: Required server [`AddressInfo`](https://nodejs.org/api/net.html#serveraddress) from the listening callback

# @modelfetch/cloudflare

[![npm version](https://img.shields.io/npm/v/@modelfetch/cloudflare.svg)](https://www.npmjs.com/package/@modelfetch/cloudflare)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-modelfetch-blue)](https://github.com/phuctm97/modelfetch)

Deploy MCP servers to Cloudflare Workers.

## Installation

```npm title="Terminal"
npm install @modelfetch/cloudflare
```

## Usage

```typescript title="src/index.ts"
import handle from "@modelfetch/cloudflare";
import server from "./server"; // Import your McpServer

// Export as a Cloudflare Workers fetch handler
export default {
  fetch: handle(server),
} satisfies ExportedHandler<Env>;
```

## API Reference

### `handle(server)`

Creates a Cloudflare Workers fetch handler from an [`McpServer`](https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#server)

- **server**: Required [`McpServer`](https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#server) instance from [`@modelcontextprotocol/sdk`](https://github.com/modelcontextprotocol/typescript-sdk)

## Documentation

For complete documentation, examples, and guides, visit [www.modelfetch.com/docs/runtimes/cloudflare](https://www.modelfetch.com/docs/runtimes/cloudflare).

## License

MIT

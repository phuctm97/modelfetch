# `@modelfetch/aws-lambda`

[![npm version](https://img.shields.io/npm/v/@modelfetch/aws-lambda.svg)](https://www.npmjs.com/package/@modelfetch/aws-lambda)
[![npm license](https://img.shields.io/npm/l/@modelfetch/aws-lambda.svg)](https://www.npmjs.com/package/@modelfetch/aws-lambda)
[![docs](https://img.shields.io/badge/docs-modelfetch.com-blue)](https://www.modelfetch.com/docs/runtime/aws-lambda)

Deploy MCP servers to AWS Lambda.

## Installation

```bash
npm install @modelfetch/aws-lambda
```

## Usage

```typescript
import handle from "@modelfetch/aws-lambda";
import server from "./server"; // Import your McpServer

// Export as an AWS Lambda streaming handler
export const handler: AWSLambda.LambdaFunctionURLHandler = handle(server);
```

## API Reference

### `handle(server)`

Creates an AWS Lambda streaming handler from an [`McpServer`](https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#server) instance

- **server**: Required [`McpServer`](https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#server) instance from [`@modelcontextprotocol/sdk`](https://github.com/modelcontextprotocol/typescript-sdk)

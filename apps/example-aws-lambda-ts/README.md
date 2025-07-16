# Example AWS Lambda MCP Server (TypeScript)

> [!NOTE]
> This is an internal example MCP server. To get started with [ModelFetch](https://www.modelfetch.com), please visit the [Quick Start documentation](https://www.modelfetch.com/docs/quick-start).

## Quick Start

### Deploying the MCP server

Deploy the MCP server to AWS Lambda:

```bash
pnpm exec nx deploy example-aws-lambda-ts
```

After deployment, the CDK output will show your MCP server URL.

### Testing with the MCP Inspector

In a separate terminal, run the MCP Inspector to test your server:

```bash
npx -y @modelcontextprotocol/inspector@latest
```

Then, connect to your server at the URL shown in the CDK output (ends with `/mcp`).

### Deleting the MCP server

To delete the MCP server and all its AWS resources:

```bash
pnpm exec nx destroy example-aws-lambda-ts
```

## Project Structure

```
example-aws-lambda-ts/
├── src/
│   ├── index.ts      # AWS Lambda entry point
│   └── server.ts     # MCP server implementation
├── cdk.js            # AWS CDK entry point
├── cdk.json          # AWS CDK configuration
├── tsconfig.json
├── package.json
└── README.md
```

## Adding Features

### Tools

Tools provide executable functions to LLMs:

```typescript
server.registerTool(
  "my_tool",
  {
    title: "My Tool",
    description: "What this tool does",
    inputSchema: { param: z.string() },
  },
  ({ param }) => ({
    content: [
      {
        type: "text",
        text: `Result for ${param}`,
      },
    ],
  }),
);
```

### Resources

Resources expose data and content to LLMs:

```typescript
server.registerResource(
  "my_resource",
  "resource://my-resource",
  {
    title: "My Resource",
    description: "What this resource does",
    mimeType: "text/plain",
  },
  (uri) => ({
    contents: [
      {
        uri: uri.href,
        text: "Content of my resource",
      },
    ],
  }),
);
```

### Prompts

Prompts are reusable templates for interacting with LLMs:

```typescript
server.registerPrompt(
  "my_prompt",
  {
    title: "My Prompt",
    description: "What this prompt does",
    argsSchema: { arg: z.string() },
  },
  ({ arg }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `Prompt with ${arg}`,
        },
      },
    ],
  }),
);
```

## Reading Docs

- [Model Context Protocol - TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Model Context Protocol - Documentation](https://modelcontextprotocol.io)
- [ModelFetch - Website](https://www.modelfetch.com)
- [ModelFetch - Documentation](https://www.modelfetch.com/docs)

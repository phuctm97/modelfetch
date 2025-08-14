# `nx-10x`

> [!NOTE]
> This is an internal package.

## Usage

### `nx.json`

```json
{
  "plugins": ["nx-10x"],
  "sync": {
    "globalGenerators": [
      "nx-10x:update-cloudflare-worker-types",
      "nx-10x:update-package-manifests",
      "nx-10x:update-supabase-imports",
      "nx-10x:update-template-files",
      "nx-10x:update-ts-configs"
    ]
  }
}
```

### Generators

```bash
pnpm exec nx g nx-10x:create-library
```

### Executors

```json
{
  "targets": {
    "deploy-gcore-fastedge": {
      "executor": "nx-10x:deploy-gcore-fastedge"
    },
    "prepare-release-publish": {
      "executor": "nx-10x:prepare-release-publish"
    }
  }
}
```

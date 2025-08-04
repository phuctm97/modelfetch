# `nx-10x`

> [!NOTE]
> This is an internal package.

## Usage

### Configuration

Add to `nx.json`:

```json
{
  "plugins": ["nx-10x"],
  "sync": {
    "globalGenerators": [
      "nx-10x:format-typescript-configs",
      "nx-10x:update-package-manifests",
      "nx-10x:update-supabase-imports"
    ]
  }
}
```

### Generators

```bash
# Create a library
pnpm exec nx g nx-10x:create-library
```

### Executors

```json
{
  "targets": {
    // Prepare for release publishing
    "prepare-release-publish": {
      "executor": "nx-10x:prepare-release-publish"
    },
    // Deploy a Gcore FastEdge application
    "deploy-gcore-fastedge": {
      "executor": "nx-10x:deploy-gcore-fastedge"
    }
  }
}
```

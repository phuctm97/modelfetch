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
      "nx-10x:update-package-manifests"
    ]
  }
}
```

### Generators

```bash
# Create a new library
pnpm exec nx g nx-10x:create-library
```

### Executors

```json
{
  "targets": {
    // Prepare an npm package for publishing during release process
    "prepare-release-publish": {
      "executor": "nx-10x:prepare-release-publish"
    }
  }
}
```

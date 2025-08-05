import type { Tree } from "@nx/devkit";
import type { SyncGeneratorResult } from "nx/src/utils/sync-generators";

import { formatFiles } from "@nx/devkit";

const sourcePath = "apps/example-cloudflare-ts/worker-configuration.d.ts";

const destinationPath =
  "libs/create-modelfetch/templates/cloudflare-ts/worker-configuration.d.ts.template";

export default async function updateCloudflareWorkerTypes(
  tree: Tree,
): Promise<SyncGeneratorResult> {
  const sourceContent = tree.read(sourcePath, "utf8");
  if (sourceContent) tree.write(destinationPath, sourceContent);
  else tree.delete(destinationPath);
  await formatFiles(tree);
  return {
    outOfSyncMessage:
      "Some worker-configuration.d.ts.template files are out of sync.",
  };
}

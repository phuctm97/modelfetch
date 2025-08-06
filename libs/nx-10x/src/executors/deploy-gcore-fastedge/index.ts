import type { ExecutorContext } from "@nx/devkit";

import { logger } from "@nx/devkit";
import { readFile } from "node:fs/promises";
import path from "node:path";

interface App {
  id: number;
  name: string;
}

export default async function deployGcoreFastedgeExecutor(
  options: object,
  context: ExecutorContext,
): Promise<{ success: boolean }> {
  if (!context.projectName) return { success: false };
  const project = context.projectsConfigurations.projects[context.projectName];
  const uploadResponse = await fetch(
    "https://api.gcore.com/fastedge/v1/binaries/raw",
    {
      method: "POST",
      headers: {
        authorization: `apikey ${process.env.GCORE_API_KEY}`,
        "content-type": "application/octet-stream",
      },
      body: await readFile(path.resolve(project.root, "dist", "index.wasm")),
    },
  );
  if (!uploadResponse.ok) {
    logger.error(
      `Failed to upload binary: ${uploadResponse.status} ${await uploadResponse.text()}`,
    );
    return { success: false };
  }
  const uploadResult = (await uploadResponse.json()) as { id: number };
  const listUrl = new URL("https://api.gcore.com/fastedge/v1/apps");
  listUrl.searchParams.set("name", context.projectName);
  const listResponse = await fetch(listUrl, {
    method: "GET",
    headers: { authorization: `apikey ${process.env.GCORE_API_KEY}` },
  });
  const apps: App[] = [];
  if (listResponse.ok) {
    const listResult = (await listResponse.json()) as { apps: App[] };
    apps.push(...listResult.apps);
  } else if (listResponse.status !== 404) {
    logger.error(
      `Failed to list applications: ${listResponse.status} ${await listResponse.text()}`,
    );
    return { success: false };
  }
  const app = apps.find((app) => app.name === context.projectName);
  const createOrUpdateResponse = await (app
    ? fetch(`https://api.gcore.com/fastedge/v1/apps/${app.id}`, {
        method: "PATCH",
        headers: {
          authorization: `apikey ${process.env.GCORE_API_KEY}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ binary: uploadResult.id, status: 1 }),
      })
    : fetch("https://api.gcore.com/fastedge/v1/apps", {
        method: "POST",
        headers: {
          authorization: `apikey ${process.env.GCORE_API_KEY}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: context.projectName,
          binary: uploadResult.id,
          status: 1,
        }),
      }));
  if (!createOrUpdateResponse.ok) {
    logger.error(
      `Failed to create or update application: ${createOrUpdateResponse.status} ${await createOrUpdateResponse.text()}`,
    );
    return { success: false };
  }
  const createOrUpdateResult = (await createOrUpdateResponse.json()) as {
    url: string;
  };
  logger.info(`MCP Server URL: ${createOrUpdateResult.url}`);
  return { success: true };
}

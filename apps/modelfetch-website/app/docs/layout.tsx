import type { PropsWithChildren } from "react";

import { DocsLayout } from "fumadocs-ui/layouts/docs";

import { baseLayoutProps } from "~/lib/base-layout-props";
import { source } from "~/lib/source";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <DocsLayout tree={source.pageTree} {...baseLayoutProps}>
      {children}
    </DocsLayout>
  );
}

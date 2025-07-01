import type { PropsWithChildren } from "react";

import { HomeLayout } from "fumadocs-ui/layouts/home";

import { baseLayoutProps } from "~/lib/base-layout-props";

export default function Layout({ children }: PropsWithChildren) {
  return <HomeLayout {...baseLayoutProps}>{children}</HomeLayout>;
}

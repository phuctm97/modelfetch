import "./layout.css";

import type { PropsWithChildren } from "react";

import { RootProvider } from "fumadocs-ui/provider";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

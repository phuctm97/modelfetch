import "./layout.css";

import type { RootProviderProps } from "fumadocs-ui/provider/base";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { RootProvider } from "fumadocs-ui/provider";
import { Geist, Geist_Mono } from "next/font/google";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const theme: RootProviderProps["theme"] = { defaultTheme: "dark" };

const siteTitle =
  "ModelFetch - Runtime-agnostic TypeScript/JavaScript SDK for MCP Servers";

const siteDescription =
  "ModelFetch is a delightful TypeScript/JavaScript SDK for building and deploying MCP servers anywhere TypeScript/JavaScript runs.";

const siteUrl = "https://www.modelfetch.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | ModelFetch",
    default: siteTitle,
  },
  description: siteDescription,
  keywords: [
    "Model Context Protocol",
    "MCP",
    "MCP Server",
    "AI",
    "AI integration",
    "SDK",
    "TypeScript SDK",
    "JavaScript SDK",
    "Node.js",
    "Next.js",
    "Bun",
    "Deno",
    "Cloudflare",
    "Cloudflare Workers",
    "Vercel",
    "Vercel Functions",
  ],
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} scroll-smooth antialiased`}
      lang="en"
    >
      <body className="flex min-h-screen flex-col">
        <RootProvider theme={theme}>{children}</RootProvider>
      </body>
    </html>
  );
}

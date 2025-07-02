import "./layout.css";

import type { RootProviderProps } from "fumadocs-ui/provider/base";
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

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} scroll-smooth antialiased`}
      lang="en"
    >
      <body className="flex flex-col min-h-screen">
        <RootProvider theme={theme}>{children}</RootProvider>
      </body>
    </html>
  );
}

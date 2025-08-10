import { SiDiscord, SiGithub, SiYoutube } from "@icons-pack/react-simple-icons";

import {
  CtaSection,
  FeaturesSection,
  FooterTerminal,
  HeroSection,
  InlineBlock,
  QuickStartSection,
  SectionHeading,
  StatusBar,
  TerminalHeader,
} from "~/lib/landing";
import { RuntimeSelector } from "~/lib/runtime-selector";
import packageJson from "~/package.json";

import { Raining } from "./raining";
import { Typing } from "./typing";

import css from "./page.module.css";

const asciiLogo = ` __  __           _      _ _____    _       _
|  \\/  |         | |    | |  ___|  | |     | |
| .  . | ___   __| | ___| | |_ ___| |_ ___| |__
| |\\/| |/ _ \\ / _\` |/ _ \\ |  _/ _ \\ __/ __| '_ \\
| |  | | (_) | (_| |  __/ | ||  __/ || (__| | | |
\\_|  |_/\\___/ \\__,_|\\___|_\\_| \\___|\\__\\___|_| |_|`;

export default function Page() {
  return (
    <>
      <main
        className={`relative z-10 min-h-screen bg-[#f0f0f0] font-mono text-[#008f00] dark:bg-[#0a0a0a] dark:text-[#00ff00] ${css.scanlines} ${css.techGrid} ${css.main}`}
      >
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-4xl">
            <TerminalHeader />

            <HeroSection
              neonGlow
              description={
                <>
                  <span className="text-[#0099cc] dark:text-[#00ffff]">
                    [INFO]
                  </span>{" "}
                  <span className="text-gray-600 dark:text-gray-400">
                    ModelFetch is a delightful TypeScript/JavaScript SDK for{" "}
                    <InlineBlock>building and deploying</InlineBlock>{" "}
                    <InlineBlock>MCP servers anywhere</InlineBlock>{" "}
                    <InlineBlock>TypeScript/JavaScript runs.</InlineBlock>
                  </span>
                </>
              }
              glitchEffect={css.glitch}
              links={[
                {
                  href: "https://github.com/phuctm97/modelfetch",
                  label: "View GitHub repository",
                  icon: <SiGithub className="mr-2 h-4 w-4" />,
                  external: true,
                },
                {
                  href: "https://discord.gg/SwM4Mvzaur",
                  label: "Join Discord community",
                  icon: <SiDiscord className="mr-2 h-4 w-4" />,
                  external: true,
                },
                {
                  href: "https://www.youtube.com/@modelfetch",
                  label: "Watch YouTube channel",
                  icon: <SiYoutube className="mr-2 h-4 w-4" />,
                  external: true,
                },
              ]}
              logo={
                <pre className="text-xs leading-tight text-[#008f00] opacity-70 dark:text-[#00ff00] dark:opacity-50">
                  {asciiLogo}
                </pre>
              }
              primaryCta={{
                href: "/docs/quick-start",
                label: "Get Started",
                icon: <span className="mr-2">▶</span>,
              }}
              secondaryCta={{
                href: "/docs",
                label: "Read Docs",
                icon: <span className="mr-2">◆</span>,
              }}
              title={<Typing>ModelFetch</Typing>}
            />

            <StatusBar
              external
              href="https://github.com/phuctm97/modelfetch/releases/latest"
              label="LATEST RELEASE"
              value={`v${packageJson.version}`}
            />

            <FeaturesSection
              features={[
                {
                  title: "Multi-Runtime",
                  description:
                    "Write your MCP server once. Run it anywhere: Node.js, Bun, Deno, Vercel, Cloudflare, Netlify, Fastly, etc.",
                },
                {
                  title: "Official SDK",
                  description:
                    "Built on top of the official MCP TypeScript SDK to avoid lock-in and ensure up-to-date implementation.",
                },
                {
                  title: "Delightful DX",
                  description:
                    "Build your MCP server with tools designed for building MCP servers: hot reload, debugger, MCP Inspector, etc.",
                },
              ]}
              title={
                <>
                  <span className="mr-2">›</span>Why ModelFetch?
                </>
              }
            />

            <section className="mb-12">
              <SectionHeading>How It Works</SectionHeading>
              <RuntimeSelector />
            </section>

            <QuickStartSection
              command="npx -y create-modelfetch@latest"
              description="That's it. You're ready to build."
            />

            <CtaSection
              buttons={[
                {
                  href: "https://github.com/phuctm97/modelfetch",
                  label: "View GitHub repository",
                  icon: <SiGithub className="mr-4 h-5 w-5" />,
                  external: true,
                  variant: "github",
                },
                {
                  href: "https://discord.gg/SwM4Mvzaur",
                  label: "Join Discord community",
                  icon: <SiDiscord className="mr-4 h-5 w-5" />,
                  external: true,
                  variant: "discord",
                },
                {
                  href: "https://www.youtube.com/@modelfetch",
                  label: "Watch YouTube channel",
                  icon: <SiYoutube className="mr-4 h-5 w-5" />,
                  external: true,
                  variant: "youtube",
                },
              ]}
              message={
                <>
                  <span className="text-[#0099cc] dark:text-[#00ffff]">
                    [INFO]
                  </span>{" "}
                  Join us in building the future of{" "}
                  <InlineBlock>MCP servers!</InlineBlock>
                </>
              }
            />

            <FooterTerminal />
          </div>
        </div>
      </main>
      <Raining />
    </>
  );
}

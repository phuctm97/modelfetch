import type { MDXComponents } from "mdx/types";

import * as tabsComponents from "fumadocs-ui/components/tabs";
import defaultMdxComponents from "fumadocs-ui/mdx";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";

import { metadataImage } from "~/lib/metadata-image";
import { source } from "~/lib/source";

interface Props {
  params: Promise<{ slug?: string[] }>;
}

const components: MDXComponents = {
  ...defaultMdxComponents,
  ...tabsComponents,
};

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();
  return metadataImage.withImage(page.slugs, {
    title: page.data.title,
    description: page.data.description,
  });
}

export default async function Page(props: Props) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();
  const MDX = page.data.body;
  return (
    <DocsPage full={page.data.full} toc={page.data.toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={components} />
      </DocsBody>
    </DocsPage>
  );
}

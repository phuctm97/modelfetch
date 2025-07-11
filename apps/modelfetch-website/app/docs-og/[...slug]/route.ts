import type { ImageResponseOptions } from "next/server";

import { generateOGImage } from "fumadocs-ui/og";

import { metadataImage } from "~/lib/metadata-image";

export function generateStaticParams() {
  return metadataImage.generateParams();
}

export const GET = metadataImage.createAPI(async (page) => {
  const fonts: ImageResponseOptions["fonts"] = [];
  try {
    const cssResponse = await fetch(
      `https://fonts.googleapis.com/css2?family=Geist&text=${encodeURIComponent(
        [page.data.title, page.data.description, "ModelFetch"]
          .filter(Boolean)
          .join(" "),
      )}`,
    );
    if (cssResponse.ok) {
      const cssText = await cssResponse.text();
      const matches = /src: url\((.+)\) format\('(opentype|truetype)'\)/.exec(
        cssText,
      );
      const match = matches?.[1];
      if (match) {
        const fontResponse = await fetch(match);
        if (fontResponse.ok)
          fonts.push({ name: "Geist", data: await fontResponse.arrayBuffer() });
      }
    }
  } catch {
    // Ignore
  }
  return generateOGImage({
    title: page.data.title,
    description: page.data.description,
    site: "ModelFetch",
    primaryColor: "#008f00",
    primaryTextColor: "#00ff00",
    fonts,
  });
});

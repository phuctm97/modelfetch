import type { ImageResponseOptions } from "next/server";

export async function loadImageFonts(family: string, text: string) {
  const fonts: ImageResponseOptions["fonts"] = [];
  try {
    const cssUrl = new URL("https://fonts.googleapis.com/css2");
    cssUrl.searchParams.set("family", family);
    cssUrl.searchParams.set("text", text);
    const cssResponse = await fetch(cssUrl);
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
  return fonts;
}

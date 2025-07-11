import { generateOGImage } from "fumadocs-ui/og";

import { loadImageFonts } from "~/lib/load-image-fonts";
import { metadataImage } from "~/lib/metadata-image";

export function generateStaticParams() {
  return metadataImage.generateParams();
}

export const GET = metadataImage.createAPI(async (page) =>
  generateOGImage({
    title: page.data.title,
    description: page.data.description,
    site: "ModelFetch",
    primaryColor: "#008f00",
    primaryTextColor: "#00ff00",
    fonts: await loadImageFonts(
      "Geist",
      [page.data.title, page.data.description, "ModelFetch"]
        .filter(Boolean)
        .join(" "),
    ),
  }),
);

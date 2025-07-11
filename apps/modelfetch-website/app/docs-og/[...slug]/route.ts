import { generateOGImage } from "fumadocs-ui/og";

import { metadataImage } from "~/lib/metadata-image";

export function generateStaticParams() {
  return metadataImage.generateParams();
}

export const GET = metadataImage.createAPI((page) =>
  generateOGImage({
    title: page.data.title,
    description: page.data.description,
    site: "ModelFetch",
  }),
);

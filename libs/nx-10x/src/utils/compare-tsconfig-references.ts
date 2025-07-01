import type { TsConfigJson } from "type-fest";

export function compareTsConfigReferences(
  a: TsConfigJson.References,
  b: TsConfigJson.References,
): number {
  const aSegments = a.path.split("/");
  const bSegments = b.path.split("/");
  const cSegments = aSegments.length - bSegments.length;
  if (cSegments !== 0) return cSegments;
  const length = Math.min(aSegments.length, bSegments.length);
  for (let i = 0; i < length; i++) {
    const aSegment = aSegments[i];
    const bSegment = bSegments[i];
    const cSegment = aSegment.localeCompare(bSegment, "en");
    if (cSegment !== 0) return cSegment;
  }
  return 0;
}

import { readFileSync } from "fs";
import path from "path";

export function extractRasterDataUrlFromSvgFile(svgFilePath: string): string | null {
  const svg = readFileSync(svgFilePath, "utf8");
  const match = svg.match(/xlink:href="(data:image\/[^;]+;base64,[^"]+)"/);
  return match?.[1] ?? null;
}

export function resolveLocalAvatarSvgPath(profileImageUrl: string): string | null {
  if (!profileImageUrl.startsWith("/avatars/") || !profileImageUrl.endsWith(".svg")) {
    return null;
  }

  return path.join(process.cwd(), "public", profileImageUrl);
}

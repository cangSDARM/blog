import { siteMetadata } from "@/config";

export function trailingUrl(path: string) {
  return path.slice(siteMetadata.base.length);
}

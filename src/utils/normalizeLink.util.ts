export function normalizeLink(link: string): string {
  if (!link) return "#";
  if (!/^https?:\/\//i.test(link)) {
    return `https://${link}`;
  }
  return link;
}

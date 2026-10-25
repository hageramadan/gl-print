// Cards show two lines, while the CMS supplies the entire service article.
// Keep the first three complete blocks (including their inline formatting),
// enough to preserve the visible excerpt at every card width.
export function cardDescription(html: string): string {
  const blockPattern = /<(p|h[1-6])\b[^>]*>[\s\S]*?<\/\1\s*>/gi;
  const blocks = html.match(blockPattern);
  // Leave unfamiliar CMS structures intact instead of cutting through markup.
  if (!blocks || blocks.length <= 3 || html.replace(blockPattern, '').trim()) return html;
  return blocks.slice(0, 3).join('');
}

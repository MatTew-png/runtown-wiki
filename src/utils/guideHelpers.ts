/**
 * Utility functions for guide titles and icons
 */

/**
 * Strips any leading emoji, symbols, or pictographs and whitespace from a title string.
 * Ensures titles render cleanly without duplicated emojis regardless of frontmatter format.
 */
export function getCleanTitle(title: string): string {
  if (!title) return '';
  // Removes leading unicode emojis, variation selectors, zero-width joiners, and spaces
  return title.replace(/^[\p{Extended_Pictographic}\uFE00-\uFE0F\u200D\s]+/u, '').trim();
}

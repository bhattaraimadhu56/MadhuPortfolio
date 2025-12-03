import { marked } from 'marked';

/**
 * Converts Markdown content to HTML synchronously using the marked library.
 * @param markdown The markdown string to convert.
 * @returns The resulting HTML string.
 */
export function convertMarkdownToHtml(markdown: string): string {
  // By passing the 'async: false' option, we ensure marked.parse returns a string,
  // resolving the TypeScript error "Type 'string | Promise<string>' is not assignable to type 'string'."
  return marked.parse(markdown, { async: false }) as string;
}

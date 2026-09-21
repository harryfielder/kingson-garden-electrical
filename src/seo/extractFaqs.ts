/**
 * Pulls question/answer pairs out of a page's FAQ blocks so they can be
 * emitted as FAQPage structured data.
 *
 * Lexical stores rich text as a node tree; Google expects the answer as text,
 * so the tree is flattened here. Blocks with `emitStructuredData` off are
 * skipped, which lets an editor repeat an FAQ visually without declaring the
 * same questions twice on one page.
 */

type LexicalNode = { children?: LexicalNode[]; text?: string; type?: string }

const nodeToText = (node?: LexicalNode | null): string => {
  if (!node) return ''
  if (typeof node.text === 'string') return node.text

  const children = (node.children || []).map(nodeToText).filter(Boolean)
  if (!children.length) return ''

  // Block-level nodes become separate sentences; inline nodes run together.
  const separator = node.type === 'paragraph' || node.type === 'listitem' ? ' ' : ''
  return children.join(separator)
}

export const richTextToPlainText = (data: unknown): string => {
  const root = (data as { root?: LexicalNode })?.root
  if (!root) return ''

  return (root.children || [])
    .map(nodeToText)
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export const extractFaqs = (
  blocks: unknown,
): { answerText: string; question: string }[] => {
  if (!Array.isArray(blocks)) return []

  return blocks
    .filter(
      (block: any) => block?.blockType === 'faq' && block?.emitStructuredData !== false,
    )
    .flatMap((block: any) =>
      (block.items || []).map((item: any) => ({
        question: String(item.question || ''),
        answerText: richTextToPlainText(item.answer),
      })),
    )
    .filter((item) => item.question && item.answerText)
}

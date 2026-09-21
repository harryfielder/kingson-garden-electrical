/**
 * Minimal builders for Lexical editor state.
 *
 * Payload stores rich text as a Lexical node tree. Seed content is authored as
 * plain strings and converted here, so the seed file stays readable instead of
 * being buried in node boilerplate.
 */

type Node = Record<string, any>

const textNode = (text: string, format = 0): Node => ({
  type: 'text',
  detail: 0,
  format,
  mode: 'normal',
  style: '',
  text,
  version: 1,
})

/** Parses `**bold**` spans into Lexical's bitmask format. */
const inline = (text: string): Node[] =>
  text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith('**') && part.endsWith('**')
        ? textNode(part.slice(2, -2), 1)
        : textNode(part),
    )

export const paragraph = (text: string): Node => ({
  type: 'paragraph',
  children: inline(text),
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  version: 1,
})

export const heading = (text: string, tag: 'h2' | 'h3' | 'h4' = 'h2'): Node => ({
  type: 'heading',
  tag,
  children: inline(text),
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
})

export const list = (items: string[], ordered = false): Node => ({
  type: 'list',
  listType: ordered ? 'number' : 'bullet',
  tag: ordered ? 'ol' : 'ul',
  start: 1,
  children: items.map((item, index) => ({
    type: 'listitem',
    checked: undefined,
    value: index + 1,
    children: inline(item),
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  })),
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
})

/** Wraps nodes in the root structure Payload expects. */
export const richText = (...children: Node[]): any => ({
  root: {
    type: 'root',
    children: children.length ? children : [paragraph('')],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

/** Shorthand for a block of plain paragraphs. */
export const prose = (...paragraphs: string[]): any => richText(...paragraphs.map(paragraph))

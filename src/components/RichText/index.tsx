import {
  type DefaultNodeTypes,
  type DefaultTypedEditorState,
  type SerializedBlockNode,
  type SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'
import React from 'react'

import { BannerBlock } from '@/blocks/Banner/Component'
import { CodeBlock, type CodeBlockProps } from '@/blocks/Code/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { proseVariants } from '@/design-system'
import type { BannerBlock as BannerBlockProps, MediaBlock as MediaBlockProps } from '@/payload-types'
import { getDocumentPath } from '@/utilities/routing'
import { cn } from '@/utilities/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<MediaBlockProps | BannerBlockProps | CodeBlockProps>

/**
 * Internal links inside rich text resolve through the same routing map as
 * CMSLink, so an editor's inline link and a button link can never disagree
 * about where a document lives.
 */
const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { relationTo, value } = linkNode.fields.doc!

  if (typeof value !== 'object' || !value) return '/'

  return getDocumentPath(relationTo, (value as { slug?: string }).slug)
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    banner: ({ node }) => <BannerBlock className="my-6" {...node.fields} />,
    code: ({ node }) => <CodeBlock className="my-6" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        {...node.fields}
        captionClassName="mx-auto max-w-3xl"
        className="my-8"
        enableGutter={false}
        disableInnerContainer
        imgClassName="m-0 rounded-md"
      />
    ),
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
  size?: 'sm' | 'base' | 'lg'
  tone?: 'default' | 'inverse'
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText({
  className,
  enableGutter = true,
  enableProse = true,
  size = 'base',
  tone = 'default',
  ...rest
}: Props) {
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        enableGutter ? 'container-prose' : 'max-w-none',
        enableProse && proseVariants({ size, tone }),
        className,
      )}
      {...rest}
    />
  )
}

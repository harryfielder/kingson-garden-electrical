/**
 * Generates a small, valid PDF without pulling in a PDF library.
 *
 * The seed needs real files so the download and email-gate flows can actually
 * be exercised end to end; these are placeholders for Kingson's own documents.
 */

const escape = (text: string): string =>
  text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')

export const buildPdf = ({
  body,
  subtitle,
  title,
}: {
  body: string[]
  subtitle?: string
  title: string
}): Buffer => {
  const lines: string[] = []
  let y = 780

  lines.push('BT', '/F1 22 Tf', `1 0 0 1 60 ${y} Tm`, `(${escape(title)}) Tj`, 'ET')
  y -= 34

  if (subtitle) {
    lines.push('BT', '/F2 12 Tf', `1 0 0 1 60 ${y} Tm`, `(${escape(subtitle)}) Tj`, 'ET')
    y -= 30
  }

  body.forEach((paragraph) => {
    // Crude wrap: the font metrics are fixed, so a character count is enough.
    const words = paragraph.split(' ')
    let line = ''

    const flush = () => {
      if (!line) return
      lines.push('BT', '/F2 11 Tf', `1 0 0 1 60 ${y} Tm`, `(${escape(line)}) Tj`, 'ET')
      y -= 16
      line = ''
    }

    words.forEach((word) => {
      if ((line + ' ' + word).trim().length > 88) flush()
      line = line ? `${line} ${word}` : word
    })
    flush()
    y -= 8
  })

  const content = lines.join('\n')

  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>',
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  ]

  let pdf = '%PDF-1.4\n'
  const offsets: number[] = []

  objects.forEach((object, index) => {
    offsets.push(pdf.length)
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`
  })

  const xrefOffset = pdf.length
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
  offsets.forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`
  })
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`

  return Buffer.from(pdf, 'latin1')
}

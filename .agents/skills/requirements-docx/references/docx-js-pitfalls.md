# docx-js Known Pitfalls

Supplementary guide for issues not covered in the other reference files.
For table column widths, see `document-structure-mapping.md`.
For ShadingType and font configuration, see `docx-style-definitions.md`.

## 1. CRLF Line Ending Problem (Critical)

**Symptom**: Headings, tables, and field patterns (Reason/Description) are not recognized
from the input Markdown.

**Cause**: When the Markdown file uses `\r\n` (Windows-style) line endings, `split('\n')`
leaves trailing `\r` on each line. JavaScript regex `$` anchor does NOT match before `\r`
(it only matches before `\n` or at the end of string). Additionally, `.` does not match `\r`.

This causes all line-end-anchored patterns to fail:
- `^(#{2,6})\s+(.+)$` — heading detection
- `^\*\*Reason\*\*:\s*(.+)$` — Reason field extraction
- `^\|(.+)\|$` — table row parsing

**Fix**: Normalize line endings immediately after reading the file:
```javascript
const mdContent = fs.readFileSync(inputFile, 'utf-8').replace(/\r/g, '');
```

## 2. Why Heading Formatting Must Be on TextRun (not Paragraph Style)

**Symptom**: Custom font sizes, colors, or bold settings defined in `paragraphStyles`
with IDs like `"Heading1"` do not appear in the output document.

**Cause**: docx-js has built-in default heading styles that take precedence over
user-defined paragraph styles with the same ID. The built-in styles cannot be overridden.

**Fix**: Apply formatting directly on the `TextRun` children of heading paragraphs.
The heading level on the `Paragraph` ensures correct TOC integration, while the `TextRun`
formatting controls the visual appearance:
```javascript
new Paragraph({
  heading: HeadingLevel.HEADING_1,
  children: [
    new TextRun({
      text: headingText,
      bold: true,
      size: 32,
      color: "1F3864",
      font: { ascii: "Arial", eastAsia: "Yu Gothic", hAnsi: "Arial" }
    })
  ]
})
```
See `document-structure-mapping.md` for the complete heading pattern with `outlineLevel`.

# Document Structure Mapping: USDM Markdown to Word

This reference defines the mapping from USDM Markdown elements to Word document elements using docx-js code patterns.

## Cover Page (Section 1)

The cover page is a separate Word section with no headers/footers.

### Logo Placeholder

A gray-bordered rectangle area for company logo placement.

```javascript
// Logo placeholder - gray bordered empty area
new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 2400, after: 400 },
  border: {
    top: { style: BorderStyle.SINGLE, size: 1, color: "999999", space: 8 },
    bottom: { style: BorderStyle.SINGLE, size: 1, color: "999999", space: 8 },
    left: { style: BorderStyle.SINGLE, size: 1, color: "999999", space: 8 },
    right: { style: BorderStyle.SINGLE, size: 1, color: "999999", space: 8 }
  },
  children: [
    new TextRun({ text: "Company Logo", color: "999999", size: 20, italics: true })
  ]
})
```

### Document Title

Extract from the H1 heading (`# Document Title`).

```javascript
new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 1200, after: 600 },
  children: [
    new TextRun({
      text: documentTitle,
      bold: true,
      size: 56, // 28pt
      font: { ascii: "Arial", eastAsia: "Yu Gothic", hAnsi: "Arial" }
    })
  ]
})
```

### Metadata Table (Cover Page)

Extract fields from the `## Metadata` table. Render as a 2-column table.

```javascript
const metadataRows = [
  ["Document ID", metadata.documentId],
  ["Version", metadata.version],
  ["Status", metadata.status],
  ["Author", metadata.author],
  ["Created", metadata.created],
  ["Last Updated", metadata.lastUpdated]
];

new Table({
  columnWidths: [3000, 5000],
  margins: { top: 80, bottom: 80, left: 120, right: 120 },
  rows: metadataRows.map(([field, value]) =>
    new TableRow({
      children: [
        new TableCell({
          borders: cellBorders,
          width: { size: 3000, type: WidthType.DXA },
          children: [new Paragraph({
            children: [new TextRun({ text: field, bold: true, size: 22 })]
          })]
        }),
        new TableCell({
          borders: cellBorders,
          width: { size: 5000, type: WidthType.DXA },
          children: [new Paragraph({
            children: [new TextRun({ text: value, size: 22 })]
          })]
        })
      ]
    })
  )
})
```

### Confidentiality Notice

```javascript
new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 1200 },
  children: [
    new TextRun({ text: "CONFIDENTIAL", bold: true, size: 24, color: "666666" })
  ]
})
```

### Page Break After Cover

```javascript
new Paragraph({ children: [new PageBreak()] })
```

## Table of Contents (Section 2)

Insert after the cover page. References heading levels 1-4.

```javascript
new TableOfContents("Table of Contents", {
  hyperlink: true,
  headingStyleRange: "1-4"
}),
new Paragraph({ children: [new PageBreak()] })
```

**Note**: TOC headings must use `HeadingLevel` constants only. Do NOT combine `heading:` with `style:` on the same paragraph.

## Main Content (Section 3)

### Section Headings

Map `## SectionName` headings to Heading 1:

```javascript
// ## Stakeholders, ## Glossary, ## Requirements, etc.
new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { before: 360, after: 240 },
  children: [new TextRun(sectionTitle)]
})
```

### Requirements

```javascript
// ### REQ-001: Title → Heading 2
new Paragraph({
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 300, after: 180 },
  children: [new TextRun(`REQ-001: ${title}`)]
})
```

### Sub-Requirements

```javascript
// #### REQ-001-1: Title → Heading 3
new Paragraph({
  heading: HeadingLevel.HEADING_3,
  spacing: { before: 240, after: 120 },
  children: [new TextRun(`REQ-001-1: ${title}`)]
})
```

### Specifications

```javascript
// #### SPEC-001 or ##### SPEC-001 → Heading 3 or Heading 4
new Paragraph({
  heading: specLevel, // HeadingLevel.HEADING_3 or HEADING_4 based on nesting
  spacing: { before: 200, after: 100 },
  children: [new TextRun(`SPEC-001: ${title}`)]
})
```

### Reason / Description Fields

```javascript
// **Reason**: The business justification...
new Paragraph({
  spacing: { before: 60, after: 60 },
  indent: { left: 360 },
  children: [
    new TextRun({ text: "Reason: ", bold: true, size: 22 }),
    new TextRun({ text: reasonText, size: 22 })
  ]
})

// **Description**: The contextual information...
new Paragraph({
  spacing: { before: 60, after: 120 },
  indent: { left: 360 },
  children: [
    new TextRun({ text: "Description: ", bold: true, size: 22 }),
    new TextRun({ text: descriptionText, size: 22 })
  ]
})
```

### EARS Keywords in Specification Text

Split specification text at keyword boundaries and apply bold formatting.

```javascript
function formatEarsText(text) {
  const keywords = /\b(WHEN|WHILE|IF|THEN|WHERE|shall|may)\b/g;
  const runs = [];
  let lastIndex = 0;
  let match;

  while ((match = keywords.exec(text)) !== null) {
    // Text before keyword
    if (match.index > lastIndex) {
      runs.push(new TextRun({ text: text.slice(lastIndex, match.index), size: 22 }));
    }
    // Keyword in bold
    runs.push(new TextRun({ text: match[0], bold: true, size: 22 }));
    lastIndex = match.index + match[0].length;
  }

  // Remaining text after last keyword
  if (lastIndex < text.length) {
    runs.push(new TextRun({ text: text.slice(lastIndex), size: 22 }));
  }

  return runs;
}

// Usage in specification paragraph
new Paragraph({
  spacing: { before: 60, after: 120 },
  indent: { left: 720 },
  children: formatEarsText(specificationText)
})
```

### Horizontal Rule (---) Separators

USDM documents use `---` between requirement groups. Render as spacing:

```javascript
// --- between requirement groups
new Paragraph({ spacing: { before: 240, after: 240 } })
```

## Tables

### Common Table Patterns

All tables use the same border and header styling:

```javascript
const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };
const headerShading = { fill: "D5E8F0", type: ShadingType.CLEAR };
```

### Header Row Pattern

```javascript
function createHeaderRow(headers, columnWidths) {
  return new TableRow({
    tableHeader: true,
    children: headers.map((header, i) =>
      new TableCell({
        borders: cellBorders,
        width: { size: columnWidths[i], type: WidthType.DXA },
        shading: headerShading,
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({
          children: [new TextRun({ text: header, bold: true, size: 22 })]
        })]
      })
    )
  });
}
```

### Data Row Pattern

```javascript
function createDataRow(cells, columnWidths, options = {}) {
  return new TableRow({
    children: cells.map((cellText, i) =>
      new TableCell({
        borders: cellBorders,
        width: { size: columnWidths[i], type: WidthType.DXA },
        children: [new Paragraph({
          children: options.boldColumns?.includes(i)
            ? [new TextRun({ text: cellText, bold: true, size: 22 })]
            : [new TextRun({ text: cellText, size: 22 })]
        })]
      })
    )
  });
}
```

### Table Column Widths (Letter size, 9360 DXA usable)

| Table | Column Widths (DXA) |
|-------|-------------------|
| Metadata (cover) | `[3000, 5000]` |
| Ticket References | `[2000, 2000, 5360]` |
| Stakeholders | `[2000, 3000, 4360]` |
| Glossary | `[2500, 6860]` |
| Traceability Matrix | `[2340, 1800, 2880, 2340]` |
| Open Questions | `[600, 4360, 2200, 2200]` |
| Change History | `[1200, 1800, 2000, 4360]` |

## Headers and Footers

Applied to the main content section (Section 3):

```javascript
headers: {
  default: new Header({
    children: [new Paragraph({
      tabStops: [
        { type: TabStopType.RIGHT, position: TabStopPosition.MAX }
      ],
      children: [
        new TextRun({ text: metadata.documentId, size: 18, color: "666666" }),
        new TextRun({ text: "\t" }),
        new TextRun({ text: documentTitle, size: 18, color: "666666" })
      ]
    })]
  })
},
footers: {
  default: new Footer({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: "Page ", size: 18, color: "666666" }),
        new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "666666" }),
        new TextRun({ text: " of ", size: 18, color: "666666" }),
        new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: "666666" })
      ]
    })]
  })
}
```

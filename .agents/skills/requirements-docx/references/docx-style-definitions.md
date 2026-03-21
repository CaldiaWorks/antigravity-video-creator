# docx-js Style Definitions for Requirements Documents

Reusable style definitions for generating professionally formatted Word documents from USDM/EARS requirements.

## Document Styles Object

```javascript
const styles = {
  default: {
    document: {
      run: {
        font: "Arial",
        size: 22 // 11pt
      }
    }
  },
  paragraphStyles: [
    {
      id: "Title",
      name: "Title",
      basedOn: "Normal",
      run: {
        size: 56, // 28pt
        bold: true,
        color: "000000",
        font: { ascii: "Arial", eastAsia: "Yu Gothic", hAnsi: "Arial" }
      },
      paragraph: {
        spacing: { before: 240, after: 120 },
        alignment: AlignmentType.CENTER
      }
    },
    {
      id: "Heading1",
      name: "Heading 1",
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true,
      run: {
        size: 32, // 16pt
        bold: true,
        color: "1F3864",
        font: { ascii: "Arial", eastAsia: "Yu Gothic", hAnsi: "Arial" }
      },
      paragraph: {
        spacing: { before: 360, after: 240 },
        outlineLevel: 0
      }
    },
    {
      id: "Heading2",
      name: "Heading 2",
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true,
      run: {
        size: 28, // 14pt
        bold: true,
        color: "1F3864",
        font: { ascii: "Arial", eastAsia: "Yu Gothic", hAnsi: "Arial" }
      },
      paragraph: {
        spacing: { before: 300, after: 180 },
        outlineLevel: 1
      }
    },
    {
      id: "Heading3",
      name: "Heading 3",
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true,
      run: {
        size: 24, // 12pt
        bold: true,
        color: "404040",
        font: { ascii: "Arial", eastAsia: "Yu Gothic", hAnsi: "Arial" }
      },
      paragraph: {
        spacing: { before: 240, after: 120 },
        outlineLevel: 2
      }
    },
    {
      id: "Heading4",
      name: "Heading 4",
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true,
      run: {
        size: 22, // 11pt
        bold: true,
        color: "404040",
        font: { ascii: "Arial", eastAsia: "Yu Gothic", hAnsi: "Arial" }
      },
      paragraph: {
        spacing: { before: 200, after: 100 },
        outlineLevel: 3
      }
    }
  ]
};
```

## Color Palette

| Purpose | Color Code | Preview |
|---------|-----------|---------|
| Heading 1, 2 | `1F3864` | Dark blue |
| Heading 3, 4 | `404040` | Dark gray |
| Body text | `000000` | Black |
| Table header background | `D5E8F0` | Light blue |
| Table borders | `CCCCCC` | Light gray |
| Header/footer text | `666666` | Medium gray |
| Confidentiality notice | `666666` | Medium gray |
| Logo placeholder text | `999999` | Light gray |

## Table Styling Constants

```javascript
const tableBorder = {
  style: BorderStyle.SINGLE,
  size: 1,
  color: "CCCCCC"
};

const cellBorders = {
  top: tableBorder,
  bottom: tableBorder,
  left: tableBorder,
  right: tableBorder
};

const headerShading = {
  fill: "D5E8F0",
  type: ShadingType.CLEAR  // CRITICAL: Always use CLEAR, never SOLID
};

const tableMargins = {
  top: 80,
  bottom: 80,
  left: 120,
  right: 120
};
```

## Page Layout

```javascript
const pageProperties = {
  page: {
    margin: {
      top: 1440,    // 1 inch
      right: 1440,
      bottom: 1440,
      left: 1440
    },
    pageNumbers: {
      start: 1,
      formatType: "decimal"
    }
  }
};
```

## Font Configuration

The font configuration supports both English and Japanese text:

```javascript
// Default font for body text
const bodyFont = { ascii: "Arial", eastAsia: "Yu Gothic", hAnsi: "Arial" };

// Apply to individual TextRuns when needed
new TextRun({
  text: content,
  font: bodyFont,
  size: 22
})
```

**Note**: The default document font (`styles.default.document.run.font`) only accepts a string value (`"Arial"`). Use the font object with `ascii`/`eastAsia`/`hAnsi` properties on individual TextRun or paragraph style definitions for full bilingual support.

## Numbering Configuration

For bullet lists and numbered lists within the document:

```javascript
const numbering = {
  config: [
    {
      reference: "bullet-list",
      levels: [{
        level: 0,
        format: LevelFormat.BULLET,
        text: "\u2022",
        alignment: AlignmentType.LEFT,
        style: {
          paragraph: {
            indent: { left: 720, hanging: 360 }
          }
        }
      }]
    }
  ]
};
```

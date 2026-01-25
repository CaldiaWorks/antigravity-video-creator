# Task Completion Checklist

When completing a task in this project, perform the following checks:

## 1. Code Quality

### Linting
```bash
npm run lint
```
- Fix all ESLint errors
- Fix all ESLint warnings (if reasonable)

### Formatting
```bash
npm run format
```
- Ensure all modified files are formatted with Prettier

### TypeScript
- Ensure no TypeScript compilation errors
- Type annotations should be explicit where inference is insufficient

## 2. Testing

### Preview
```bash
npm start
```
- Visually verify the video output in Remotion Studio
- Check animations play correctly
- Verify timing and sequencing

### Render (if applicable)
```bash
npm run build
```
- Render to MP4 to verify final output
- Check output file `out.mp4` plays correctly

## 3. Documentation

- Update README.md if adding new features
- Add comments only where code is not self-explanatory
- Comments must be in English

## 4. Git

- Stage only relevant files (avoid staging node_modules, .env, etc.)
- Write clear, concise commit messages
- Commit messages should describe what and why, not how

## Notes

- Tests are not yet configured (`npm test` will fail)
- Focus on visual verification through Remotion Studio preview

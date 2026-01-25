# Suggested Commands

## Development Commands

### Preview (Development Mode)
```bash
npm start
```
Opens the Remotion Studio in browser for real-time preview and editing.

### Build / Render Video
```bash
npm run build
```
Renders the current composition to `out.mp4`. Requires ffmpeg installed.

### Linting
```bash
npm run lint
```
Runs ESLint on the `src` directory.

### Formatting
```bash
npm run format
```
Runs Prettier to format all TypeScript files in `src`.

## System Utilities (macOS / Darwin)

### Git Commands
```bash
git status            # Check current status
git add <file>        # Stage changes
git commit -m "msg"   # Commit changes
git push              # Push to remote
git pull              # Pull from remote
git log --oneline -n 5  # Show recent commits
```

### File Operations
```bash
ls -la               # List files with details
cd <directory>       # Change directory
mkdir <name>         # Create directory
rm <file>            # Remove file
rm -rf <directory>   # Remove directory recursively
cp <src> <dst>       # Copy file
mv <src> <dst>       # Move/rename file
```

### Search
```bash
grep -r "pattern" .   # Search for pattern in files
find . -name "*.ts"   # Find files by name
```

## Package Management
```bash
npm install           # Install dependencies
npm install <pkg>     # Install a package
npm install -D <pkg>  # Install as dev dependency
npm update            # Update packages
```

## Remotion CLI (via npm scripts)
```bash
npx remotion preview src/index.ts            # Same as npm start
npx remotion render src/index.ts MyComp out.mp4  # Same as npm run build
npx remotion still src/index.ts MyComp frame.png --frame=0  # Extract single frame
```

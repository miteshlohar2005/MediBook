const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace background: "#fff" or "#ffffff"
  content = content.replace(/background:\s*["']#fff["']/g, 'background: "var(--c-bg-card)"');
  content = content.replace(/background:\s*["']#ffffff["']/g, 'background: "var(--c-bg-card)"');
  
  // Replace background in css string
  content = content.replace(/background:#fff;/g, 'background:var(--c-bg-card);');
  
  // Replace border rgba colors
  content = content.replace(/rgba\(46,\s*125,\s*138,\s*0\.1\)/g, 'var(--c-border-subtle)');
  content = content.replace(/rgba\(46,125,138,0\.1\)/g, 'var(--c-border-subtle)');
  content = content.replace(/rgba\(46,\s*125,\s*138,\s*0\.08\)/g, 'var(--c-border-subtle)');
  content = content.replace(/rgba\(46,125,138,0\.08\)/g, 'var(--c-border-subtle)');
  
  content = content.replace(/rgba\(46,\s*125,\s*138,\s*0\.2\)/g, 'var(--c-border-subtle-heavy)');
  content = content.replace(/rgba\(46,125,138,0\.2\)/g, 'var(--c-border-subtle-heavy)');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  }
}

walkDir(path.join(__dirname, 'app'));
walkDir(path.join(__dirname, 'components'));

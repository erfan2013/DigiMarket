const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'src');

function stripBOM(s) {
  return s.charCodeAt(0) === 0xFEFF ? s.slice(1) : s;
}

(function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) walk(p);
    else if (/\.(js|jsx|ts|tsx|css|json)$/i.test(name)) {
      const before = fs.readFileSync(p, 'utf8');
      const after = stripBOM(before);
      if (after !== before) {
        fs.writeFileSync(p, after, { encoding: 'utf8' });
        console.log('Fixed BOM:', p);
      }
    }
  }
})(root);

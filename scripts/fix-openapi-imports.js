#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const OPENAPI_DIR = path.join(__dirname, '../openapi');

// Recursively find all .ts files in a directory
function findTsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findTsFiles(filePath, fileList);
    } else if (file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Fix imports in a file
function fixImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Replace app-rest-client imports with configured-rest-client
  content = content.replace(
    /from ["']\.\.\/app-rest-client["']/g,
    'from "../configured-rest-client"'
  );

  // Only write if content changed
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed imports in: ${path.relative(process.cwd(), filePath)}`);
    return true;
  }

  return false;
}

// Main execution
console.log('🔧 Fixing OpenAPI imports...\n');

const tsFiles = findTsFiles(OPENAPI_DIR);
let fixedCount = 0;

tsFiles.forEach(file => {
  if (fixImportsInFile(file)) {
    fixedCount++;
  }
});

console.log(`\n✅ Done! Fixed ${fixedCount} file(s).`);

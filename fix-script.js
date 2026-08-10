const fs = require('fs');
let content = fs.readFileSync('tests/girlscounts-login.spec.ts', 'utf8');
content = content.replace(
  "await page.getByRole('button', { name: 'Accept' }).click();",
  "await page.getByRole('button', { name: 'Accept' }).click({ force: true });"
);
fs.writeFileSync('tests/girlscounts-login.spec.ts', content);

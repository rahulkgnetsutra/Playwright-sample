const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('/tmp/playwright-artifacts/test.trace');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lastHtml = "";
  for await (const line of rl) {
    if (line.includes('snapshot')) {
      try {
        const data = JSON.parse(line);
        if (data.type === 'resource-snapshot') {
        }
      } catch (e) {}
    }
  }
}

// Just extract all visible buttons in the trace! Actually strings are better.
const trace = fs.readFileSync('/tmp/playwright-artifacts/test.trace', 'utf8');
const submitMatch = trace.match(/Submit[a-zA-Z ]*/i);
const errorMatch = trace.match(/No troops available/i);
console.log("Submit match (if any):", submitMatch ? submitMatch[0] : null);
console.log("Error match (if any):", errorMatch ? errorMatch[0] : null);


const fs = require('fs');
let file = fs.readFileSync('tests/girlscounts-registration.spec.ts', 'utf8');

file = file.replace(/#grade-B-37777870-1 > .ng-select-container > .ng-value-container > .ng-input/g, '[id^="grade-B-"] .ng-input\').first');
file = file.replace(/#type-B-37777870-1 > .ng-select-container > .ng-value-container > .ng-input/g, '[id^="type-B-"] .ng-input\').first');
file = file.replace(/#troop-g-B-37777870-1 > .ng-select-container > .ng-value-container > .ng-input/g, '[id^="troop-g-B-"] .ng-input\').first');
file = file.replace(/#ethnicity-B-37777870-1 > .ng-select-container > .ng-value-container > .ng-input/g, '[id^="ethnicity-B-"] .ng-input\').first');
file = file.replace(/#race-B-37777870-1 > .ng-select-container > .ng-value-container > .ng-input/g, '[id^="race-B-"] .ng-input\').first');
file = file.replace(/#relationshipCG-B-37777870-1-cg1 > .ng-select-container > .ng-value-container > .ng-input/g, '[id^="relationshipCG-B-"] .ng-input\').first');

// Also, let's add { force: true } to the click methods for these
file = file.replace(/\.first\(\)\.click\(\)/g, '.first().click({ force: true })');

fs.writeFileSync('tests/girlscounts-registration.spec.ts', file);

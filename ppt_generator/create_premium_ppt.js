const pptxgen = require('pptxgenjs');
let pptx = new pptxgen();

pptx.layout = 'LAYOUT_16x9';
pptx.author = 'Rahul Gupta';
pptx.subject = 'Playwright Automation Framework';

// Base Colors
const BLU = '0078D4'; // Microsoft Corporate Blue
const WHI = 'FFFFFF';
const GRY = 'F3F4F6'; // Light grayish for rounded cards
const TXT_DARK = '1E1E1E';
const TXT_LIG = '555555';

// Define Master
pptx.defineSlideMaster({
  title: 'MASTER_CORP',
  background: { color: WHI },
  objects: [
    // Top Accent line
    { rect: { x: 0, y: 0, w: '100%', h: 0.1, fill: { color: BLU } } },
    // Footer line
    { rect: { x: 0, y: 5.2, w: '100%', h: 0.05, fill: { color: 'E0E0E0' } } },
    { text: { text: "Playwright Automation Framework | Rahul Gupta", options: { x: 0.5, y: 5.3, w: '50%', h: 0.2, fontSize: 10, fontFace: 'Segoe UI', color: TXT_LIG } } }
  ],
  slideNumber: { x: '95%', y: 5.3, color: TXT_LIG, fontFace: 'Segoe UI', fontSize: 10 }
});

const defaultTitleOpts = { x: 0.5, y: 0.4, w: '90%', h: 0.6, fontSize: 32, fontFace: 'Segoe UI', color: BLU, bold: true };
const defaultTextOpts = { x: 0.5, y: 1.2, w: '90%', h: 3.5, fontSize: 18, fontFace: 'Segoe UI', color: TXT_DARK, align: 'left', bullet: true, margin: 15, lineSpacing: 25 };

function addNormSlide(title, points, notes) {
  let slide = pptx.addSlide({ masterName: 'MASTER_CORP' });
  slide.addText(title, defaultTitleOpts);

  let formatted = Array.isArray(points) ? points.map(t => ({ text: t })) : points;
  slide.addText(formatted, defaultTextOpts);
  
  if (notes) slide.addNotes(notes);
  return slide;
}

// 1. Cover Slide
let s1 = pptx.addSlide();
s1.background = { color: BLU };
s1.addText("Playwright Automation Testing", { x: 1, y: 2, w: 8, h: 1.5, fontSize: 44, fontFace: 'Segoe UI', color: WHI, bold: true, align: 'center' });
s1.addText("Modern End-to-End Web Automation Framework", { x: 1, y: 3.2, w: 8, h: 1, fontSize: 24, fontFace: 'Segoe UI Light', color: WHI, align: 'center' });
s1.addText("Rahul Gupta\nSenior Software Engineer", { x: 1, y: 4.5, w: 8, h: 1, fontSize: 16, fontFace: 'Segoe UI', color: WHI, align: 'center' });
s1.addNotes("Welcome the audience. Introduce Playwright as the future of enterprise automation.");

// 2. Agenda
addNormSlide("Agenda", [
  "Introduction & What is Playwright?",
  "Why Automation Testing & Why Playwright?",
  "Playwright Architecture & Mechanics",
  "Project Installation & Framework Structure",
  "Execution Flows (Login, Registration)",
  "Reporting, Trace Viewer & Debugging",
  "CI/CD Integration & Best Practices"
], "Walk through the topics briefly to set expectations for the presentation.");

// 3. Intro
addNormSlide("Introduction to Playwright", [
  "Developed by Microsoft – Backed by a powerful tech giant ensuring continuous updates.",
  "Open Source – Completely free and heavily community-supported.",
  "End-to-End Testing – Automates the complete user journey from UI to backend.",
  "Modern Automation Framework – Built for the modern web (Single Page Apps, shadow DOM).",
  "Cross-browser – Reliable testing across Chromium, Firefox, and WebKit.",
  "Cross-platform – Executes flawlessly on Windows, Linux, and macOS."
], "Emphasize Microsoft's backing and the modern SPA architecture capabilities.");

// 4. Why Automation
addNormSlide("Why Automation Testing?", [
  "Reduce Manual Testing: Automate repetitive and tedious regression suites.",
  "Faster Releases: Enables quicker feedback loops in Agile/DevOps.",
  "Regression Testing: Ensure existing functionalities do not break on new commits.",
  "Continuous Testing: Core pillar of proper CI/CD pipelines.",
  "Better Quality: Eliminates human error and enhances test accuracy.",
  "Lower Cost: Significant long-term ROI by reducing manual QA hours."
], "Talk about ROI (Return on Investment). Automation saves money long-term.");

// 5. Why Playwright (Table)
let s5 = pptx.addSlide({ masterName: 'MASTER_CORP' });
s5.addText("Why Playwright? (Comparison)", defaultTitleOpts);
let rows = [
  [{text:'Feature', options:{bold:true, fill:BLU, color:WHI}}, {text:'Playwright', options:{bold:true, fill:BLU, color:WHI}}, {text:'Selenium', options:{bold:true, fill:BLU, color:WHI}}, {text:'Cypress', options:{bold:true, fill:BLU, color:WHI}}],
  ['Speed & Comm.', 'Very Fast (WebSocket)', 'Moderate (HTTP D-Protocol)', 'Fast (In-Browser)'],
  ['Auto Wait', 'Native (Actionability checks)', 'Requires explicit waits', 'Native'],
  ['Multi-Tab/Window', 'Native Support (Contexts)', 'Complex to manage', 'Not Supported natively'],
  ['Cross Browser', 'Chromium, Firefox, WebKit', 'All major drivers', 'Chromium, Firefox'],
  ['Mobile Testing', 'Native viewport emulation', 'Needs Appium', 'Not Supported'],
  ['Network Mocking', 'Full API context control', 'Extremely Complicated', 'Full API control'],
  ['Debugging', 'Trace Viewer (Time Travel)', 'Console logs / Basic', 'Time-travel dashboard']
];
s5.addTable(rows, { x: 0.5, y: 1.2, w: 9, rowH: 0.4, colW:[2.4, 2.4, 2.1, 2.1], border:{pt:1, color:'E0E0E0'}, fill:'FFFFFF', fontFace:'Segoe UI', fontSize: 13, color: TXT_DARK });
s5.addNotes("Discuss Playwright's absolute dominance in speed due to WebSockets, and its native capability to test multi-tab flows.");

// 6. Architecture (Editable Diagram)
let s6 = pptx.addSlide({ masterName: 'MASTER_CORP' });
s6.addText("Playwright Architecture", defaultTitleOpts);

let shadowOpts = { type: 'outer', blur: 5, offset: 3, opacity: 0.3 };
let shapeOpts = { shape: pptx.ShapeType.roundRect, fill: BLU, line: BLU, lineSize: 1, shadow: shadowOpts, h: 1.2, align: 'center', color: WHI, fontFace: 'Segoe UI', bold: true, fontSize: 16 };

s6.addShape(shapeOpts.shape, { ...shapeOpts, x: 0.5, y: 2, w: 2, text: "Automation Script\n(Node, Python, Java)" });
s6.addShape(pptx.ShapeType.rightArrow, { x: 2.7, y: 2.4, w: 1, h: 0.4, fill: 'CCCCCC' });
s6.addShape(shapeOpts.shape, { ...shapeOpts, x: 3.9, y: 1.2, w: 2, h: 2.8, text: "Playwright API\n\n(WebSocket Protocol)", fill: '005A9E' });
s6.addShape(pptx.ShapeType.rightArrow, { x: 6.1, y: 2.4, w: 1, h: 0.4, fill: 'CCCCCC' });
s6.addShape(shapeOpts.shape, { ...shapeOpts, x: 7.3, y: 1.2, w: 2, h: 0.7, text: "Chromium Process", fill: WHI, color: BLU, line: 'CCCCCC' });
s6.addShape(shapeOpts.shape, { ...shapeOpts, x: 7.3, y: 2.25, w: 2, h: 0.7, text: "Firefox Process", fill: WHI, color: BLU, line: 'CCCCCC' });
s6.addShape(shapeOpts.shape, { ...shapeOpts, x: 7.3, y: 3.3, w: 2, h: 0.7, text: "WebKit Process", fill: WHI, color: BLU, line: 'CCCCCC' });
s6.addNotes("Unlike Selenium which uses HTTP REST requests for each command, Playwright uses a single persistent WebSocket connection, removing handshake latency.");

// 7. How Works
let s7 = pptx.addSlide({ masterName: 'MASTER_CORP' });
s7.addText("How Playwright Works (Automated Flow)", defaultTitleOpts);
let hSteps = ["Write Test", "Launch Context", "Locate Elements", "Auto-Waiting", "Perform Actions", "Assertions", "Test Report"];
hSteps.forEach((step, idx) => {
    s7.addShape(pptx.ShapeType.roundRect, { x: 0.5 + (idx * 1.3), y: 2.5, w: 1.1, h: 1, fill: idx%2===0 ? BLU : '005A9E', color: WHI, text: step, align: 'center', fontFace: 'Segoe UI', fontSize: 12, shadow: shadowOpts });
    if(idx < 6) s7.addShape(pptx.ShapeType.rightArrow, { x: 1.6 + (idx * 1.3), y: 2.9, w: 0.2, h: 0.2, fill: 'CCCCCC' });
});
s7.addNotes("Playwright's auto-waiting natively checks if an element is visible, stable, enabled, and receiving events before it ever attempts to click or type.");

// 8. Installation
let s8 = pptx.addSlide({ masterName: 'MASTER_CORP' });
s8.addText("Installation & Bootstrapping", defaultTitleOpts);
s8.addShape(pptx.ShapeType.roundRect, { x: 0.5, y: 1.5, w: 9, h: 2, fill: '1E1E1E', shadow: shadowOpts });
s8.addText("npm init playwright@latest\nnpm install\nnpx playwright test\nnpx playwright show-report", { x: 0.7, y: 1.6, w: 8.6, h: 1.8, fontFace: 'Consolas', fontSize: 18, color: '4AF626' });
s8.addNotes("Installation is highly modular and developer-friendly. Only one command needed to fetch drivers and engines.");

// 9. Project Structure
addNormSlide("Playwright Project Structure", [
  "/tests - Endpoint specifications (*.spec.ts) covering end-to-end flows.",
  "/pages - Page Object Model (POM) classes abstracting UI implementation.",
  "/fixtures - Setup/teardown custom test environments.",
  "/utils - Reusable helpers, database queries, and test data generators.",
  "/test-results - Execution artifacts (Videos, Traces, Screenshots).",
  "/playwright-report - Automatically generated HTML execution reports.",
  "playwright.config.ts - Core framework configuration (Timeouts, workers).",
  "package.json - Application dependencies and Node scripts."
], "Highlight that an enterprise level architecture strictly separates tests from locators via POM.");

// 10. Framework Architecture
let s10 = pptx.addSlide({ masterName: 'MASTER_CORP' });
s10.addText("Automation Framework Architecture (POM)", defaultTitleOpts);
s10.addShape(pptx.ShapeType.rect, { x: 1, y: 1.5, w: 8, h: 0.8, text: "Execution & Reporting Layer (HTML, Allure, Traces)", fill: '005A9E', color: WHI, shadow: shadowOpts, align: 'center', fontFace: 'Segoe UI', fontSize: 16 });
s10.addShape(pptx.ShapeType.rect, { x: 1, y: 2.5, w: 8, h: 0.8, text: "Test Specifications Layer (Mocha/Playwright Runner)", fill: BLU, color: WHI, shadow: shadowOpts, align: 'center', fontFace: 'Segoe UI', fontSize: 16 });
s10.addShape(pptx.ShapeType.rect, { x: 1, y: 3.5, w: 3.8, h: 0.8, text: "Page Objects (UI Encapsulation)", fill: '00A4EF', color: WHI, shadow: shadowOpts, align: 'center', fontFace: 'Segoe UI', fontSize: 16 });
s10.addShape(pptx.ShapeType.rect, { x: 5.2, y: 3.5, w: 3.8, h: 0.8, text: "Test Data & API Fixtures (.json)", fill: '00A4EF', color: WHI, shadow: shadowOpts, align: 'center', fontFace: 'Segoe UI', fontSize: 16 });
s10.addNotes("Explain Page Object Model (POM). Tests never hold direct CSS/XPath locators to avoid high maintenance overheads.");

// 11. Login Flow (SmartArt Mock)
let s11 = pptx.addSlide({ masterName: 'MASTER_CORP' });
s11.addText("Login Automation Flow", defaultTitleOpts);
let lfSteps = ["Launch Browser", "Open URL Context", "Provide Identity", "Click Auth", "Confirm Dashboard"];
lfSteps.forEach((s, idx) => {
    s11.addShape(pptx.ShapeType.downArrow, { x: 1.5, y: 1.2 + (idx * 0.8), w: 0.2, h: 0.3, fill: 'CCCCCC' });
    s11.addShape(pptx.ShapeType.roundRect, { x: 0.5, y: 1.5 + (idx * 0.8), w: 2.2, h: 0.5, fill: idx===4?'2E7D32':BLU, color: WHI, text: s, align: 'center', shadow: shadowOpts, fontFace: 'Segoe UI', fontSize: 14 });
});
s11.addShape(pptx.ShapeType.roundRect, { x: 3.5, y: 1.5, w: 6, h: 3, fill: GRY, line: 'CCCCCC', text: " 🖼️ [ Placeholder: Login Screenshot / Code Snippet ] ", align: 'center', color: TXT_LIG });
s11.addNotes("This flow represents the critical entrypoint of our pipeline. Authentication can also be injected via API to bypass UI for speed.");

// 12. Registration Flow
let s12 = pptx.addSlide({ masterName: 'MASTER_CORP' });
s12.addText("Registration Automation Flow", defaultTitleOpts);
let rfSteps = ["Login", "Registration", "User Details", "Documents", "Submit Form", "Validation", "Confirmation"];
rfSteps.forEach((s, idx) => {
    s12.addShape(pptx.ShapeType.roundRect, { x: 0.5 + (idx * 1.2), y: 1.5, w: 1, h: 0.8, fill: idx===6?'2E7D32':BLU, color: WHI, text: s, align: 'center', fontSize: 10, shadow: shadowOpts, fontFace: 'Segoe UI' });
});
s12.addShape(pptx.ShapeType.roundRect, { x: 0.5, y: 2.8, w: 9, h: 2.2, fill: GRY, line: 'CCCCCC', text: " 🖼️ [ Placeholder: Registration Form UI App Mockup ] ", align: 'center', color: TXT_LIG });
s12.addNotes("This flow maps out complex UI components, verifying robust Angular elements and dynamic document uploads.");

// 13. Test Execution
addNormSlide("Test Execution Engine", [
  "Execution Engine: npx playwright test --workers=4",
  "Parallel Execution: Playwright utilizes completely isolated 'Browser Contexts'.",
  "This architecture ensures tests do not share cookies, cache, or local storage.",
  "Multi-Browser: Execute simultaneously on Chromium, WebKit, and Firefox.",
  "Headless vs Headed modes natively supported out of the box."
], "Mention how Browser Contexts make parallel execution safe. Contexts are spawned in milliseconds.");

// 14. HTML Report
let s14 = pptx.addSlide({ masterName: 'MASTER_CORP' });
s14.addText("Native HTML Reporting Engine", defaultTitleOpts);
s14.addShape(pptx.ShapeType.roundRect, { x: 0.5, y: 1.2, w: 9, h: 3.8, fill: GRY, line: 'CCCCCC', text: " 📊 [ Placeholder: FULL SLIDE - Playwright HTML Report UI ] ", align: 'center', color: TXT_LIG, fontFace: 'Segoe UI' });
s14.addNotes("The HTML report includes metrics for Total Passed/Failed, detailed logic flow, embedded screenshots, and recorded videos.");

// 15. Trace Viewer
let s15 = pptx.addSlide({ masterName: 'MASTER_CORP' });
s15.addText("Debugging via Trace Viewer", defaultTitleOpts);
s15.addShape(pptx.ShapeType.roundRect, { x: 0.5, y: 1.2, w: 9, h: 3.8, fill: GRY, line: 'CCCCCC', text: " 🐛 [ Placeholder: FULL SLIDE - Trace Viewer UI Snapshot ] ", align: 'center', color: TXT_LIG, fontFace: 'Segoe UI' });
s15.addNotes("Explain that Trace Viewer is a time-machine. You can slide through execution, inspect DOM, network intercepts, and console errors retroactively.");

// 16. CI/CD Integration (Diagram)
let s16 = pptx.addSlide({ masterName: 'MASTER_CORP' });
s16.addText("CI/CD Automation Pipeline", defaultTitleOpts);
let devOpsSteps = ["Developer Commit", "GitHub Hook", "Jenkins Pipeline", "Playwright Runner", "HTML Report", "Email Notifications"];
devOpsSteps.forEach((s, idx) => {
    s16.addShape(pptx.ShapeType.roundRect, { x: 0.5 + (idx*1.5), y: 2.5, w: 1.2, h: 1, fill: BLU, color: WHI, text: s, fontSize: 12, align: 'center', shadow: shadowOpts, fontFace: 'Segoe UI' });
    if(idx < 5) s16.addShape(pptx.ShapeType.rightArrow, { x: 1.75 + (idx*1.5), y: 2.9, w: 0.2, h: 0.2, fill: '005A9E' });
});
s16.addNotes("Modern QA isn't manual; we shift-left. Every pull request runs the suite automatically on a pipeline VM.");

// 17. Advantages
addNormSlide("Core Advantages (The Playwright Edge)", [
  "Unmatched Reliability: Auto-waiting drastically eliminates 'flaky' scripts.",
  "Network Interception: Ability to strictly mock, validate, or redirect HTTP endpoints.",
  "Web-first Assertions: Ensures the UI is physically ready before test validation.",
  "Native Emulation: Emulates device scaling and geolocation perfectly.",
  "ROI & Maintenance: Highest return on QA investment compared to legacy drivers."
], "Summarize that Playwright brings enterprise trust back into automated QA.");

// 18. Best Practices
addNormSlide("Automation Best Practices", [
  "Page Object Model (POM): Strictly decoupling test assertion data from UI extraction logic.",
  "Environment Configuration: Storing all credentials in `.env` configurations natively.",
  "Resiliency Configuration: Setting smart granular timeouts rather than hardcoded `sleep` statements.",
  "Data-driven Testing: Inject JSON mock arrays into iterations cleanly.",
  "Actionable Reporting: Setup Slack/Teams webhooks directly to engineering alerts."
], "Discuss that even the best tool fails without right design patterns. POM and config isolation is crucial.");

// 19. Roadmap
addNormSlide("Future Automation Roadmap", [
  "Expand Core Infrastructure: Build robust API validation controllers alongside UI flows.",
  "Visual Automation: Implement pixel-perfect visual regression checks natively.",
  "Mobile Grids: Broaden matrix using device cloud infrastructures like BrowserStack.",
  "Accessibility: Native integration with axe-core to validate WCAG compliance automatically.",
  "Performance Audits: Capture Chrome DevTools (CDP) metrics alongside validation."
], "Automation is a journey. Mention shifting into testing REST APIs and Accessibility.");

// 20. Thank You
let s20 = pptx.addSlide();
s20.background = { color: BLU };
s20.addText("Thank You. Questions?", { x: 0, y: 2.2, w: '100%', h: 1.5, fontSize: 44, fontFace: 'Segoe UI', color: WHI, bold: true, align: 'center' });
s20.addText("Prepared By: Rahul Gupta", { x: 0, y: 3.5, w: '100%', h: 1, fontSize: 20, fontFace: 'Segoe UI Light', color: WHI, align: 'center' });
s20.addText("Playwright Automation Architecture", { x: 0, y: 4.2, w: '100%', h: 1, fontSize: 14, fontFace: 'Segoe UI', color: 'E3F2FD', align: 'center' });
s20.addNotes("Thank the stakeholders and open the floor to technical Q&A.");

pptx.writeFile({ fileName: '/home/rahul/Downloads/playwright-demo/Playwright_Corporate_Premium.pptx' })
  .then(fileName => {
      console.log(`PPTX Generation Complete: ${fileName}`);
  });

const pptxgen = require('pptxgenjs');
let pptx = new pptxgen();

pptx.layout = 'LAYOUT_16x9';
pptx.theme = { headFontFace: "Arial", bodyFontFace: "Arial" };

pptx.defineSlideMaster({
  title: 'MASTER_SLIDE',
  background: { color: 'FFFFFF' },
  objects: [
    { rect: { x: 0, y: 0, w: '100%', h: 0.7, fill: { color: '005A9E' } } },
    { text: { text: "Playwright Automation Testing", options: { x: 0.5, y: 0.1, w: 5, h: 0.5, fontSize: 18, color: 'FFFFFF', bold: true } } },
    { rect: { x: 0, y: '97%', w: '100%', h: 0.2, fill: { color: '005A9E' } } },
    { text: { text: "Enterprise QA Architecture | Rahul Gupta", options: { x: '50%', y: '95%', w: '48%', h: 0.5, fontSize: 10, align: 'right', color: '666666' } } }
  ]
});

const defaultTitleOpts = { x: 0.5, y: 1.0, w: 9, h: 0.6, fontSize: 32, color: '005A9E', bold: true };
const defaultTextOpts = { x: 0.5, y: 1.8, w: '90%', h: 3.5, fontSize: 20, color: '333333', bullet: { type: 'bullet' }, lineSpacing: 32, margin: 10 };

function addBasicSlide(title, points) {
    let slide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    slide.addText(title, defaultTitleOpts);

    let formattedPoints = points;
    if (Array.isArray(points)) {
        formattedPoints = points.map(textItem => ({ text: textItem }));
    }
    slide.addText(formattedPoints, defaultTextOpts);
}

// Slide 1
let titleSlide = pptx.addSlide();
titleSlide.background = { color: '005A9E' }; 
titleSlide.addText("Playwright Automation Testing", { x: 0, y: 2, w: '100%', h: 1, fontSize: 44, color: 'FFFFFF', bold: true, align: 'center' });
titleSlide.addText("Modern E2E Web Automation", { x: 0, y: 3, w: '100%', h: 1, fontSize: 24, color: 'FFFFFF', align: 'center' });
titleSlide.addText("Rahul Gupta\nSenior Software Engineer", { x: 0, y: 5, w: '100%', h: 1, fontSize: 18, color: 'FFFFFF', align: 'center' });

// Slide 2
addBasicSlide("Agenda", [
  "Introduction to Playwright Framework",
  "Why Choose Test Automation?",
  "Market Comparison (Selenium vs. Cypress vs. Playwright)",
  "Core Architecture & Workflow",
  "Environment Setup & Framework Design (POM)",
  "Business Execution Flows (Login & Registration)",
  "Reporting & Trace Viewer Capabilities",
  "CI/CD Integration & Future Scope"
]);

// Slide 3
addBasicSlide("Introduction to Playwright", [
  "Backed by Microsoft: Highly stable with monthly feature updates.",
  "Open Source: Free to scale across enterprise organizations.",
  "End-to-End Capabilities: Automates UI, APIs, and WebSockets.",
  "Cross-Browser Engine Support:",
  "    • Chromium (Chrome/Edge)",
  "    • Firefox",
  "    • WebKit (Safari)",
  "Cross-Platform Execution: Runs seamlessly on Windows, Linux, & macOS."
]);

// Slide 4
addBasicSlide("Why Automation Testing?", [
  "Speed & Efficiency: Accelerates execution time by reducing manual processes.",
  "Continuous Integration (CI/CD): Vital for modern Agile release cycles.",
  "Regression Testing: Prevents new code from breaking existing stability.",
  "Increased Reliability: Eliminates human fatigue and manual test errors.",
  "High Return on Investment (ROI): Drastically lowers quality assurance costs.",
  "Greater Coverage: Ability to run tests on multiple browsers concurrently."
]);

// Slide 5
let compSlide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
compSlide.addText("Why Playwright? (Comparison)", defaultTitleOpts);
let rows = [
  [{text:'Feature', options:{bold:true, fill: '005A9E', color: 'FFFFFF'}}, {text:'Playwright', options:{bold:true, fill: '005A9E', color: 'FFFFFF'}}, {text:'Selenium', options:{bold:true, fill: '005A9E', color: 'FFFFFF'}}, {text:'Cypress', options:{bold:true, fill: '005A9E', color: 'FFFFFF'}}],
  ['Execution Speed', 'Ultra Fast (WebSocket)', 'Moderate (HTTP Protocol)', 'Fast'],
  ['Auto-Waiting', 'Native & Flawless', 'Requires explicit code', 'Native'],
  ['Contexts / Parallel', 'Supported Natively', 'Requires Selenium Grid', 'Paid Features'],
  ['iFrames/Multiple Tabs', 'Full Support', 'Complex setup', 'Not Supported'],
  ['API Interception', 'Built-in natively', 'Complex/External libs', 'Supported']
];
compSlide.addTable(rows, { x: 0.5, y: 1.8, w: 9, rowH: 0.5, colW: [2.5, 2.5, 2, 2], border: {pt: 1}, fill: "F9F9F9", fontSize: 16 });

// Slide 6
addBasicSlide("Playwright Architecture", [
  "No HTTP Handshake Latency:",
  "    • Connects to the browser once via a WebSocket connection.",
  "    • Instructions are sent as bidirectional JSON payloads.",
  "Out-of-Process Execution:",
  "    • Test scripts run entirely separate from the browser environment.",
  "    • Result: Zero memory leaks and immunity to page crashes.",
  "Direct DevTools Protocol:",
  "    • Controls the browser exactly like a native developer tool."
]);

// Slide 7
addBasicSlide("How Playwright Works", [
  "Step 1: Write Test Code (JavaScript / TypeScript / Python).",
  "Step 2: Launch Browser Context (Isolates sessions without overhead).",
  "Step 3: Navigate URL (Tracks actual network/DOM load state).",
  "Step 4: Locate Elements (Uses resilient, user-first locators like 'ByRole').",
  "Step 5: Auto-Wait (Checks if element is visible and stable before clicking).",
  "Step 6: Execute Action (Fill form, Click button).",
  "Step 7: Web-First Assertions (Auto-retrying assertions like 'toHaveText')."
]);

// Slide 8
addBasicSlide("Framework Setup & Installation", [
  "NPM Package Management:",
  "    • 'npm init playwright@latest' (Scaffolds the entire framework).",
  "    • Installs necessary browser binaries completely automatically.",
  "Execution Commands:",
  "    • 'npx playwright test' (Runs suite across all configured browsers).",
  "    • 'npx playwright test --workers=4' (Launches parallel workers).",
  "Reporting:",
  "    • 'npx playwright show-report' (Serves local HTML UI)."
]);

// Slide 9
addBasicSlide("Framework Architecture Design", [
  "Page Object Model (POM):",
  "    • Design pattern abstracts elements (locators) from logic (tests).",
  "    • Benefit: UI changes require updates in only one file.",
  "Test Data Isolation:",
  "    • Dynamic JSON files inject real-time variables to bypass validations.",
  "Reusable Utilities:",
  "    • Centralized functions for Authentication, Databases, & Screenshots.",
  "Global Configuration (playwright.config.ts):",
  "    • Defines environments, Base URLs, retries, and artifacts."
]);

// Slide 10
let loginSlide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
loginSlide.addText("Login & Registration Workflow", defaultTitleOpts);
loginSlide.addText([
    {text: "Standard Login Flow:", options: {bold: true, color: '005A9E', bullet: false}},
    {text: "Navigate to Gateway"},
    {text: "Enter valid Username & Password"},
    {text: "Submit Form & Validate Dashboard transition"},
    {text: "Enterprise Registration Flow:", options: {bold: true, color: '005A9E', bullet: false, breakLine: true}},
    {text: "Bypass Authentication UI via valid Session injection"},
    {text: "Input Demographic Details (Handling complex DOM elements)"},
    {text: "Payment Gateway Interception & Submission Confirmation"}
], { x: 0.5, y: 1.6, w: '90%', h: 3.5, fontSize: 18, color: '333333', bullet: { type: 'bullet' }, lineSpacing: 28, margin: 10 });

// Slide 11
addBasicSlide("Native Test Execution Engine", [
  "Parallel Browser Contexts:",
  "    • Multi-threading tests at the OS level instead of heavy UI instances.",
  "    • Prevents cookie and cache leakage between test cases.",
  "Headless vs. Headed Execution:",
  "    • Headless: Background execution for CI/CD pipelines (saves memory).",
  "    • Headed: UI renders on screen (perfect for local debugging).",
  "Flakiness Immunity:",
  "    • Native configuration flags auto-retry failing steps up to 3 times."
]);

// Slide 12
addBasicSlide("Native HTML Reporting", [
  "Built-in Enterprise Dashboard:",
  "    • Generates standalone UI automatically after every run.",
  "    • Categorizes executions by Browser Engine and Status.",
  "Auto-Attached Artifacts:",
  "    • Screen captures taken strictly on test failure step.",
  "    • 1080p Video recordings (webm footprint) embedded into report.",
  "    • Explicit step-by-step logic tracing exposed in logs."
]);

// Slide 13
addBasicSlide("Debugging: The Trace Viewer", [
  "Time-Travel Debugging:",
  "    • Visual timeline to scrub through test execution millisecond by millisecond.",
  "    • DOM snapshots let you 'Inspect Element' retroactively on failures.",
  "Network Traversal:",
  "    • Examine precise REST API payloads sent/received during clicks.",
  "    • Highlight console errors mapping directly to frontend bugs.",
  "Eliminates the 'It works on my machine' paradox."
]);

// Slide 14
addBasicSlide("CI/CD Automation Pipeline", [
  "Shift-Left Quality Testing:",
  "    • Tests trigger automatically when a developer merges code.",
  "GitHub Actions & Jenkins Integration:",
  "    • Playwright Docker image pulls down lightweight UI environment.",
  "    • Parallel execution scales across cloud runners.",
  "Feedback Mechanism:",
  "    • Report artifacts published directly into pull-request comments.",
  "    • Email notifications distributed upon pipeline regressions."
]);

// Slide 15
addBasicSlide("Core Advantages Summarized", [
  "Zero setup for Browser Drivers (No more WebDriver mismatched versions).",
  "Wait mechanisms are automatic and deeply tied to network idleness.",
  "Supports Mocking APIs (Test frontend behavior even if backend is down).",
  "Tests multiple tabs, iFrames, and domains seamlessly.",
  "Native Mobile Viewport and Geolocation spoofing capabilities."
]);

// Slide 16
let futureSlide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
futureSlide.addText("Future Roadmap & Q&A", defaultTitleOpts);
futureSlide.addText([
  {text: "Roadmap Milestones:", options: {bold: true, color: '005A9E', bullet: false}},
  {text: "Implementation of deep REST API assertion coverage."},
  {text: "Integration of Pixel-perfect Visual Regression automation."},
  {text: "Automated Accessibility Compliance (WCAG) checks."},
  {text: "Device cloud scaling via BrowserStack/LambdaTest."}
], { x: 0.5, y: 1.6, w: '90%', h: 2, fontSize: 20, color: '333333', bullet: { type: 'bullet' }, lineSpacing: 35, margin: 10 });
futureSlide.addText("Q&A Session", { x: 0.5, y: 4, w: '90%', h: 1.5, fontSize: 32, bold: true, align: 'center', color: '005A9E' });

pptx.writeFile({ fileName: '/home/rahul/Downloads/playwright-demo/Playwright_Automation_Testing_Final.pptx' }).then(fileName => {
    console.log('created: ' + fileName);
});

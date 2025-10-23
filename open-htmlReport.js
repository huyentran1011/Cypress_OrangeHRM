import open from "open";
import path from "path";
import { fileURLToPath } from "url";

// For ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reportPath = path.join(__dirname, "cypress", "reports", "summaryReport.html");

console.log("Opening Mochawesome report...");
await open(reportPath);

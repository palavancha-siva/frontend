"use strict";

const express = require("express");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

// Load frontend/.env if present
const envPath = path.resolve(__dirname, ".env");
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
}
dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);
const backendApiUrl = (process.env.BACKEND_API_URL || "http://localhost:5104").replace(/\/+$/, "");

const publicDir = path.join(__dirname, "public");

// Dynamic runtime configuration endpoint for client JS
app.get("/js/config.js", (_req, res) => {
    res.setHeader("Content-Type", "application/javascript");
    res.send(`
// Auto-generated runtime API configuration
window.LOANSENSE_API_URL = "${backendApiUrl}";
window.apiUrl = function(endpoint) {
    var base = (window.LOANSENSE_API_URL || "").replace(/\\/+$/, "");
    var path = endpoint.charAt(0) === "/" ? endpoint : "/" + endpoint;
    return base ? (base + path) : path;
};
    `.trim());
});

app.use(express.static(publicDir));

// Route /admin to admin.html
app.get(["/admin", "/admin/"], (_req, res) => {
    res.sendFile(path.join(publicDir, "admin.html"));
});

// Route SPA / to index.html
app.get("*", (_req, res) => {
    res.sendFile(path.join(publicDir, "index.html"));
});

app.listen(port, () => {
    console.log(`=======================================================`);
    console.log(`LoanSense Frontend running on http://localhost:${port}`);
    console.log(`Targeting Backend API at: ${backendApiUrl}`);
    console.log(`Customer Portal: http://localhost:${port}/`);
    console.log(`Admin Panel:     http://localhost:${port}/admin`);
    console.log(`=======================================================`);
});

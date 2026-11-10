// LoanSense Frontend Client Configuration
window.LOANSENSE_API_URL = window.LOANSENSE_API_URL || "http://localhost:5120";
window.DEFAULT_ADMIN_TOKEN = window.DEFAULT_ADMIN_TOKEN || "1234";

window.apiUrl = function (endpoint) {
    var rawBase = (window.LOANSENSE_API_URL || "http://localhost:5120").replace(/\/+$/, "");
    var base = rawBase.replace(/\/api$/, "");
    var path = endpoint.charAt(0) === "/" ? endpoint : "/" + endpoint;
    return base ? (base + path) : path;
};

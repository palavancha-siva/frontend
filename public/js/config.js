// LoanSense Frontend Client Configuration
window.LOANSENSE_API_URL = window.LOANSENSE_API_URL || "http://localhost:5104";

window.apiUrl = function (endpoint) {
    var base = (window.LOANSENSE_API_URL || "http://localhost:5104").replace(/\/+$/, "");
    var path = endpoint.charAt(0) === "/" ? endpoint : "/" + endpoint;
    return base ? (base + path) : path;
};

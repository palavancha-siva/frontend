"use strict";

/* ============================================================
   LOANSENSE - INSTITUTIONAL RETAIL LENDING & FOIR ENGINE
   REALISTIC FINANCIAL DECISIONING & ELIGIBILITY WORKFLOW
   ============================================================ */

(function () {
    const getApiUrl = (p) => (window.apiUrl ? window.apiUrl(p) : ((window.LOANSENSE_API_URL || "http://localhost:5104").replace(/\/+$/, "") + (p.startsWith("/") ? p : "/" + p)));

    // ------------------------------------------------------------
    // DOM ELEMENTS
    // ------------------------------------------------------------

    // Step 1 Elements
    const nameInput = document.getElementById("name");
    const nameError = document.getElementById("nameError");

    const salaryInput = document.getElementById("monthly_income");
    const salaryError = document.getElementById("salaryError");

    const companyInput = document.getElementById("company_name");
    const companyError = document.getElementById("companyError");
    const companyLoading = document.getElementById("companyLoading");
    const companySuggestions = document.getElementById("companySuggestions");

    const homeLoanNoBtn = document.getElementById("homeLoanNoBtn");
    const homeLoanYesBtn = document.getElementById("homeLoanYesBtn");
    const iciciHomeLoanPanel = document.getElementById("iciciHomeLoanPanel");
    const iciciFieldHint = document.getElementById("iciciFieldHint");

    // Lenders Table Elements
    const lendersSection = document.getElementById("lendersSection");
    const emptyLendersPrompt = document.getElementById("emptyLendersPrompt");
    const lendersLoading = document.getElementById("lendersLoading");
    const lendersNotFound = document.getElementById("lendersNotFound");
    const lendersNotFoundTitle = document.getElementById("lendersNotFoundTitle");
    const lendersNotFoundMessage = document.getElementById("lendersNotFoundMessage");
    const lendersTableContainer = document.getElementById("lendersTableContainer");
    const lendersTable = document.getElementById("lendersTable");
    const lendersTableBody = document.getElementById("lendersTableBody");
    const lenderSelectionHint = document.getElementById("lenderSelectionHint");
    const lenderCountBadge = document.getElementById("lenderCountBadge");
    const lenderSelectError = document.getElementById("lenderSelectError");

    // Step 2 Elements
    const step2Card = document.getElementById("step2Card");
    const step2Badge = document.getElementById("step2Badge");
    const step2Lock = document.getElementById("step2Lock");
    const proposedRateInput = document.getElementById("proposed_rate");
    const rateError = document.getElementById("rateError");
    const loanTenureInput = document.getElementById("loan_tenure_months");
    const tenureError = document.getElementById("tenureError");
    const tenureYearsPreview = document.getElementById("tenureYearsPreview");

    // Step 3 Elements (Multi-item Debt Obligations with Balance Transfer - BT)
    const step3Card = document.getElementById("step3Card");
    const step3Badge = document.getElementById("step3Badge");
    const step3Lock = document.getElementById("step3Lock");
    const ccTotalPill = document.getElementById("ccTotalPill");
    const addCcBtn = document.getElementById("addCcBtn");
    const ccRowsList = document.getElementById("ccRowsList");
    const ccBtSummary = document.getElementById("ccBtSummary");
    const ccBtCount = document.getElementById("ccBtCount");
    const ccBtAmount = document.getElementById("ccBtAmount");
    const ccError = document.getElementById("ccError");

    const emiTotalPill = document.getElementById("emiTotalPill");
    const addEmiBtn = document.getElementById("addEmiBtn");
    const emiRowsList = document.getElementById("emiRowsList");
    const emiBtSummary = document.getElementById("emiBtSummary");
    const emiBtCount = document.getElementById("emiBtCount");
    const emiBtAmount = document.getElementById("emiBtAmount");
    const emiError = document.getElementById("emiError");

    // Step 4 Action Elements
    const checkFoirBtn = document.getElementById("checkFoirBtn");
    const actionHint = document.getElementById("actionHint");

    // Terminal / Pre-calculation Card
    const terminalIntroCard = document.getElementById("terminalIntroCard");

    // Result Elements (Reference Image Design)
    const resultCard = document.getElementById("resultCard");
    const evaluationTimestamp = document.getElementById("evaluationTimestamp");
    const resultLenderPill = document.getElementById("resultLenderPill");
    const resultAvailableEmi = document.getElementById("resultAvailableEmi");
    const resultEmiStatusTag = document.getElementById("resultEmiStatusTag");
    const resultEmiStatusText = document.getElementById("resultEmiStatusText");
    const resultMaxLoan = document.getElementById("resultMaxLoan");
    const resultLoanTenureSubtext = document.getElementById("resultLoanTenureSubtext");
    const resultTotalFoirAmount = document.getElementById("resultTotalFoirAmount");
    const resultFoirProgressBar = document.getElementById("resultFoirProgressBar");
    const resultFoirLimitText = document.getElementById("resultFoirLimitText");

    // Legacy / compatibility references
    const resultCurrentFoir = document.getElementById("resultCurrentFoir");
    const resultFoirBadge = document.getElementById("resultFoirBadge");
    const foirBarFill = document.getElementById("foirBarFill");
    const resultEmiDesc = document.getElementById("resultEmiDesc");
    const finalLoanAmountInput = document.getElementById("finalLoanAmountInput");
    const resultMaxLoanCap = document.getElementById("resultMaxLoanCap");
    const resetToMaxLoanBtn = document.getElementById("resetToMaxLoanBtn");
    const loanAmountWarning = document.getElementById("loanAmountWarning");

    // Pincode & Credit Inquiries Elements (Finnable Underwriting Rules)
    const pincodeInput = document.getElementById("pincode");
    const pincodeError = document.getElementById("pincodeError");
    const pincodeLoading = document.getElementById("pincodeLoading");
    const pincodeStatusBadge = document.getElementById("pincodeStatusBadge");

    // Compliance & Mandatory Documentation Box Elements
    const lenderComplianceBox = document.getElementById("lenderComplianceBox");
    const complianceTitle = document.getElementById("complianceTitle");
    const complianceTierTag = document.getElementById("complianceTierTag");
    const complianceDocText = document.getElementById("complianceDocText");
    const complianceLocationText = document.getElementById("complianceLocationText");

    // Header Status Elements
    const dbStatusBadge = document.getElementById("dbStatusBadge");
    const dbStatusText = document.getElementById("dbStatusText");

    // ------------------------------------------------------------
    // APPLICATION STATE
    // ------------------------------------------------------------
    const state = {
        customerName: "",
        monthlySalary: null,
        companyName: "",
        hasHomeLoan: false,
        pincode: "",
        pincodeData: null,
        bureauInquiries: 0,
        lenders: [],            // List of top fetched mappings
        selectedLenderIndex: -1,// -1 means none selected
        selectedLender: null,   // { bank_name, cat, foir, ... }
        isEligibilityEvaluated: false, // true only after clicking Check FOIR
        proposedRate: null,
        loanTenure: null,
        creditCardsList: [{ id: 1, amount: 0, isBt: false }],
        loanEmisList: [{ id: 1, amount: 0, isBt: false }],
        ccObligations: 0,
        emiObligations: 0,
        currentMaxLoanAmount: 0,
        currentMaxAvailableEmi: 0,
        finalLoanAmount: 0,
        calculatedEmi: 0,
        isCalculating: false
    };

    let ccRowIdCounter = 1;
    let emiRowIdCounter = 1;

    let companySearchTimer = null;
    let emiRecalcTimer = null;
    let lenderFetchTimer = null;

    // ------------------------------------------------------------
    // INITIALIZATION
    // ------------------------------------------------------------
    function init() {
        checkSystemHealth();
        enableStep2();
        enableStep3();
        renderCcRows();
        renderEmiRows();
        setupEventListeners();
        disableNumberInputWheelScroll();
        if (lendersSection) {
            lendersSection.classList.add("hidden");
        }
        updateStep4State();
    }

    // ------------------------------------------------------------
    // SYSTEM HEALTH CHECK
    // ------------------------------------------------------------
    async function checkSystemHealth() {
        try {
            const res = await fetch(getApiUrl("/api/health"));
            if (!res.ok) return;
            const data = await res.json();
            if (data.status === "ok") {
                if (data.mode === "postgresql") {
                    dbStatusText.textContent = "PostgreSQL Online";
                } else {
                    dbStatusText.textContent = "Demo Engine Active";
                }
            }
        } catch (_err) {
            // Keep default text
        }
    }

    // ------------------------------------------------------------
    // EVENT LISTENERS SETUP
    // ------------------------------------------------------------
    function setupEventListeners() {
        // Step 1: Customer Name
        nameInput.addEventListener("input", () => {
            state.customerName = nameInput.value.trim();
            if (state.customerName.length > 0) {
                nameError.textContent = "";
            }
        });

        // Step 1: Monthly Salary
        let salaryRefreshTimer = null;
        salaryInput.addEventListener("input", () => {
            const val = parseFloat(salaryInput.value);
            if (!isNaN(val) && val > 0) {
                state.monthlySalary = val;
                salaryError.textContent = "";
            } else {
                state.monthlySalary = null;
            }
            updateStep4State();

            // When salary is entered or updated and company is present, query lenders
            if (state.companyName && state.companyName.trim().length >= 2) {
                clearTimeout(salaryRefreshTimer);
                salaryRefreshTimer = setTimeout(() => {
                    fetchCompanyLenders(state.companyName.trim());
                    if (resultCard && !resultCard.classList.contains("hidden") && state.selectedLender && state.isEligibilityEvaluated) {
                        executeUnderwritingCalculation();
                    }
                }, 350);
            }
        });

        // Step 1: Company Input with Autocomplete & Auto-Lender Matching
        companyInput.addEventListener("input", () => {
            const query = companyInput.value.trim();
            state.companyName = query;
            companyError.textContent = "";
            state.isEligibilityEvaluated = false; // Reset to lenders list only
            if (lendersTable) lendersTable.classList.add("company-only-mode");

            clearTimeout(companySearchTimer);
            if (query.length < 1) {
                hideCompanySuggestions();
                onCompanyCleared();
                return;
            }

            companySearchTimer = setTimeout(() => {
                fetchCompanySuggestions(query);
            }, 250);

            // Immediately query available lenders for this company even without salary
            clearTimeout(lenderFetchTimer);
            if (query.length >= 2) {
                lenderFetchTimer = setTimeout(() => {
                    fetchCompanyLenders(query);
                }, 350);
            } else {
                onCompanyCleared();
            }
        });

        companyInput.addEventListener("blur", () => {
            setTimeout(hideCompanySuggestions, 200);
        });

        companyInput.addEventListener("keydown", (e) => {
            const items = companySuggestions.querySelectorAll(".suggestion-item");
            if (!items.length || companySuggestions.classList.contains("hidden")) return;

            if (e.key === "ArrowDown") {
                e.preventDefault();
                activeSuggestionIndex = (activeSuggestionIndex + 1) % items.length;
                updateActiveSuggestion(items);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                activeSuggestionIndex = (activeSuggestionIndex - 1 + items.length) % items.length;
                updateActiveSuggestion(items);
            } else if (e.key === "Enter") {
                if (activeSuggestionIndex >= 0 && items[activeSuggestionIndex]) {
                    e.preventDefault();
                    selectCompany(items[activeSuggestionIndex].dataset.name || items[activeSuggestionIndex].textContent);
                }
            } else if (e.key === "Escape") {
                hideCompanySuggestions();
            }
        });

        // Step 1: Residence PIN Code (Finnable Serviceability & City Tier)
        if (pincodeInput) {
            pincodeInput.addEventListener("input", () => {
                const pin = pincodeInput.value.replace(/\D/g, "").slice(0, 6);
                pincodeInput.value = pin;
                state.pincode = pin;
                pincodeError.textContent = "";

                if (pin.length === 6) {
                    lookupPincodeInUi(pin);
                } else {
                    const hadValidPin = Boolean(state.pincodeData);
                    state.pincodeData = null;
                    if (pincodeStatusBadge) {
                        pincodeStatusBadge.classList.add("hidden");
                        pincodeStatusBadge.innerHTML = "";
                    }
                    if (hadValidPin || pin.length === 0) {
                        if (state.companyName && state.companyName.trim().length >= 2) {
                            fetchCompanyLenders(state.companyName.trim());
                        }
                    }
                }
            });
        }

        // Step 1: Active Home Loan Toggle
        if (homeLoanNoBtn) {
            homeLoanNoBtn.addEventListener("click", () => setHomeLoan(false));
        }
        if (homeLoanYesBtn) {
            homeLoanYesBtn.addEventListener("click", () => setHomeLoan(true));
        }

        // Step 2: Proposed Rate
        proposedRateInput.addEventListener("input", () => {
            const val = parseFloat(proposedRateInput.value);
            if (!isNaN(val) && val >= 0 && val <= 50) {
                state.proposedRate = val;
                rateError.textContent = "";
            } else {
                state.proposedRate = null;
            }
            updateStep3State();
            updateStep4State();
        });

        // Step 2: Loan Tenure
        loanTenureInput.addEventListener("input", () => {
            const val = parseInt(loanTenureInput.value, 10);
            if (!isNaN(val) && val >= 1 && val <= 360) {
                state.loanTenure = val;
                tenureError.textContent = "";
                if (tenureYearsPreview) {
                    tenureYearsPreview.textContent = `${(val / 12).toFixed(1)} Years`;
                    tenureYearsPreview.classList.remove("hidden");
                }
            } else {
                state.loanTenure = null;
                if (tenureYearsPreview) {
                    tenureYearsPreview.textContent = "";
                    tenureYearsPreview.classList.add("hidden");
                }
            }
            updateStep3State();
            updateStep4State();
        });

        // Step 3: Add Credit Card & Existing EMI Buttons
        if (addCcBtn) {
            addCcBtn.addEventListener("click", () => {
                ccRowIdCounter += 1;
                state.creditCardsList.push({ id: ccRowIdCounter, amount: 0, isBt: false });
                renderCcRows();
                const inputs = ccRowsList.querySelectorAll(".obligation-input");
                if (inputs.length) {
                    inputs[inputs.length - 1].focus();
                    inputs[inputs.length - 1].select();
                }
            });
        }

        if (addEmiBtn) {
            addEmiBtn.addEventListener("click", () => {
                emiRowIdCounter += 1;
                state.loanEmisList.push({ id: emiRowIdCounter, amount: 0, isBt: false });
                renderEmiRows();
                const inputs = emiRowsList.querySelectorAll(".obligation-input");
                if (inputs.length) {
                    inputs[inputs.length - 1].focus();
                    inputs[inputs.length - 1].select();
                }
            });
        }

        // Step 4: Check FOIR Button
        checkFoirBtn.addEventListener("click", onCheckFoirClicked);

        // Result: Editable Loan Amount
        finalLoanAmountInput.addEventListener("input", handleLoanAmountInput);
        resetToMaxLoanBtn.addEventListener("click", () => {
            finalLoanAmountInput.value = state.currentMaxLoanAmount;
            handleLoanAmountInput();
        });
    }

    async function setHomeLoan(val) {
        state.hasHomeLoan = Boolean(val);
        if (homeLoanNoBtn) {
            homeLoanNoBtn.classList.toggle("active", !state.hasHomeLoan);
        }
        if (homeLoanYesBtn) {
            homeLoanYesBtn.classList.toggle("active", state.hasHomeLoan);
        }

        if (state.selectedLender && state.selectedLender.bank_name.toLowerCase().includes("icici")) {
            await updateIciciHomeLoanFoir();
            if (state.isEligibilityEvaluated) {
                await executeUnderwritingCalculation(false);
            }
        }
    }

    async function updateIciciHomeLoanFoir() {
        if (!state.selectedLender || !state.selectedLender.bank_name.toLowerCase().includes("icici")) return;

        const sal = state.monthlySalary || 0;
        const cat = state.selectedLender.cat || "ALL";
        const hasHL = Boolean(state.hasHomeLoan);

        try {
            const url = getApiUrl(`/api/bre/resolve?bank=ICICI&category=${encodeURIComponent(cat)}&salary=${encodeURIComponent(sal)}&hasHomeLoan=${hasHL}`);
            const res = await fetch(url);
            if (!res.ok) return;
            const data = await res.json();
            if (!data.success || data.foir === undefined) return;

            const newFoir = Number(data.foir);
            const ruleLabel = data.rule_name || "Database Rule";

            // Update selected lender FOIR in state
            state.selectedLender.foir = newFoir;
            state.selectedLender.salary_slab = ruleLabel;

            // Update the FOIR pill in the selected table row
            const rows = lendersTableBody.querySelectorAll(".lender-row");
            if (rows[state.selectedLenderIndex]) {
                const foirPill = rows[state.selectedLenderIndex].querySelector(".foir-pill");
                if (foirPill) {
                    foirPill.textContent = `${newFoir}%`;
                }
            }

            // Update field hint text and styling directly from database response
            const hint = document.getElementById("iciciFieldHint");
            if (hint) {
                if (hasHL) {
                    hint.textContent = `★ ${ruleLabel}: ${newFoir}% FOIR`;
                    hint.style.color = "#059669";
                    hint.style.fontWeight = "600";
                } else {
                    hint.textContent = `ℹ ${ruleLabel}: ${newFoir}% FOIR`;
                    hint.style.color = "#64748b";
                    hint.style.fontWeight = "normal";
                }
            }

            // If Step 4 results are already open, recalculate underwriting with new DB values smoothly
            if (resultCard && !resultCard.classList.contains("hidden") && state.isEligibilityEvaluated) {
                await executeUnderwritingCalculation(false);
            }
        } catch (_err) {
            // Silently retain current state on network error
        }
    }



    // ------------------------------------------------------------
    // DISABLE MOUSE WHEEL VALUE CHANGES ON NUMBER INPUTS
    // ------------------------------------------------------------
    function disableNumberInputWheelScroll() {
        // Prevent mouse wheel from changing values on any number input
        document.addEventListener("wheel", (e) => {
            if (e.target && e.target.tagName === "INPUT" && e.target.type === "number") {
                e.preventDefault();
            }
        }, { passive: false });

        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener("wheel", (e) => {
                e.preventDefault();
            }, { passive: false });
        });

        // If an input is actively focused and user scrolls the page, blur it to prevent value mutations
        window.addEventListener("wheel", () => {
            if (document.activeElement && document.activeElement.tagName === "INPUT" && document.activeElement.type === "number") {
                document.activeElement.blur();
            }
        }, { passive: true });
    }

    // ------------------------------------------------------------
    // COMPANY AUTOCOMPLETE
    // ------------------------------------------------------------
    let activeSuggestionIndex = -1;

    async function fetchCompanySuggestions(query) {
        companyLoading.classList.remove("hidden");
        try {
            const res = await fetch(getApiUrl(`/api/companies?search=${encodeURIComponent(query)}`));
            if (!res.ok) throw new Error("Search failed");
            const companies = await res.json();
            renderCompanySuggestions(companies, query);
        } catch (_err) {
            hideCompanySuggestions();
        } finally {
            companyLoading.classList.add("hidden");
        }
    }

    function renderCompanySuggestions(companies, query) {
        if (!Array.isArray(companies) || companies.length === 0) {
            hideCompanySuggestions();
            return;
        }

        activeSuggestionIndex = -1;
        companySuggestions.innerHTML = "";
        const cleanQuery = String(query || "").trim().toLowerCase();

        companies.forEach((comp, idx) => {
            const div = document.createElement("div");
            div.className = "suggestion-item";
            div.setAttribute("role", "option");
            div.setAttribute("data-index", String(idx));
            div.dataset.name = comp.name;

            // Highlight matched portion
            if (cleanQuery && comp.name.toLowerCase().includes(cleanQuery)) {
                const escaped = cleanQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                const regex = new RegExp(`(${escaped})`, "gi");
                div.innerHTML = comp.name.replace(regex, "<mark>$1</mark>");
            } else {
                div.textContent = comp.name;
            }

            div.addEventListener("mousedown", (e) => {
                e.preventDefault();
                selectCompany(comp.name);
            });
            div.addEventListener("mouseenter", () => {
                activeSuggestionIndex = idx;
                const items = companySuggestions.querySelectorAll(".suggestion-item");
                updateActiveSuggestion(items);
            });
            companySuggestions.appendChild(div);
        });

        companySuggestions.classList.remove("hidden");
        companyInput.setAttribute("aria-expanded", "true");
    }

    function updateActiveSuggestion(items) {
        items.forEach((item, idx) => {
            if (idx === activeSuggestionIndex) {
                item.classList.add("active");
                item.scrollIntoView({ block: "nearest" });
            } else {
                item.classList.remove("active");
            }
        });
    }

    function hideCompanySuggestions() {
        activeSuggestionIndex = -1;
        companySuggestions.classList.add("hidden");
        companyInput.setAttribute("aria-expanded", "false");
    }

    function selectCompany(name) {
        companyInput.value = name;
        state.companyName = name;
        companyError.textContent = "";
        state.isEligibilityEvaluated = false; // Reset to lenders list only
        if (lendersTable) lendersTable.classList.add("company-only-mode");
        hideCompanySuggestions();
        fetchCompanyLenders(name);
    }

    // ------------------------------------------------------------
    // PINCODE LOOKUP & INQUIRY STATUS HANDLERS
    // ------------------------------------------------------------
    async function lookupPincodeInUi(pin) {
        if (!pincodeLoading || !pincodeStatusBadge) return;
        pincodeLoading.classList.remove("hidden");
        pincodeStatusBadge.classList.add("hidden");

        try {
            const res = await fetch(getApiUrl(`/api/pincode/lookup?pincode=${encodeURIComponent(pin)}`));
            pincodeLoading.classList.add("hidden");
            if (!res.ok) throw new Error("Lookup failed");
            const json = await res.json();
            const data = json.data;
            state.pincodeData = data;

            pincodeStatusBadge.classList.remove("hidden", "serviceable", "unserviceable");
            if (data && data.found) {
                const isServ = data.is_serviceable || (Array.isArray(data.serviceable_banks) && data.serviceable_banks.length > 0);
                pincodeStatusBadge.classList.add(isServ ? "serviceable" : "unserviceable");
                const tierClass = data.tier === "TIER 1" ? "tier-1" : "tier-2";

                const locationStr = escapeHtml(data.location || data.city || "Location");
                const regionStr = escapeHtml(data.region || data.city || "Region");
                const stateStr = escapeHtml(data.state || "State");

                let noticeHtml = "";
                if (!isServ) {
                    noticeHtml = `<div style="font-size:11px; margin-top:3px; color:#b91c1c;">
                        No partner banks currently service this pincode.
                    </div>`;
                }

                pincodeStatusBadge.innerHTML = `
                    <div style="flex:1;">
                        <div class="pincode-loc-wrap">
                            <span class="pincode-dot"></span>
                            <span><strong>${locationStr}</strong>, ${regionStr}, ${stateStr}</span>
                        </div>
                        ${noticeHtml}
                    </div>
                `;
            } else {
                pincodeStatusBadge.classList.add("unserviceable");
                pincodeStatusBadge.innerHTML = `
                    <div class="pincode-loc-wrap">
                        <span class="pincode-dot"></span>
                        <span><strong>PIN ${escapeHtml(pin)}:</strong> Location not in master directory</span>
                    </div>
                `;
            }

            if (state.companyName && state.companyName.trim().length >= 2) {
                fetchCompanyLenders(state.companyName.trim());
            }
        } catch (_err) {
            pincodeLoading.classList.add("hidden");
        }
    }

    // ------------------------------------------------------------
    // STEP 1: COMPANY LENDERS LOOKUP & HANDLERS
    // (Fetches and displays available lenders for company even without salary)
    // ------------------------------------------------------------
    async function fetchCompanyLenders(companyName) {
        if (!companyName || companyName.trim().length < 2) {
            onCompanyCleared();
            return;
        }

        // Show lenders section with loading state
        if (lendersSection) lendersSection.classList.remove("hidden");
        if (emptyLendersPrompt) emptyLendersPrompt.classList.add("hidden");
        lendersLoading.classList.remove("hidden");
        lendersNotFound.classList.add("hidden");
        lendersTableContainer.classList.add("hidden");
        lenderCountBadge.textContent = "Matching...";

        const lenders = await fetchTopEligibleLenders(companyName.trim());

        if (lenderSelectionHint) {
            if (state.isEligibilityEvaluated) {
                lenderSelectionHint.textContent = `Commercial lenders evaluated for "${companyName}". Select any bank to inspect underwriting terms.`;
            } else {
                lenderSelectionHint.textContent = `Available lenders mapped for "${companyName}". Complete your details and click "Check FOIR & Credit Eligibility" to compute policy limits.`;
            }
        }

        updateStep4State();
    }

    function onCompanyCleared() {
        resetLenderSelection();
        state.lenders = [];
        state.isEligibilityEvaluated = false;
        if (lendersTable) lendersTable.classList.add("company-only-mode");
        if (lendersSection) lendersSection.classList.add("hidden");
        if (emptyLendersPrompt) emptyLendersPrompt.classList.add("hidden");
        lendersLoading.classList.add("hidden");
        lendersNotFound.classList.add("hidden");
        lendersTableContainer.classList.add("hidden");
        lenderCountBadge.textContent = "Awaiting Company";
        updateStep4State();
    }

    async function fetchTopEligibleLenders(companyName) {
        try {
            const salary = state.monthlySalary || 0;
            const hasHL = state.hasHomeLoan ? "true" : "false";
            const pin = encodeURIComponent(state.pincode || "");
            const inq = encodeURIComponent(state.bureauInquiries !== null ? state.bureauInquiries : 0);
            const res = await fetch(getApiUrl(`/api/company-mappings?company=${encodeURIComponent(companyName)}&salary=${encodeURIComponent(salary)}&hasHomeLoan=${hasHL}&pincode=${pin}&enquiries=${inq}`));
            lendersLoading.classList.add("hidden");

            if (res.status === 404) {
                state.lenders = [];
                showLendersNotFound(`No institutional lender mappings configured for "${companyName}".`);
                return [];
            }

            if (!res.ok) {
                state.lenders = [];
                showLendersNotFound("Could not retrieve lenders. Please try again.");
                return [];
            }

            const data = await res.json();
            const rawMappings = data.mappings || [];

            if (rawMappings.length === 0) {
                state.lenders = [];
                showLendersNotFound(`No active commercial lenders mapped for "${companyName}".`);
                return [];
            }

            // Sort High to Low based on FOIR %
            state.lenders = rawMappings.sort((a, b) => {
                const foirA = Number(a && a.foir) || 0;
                const foirB = Number(b && b.foir) || 0;
                if (foirB !== foirA) return foirB - foirA;
                return String(a && a.bank_name || "").localeCompare(String(b && b.bank_name || ""));
            });
            renderLendersTable(state.lenders);
            return state.lenders;

        } catch (error) {
            lendersLoading.classList.add("hidden");
            state.lenders = [];
            showLendersNotFound("Connection error while querying bank matrix.");
            return [];
        }
    }

    function showLendersNotFound(msg, title) {
        if (lendersSection) lendersSection.classList.remove("hidden");
        if (emptyLendersPrompt) emptyLendersPrompt.classList.add("hidden");
        lendersTableContainer.classList.add("hidden");
        lendersNotFound.classList.remove("hidden");

        const hasSalary = state.monthlySalary !== null && state.monthlySalary > 0;
        if (!hasSalary) {
            if (lendersNotFoundTitle) lendersNotFoundTitle.textContent = "Please Enter Net Monthly Salary";
            lendersNotFoundMessage.textContent = `Please enter your net monthly salary above to check available lenders for "${state.companyName}".`;
            lenderCountBadge.textContent = "Please Enter Salary";
            if (actionHint) {
                actionHint.textContent = `Please enter net monthly salary to evaluate lenders for "${state.companyName}"`;
                actionHint.style.color = "#d97706";
            }
        } else {
            if (lendersNotFoundTitle) lendersNotFoundTitle.textContent = title || "No Eligible Lenders Found";
            lendersNotFoundMessage.textContent = msg;
            lenderCountBadge.textContent = "0 Lenders";
        }
    }

    // ------------------------------------------------------------
    // RENDER LENDERS MARKETPLACE (MATCHING REFERENCE DESIGN)
    // ------------------------------------------------------------
    function getBankMarketplaceDetails(name) {
        const lower = String(name || "").toLowerCase();
        if (lower.includes("hdfc")) {
            return { roi: "10.49% p.a.", tenure: "12 – 84 Months", tag: "Best Rate", tagClass: "tag-best-rate", rateNum: 10.49 };
        }
        if (lower.includes("sbi") || lower.includes("state bank")) {
            return { roi: "10.75% p.a.", tenure: "12 – 60 Months", tag: "High Eligibility", tagClass: "tag-high-eligibility", rateNum: 10.75 };
        }
        if (lower.includes("icici")) {
            return { roi: "10.85% p.a.", tenure: "12 – 72 Months", tag: "Popular", tagClass: "tag-popular", rateNum: 10.85 };
        }
        if (lower.includes("bajaj")) {
            return { roi: "11.25% p.a.", tenure: "12 – 60 Months", tag: "Instant Disbursal", tagClass: "tag-instant", rateNum: 11.25 };
        }
        if (lower.includes("kotak")) {
            return { roi: "11.75% p.a.", tenure: "12 – 60 Months", tag: "Fast Approval", tagClass: "tag-fast", rateNum: 11.75 };
        }
        if (lower.includes("axis")) {
            return { roi: "10.99% p.a.", tenure: "12 – 60 Months", tag: "Popular", tagClass: "tag-popular", rateNum: 10.99 };
        }
        if (lower.includes("standard") || lower.includes("scb")) {
            return { roi: "11.49% p.a.", tenure: "12 – 60 Months", tag: "High Eligibility", tagClass: "tag-high-eligibility", rateNum: 11.49 };
        }
        if (lower.includes("finnable")) {
            return { roi: "12.00% p.a.", tenure: "12 – 48 Months", tag: "Flexible Policy", tagClass: "tag-instant", rateNum: 12.00 };
        }
        if (lower.includes("poonawalla")) {
            return { roi: "11.50% p.a.", tenure: "12 – 60 Months", tag: "Fast Disbursal", tagClass: "tag-fast", rateNum: 11.50 };
        }
        if (lower.includes("incrid") || lower.includes("incred")) {
            return { roi: "12.50% p.a.", tenure: "12 – 60 Months", tag: "Open Market", tagClass: "tag-popular", rateNum: 12.50 };
        }
        if (lower.includes("chola")) {
            return { roi: "12.25% p.a.", tenure: "12 – 60 Months", tag: "Specialist", tagClass: "tag-best-rate", rateNum: 12.25 };
        }
        return { roi: "11.50% p.a.", tenure: "12 – 60 Months", tag: "Eligible Offer", tagClass: "tag-popular", rateNum: 11.50 };
    }

    function calculateLenderLoanAmount(lender) {
        if (!state.monthlySalary || state.monthlySalary <= 0) {
            return "₹0";
        }
        const foirPercent = Number(lender.foir) || 60;
        const cardPercent = Number(lender.cc_obligation_percent) || 5;
        const monthlyCcObligation = Math.round(((state.ccObligations || 0) * (cardPercent / 100)) * 100) / 100;
        const totalObligations = monthlyCcObligation + (state.emiObligations || 0);

        const maxAllowedEmi = state.monthlySalary * (foirPercent / 100);
        const availableEmi = Math.max(0, maxAllowedEmi - totalObligations);

        const details = getBankMarketplaceDetails(lender.bank_name);
        const rate = state.proposedRate !== null && state.proposedRate > 0 ? state.proposedRate : details.rateNum;
        const tenure = state.loanTenure !== null && state.loanTenure > 0 ? state.loanTenure : 48;

        let emiPerLakh = 0;
        if (rate === 0) {
            emiPerLakh = 100000 / tenure;
        } else {
            const monthlyRate = rate / 12 / 100;
            const factor = Math.pow(1 + monthlyRate, tenure);
            emiPerLakh = Math.round(100000 * monthlyRate * factor / (factor - 1));
        }

        const maxLoanAmount = availableEmi > 0 && emiPerLakh > 0
            ? Math.round((availableEmi / emiPerLakh) * 100000)
            : 0;

        return `₹${maxLoanAmount.toLocaleString("en-IN")}`;
    }

    function renderLendersTable(lenders) {
        if (lendersSection) lendersSection.classList.remove("hidden");
        lendersNotFound.classList.add("hidden");
        if (emptyLendersPrompt) emptyLendersPrompt.classList.add("hidden");
        lendersTableContainer.classList.remove("hidden");

        if (lendersTable) {
            if (state.isEligibilityEvaluated) {
                lendersTable.classList.remove("company-only-mode");
                lenderCountBadge.textContent = `${lenders.length} ${lenders.length === 1 ? 'Lender' : 'Lenders'}`;
            } else {
                lendersTable.classList.add("company-only-mode");
                lenderCountBadge.textContent = `${lenders.length} Available ${lenders.length === 1 ? 'Lender' : 'Lenders'}`;
            }
        }

        lendersTableBody.innerHTML = "";

        lenders.forEach((lender, index) => {
            const tr = document.createElement("tr");
            tr.className = "lender-row";
            tr.dataset.index = index;

            const initials = getBankInitials(lender.bank_name);
            const bankClass = getBankClass(lender.bank_name);
            const logoHtml = getBankLogoHtml(lender.bank_name, initials);
            const details = getBankMarketplaceDetails(lender.bank_name);
            const loanAmountStr = calculateLenderLoanAmount(lender);
            const catLabel = (lender.cat || "Standard").toUpperCase();
            const catClass = catLabel.includes("A") || catLabel.includes("TIER 1") ? "cat-a" : "cat-b";
            const foirVal = Number(lender.foir) || 0;

            tr.innerHTML = `
                <td class="col-lender">
                    <div class="bank-cell">
                        <div class="bank-avatar bank-logo-avatar ${bankClass}" title="${escapeHtml(lender.bank_name)}">
                            ${logoHtml}
                        </div>
                        <div class="bank-info-wrap">
                            <span class="bank-name-text">${escapeHtml(lender.bank_name)}</span>
                            <span class="lender-feature-tag ${details.tagClass}">${escapeHtml(details.tag)}</span>
                        </div>
                    </div>
                </td>
                <td class="col-cat">
                    <span class="cat-pill ${catClass}">${escapeHtml(catLabel)}</span>
                </td>
                <td class="col-foir">
                    <span class="foir-pill">${foirVal}%</span>
                </td>
                <td class="col-amount">
                    <div class="cell-sublabel">Up to</div>
                    <div class="cell-amount-val">${escapeHtml(loanAmountStr)}</div>
                </td>
                <td class="col-roi">
                    <div class="cell-roi-val">${escapeHtml(details.roi)}</div>
                    <div class="cell-sublabel">Starting at</div>
                </td>
                <td class="col-tenure">
                    <div class="cell-tenure-val">${escapeHtml(details.tenure)}</div>
                </td>
                <td class="col-action">
                    <button type="button" class="btn-view-offer">View Offer</button>
                </td>
            `;

            tr.addEventListener("click", () => {
                selectLender(index);
            });

            const actionBtn = tr.querySelector('.btn-view-offer');
            if (actionBtn) {
                actionBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    selectLender(index);
                });
            }

            lendersTableBody.appendChild(tr);
        });

        // Preserve selected lender if valid
        if (state.selectedLenderIndex >= 0 && state.selectedLenderIndex < lenders.length) {
            const preservedIndex = state.selectedLenderIndex;
            const rows = lendersTableBody.querySelectorAll(".lender-row");
            if (rows[preservedIndex]) {
                rows[preservedIndex].classList.add("selected");
                const btn = rows[preservedIndex].querySelector('.btn-view-offer');
                if (btn) {
                    btn.classList.add("active");
                    btn.textContent = "Selected ✓";
                }
            }
        } else {
            state.selectedLenderIndex = -1;
            state.selectedLender = null;
            if (iciciHomeLoanPanel) {
                iciciHomeLoanPanel.classList.add("hidden");
            }
            state.hasHomeLoan = false;
            if (homeLoanNoBtn) homeLoanNoBtn.classList.add("active");
            if (homeLoanYesBtn) homeLoanYesBtn.classList.remove("active");
        }
    }

    function getBankLogoHtml(name, initials) {
        if (!name) name = "";
        const lower = name.toLowerCase().trim();
        if (!initials) initials = getBankInitials(name);

        let logoSrc = "";

        // 1. HDFC Bank (Official exact reference asset)
        if (lower.includes("hdfc")) {
            logoSrc = "/assets/bank-logos/hdfc_exact.png";
        }
        // 2. SBI / State Bank of India (Official keyhole emblem)
        else if (lower.includes("sbi") || lower.includes("state bank")) {
            logoSrc = "/assets/bank-logos/sbi_exact.png";
        }
        // 3. ICICI Bank (Official orange & maroon 'i' oval brandmark)
        else if (lower.includes("icici")) {
            logoSrc = "/assets/bank-logos/icici_exact.png";
        }
        // 4. Bajaj Finance / Bajaj Finserv (Official blue squircle monogram)
        else if (lower.includes("bajaj")) {
            logoSrc = "/assets/bank-logos/bajaj_exact.png";
        }
        // 5. Kotak Mahindra Bank (Official dark blue infinity disc with red vertical bar)
        else if (lower.includes("kotak")) {
            logoSrc = "/assets/bank-logos/kotak_exact.png";
        }
        // 6. Axis Bank (Official burgundy chevron emblem)
        else if (lower.includes("axis")) {
            logoSrc = "/assets/bank-logos/axis_symbol.svg";
        }
        // 7. Bank of Baroda (Official Baroda Sun emblem)
        else if (lower.includes("baroda") || lower.includes("bob")) {
            logoSrc = "/assets/bank-logos/baroda_symbol.png";
        }
        // 8. Tata Capital (Official Tata Group monogram)
        else if (lower.includes("tata")) {
            logoSrc = "/assets/bank-logos/tata.svg";
        }
        // 9. IDFC FIRST Bank (Official maroon tile emblem)
        else if (lower.includes("idfc")) {
            logoSrc = "/assets/bank-logos/idfc.svg";
        }
        // 10. IndusInd Bank (Official charging bull emblem)
        else if (lower.includes("indusind")) {
            logoSrc = "/assets/official-svgs/indusind.svg";
        }
        // 11. Yes Bank (Official red tick brandmark)
        else if (lower.includes("yes bank") || lower === "yes") {
            logoSrc = "/assets/bank-logos/yes_bank_symbol.png";
        }
        // 12. Canara Bank (Official interlocking triangles)
        else if (lower.includes("canara")) {
            logoSrc = "/assets/bank-logos/canara.svg";
        }
        // 13. Hero FinCorp (Official 3D geometric emblem)
        else if (lower.includes("hero")) {
            logoSrc = "/assets/bank-logos/hero.svg";
        }
        // 14. Muthoot Finance (Official red circular emblem)
        else if (lower.includes("muthoot")) {
            logoSrc = "/assets/bank-logos/muthoot_symbol.png";
        }
        // 15. L&T Finance (Official Larsen & Toubro emblem)
        else if (lower.includes("l&t") || lower.includes("l and t")) {
            logoSrc = "/assets/bank-logos/lt.svg";
        }
        // 16. Piramal Finance (Official faceted diamond emblem)
        else if (lower.includes("piramal")) {
            logoSrc = "/assets/official-svgs/piramal.svg";
        }
        // 17. Cholamandalam / Chola (Official flower disc emblem)
        else if (lower.includes("chola") || lower.includes("cholamandalam")) {
            logoSrc = "/assets/official-svgs/cholamandalam.svg";
        }
        // 18. South Indian Bank (Official feather brandmark)
        else if (lower.includes("south indian")) {
            logoSrc = "/assets/official-svgs/south_indian_bank_official.svg";
        }
        // 19. Poonawalla Fincorp (Official butterfly monogram)
        else if (lower.includes("poonawalla")) {
            logoSrc = "/assets/bank-logos/poonawalla_symbol.png";
        }
        // 20. Aditya Birla Capital (Official sunburst emblem)
        else if (lower.includes("aditya") || lower.includes("birla")) {
            logoSrc = "/assets/bank-logos/aditya_birla.ico";
        }
        // 21. KreditBee (Official app emblem)
        else if (lower.includes("kreditbee") || lower.includes("kredit bee")) {
            logoSrc = "/assets/bank-logos/kreditbee.png";
        }
        // 22. Fibe / EarlySalary (Official app emblem)
        else if (lower.includes("fibe") || lower.includes("earlysalary")) {
            logoSrc = "/assets/bank-logos/fibe.png";
        }
        // 23. InCred / INCRID (Official app emblem)
        else if (lower.includes("incred") || lower.includes("incrid")) {
            logoSrc = "/assets/bank-logos/incred.ico";
        }
        // 24. Finnable (Official app emblem)
        else if (lower.includes("finnable")) {
            logoSrc = "/assets/bank-logos/finnable.ico";
        }

        if (logoSrc) {
            return `<img src="${logoSrc}" class="bank-logo-img" alt="${escapeHtml(name)}" loading="lazy" onerror="this.style.display='none'; const fb = this.nextElementSibling; if(fb) fb.style.display='flex';" /><span class="bank-fallback-initials" style="display:none;">${escapeHtml(initials)}</span>`;
        }

        return `<span class="bank-fallback-initials">${escapeHtml(initials)}</span>`;
    }

    function getBankInitials(name) {
        if (!name) return "BK";
        const lower = name.toLowerCase();
        if (lower.includes("finnable")) return "FIN";
        if (lower.includes("incrid") || lower.includes("incred")) return "INC";
        if (lower.includes("poonawalla")) return "PWF";
        if (lower.includes("bajaj")) return "BAJ";
        const cleaned = name.replace(/bank/gi, "").trim();
        if (cleaned.length <= 4) return cleaned.toUpperCase();
        const parts = cleaned.split(/\s+/);
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return cleaned.substring(0, 3).toUpperCase();
    }

    function getBankClass(name) {
        if (!name) return "";
        const lower = name.toLowerCase();
        if (lower.includes("finnable")) return "bank-finnable";
        if (lower.includes("incrid") || lower.includes("incred")) return "bank-incred";
        if (lower.includes("poonawalla")) return "bank-poonawalla";
        if (lower.includes("bajaj")) return "bank-bajaj";
        if (lower.includes("hdfc")) return "bank-hdfc";
        if (lower.includes("icici")) return "bank-icici";
        if (lower.includes("sbi") || lower.includes("state bank")) return "bank-sbi";
        if (lower.includes("axis")) return "bank-axis";
        if (lower.includes("kotak")) return "bank-kotak";
        if (lower.includes("standard") || lower.includes("scb")) return "bank-scb";
        return "";
    }

    // ------------------------------------------------------------
    // SELECT LENDER (TRIGGERS STEP 2 ENABLING)
    // ------------------------------------------------------------
    function selectLender(index, autoScroll = false) {
        if (!state.lenders[index]) return;

        state.selectedLenderIndex = index;
        state.selectedLender = state.lenders[index];
        lenderSelectError.textContent = "";

        const rows = lendersTableBody.querySelectorAll(".lender-row");
        rows.forEach((r, idx) => {
            const btn = r.querySelector('.btn-view-offer');
            if (idx === index) {
                r.classList.add("selected");
                if (btn) {
                    btn.classList.add("active");
                    btn.textContent = "Selected ✓";
                }
            } else {
                r.classList.remove("selected");
                if (btn) {
                    btn.classList.remove("active");
                    btn.textContent = "View Offer";
                }
            }
        });

        // Show Home Loan toggle ONLY for ICICI Bank
        const isIcici = state.selectedLender.bank_name.toLowerCase().includes("icici");
        if (isIcici && iciciHomeLoanPanel) {
            iciciHomeLoanPanel.classList.remove("hidden");
            updateIciciHomeLoanFoir();
        } else if (iciciHomeLoanPanel) {
            iciciHomeLoanPanel.classList.add("hidden");
            state.hasHomeLoan = false;
            if (homeLoanNoBtn) homeLoanNoBtn.classList.add("active");
            if (homeLoanYesBtn) homeLoanYesBtn.classList.remove("active");
        }

        enableStep2();

        if (state.isEligibilityEvaluated && state.monthlySalary && state.monthlySalary > 0) {
            executeUnderwritingCalculation(autoScroll);
        } else {
            hideResults();
            if (actionHint) {
                actionHint.textContent = `Selected ${state.selectedLender.bank_name}. Enter net monthly salary above and click "Check FOIR & Credit Eligibility" to compute borrowing limits.`;
                actionHint.style.color = "#2563eb";
            }
        }
    }

    function resetLenderSelection() {
        state.selectedLenderIndex = -1;
        state.selectedLender = null;
        lenderSelectError.textContent = "";

        if (iciciHomeLoanPanel) {
            iciciHomeLoanPanel.classList.add("hidden");
        }
        state.hasHomeLoan = false;
        if (homeLoanNoBtn) homeLoanNoBtn.classList.add("active");
        if (homeLoanYesBtn) homeLoanYesBtn.classList.remove("active");

        updateStep4State();
        hideResults();
    }

    // ------------------------------------------------------------
    // STEP 2 CONTROLS: LOAN PARAMETERS
    // ------------------------------------------------------------
    function enableStep2() {
        step2Card.classList.remove("disabled");
        if (step2Lock) {
            step2Lock.textContent = "";
            step2Lock.className = "hidden";
        }

        proposedRateInput.disabled = false;
        loanTenureInput.disabled = false;

        updateStep4State();
    }

    function disableStep2() {
        // Section 2 stays enabled and functional
        enableStep2();
    }

    // ------------------------------------------------------------
    // STEP 3 CONTROLS: OBLIGATION DETAILS
    // ------------------------------------------------------------
    function updateStep3State() {
        enableStep3();
    }

    function enableStep3() {
        step3Card.classList.remove("disabled");
        if (step3Lock) {
            step3Lock.textContent = "";
            step3Lock.className = "hidden";
        }

        if (addCcBtn) addCcBtn.disabled = false;
        if (addEmiBtn) addEmiBtn.disabled = false;

        if (ccRowsList) {
            ccRowsList.querySelectorAll("input, button").forEach(el => el.disabled = false);
        }
        if (emiRowsList) {
            emiRowsList.querySelectorAll("input, button").forEach(el => el.disabled = false);
        }

        updateStep4State();
    }

    function disableStep3() {
        // Section 3 stays enabled and functional
        enableStep3();
    }

    // ------------------------------------------------------------
    // STEP 3: DYNAMIC OBLIGATION ROWS & BALANCE TRANSFER (BT)
    // ------------------------------------------------------------
    function renderCcRows() {
        if (!ccRowsList) return;
        ccRowsList.innerHTML = "";
        state.creditCardsList.forEach((item, index) => {
            const row = createObligationRow(item, "cc", index);
            ccRowsList.appendChild(row);
        });
        updateCcTotals();
    }

    function renderEmiRows() {
        if (!emiRowsList) return;
        emiRowsList.innerHTML = "";
        state.loanEmisList.forEach((item, index) => {
            const row = createObligationRow(item, "emi", index);
            emiRowsList.appendChild(row);
        });
        updateEmiTotals();
    }

    function createObligationRow(item, type, index) {
        const row = document.createElement("div");
        row.className = "obligation-row";
        row.dataset.id = String(item.id);

        const isCardDisabled = false;

        // 1. Amount input
        const inputWrap = document.createElement("div");
        inputWrap.className = "obligation-input-wrap";

        const input = document.createElement("input");
        input.type = "number";
        input.min = "0";
        input.step = "1";
        input.className = "obligation-input no-spinner";
        input.placeholder = "0";
        input.value = item.amount === 0 ? "0" : (item.amount || "");
        input.disabled = isCardDisabled;

        input.addEventListener("input", () => {
            const raw = input.value.trim();
            const val = parseFloat(raw);
            item.amount = !isNaN(val) && val >= 0 ? val : 0;
            if (type === "cc") {
                updateCcTotals();
            } else {
                updateEmiTotals();
            }
            updateStep4State();
        });

        inputWrap.appendChild(input);
        row.appendChild(inputWrap);

        // 2. BT (Balance Transfer) Button
        const btBtn = document.createElement("button");
        btBtn.type = "button";
        btBtn.className = `btn-bt ${item.isBt ? "active" : ""}`;
        btBtn.title = item.isBt ? "Selected for Balance Transfer (Excluded from obligations)" : "Select for Balance Transfer (BT)";
        btBtn.disabled = isCardDisabled;

        const checkboxIcon = document.createElement("span");
        checkboxIcon.className = `bt-checkbox-box ${item.isBt ? "checked" : ""}`;
        if (item.isBt) {
            checkboxIcon.textContent = "✓";
        }

        const btLabel = document.createElement("span");
        btLabel.className = "bt-label-text";
        btLabel.textContent = "BT";

        btBtn.appendChild(checkboxIcon);
        btBtn.appendChild(btLabel);

        btBtn.addEventListener("click", () => {
            item.isBt = !item.isBt;
            btBtn.classList.toggle("active", item.isBt);
            checkboxIcon.classList.toggle("checked", item.isBt);
            checkboxIcon.textContent = item.isBt ? "✓" : "";
            btBtn.title = item.isBt ? "Selected for Balance Transfer (Excluded from obligations)" : "Select for Balance Transfer (BT)";

            if (type === "cc") {
                updateCcTotals();
            } else {
                updateEmiTotals();
            }
            updateStep4State();
        });

        row.appendChild(btBtn);

        // 3. Remove Button
        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "btn-remove-obligation";
        removeBtn.title = "Remove";
        removeBtn.innerHTML = "✕";
        removeBtn.disabled = isCardDisabled;

        removeBtn.addEventListener("click", () => {
            const list = type === "cc" ? state.creditCardsList : state.loanEmisList;
            if (list.length > 1) {
                const idx = list.findIndex(x => x.id === item.id);
                if (idx !== -1) list.splice(idx, 1);
            } else {
                // If only 1 row left, reset its amount to 0 and isBt to false
                item.amount = 0;
                item.isBt = false;
            }
            if (type === "cc") {
                renderCcRows();
            } else {
                renderEmiRows();
            }
            updateStep4State();
        });

        row.appendChild(removeBtn);

        return row;
    }

    function updateCcTotals() {
        let total = 0;
        let excludedBt = 0;
        let btCount = 0;

        state.creditCardsList.forEach(item => {
            const amt = Number(item.amount) || 0;
            total += amt;
            if (item.isBt) {
                excludedBt += amt;
                btCount += 1;
            }
        });

        const activeTotal = Math.max(0, total - excludedBt);
        state.ccObligations = activeTotal;

        if (ccTotalPill) {
            ccTotalPill.textContent = `Total ₹${Math.round(total).toLocaleString("en-IN")}`;
        }

        if (ccBtSummary) {
            if (btCount > 0) {
                ccBtSummary.classList.remove("hidden");
                if (ccBtCount) ccBtCount.textContent = btCount;
                if (ccBtAmount) ccBtAmount.textContent = `₹${Math.round(excludedBt).toLocaleString("en-IN")}`;
            } else {
                ccBtSummary.classList.add("hidden");
            }
        }
    }

    function updateEmiTotals() {
        let total = 0;
        let excludedBt = 0;
        let btCount = 0;

        state.loanEmisList.forEach(item => {
            const amt = Number(item.amount) || 0;
            total += amt;
            if (item.isBt) {
                excludedBt += amt;
                btCount += 1;
            }
        });

        const activeTotal = Math.max(0, total - excludedBt);
        state.emiObligations = activeTotal;

        if (emiTotalPill) {
            emiTotalPill.textContent = `Total ₹${Math.round(total).toLocaleString("en-IN")}`;
        }

        if (emiBtSummary) {
            if (btCount > 0) {
                emiBtSummary.classList.remove("hidden");
                if (emiBtCount) emiBtCount.textContent = btCount;
                if (emiBtAmount) emiBtAmount.textContent = `₹${Math.round(excludedBt).toLocaleString("en-IN")}`;
            } else {
                emiBtSummary.classList.add("hidden");
            }
        }
    }

    // ------------------------------------------------------------
    // STEP 4 CONTROLS: CHECK FOIR BUTTON STATE
    // ------------------------------------------------------------
    function updateStep4State() {
        const step1Valid = state.monthlySalary !== null && state.monthlySalary > 0 &&
            state.companyName && state.companyName.trim().length >= 2;

        const step2Valid = state.proposedRate !== null && state.proposedRate >= 0 &&
            state.loanTenure !== null && state.loanTenure > 0;

        const step3Valid = state.ccObligations !== null && state.ccObligations >= 0 &&
            state.emiObligations !== null && state.emiObligations >= 0;

        const allValid = step1Valid && step2Valid && step3Valid;

        checkFoirBtn.disabled = false;

        if (allValid) {
            actionHint.textContent = "Click to evaluate FOIR and calculate eligible loan sanction";
            actionHint.style.color = "#059669";
        } else if (state.companyName && (!state.monthlySalary || state.monthlySalary <= 0)) {
            actionHint.textContent = `Lenders shown for "${state.companyName}". Enter net monthly salary above, then click to check eligibility`;
            actionHint.style.color = "#2563eb";
        } else if (state.monthlySalary && state.companyName) {
            actionHint.textContent = "Enter loan interest rate and facility tenor above to evaluate eligibility";
            actionHint.style.color = "#2563eb";
        } else {
            actionHint.textContent = "Enter company name above to view available lenders and evaluate credit eligibility";
            actionHint.style.color = "#64748b";
        }
    }

    // ------------------------------------------------------------
    // STEP 4 UNDERWRITING CALCULATION ENGINE
    // ------------------------------------------------------------
    async function executeUnderwritingCalculation(autoScroll = false) {
        if (!state.selectedLender) return;
        if (state.monthlySalary === null || state.monthlySalary <= 0) {
            hideResults();
            return;
        }

        try {
            const payload = {
                customerName: nameInput.value.trim(),
                companyName: state.companyName.trim(),
                salary: state.monthlySalary,
                income: state.monthlySalary,
                annualRate: state.proposedRate,
                months: state.loanTenure,
                selectedLender: {
                    bank_name: state.selectedLender.bank_name,
                    cat: state.selectedLender.cat || "",
                    foir: Number(state.selectedLender.foir),
                    cc_obligation_percent: Number(state.selectedLender.cc_obligation_percent) || 5
                },
                hasHomeLoan: Boolean(state.hasHomeLoan),
                creditCardObligations: state.ccObligations,
                existingEmiObligations: state.emiObligations,
                creditCards: state.creditCardsList.map(c => ({
                    outstanding: Number(c.amount) || 0,
                    balanceTransfer: Boolean(c.isBt)
                })),
                loans: state.loanEmisList.map(l => ({
                    monthlyEmi: Number(l.amount) || 0,
                    balanceTransfer: Boolean(l.isBt)
                }))
            };

            const response = await fetch(getApiUrl("/api/foir/calculate"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                displayResults(data, autoScroll);
            } else {
                const clientCalc = calculateEligibilityClientSide();
                displayResults(clientCalc, autoScroll);
            }
        } catch (_err) {
            const clientCalc = calculateEligibilityClientSide();
            displayResults(clientCalc, autoScroll);
        }
    }

    // ------------------------------------------------------------
    // STEP 4 CALCULATION: ON CHECK FOIR CLICKED
    // ------------------------------------------------------------
    async function onCheckFoirClicked() {
        let hasError = false;

        if (!nameInput.value.trim()) {
            nameError.textContent = "Customer legal name is required";
            if (!hasError) nameInput.focus();
            hasError = true;
        } else {
            nameError.textContent = "";
        }

        if (!state.companyName || state.companyName.trim().length < 2) {
            companyError.textContent = "Enter a valid employer / corporate entity";
            if (!hasError) companyInput.focus();
            hasError = true;
        } else {
            companyError.textContent = "";
        }

        if (state.monthlySalary === null || state.monthlySalary <= 0) {
            salaryError.textContent = "Enter a valid net monthly salary";
            if (!hasError) salaryInput.focus();
            hasError = true;
        } else {
            salaryError.textContent = "";
        }

        if (state.proposedRate === null || state.proposedRate < 0) {
            rateError.textContent = "Enter a valid interest rate";
            if (!hasError) proposedRateInput.focus();
            hasError = true;
        } else {
            rateError.textContent = "";
        }

        if (state.loanTenure === null || state.loanTenure <= 0) {
            tenureError.textContent = "Enter a valid loan tenor";
            if (!hasError) loanTenureInput.focus();
            hasError = true;
        } else {
            tenureError.textContent = "";
        }

        if (state.ccObligations === null || state.ccObligations < 0) {
            ccError.textContent = "Enter credit card obligations (0 if none)";
            hasError = true;
        } else {
            ccError.textContent = "";
        }

        if (state.emiObligations === null || state.emiObligations < 0) {
            emiError.textContent = "Enter existing EMI obligations (0 if none)";
            hasError = true;
        } else {
            emiError.textContent = "";
        }

        if (hasError) return;

        checkFoirBtn.disabled = true;
        checkFoirBtn.querySelector(".btn-text").textContent = "Checking Eligibility & Matching Lenders...";

        try {
            state.isEligibilityEvaluated = true;
            if (lendersTable) lendersTable.classList.remove("company-only-mode");

            // Show lenders section now that the button was clicked
            if (lendersSection) lendersSection.classList.remove("hidden");
            if (emptyLendersPrompt) emptyLendersPrompt.classList.add("hidden");
            lendersLoading.classList.remove("hidden");
            lendersNotFound.classList.add("hidden");
            lendersTableContainer.classList.add("hidden");
            lenderCountBadge.textContent = "Matching...";

            const lenders = await fetchTopEligibleLenders(state.companyName.trim());

            if (lenders && lenders.length > 0) {
                if (lendersTable) lendersTable.classList.remove("company-only-mode");
                // Auto-select the top eligible lender
                const idx = (state.selectedLenderIndex >= 0 && state.selectedLenderIndex < lenders.length) 
                    ? state.selectedLenderIndex 
                    : 0;
                selectLender(idx, true);
            } else {
                hideResults();
            }
        } finally {
            checkFoirBtn.disabled = false;
            checkFoirBtn.querySelector(".btn-text").textContent = "Check FOIR & Credit Eligibility";
            updateStep4State();
        }
    }

    // ------------------------------------------------------------
    // CLIENT-SIDE CALCULATION FORMULAS
    // ------------------------------------------------------------
    function calculateEligibilityClientSide() {
        const salary = state.monthlySalary;
        const foirPercent = Number(state.selectedLender?.foir) || 70;
        const cardPercent = Number(state.selectedLender?.cc_obligation_percent) || 5;
        const monthlyCcObligation = Math.round(((state.ccObligations || 0) * (cardPercent / 100)) * 100) / 100;
        const totalObligations = monthlyCcObligation + (state.emiObligations || 0);

        // 1. Current FOIR (%) = (Total Obligations / Salary) * 100
        const currentFoir = salary > 0 ? Math.round(((totalObligations / salary) * 100) * 100) / 100 : 0;

        // 2. Available EMI = Math.max(0, Salary * (FOIR / 100) - Total Obligations)
        const maxAllowedEmi = salary * (foirPercent / 100);
        const availableEmi = Math.round(Math.max(0, maxAllowedEmi - totalObligations));

        // 3. Maximum Eligible Loan Amount
        const rate = state.proposedRate;
        const tenure = state.loanTenure;
        let emiPerLakh = 0;

        if (rate === 0) {
            emiPerLakh = 100000 / tenure;
        } else {
            const monthlyRate = rate / 12 / 100;
            const factor = Math.pow(1 + monthlyRate, tenure);
            emiPerLakh = Math.round(100000 * monthlyRate * factor / (factor - 1));
        }

        const maxLoanAmount = availableEmi > 0 && emiPerLakh > 0
            ? Math.round((availableEmi / emiPerLakh) * 100000)
            : 0;

        return {
            success: true,
            currentFoir,
            availableEmi,
            maxAvailableEmi: availableEmi,
            maxLoanAmount,
            finalLoanAmount: maxLoanAmount,
            totalObligations,
            monthlyCcObligation,
            selectedLender: state.selectedLender
        };
    }

    // ------------------------------------------------------------
    // DISPLAY RESULTS & UPDATE FINANCIAL SUMMARY
    // ------------------------------------------------------------
    function displayResults(data, autoScroll = false) {
        const lender = state.selectedLender;
        const foirVal = data.currentFoir !== undefined ? data.currentFoir : 0;
        const maxLoanVal = data.maxLoanAmount !== undefined ? data.maxLoanAmount : 0;
        const maxAvailableEmiVal = data.maxAvailableEmi !== undefined ? data.maxAvailableEmi : (data.availableEmi !== undefined ? data.availableEmi : 0);
        const finalLoanVal = data.finalLoanAmount !== undefined && data.finalLoanAmount > 0 ? data.finalLoanAmount : maxLoanVal;
        const availableEmiVal = data.availableEmi !== undefined ? data.availableEmi : maxAvailableEmiVal;

        state.currentMaxLoanAmount = maxLoanVal;
        state.currentMaxAvailableEmi = maxAvailableEmiVal;
        state.finalLoanAmount = finalLoanVal;
        state.calculatedEmi = availableEmiVal;

        // Timestamp
        if (evaluationTimestamp) {
            evaluationTimestamp.textContent = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
        }

        // Total Allowed FOIR Amount = Monthly Salary * (Policy FOIR % / 100)
        const salary = state.monthlySalary || 0;
        const policyFoirPercent = Number(lender?.foir) || 70;
        const totalAllowedFoir = Math.round(salary * (policyFoirPercent / 100));

        // 1. Available EMI Card (Top)
        if (resultAvailableEmi) {
            resultAvailableEmi.textContent = `₹${Math.round(availableEmiVal).toLocaleString("en-IN")}`;
        }
        if (resultEmiStatusTag && resultEmiStatusText) {
            if (foirVal <= 50) {
                resultEmiStatusTag.className = "status-pill good";
                resultEmiStatusText.textContent = "Good";
            } else if (foirVal <= 65) {
                resultEmiStatusTag.className = "status-pill moderate";
                resultEmiStatusText.textContent = "Moderate";
            } else {
                resultEmiStatusTag.className = "status-pill strained";
                resultEmiStatusText.textContent = "High";
            }
        }

        // 2. Max Loan Amount Card (Middle)
        if (resultMaxLoan) {
            resultMaxLoan.textContent = `₹${Math.round(finalLoanVal).toLocaleString("en-IN")}`;
        }
        if (resultLoanTenureSubtext) {
            const tenureMonths = state.loanTenure || 48;
            resultLoanTenureSubtext.textContent = `Estimated for ${tenureMonths} months tenure`;
        }

        // 3. Total FOIR Amount Card (Bottom)
        if (resultTotalFoirAmount) {
            resultTotalFoirAmount.textContent = `₹${Math.round(totalAllowedFoir).toLocaleString("en-IN")}`;
        }
        if (resultFoirLimitText) {
            resultFoirLimitText.textContent = `${Math.round(foirVal)}% Limit`;
        }
        if (resultFoirProgressBar) {
            resultFoirProgressBar.style.width = `${Math.min(100, Math.round(foirVal))}%`;
            if (foirVal <= 50) {
                resultFoirProgressBar.style.backgroundColor = "#2563eb";
            } else if (foirVal <= 65) {
                resultFoirProgressBar.style.backgroundColor = "#f59e0b";
            } else {
                resultFoirProgressBar.style.backgroundColor = "#ef4444";
            }
        }

        // Compatibility updates for legacy elements
        if (resultCurrentFoir) resultCurrentFoir.textContent = `${foirVal}%`;
        if (foirBarFill) foirBarFill.style.width = `${Math.min(100, foirVal)}%`;
        if (resultFoirBadge) {
            if (foirVal <= 50) {
                resultFoirBadge.textContent = "Safe FOIR (< 50%)";
                resultFoirBadge.className = "metric-tag normal";
            } else if (foirVal <= 65) {
                resultFoirBadge.textContent = "Moderate (50-65%)";
                resultFoirBadge.className = "metric-tag high";
            } else {
                resultFoirBadge.textContent = "Strained (> 65%)";
                resultFoirBadge.className = "metric-tag critical";
            }
        }
        if (finalLoanAmountInput) finalLoanAmountInput.value = finalLoanVal > 0 ? finalLoanVal : "";
        if (resultMaxLoanCap) resultMaxLoanCap.textContent = `Max eligible: ₹ ${maxLoanVal.toLocaleString("en-IN")}`;
        if (resetToMaxLoanBtn) resetToMaxLoanBtn.classList.add("hidden");
        if (loanAmountWarning) loanAmountWarning.classList.add("hidden");
        if (resultEmiDesc) updateEmiDisplay(availableEmiVal, finalLoanVal, maxLoanVal, maxAvailableEmiVal);

        // Lender pill info
        const catText = lender.cat ? ` | Tier: ${lender.cat}` : "";
        const monthlyCc = data.monthlyCcObligation !== undefined
            ? data.monthlyCcObligation
            : Math.round(((state.ccObligations || 0) * 0.05) * 100) / 100;
        const totalObs = data.totalObligations !== undefined
            ? data.totalObligations
            : monthlyCc + (state.emiObligations || 0);

        if (resultLenderPill) {
            const cardPercentDisplay = Number(lender.cc_obligation_percent) || 5;
            resultLenderPill.innerHTML = `Lender: <strong>${escapeHtml(lender.bank_name)}</strong>${escapeHtml(catText)} (Policy FOIR: ${lender.foir}%) • Monthly Obs: ₹${Math.round(totalObs).toLocaleString("en-IN")} (CC ${cardPercentDisplay}%: ₹${Math.round(monthlyCc).toLocaleString("en-IN")})`;
        }

        // Compliance & Policy Notes (Mandatory 3 Months Bank Statement & Velocity Check)
        if (lenderComplianceBox) {
            if (lender && (lender.is_finnable || lender.bank_name.toLowerCase().includes("finnable"))) {
                lenderComplianceBox.classList.remove("hidden");
                if (complianceTierTag) complianceTierTag.textContent = lender.tier || "TIER 2";
                if (complianceDocText) complianceDocText.textContent = lender.mandatory_docs?.[0] || "Bank Statement (Last 3 Months) - Mandatory";

                if (complianceLocationText) {
                    const city = lender.pincode_info?.city || state.pincodeData?.city || "Serviceable Location";
                    const st = lender.pincode_info?.state || state.pincodeData?.state || "Telangana / AP";
                    const tr = lender.tier || state.pincodeData?.tier || "Tier 2";
                    complianceLocationText.textContent = `${city}, ${st} • ${tr} Policy Slabs Applied`;
                }
            } else {
                lenderComplianceBox.classList.add("hidden");
            }
        }

        // Show result card, hide terminal intro
        if (terminalIntroCard) terminalIntroCard.classList.add("hidden");
        resultCard.classList.remove("hidden");

        // Automatically navigate and focus directly on output results ONLY if autoScroll is true
        if (autoScroll) {
            scrollToOutput();
        }
    }

    function scrollToOutput() {
        if (!resultCard) return;
        requestAnimationFrame(() => {
            // Only scroll window on small/mobile screens where the results terminal is stacked underneath
            if (window.innerWidth <= 992) {
                const topbar = document.querySelector(".topbar");
                const topbarHeight = topbar ? topbar.offsetHeight : 60;
                const rect = resultCard.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const targetY = Math.max(0, scrollTop + rect.top - topbarHeight - 16);

                window.scrollTo({
                    top: targetY,
                    behavior: "smooth"
                });
            }
        });
    }

    function updateEmiDisplay(emiVal, loanVal, maxLoanVal, maxEmiVal) {
        resultAvailableEmi.textContent = `₹ ${Math.round(emiVal).toLocaleString("en-IN")}`;
        if (loanVal > 0 && maxLoanVal > 0 && loanVal < maxLoanVal) {
            resultEmiDesc.textContent = `EMI for ₹ ${Math.round(loanVal).toLocaleString("en-IN")} (Capacity: ₹ ${Math.round(maxEmiVal).toLocaleString("en-IN")}/mo)`;
        } else if (loanVal > maxLoanVal && maxLoanVal > 0) {
            resultEmiDesc.textContent = `Exceeds max available capacity (₹ ${Math.round(maxEmiVal).toLocaleString("en-IN")}/mo)`;
        } else {
            resultEmiDesc.textContent = `Max EMI capacity: ₹ ${Math.round(maxEmiVal).toLocaleString("en-IN")}/mo`;
        }
    }

    function handleLoanAmountInput() {
        const rawVal = finalLoanAmountInput.value.trim();
        const numVal = Number(rawVal);
        const maxLoan = state.currentMaxLoanAmount;
        const maxEmi = state.currentMaxAvailableEmi;

        if (!rawVal || !Number.isFinite(numVal) || numVal <= 0) {
            resultAvailableEmi.textContent = "₹ 0";
            resultEmiDesc.textContent = "Enter a valid loan amount";
            loanAmountWarning.textContent = "Enter a loan amount greater than zero";
            loanAmountWarning.classList.remove("hidden");
            resetToMaxLoanBtn.classList.remove("hidden");
            return;
        }

        state.finalLoanAmount = numVal;

        if (numVal > maxLoan && maxLoan > 0) {
            loanAmountWarning.textContent = `⚠️ Exceeds max eligible loan sanction of ₹ ${maxLoan.toLocaleString("en-IN")}`;
            loanAmountWarning.classList.remove("hidden");
        } else {
            loanAmountWarning.classList.add("hidden");
        }

        if (numVal !== maxLoan) {
            resetToMaxLoanBtn.classList.remove("hidden");
        } else {
            resetToMaxLoanBtn.classList.add("hidden");
        }

        const localEmi = calculateEmiClientSide(numVal, state.proposedRate, state.loanTenure);
        updateEmiDisplay(localEmi, numVal, maxLoan, maxEmi);

        clearTimeout(emiRecalcTimer);
        emiRecalcTimer = setTimeout(async () => {
            try {
                const response = await fetch(getApiUrl("/api/foir/calculate-emi"), {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        loanAmount: numVal,
                        annualRate: state.proposedRate,
                        months: state.loanTenure,
                        maxLoanAmount: maxLoan,
                        maxAvailableEmi: maxEmi
                    })
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.success && state.finalLoanAmount === numVal) {
                        updateEmiDisplay(data.availableEmi, numVal, maxLoan, maxEmi);
                    }
                }
            } catch {
                // Keep local calculation on fetch failure
            }
        }, 180);
    }

    function calculateEmiClientSide(amount, annualRate, months) {
        if (!amount || amount <= 0 || !annualRate || annualRate < 0 || !months || months <= 0) return 0;
        const monthlyRate = annualRate / 12 / 100;
        if (monthlyRate === 0) return Math.round(amount / months);
        const factor = Math.pow(1 + monthlyRate, months);
        return Math.round(amount * monthlyRate * factor / (factor - 1));
    }

    function hideResults() {
        resultCard.classList.add("hidden");
        if (terminalIntroCard) terminalIntroCard.classList.remove("hidden");
    }

    // ------------------------------------------------------------
    // UTILITY FUNCTIONS
    // ------------------------------------------------------------
    function escapeHtml(str) {
        if (!str) return "";
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    document.addEventListener("DOMContentLoaded", init);
})();
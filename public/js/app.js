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
    const lendersNotFoundMessage = document.getElementById("lendersNotFoundMessage");
    const lendersTableContainer = document.getElementById("lendersTableContainer");
    const lendersTableBody = document.getElementById("lendersTableBody");
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

    // Result Elements
    const resultCard = document.getElementById("resultCard");
    const evaluationTimestamp = document.getElementById("evaluationTimestamp");
    const resultLenderPill = document.getElementById("resultLenderPill");
    const resultCurrentFoir = document.getElementById("resultCurrentFoir");
    const resultFoirBadge = document.getElementById("resultFoirBadge");
    const foirBarFill = document.getElementById("foirBarFill");
    const resultAvailableEmi = document.getElementById("resultAvailableEmi");
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
        renderCcRows();
        renderEmiRows();
        setupEventListeners();
        disableNumberInputWheelScroll();
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
        salaryInput.addEventListener("input", () => {
            const val = parseFloat(salaryInput.value);
            if (!isNaN(val) && val > 0) {
                state.monthlySalary = val;
                salaryError.textContent = "";
            } else {
                state.monthlySalary = null;
            }
            onSalaryOrCompanyChanged();
        });

        // Step 1: Company Input with Autocomplete
        companyInput.addEventListener("input", () => {
            const query = companyInput.value.trim();
            state.companyName = query;
            companyError.textContent = "";

            clearTimeout(companySearchTimer);
            if (query.length < 1) {
                hideCompanySuggestions();
                onSalaryOrCompanyChanged();
                return;
            }

            companySearchTimer = setTimeout(() => {
                fetchCompanySuggestions(query);
            }, 250);

            onSalaryOrCompanyChanged();
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
                        onSalaryOrCompanyChanged();
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

            // If Step 4 results are already open, recalculate underwriting with new DB values
            if (resultCard && !resultCard.classList.contains("hidden")) {
                onCheckFoirClicked();
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
        hideCompanySuggestions();
        onSalaryOrCompanyChanged(true); // immediate fetch
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

            onSalaryOrCompanyChanged(true);
        } catch (_err) {
            pincodeLoading.classList.add("hidden");
        }
    }

    // ------------------------------------------------------------
    // STEP 1: FETCH TOP ELIGIBLE LENDERS
    // ------------------------------------------------------------
    function onSalaryOrCompanyChanged(immediate = false) {
        clearTimeout(lenderFetchTimer);

        resetLenderSelection();

        const hasSalary = state.monthlySalary !== null && state.monthlySalary > 0;
        const hasCompany = state.companyName && state.companyName.trim().length >= 2;

        if (!hasSalary || !hasCompany) {
            emptyLendersPrompt.classList.remove("hidden");
            lendersLoading.classList.add("hidden");
            lendersNotFound.classList.add("hidden");
            lendersTableContainer.classList.add("hidden");
            lenderCountBadge.textContent = "Awaiting Input";
            return;
        }

        emptyLendersPrompt.classList.add("hidden");
        lendersLoading.classList.remove("hidden");
        lendersNotFound.classList.add("hidden");
        lendersTableContainer.classList.add("hidden");

        const delay = immediate ? 0 : 350;
        lenderFetchTimer = setTimeout(() => {
            fetchTopEligibleLenders(state.companyName.trim());
        }, delay);
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
                return;
            }

            if (!res.ok) {
                state.lenders = [];
                showLendersNotFound("Could not retrieve lenders. Please try again.");
                return;
            }

            const data = await res.json();
            const rawMappings = data.mappings || [];

            if (rawMappings.length === 0) {
                state.lenders = [];
                showLendersNotFound(`No active commercial lenders mapped for "${companyName}".`);
                return;
            }

            // Sort High to Low based on FOIR %
            state.lenders = rawMappings.sort((a, b) => {
                const foirA = Number(a && a.foir) || 0;
                const foirB = Number(b && b.foir) || 0;
                if (foirB !== foirA) return foirB - foirA;
                return String(a && a.bank_name || "").localeCompare(String(b && b.bank_name || ""));
            });
            renderLendersTable(state.lenders);

        } catch (error) {
            lendersLoading.classList.add("hidden");
            state.lenders = [];
            showLendersNotFound("Connection error while querying bank matrix.");
        }
    }

    function showLendersNotFound(msg) {
        emptyLendersPrompt.classList.add("hidden");
        lendersTableContainer.classList.add("hidden");
        lendersNotFound.classList.remove("hidden");
        lendersNotFoundMessage.textContent = msg;
        lenderCountBadge.textContent = "0 Lenders";
    }

    // ------------------------------------------------------------
    // RENDER LENDERS TABLE WITH BANK BRANDING & FINNABLE RULES
    // ------------------------------------------------------------
    function renderLendersTable(lenders) {
        lendersNotFound.classList.add("hidden");
        emptyLendersPrompt.classList.add("hidden");
        lendersTableContainer.classList.remove("hidden");
        lenderCountBadge.textContent = `${lenders.length} ${lenders.length === 1 ? 'Lender' : 'Lenders'}`;

        lendersTableBody.innerHTML = "";

        lenders.forEach((lender, index) => {
            const tr = document.createElement("tr");
            tr.className = "lender-row";
            tr.dataset.index = index;

            const initials = getBankInitials(lender.bank_name);
            const bankClass = getBankClass(lender.bank_name);
            const catLabel = (lender.cat || "Standard").toUpperCase();
            const catClass = catLabel.includes("A") || catLabel.includes("TIER 1") ? "cat-a" : "cat-b";

            tr.innerHTML = `
                <td class="col-select">
                    <input
                        type="radio"
                        name="selectedLender"
                        id="radio_lender_${index}"
                        value="${index}"
                        aria-label="Select ${escapeHtml(lender.bank_name)}"
                    >
                </td>
                <td class="col-bank">
                    <div class="bank-cell">
                        <span class="bank-avatar ${bankClass}">${escapeHtml(initials)}</span>
                        <span class="bank-name-text">${escapeHtml(lender.bank_name)}</span>
                    </div>
                </td>
                <td class="col-cat">
                    <span class="cat-pill ${catClass}">${escapeHtml(catLabel)}</span>
                </td>
                <td class="col-foir">
                    <span class="foir-pill">${Number(lender.foir)}%</span>
                </td>
            `;

            tr.addEventListener("click", () => {
                selectLender(index);
            });

            const radio = tr.querySelector('input[type="radio"]');
            radio.addEventListener("change", (e) => {
                e.stopPropagation();
                selectLender(index);
            });

            lendersTableBody.appendChild(tr);
        });

        state.selectedLenderIndex = -1;
        state.selectedLender = null;
        if (iciciHomeLoanPanel) {
            iciciHomeLoanPanel.classList.add("hidden");
        }
        state.hasHomeLoan = false;
        if (homeLoanNoBtn) homeLoanNoBtn.classList.add("active");
        if (homeLoanYesBtn) homeLoanYesBtn.classList.remove("active");
    }

    function getBankInitials(name) {
        if (!name) return "BK";
        if (name.toLowerCase().includes("finnable")) return "FIN";
        if (name.toLowerCase().includes("incrid") || name.toLowerCase().includes("incred")) return "INC";
        if (name.toLowerCase().includes("poonawalla")) return "PWF";
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
    function selectLender(index) {
        if (!state.lenders[index]) return;

        state.selectedLenderIndex = index;
        state.selectedLender = state.lenders[index];
        lenderSelectError.textContent = "";

        const rows = lendersTableBody.querySelectorAll(".lender-row");
        rows.forEach((r, idx) => {
            const radio = r.querySelector('input[type="radio"]');
            if (idx === index) {
                r.classList.add("selected");
                if (radio) radio.checked = true;
            } else {
                r.classList.remove("selected");
                if (radio) radio.checked = false;
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

        disableStep2();
        disableStep3();
        updateStep4State();
        hideResults();
    }

    // ------------------------------------------------------------
    // STEP 2 CONTROLS: LOAN PARAMETERS
    // ------------------------------------------------------------
    function enableStep2() {
        step2Card.classList.remove("disabled");
        step2Lock.textContent = "✓ Active";
        step2Lock.className = "step-lock-tag active";

        proposedRateInput.disabled = false;
        loanTenureInput.disabled = false;

        // Inputs are left blank for manual entry by user
        updateStep3State();
        updateStep4State();
    }

    function disableStep2() {
        step2Card.classList.add("disabled");
        step2Lock.textContent = "Locked";
        step2Lock.className = "step-lock-tag";

        proposedRateInput.disabled = true;
        loanTenureInput.disabled = true;
        proposedRateInput.value = "";
        loanTenureInput.value = "";
        state.proposedRate = null;
        state.loanTenure = null;
        if (tenureYearsPreview) {
            tenureYearsPreview.textContent = "";
            tenureYearsPreview.classList.add("hidden");
        }
    }

    // ------------------------------------------------------------
    // STEP 3 CONTROLS: OBLIGATION DETAILS
    // ------------------------------------------------------------
    function updateStep3State() {
        const step2Valid = state.selectedLender !== null &&
            state.proposedRate !== null && state.proposedRate >= 0 &&
            state.loanTenure !== null && state.loanTenure > 0;

        if (step2Valid) {
            enableStep3();
        } else {
            disableStep3();
        }
    }

    function enableStep3() {
        step3Card.classList.remove("disabled");
        step3Lock.textContent = "✓ Active";
        step3Lock.className = "step-lock-tag active";

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
        step3Card.classList.add("disabled");
        step3Lock.textContent = "Locked";
        step3Lock.className = "step-lock-tag";

        if (addCcBtn) addCcBtn.disabled = true;
        if (addEmiBtn) addEmiBtn.disabled = true;

        if (ccRowsList) {
            ccRowsList.querySelectorAll("input, button").forEach(el => el.disabled = true);
        }
        if (emiRowsList) {
            emiRowsList.querySelectorAll("input, button").forEach(el => el.disabled = true);
        }
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

        const isCardDisabled = step3Card ? step3Card.classList.contains("disabled") : true;

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
            state.companyName && state.companyName.trim().length >= 2 &&
            state.selectedLender !== null;

        const step2Valid = state.proposedRate !== null && state.proposedRate >= 0 &&
            state.loanTenure !== null && state.loanTenure > 0;

        const step3Valid = state.ccObligations !== null && state.ccObligations >= 0 &&
            state.emiObligations !== null && state.emiObligations >= 0;

        const allValid = step1Valid && step2Valid && step3Valid;

        checkFoirBtn.disabled = !allValid;

        if (allValid) {
            actionHint.textContent = "Ready to execute real-time FOIR underwriting calculation";
            actionHint.style.color = "#059669";
        } else {
            actionHint.textContent = "Complete all verification steps above to execute credit underwriting";
            actionHint.style.color = "#64748b";
        }
    }

    // ------------------------------------------------------------
    // STEP 4 CALCULATION: ON CHECK FOIR CLICKED
    // ------------------------------------------------------------
    async function onCheckFoirClicked() {
        let hasError = false;

        if (!nameInput.value.trim()) {
            nameError.textContent = "Customer legal name is required";
            hasError = true;
        }

        if (state.monthlySalary === null || state.monthlySalary <= 0) {
            salaryError.textContent = "Enter a valid net monthly salary";
            hasError = true;
        }

        if (!state.companyName || state.companyName.trim().length < 2) {
            companyError.textContent = "Enter a valid employer / corporate entity";
            hasError = true;
        }

        if (!state.selectedLender) {
            lenderSelectError.textContent = "Please select an eligible lending partner from the table";
            hasError = true;
        }

        if (state.proposedRate === null || state.proposedRate < 0) {
            rateError.textContent = "Enter a valid interest rate";
            hasError = true;
        }

        if (state.loanTenure === null || state.loanTenure <= 0) {
            tenureError.textContent = "Enter a valid loan tenor";
            hasError = true;
        }

        if (state.ccObligations === null || state.ccObligations < 0) {
            ccError.textContent = "Enter credit card obligations (0 if none)";
            hasError = true;
        }

        if (state.emiObligations === null || state.emiObligations < 0) {
            emiError.textContent = "Enter existing EMI obligations (0 if none)";
            hasError = true;
        }

        if (hasError) return;

        checkFoirBtn.disabled = true;
        checkFoirBtn.querySelector(".btn-text").textContent = "Underwriting in Progress...";

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
                displayResults(data);
            } else {
                const clientCalc = calculateEligibilityClientSide();
                displayResults(clientCalc);
            }
        } catch (_err) {
            const clientCalc = calculateEligibilityClientSide();
            displayResults(clientCalc);
        } finally {
            checkFoirBtn.disabled = false;
            checkFoirBtn.querySelector(".btn-text").textContent = "Evaluate FOIR & Credit Eligibility";
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
    function displayResults(data) {
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

        // Display 1: Current FOIR
        resultCurrentFoir.textContent = `${foirVal}%`;

        // FOIR Bar and Badge
        if (foirBarFill) {
            foirBarFill.style.width = `${Math.min(100, foirVal)}%`;
        }

        if (foirVal <= 50) {
            resultFoirBadge.textContent = "Safe FOIR (< 50%)";
            resultFoirBadge.className = "metric-tag normal";
            if (foirBarFill) foirBarFill.style.backgroundColor = "#10b981";
        } else if (foirVal <= 65) {
            resultFoirBadge.textContent = "Moderate (50-65%)";
            resultFoirBadge.className = "metric-tag high";
            if (foirBarFill) foirBarFill.style.backgroundColor = "#f59e0b";
        } else {
            resultFoirBadge.textContent = "Strained (> 65%)";
            resultFoirBadge.className = "metric-tag critical";
            if (foirBarFill) foirBarFill.style.backgroundColor = "#f43f5e";
        }

        // Display 2 & 3: Loan Amount (Editable) and Available EMI
        finalLoanAmountInput.value = finalLoanVal > 0 ? finalLoanVal : "";
        resultMaxLoanCap.textContent = `Max eligible: ₹ ${maxLoanVal.toLocaleString("en-IN")}`;
        resetToMaxLoanBtn.classList.add("hidden");
        loanAmountWarning.classList.add("hidden");

        updateEmiDisplay(availableEmiVal, finalLoanVal, maxLoanVal, maxAvailableEmiVal);

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

        // Automatically navigate and focus directly on output results
        scrollToOutput();
    }

    function scrollToOutput() {
        if (!resultCard) return;
        requestAnimationFrame(() => {
            const topbar = document.querySelector(".topbar");
            const topbarHeight = topbar ? topbar.offsetHeight : 60;
            const rect = resultCard.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetY = Math.max(0, scrollTop + rect.top - topbarHeight - 16);

            window.scrollTo({
                top: targetY,
                behavior: "smooth"
            });

            // Trigger visual glow pulse highlight
            resultCard.classList.remove("result-highlight-pulse");
            void resultCard.offsetWidth; // Force DOM reflow
            resultCard.classList.add("result-highlight-pulse");

            setTimeout(() => {
                if (resultCard) resultCard.classList.remove("result-highlight-pulse");
            }, 2200);
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
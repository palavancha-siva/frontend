"use strict";

const TOKEN_KEY = "loansenseAdminApiToken";
const adminTokenInput = document.getElementById("adminToken");
const loginForm = document.getElementById("loginForm");
const loginPanel = document.getElementById("loginPanel");
const loginMessage = document.getElementById("loginMessage");
const adminMessage = document.getElementById("adminMessage");
const managementPanel = document.getElementById("managementPanel");
const logoutButton = document.getElementById("logoutButton");

// Tabs & Policy Matrix & BRE elements
const adminTabsNav = document.getElementById("adminTabsNav");
const tabBreBtn = document.getElementById("tabBreBtn");
const tabMatrixBtn = document.getElementById("tabMatrixBtn");
const tabBanksBtn = document.getElementById("tabBanksBtn");

// BRE Panel Elements
const brePanel = document.getElementById("brePanel");
const breBankSelect = document.getElementById("breBankSelect");
const breRuleCount = document.getElementById("breRuleCount");
const breAddBankButton = document.getElementById("breAddBankButton");
const breEditBankButton = document.getElementById("breEditBankButton");
const breAddRuleButton = document.getElementById("breAddRuleButton");
const breUploadRulesButton = document.getElementById("breUploadRulesButton");
const breSampleCsvButton = document.getElementById("breSampleCsvButton");
const breNotice = document.getElementById("breNotice");
const breRuleRows = document.getElementById("breRuleRows");
const breEmpty = document.getElementById("breEmpty");

// BRE Rule Add / Edit Dialog Elements
const breRuleDialog = document.getElementById("breRuleDialog");
const breRuleForm = document.getElementById("breRuleForm");
const breRuleDialogTitle = document.getElementById("breRuleDialogTitle");
const breRuleContext = document.getElementById("breRuleContext");
const breModalBankName = document.getElementById("breModalBankName");
const breRuleNameInput = document.getElementById("breRuleNameInput");
const breCategoryInput = document.getElementById("breCategoryInput");
const breModeRangeBtn = document.getElementById("breModeRangeBtn");
const breModeSingleBtn = document.getElementById("breModeSingleBtn");
const breRangeInputsPanel = document.getElementById("breRangeInputsPanel");
const breSingleInputsPanel = document.getElementById("breSingleInputsPanel");
const breMinSalaryInput = document.getElementById("breMinSalaryInput");
const breMaxSalaryInput = document.getElementById("breMaxSalaryInput");
const breOperatorSelect = document.getElementById("breOperatorSelect");
const breThresholdSalaryInput = document.getElementById("breThresholdSalaryInput");
const breFoirInput = document.getElementById("breFoirInput");
const breRuleDialogMessage = document.getElementById("breRuleDialogMessage");
const saveBreRuleButton = document.getElementById("saveBreRuleButton");
const cancelBreRuleDialogButton = document.getElementById("cancelBreRuleDialogButton");
const closeBreRuleDialogButton = document.getElementById("closeBreRuleDialogButton");

// BRE Delete Dialog Elements
const breDeleteDialog = document.getElementById("breDeleteDialog");
const breDeleteText = document.getElementById("breDeleteText");
const breDeleteDialogMessage = document.getElementById("breDeleteDialogMessage");
const cancelBreDeleteDialogButton = document.getElementById("cancelBreDeleteDialogButton");
const confirmBreDeleteButton = document.getElementById("confirmBreDeleteButton");
const closeBreDeleteDialogButton = document.getElementById("closeBreDeleteDialogButton");

// BRE Bulk Upload Dialog Elements
const breUploadDialog = document.getElementById("breUploadDialog");
const closeBreUploadDialogButton = document.getElementById("closeBreUploadDialogButton");
const cancelBreUploadDialogButton = document.getElementById("cancelBreUploadDialogButton");
const breDropZone = document.getElementById("breDropZone");
const breCsvFileInput = document.getElementById("breCsvFileInput");
const breFileInfoPanel = document.getElementById("breFileInfoPanel");
const breFileNameDisplay = document.getElementById("breFileNameDisplay");
const breFileSizeDisplay = document.getElementById("breFileSizeDisplay");
const removeBreFileButton = document.getElementById("removeBreFileButton");
const breFileSummary = document.getElementById("breFileSummary");
const breUploadDialogMessage = document.getElementById("breUploadDialogMessage");
const confirmBreUploadButton = document.getElementById("confirmBreUploadButton");
const breTargetBankOverrideRow = document.getElementById("breTargetBankOverrideRow");
const breOverrideBankCheckbox = document.getElementById("breOverrideBankCheckbox");
const breTargetBankName = document.getElementById("breTargetBankName");
let selectedBreFileName = "";

// Pincodes Panel Elements
const tabPincodesBtn = document.getElementById("tabPincodesBtn");
const pincodesPanel = document.getElementById("pincodesPanel");
const pincodesTotalCount = document.getElementById("pincodesTotalCount");
const pincodeStateSelect = document.getElementById("pincodeStateSelect");
const pincodeAddStateButton = document.getElementById("pincodeAddStateButton");
const pincodeEditStateButton = document.getElementById("pincodeEditStateButton");
const pincodeTierSelect = document.getElementById("pincodeTierSelect");
const pincodeServiceableSelect = document.getElementById("pincodeServiceableSelect");
const uploadPincodesButton = document.getElementById("uploadPincodesButton");
const samplePincodesCsvButton = document.getElementById("samplePincodesCsvButton");

// Add State Dialog Elements
const pincodeAddStateDialog = document.getElementById("pincodeAddStateDialog");
const closePincodeAddStateDialogBtn = document.getElementById("closePincodeAddStateDialogBtn");
const cancelPincodeAddStateDialogButton = document.getElementById("cancelPincodeAddStateDialogButton");
const pincodeAddStateForm = document.getElementById("pincodeAddStateForm");
const newPincodeStateName = document.getElementById("newPincodeStateName");
const newPincodePin = document.getElementById("newPincodePin");
const newPincodeLocation = document.getElementById("newPincodeLocation");
const newPincodeRegion = document.getElementById("newPincodeRegion");
const newPincodeTier = document.getElementById("newPincodeTier");
const pincodeAddStateDialogMessage = document.getElementById("pincodeAddStateDialogMessage");
const confirmPincodeAddStateButton = document.getElementById("confirmPincodeAddStateButton");

// Edit State Dialog Elements
const pincodeEditStateDialog = document.getElementById("pincodeEditStateDialog");
const closePincodeEditStateDialogBtn = document.getElementById("closePincodeEditStateDialogBtn");
const cancelPincodeEditStateDialogButton = document.getElementById("cancelPincodeEditStateDialogButton");
const pincodeEditStateForm = document.getElementById("pincodeEditStateForm");
const editStateCurrentName = document.getElementById("editStateCurrentName");
const editStateNameInput = document.getElementById("editStateNameInput");
const editStateTierSelect = document.getElementById("editStateTierSelect");
const deleteStatePincodesButton = document.getElementById("deleteStatePincodesButton");
const pincodeEditStateDialogMessage = document.getElementById("pincodeEditStateDialogMessage");
const confirmPincodeEditStateButton = document.getElementById("confirmPincodeEditStateButton");

// Edit Individual Pincode Dialog Elements
const pincodeEditDialog = document.getElementById("pincodeEditDialog");
const closePincodeEditDialogBtn = document.getElementById("closePincodeEditDialogBtn");
const cancelPincodeEditDialogButton = document.getElementById("cancelPincodeEditDialogButton");
const pincodeEditForm = document.getElementById("pincodeEditForm");
const editPinIdInput = document.getElementById("editPinIdInput");
const editPinPincodeDisplay = document.getElementById("editPinPincodeDisplay");
const editPinLocationInput = document.getElementById("editPinLocationInput");
const editPinRegionInput = document.getElementById("editPinRegionInput");
const editPinStateInput = document.getElementById("editPinStateInput");
const editPinTierSelect = document.getElementById("editPinTierSelect");
const pincodeEditDialogMessage = document.getElementById("pincodeEditDialogMessage");
const confirmPincodeEditButton = document.getElementById("confirmPincodeEditButton");
const pincodeFilterNotice = document.getElementById("pincodeFilterNotice");
const pincodeSearchInput = document.getElementById("pincodeSearchInput");
const pincodesNotice = document.getElementById("pincodesNotice");
const pincodeRows = document.getElementById("pincodeRows");
const pincodesEmpty = document.getElementById("pincodesEmpty");
const pincodesPagination = document.getElementById("pincodesPagination");
const pincodesPageInfo = document.getElementById("pincodesPageInfo");
const pincodesPrevBtn = document.getElementById("pincodesPrevBtn");
const pincodesNextBtn = document.getElementById("pincodesNextBtn");

const uploadBankServiceabilityButton = document.getElementById("uploadBankServiceabilityButton");

// Master Pincodes Upload Dialog Elements
const pincodeMasterUploadDialog = document.getElementById("pincodeMasterUploadDialog");
const closePincodeMasterUploadDialogButton = document.getElementById("closePincodeMasterUploadDialogButton");
const pincodeMasterDownloadSampleButton = document.getElementById("pincodeMasterDownloadSampleButton");
const pincodeMasterDropZone = document.getElementById("pincodeMasterDropZone");
const pincodeMasterCsvFileInput = document.getElementById("pincodeMasterCsvFileInput");
const pincodeMasterBrowseButton = document.getElementById("pincodeMasterBrowseButton");
const pincodeMasterFileInfoPanel = document.getElementById("pincodeMasterFileInfoPanel");
const pincodeMasterFileNameDisplay = document.getElementById("pincodeMasterFileNameDisplay");
const pincodeMasterFileSizeDisplay = document.getElementById("pincodeMasterFileSizeDisplay");
const pincodeMasterRemoveFileButton = document.getElementById("pincodeMasterRemoveFileButton");
const pincodeMasterPreviewContainer = document.getElementById("pincodeMasterPreviewContainer");
const pincodeMasterFileSummary = document.getElementById("pincodeMasterFileSummary");
const pincodeMasterPreviewRows = document.getElementById("pincodeMasterPreviewRows");
const pincodeMasterUploadDialogMessage = document.getElementById("pincodeMasterUploadDialogMessage");
const confirmPincodeMasterUploadButton = document.getElementById("confirmPincodeMasterUploadButton");
const pincodeMasterTargetStateSelect = document.getElementById("pincodeMasterTargetStateSelect");
const pincodeMasterAddStateButton = document.getElementById("pincodeMasterAddStateButton");
const pincodeMasterEditStateButton = document.getElementById("pincodeMasterEditStateButton");
const pincodeMasterDeleteStateButton = document.getElementById("pincodeMasterDeleteStateButton");
const pincodeMasterNewStateRow = document.getElementById("pincodeMasterNewStateRow");
const pincodeMasterNewStateInput = document.getElementById("pincodeMasterNewStateInput");
const pincodeMasterSaveNewStateButton = document.getElementById("pincodeMasterSaveNewStateButton");
const pincodeMasterCancelNewStateButton = document.getElementById("pincodeMasterCancelNewStateButton");
const pincodeMasterEditStateRow = document.getElementById("pincodeMasterEditStateRow");
const pincodeMasterEditStateInput = document.getElementById("pincodeMasterEditStateInput");
const pincodeMasterUpdateStateButton = document.getElementById("pincodeMasterUpdateStateButton");
const pincodeMasterCancelEditStateButton = document.getElementById("pincodeMasterCancelEditStateButton");

// Bank Serviceability Upload Dialog Elements
const pincodeBankUploadDialog = document.getElementById("pincodeBankUploadDialog");
const closePincodeBankUploadDialogButton = document.getElementById("closePincodeBankUploadDialogButton");
const bankServiceabilityTargetSelect = document.getElementById("bankServiceabilityTargetSelect");
const pincodeBankDownloadSampleButton = document.getElementById("pincodeBankDownloadSampleButton");
const pincodeBankDropZone = document.getElementById("pincodeBankDropZone");
const pincodeBankCsvFileInput = document.getElementById("pincodeBankCsvFileInput");
const pincodeBankBrowseButton = document.getElementById("pincodeBankBrowseButton");
const pincodeBankFileInfoPanel = document.getElementById("pincodeBankFileInfoPanel");
const pincodeBankFileNameDisplay = document.getElementById("pincodeBankFileNameDisplay");
const pincodeBankFileSizeDisplay = document.getElementById("pincodeBankFileSizeDisplay");
const pincodeBankRemoveFileButton = document.getElementById("pincodeBankRemoveFileButton");
const pincodeBankFileSummary = document.getElementById("pincodeBankFileSummary");
const pincodeBankUploadDialogMessage = document.getElementById("pincodeBankUploadDialogMessage");
const cancelPincodeBankUploadDialogButton = document.getElementById("cancelPincodeBankUploadDialogButton");
const confirmPincodeBankUploadButton = document.getElementById("confirmPincodeBankUploadButton");
const pincodeBankAddBankButton = document.getElementById("pincodeBankAddBankButton");
const pincodeBankNewBankRow = document.getElementById("pincodeBankNewBankRow");
const pincodeBankNewBankInput = document.getElementById("pincodeBankNewBankInput");
const pincodeBankSaveNewBankButton = document.getElementById("pincodeBankSaveNewBankButton");
const pincodeBankCancelNewBankButton = document.getElementById("pincodeBankCancelNewBankButton");

let currentPincodePage = 1;
let totalPincodePages = 1;
let pincodeSearchTimer = null;
let currentAvailableStates = ["Telangana", "Andhra Pradesh"];
let selectedPincodeMasterFileText = "";
let selectedPincodeBankFileText = "";

let activeTab = "bre";
let currentBreRules = [];
let editingBreRuleId = null;
let deletingBreRuleId = null;
let breConditionMode = "range";
let selectedBreFileText = "";

const matrixPanel = document.getElementById("matrixPanel");
const matrixFilter = document.getElementById("matrixFilter");
const matrixCount = document.getElementById("matrixCount");
const matrixRows = document.getElementById("matrixRows");
const matrixEmpty = document.getElementById("matrixEmpty");
const addMatrixRuleButton = document.getElementById("addMatrixRuleButton");
const uploadMatrixButton = document.getElementById("uploadMatrixButton");
const downloadMatrixSampleButton = document.getElementById("downloadMatrixSampleButton");

const matrixRuleDialog = document.getElementById("matrixRuleDialog");
const matrixRuleForm = document.getElementById("matrixRuleForm");
const matrixRuleDialogTitle = document.getElementById("matrixRuleDialogTitle");
const ruleCategoryInput = document.getElementById("ruleCategoryInput");
const ruleMinSalaryInput = document.getElementById("ruleMinSalaryInput");
const ruleMaxSalaryInput = document.getElementById("ruleMaxSalaryInput");
const ruleFoirInput = document.getElementById("ruleFoirInput");
const ruleMultiplierInput = document.getElementById("ruleMultiplierInput");
const ruleTenureInput = document.getElementById("ruleTenureInput");
const ruleBankInput = document.getElementById("ruleBankInput");
const matrixRuleDialogMessage = document.getElementById("matrixRuleDialogMessage");
const saveMatrixRuleButton = document.getElementById("saveMatrixRuleButton");
const closeMatrixRuleDialogButton = document.getElementById("closeMatrixRuleDialogButton");
const cancelMatrixRuleDialogButton = document.getElementById("cancelMatrixRuleDialogButton");

const matrixUploadDialog = document.getElementById("matrixUploadDialog");
const closeMatrixUploadDialogButton = document.getElementById("closeMatrixUploadDialogButton");
const cancelMatrixUploadDialogButton = document.getElementById("cancelMatrixUploadDialogButton");
const matrixDropZone = document.getElementById("matrixDropZone");
const matrixCsvFileInput = document.getElementById("matrixCsvFileInput");
const matrixFileInfoPanel = document.getElementById("matrixFileInfoPanel");
const matrixFileNameDisplay = document.getElementById("matrixFileNameDisplay");
const matrixFileSizeDisplay = document.getElementById("matrixFileSizeDisplay");
const removeMatrixFileButton = document.getElementById("removeMatrixFileButton");
const matrixFileSummary = document.getElementById("matrixFileSummary");
const matrixUploadDialogMessage = document.getElementById("matrixUploadDialogMessage");
const confirmMatrixUploadButton = document.getElementById("confirmMatrixUploadButton");

let currentMatrixRules = [];
let activeMatrixRuleId = null;
let selectedMatrixFileText = "";
let matrixFilterTimer = null;

const bankSelect = document.getElementById("bankSelect");
const addBankButton = document.getElementById("addBankButton");
const uploadFileButton = document.getElementById("uploadFileButton");
const bankDialog = document.getElementById("bankDialog");
const bankForm = document.getElementById("bankForm");
const bankNameInput = document.getElementById("bankNameInput");
const bankDialogMessage = document.getElementById("bankDialogMessage");
const saveBankButton = document.getElementById("saveBankButton");

const modifyBankButton = document.getElementById("modifyBankButton");
const modifyBankDialog = document.getElementById("modifyBankDialog");
const modifyBankForm = document.getElementById("modifyBankForm");
const modifyBankContext = document.getElementById("modifyBankContext");
const modifyBankNameInput = document.getElementById("modifyBankNameInput");
const modifyBankFoirInput = document.getElementById("modifyBankFoirInput");
const modifyBankCcInput = document.getElementById("modifyBankCcInput");
const modifyBankDialogMessage = document.getElementById("modifyBankDialogMessage");
const saveModifyBankButton = document.getElementById("saveModifyBankButton");
const deleteBankButton = document.getElementById("deleteBankButton");
const closeModifyBankDialogButton = document.getElementById("closeModifyBankDialogButton");
const cancelModifyBankDialogButton = document.getElementById("cancelModifyBankDialogButton");

const addMappingButton = document.getElementById("addMappingButton");
const mappingRows = document.getElementById("mappingRows");
const mappingEmpty = document.getElementById("mappingEmpty");
const mappingCount = document.getElementById("mappingCount");
const mappingFilter = document.getElementById("mappingFilter");

const mappingDialog = document.getElementById("mappingDialog");
const mappingForm = document.getElementById("mappingForm");
const dialogBankContext = document.getElementById("dialogBankContext");
const companyNameInput = document.getElementById("companyName");
const companyOptions = document.getElementById("companyOptions");
const categoryInput = document.getElementById("mappingCategory");
const categoryOptions = document.getElementById("categoryOptions");
const foirInput = document.getElementById("mappingFoir");
const ccObligationInput = document.getElementById("mappingCcObligation");
const dialogTitle = document.getElementById("dialogTitle");
const dialogMessage = document.getElementById("dialogMessage");
const saveMappingButton = document.getElementById("saveMappingButton");

const uploadDialog = document.getElementById("uploadDialog");
const closeUploadDialogButton = document.getElementById("closeUploadDialogButton");
const cancelUploadDialogButton = document.getElementById("cancelUploadDialogButton");
const downloadSampleButton = document.getElementById("downloadSampleButton");
const dropZone = document.getElementById("dropZone");
const csvFileInput = document.getElementById("csvFileInput");
const fileInfoPanel = document.getElementById("fileInfoPanel");
const fileNameDisplay = document.getElementById("fileNameDisplay");
const fileSizeDisplay = document.getElementById("fileSizeDisplay");
const removeFileButton = document.getElementById("removeFileButton");
const filePreviewSummary = document.getElementById("filePreviewSummary");
const filePreviewContainer = document.getElementById("filePreviewContainer");
const filePreviewRows = document.getElementById("filePreviewRows");
const uploadDialogMessage = document.getElementById("uploadDialogMessage");
const confirmUploadButton = document.getElementById("confirmUploadButton");

let banks = [];
let companies = [];
let activeMapping = null;
let mappingsRequest = null;
let currentBankMappings = [];
let mappingFilterTimer = null;

let selectedFileText = "";
let parsedUploadRows = [];

function escapeHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function setMessage(element, message, type) {
    if (!element) return;
    element.textContent = message || "";
    element.className = "admin-message";
    if (type) element.classList.add(type);
}

async function apiRequest(path, options = {}, token) {
    const { timeout: customTimeout, ...fetchOptions } = options;
    const headers = new Headers(fetchOptions.headers || {});
    if (token) headers.set("Authorization", `Bearer ${token}`);
    if (fetchOptions.body) headers.set("Content-Type", "application/json");

    const timeoutMs = typeof customTimeout === "number" ? customTimeout : 30000;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    const abortRequest = () => controller.abort();
    if (fetchOptions.signal) {
        if (fetchOptions.signal.aborted) {
            controller.abort();
        } else {
            fetchOptions.signal.addEventListener("abort", abortRequest, { once: true });
        }
    }

    try {
        const url = window.apiUrl ? window.apiUrl(path) : path;
        const response = await fetch(url, {
            ...fetchOptions,
            headers,
            cache: "no-store",
            signal: controller.signal
        });
        const data = await response.json().catch(() => null);
        if (!response.ok) {
            throw new Error(
                data && data.message
                    ? data.message
                    : `Request failed (${response.status}).`
            );
        }
        return data;
    } catch (error) {
        if (controller.signal.aborted && !options.signal?.aborted) {
            throw new Error("The request timed out. Check the connection and try again.");
        }
        throw error;
    } finally {
        clearTimeout(timeout);
        if (options.signal) {
            options.signal.removeEventListener("abort", abortRequest);
        }
    }
}

function currentToken() {
    return sessionStorage.getItem(TOKEN_KEY) || "";
}

function showManagement(visible) {
    loginPanel.classList.toggle("hidden", visible);
    if (adminTabsNav) adminTabsNav.classList.toggle("hidden", !visible);
    logoutButton.classList.toggle("hidden", !visible);
    if (visible) {
        switchTab(activeTab);
    } else {
        if (brePanel) brePanel.classList.add("hidden");
        if (matrixPanel) matrixPanel.classList.add("hidden");
        managementPanel.classList.add("hidden");
        if (pincodesPanel) pincodesPanel.classList.add("hidden");
    }
}

function switchTab(tab) {
    activeTab = tab === "matrix" ? "bre" : tab;
    if (tabBreBtn) tabBreBtn.classList.toggle("active", activeTab === "bre");
    if (tabMatrixBtn) tabMatrixBtn.classList.toggle("active", false);
    if (tabBanksBtn) tabBanksBtn.classList.toggle("active", activeTab === "banks");
    if (tabPincodesBtn) tabPincodesBtn.classList.toggle("active", activeTab === "pincodes");

    if (brePanel) brePanel.classList.toggle("hidden", activeTab !== "bre");
    if (matrixPanel) matrixPanel.classList.add("hidden");
    if (managementPanel) managementPanel.classList.toggle("hidden", activeTab !== "banks");
    if (pincodesPanel) pincodesPanel.classList.toggle("hidden", activeTab !== "pincodes");

    if (activeTab === "bre") {
        void initBreTab();
    } else if (activeTab === "pincodes") {
        void initPincodesTab();
    } else {
        void loadMappings();
    }
}

function handleAuthorizationError(error) {
    if (!error.message.includes("token") &&
        !error.message.includes("authorized")) {
        return false;
    }
    sessionStorage.removeItem(TOKEN_KEY);
    showManagement(false);
    setMessage(loginMessage, error.message, "error");
    return true;
}

function getSelectedBankName() {
    if (activeTab === "bre" && breBankSelect && breBankSelect.value) {
        return breBankSelect.value.trim();
    }
    if (bankSelect && bankSelect.value) {
        const selectedOption = bankSelect.options[bankSelect.selectedIndex];
        return selectedOption ? selectedOption.textContent.trim() : "";
    }
    if (breBankSelect && breBankSelect.value) {
        return breBankSelect.value.trim();
    }
    return "";
}

function renderBanks(selectedBankName = "") {
    bankSelect.replaceChildren();
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = banks.length
        ? "Select a bank"
        : "No banks available";
    bankSelect.append(placeholder);

    for (const bank of banks) {
        const option = document.createElement("option");
        option.value = bank.name;
        option.textContent = bank.name;
        bankSelect.append(option);
    }

    if (selectedBankName) {
        bankSelect.value = selectedBankName;
    }

    addMappingButton.disabled = !bankSelect.value;
    addMappingButton.title = bankSelect.value
        ? ""
        : "Select a bank before adding a single mapping.";
    updateUploadButtonLabel();
    renderBreBanks(selectedBankName || (breBankSelect ? breBankSelect.value : ""));
    renderBankServiceabilityOptions(selectedBankName || (bankServiceabilityTargetSelect ? bankServiceabilityTargetSelect.value : ""));
}

function getSelectedBank() {
    let name = "";
    if (activeTab === "bre" && breBankSelect && breBankSelect.value) {
        name = breBankSelect.value;
    } else if (bankSelect && bankSelect.value) {
        name = bankSelect.value;
    } else if (breBankSelect && breBankSelect.value) {
        name = breBankSelect.value;
    }
    if (!name) return null;
    return banks.find(b => b.name.toLowerCase() === name.toLowerCase()) || null;
}

function updateUploadButtonLabel() {
    const bankName = getSelectedBankName();
    if (bankName) {
        uploadFileButton.textContent = `📁 Upload Company List for ${bankName}`;
        modifyBankButton.disabled = false;
        modifyBankButton.title = `Modify ${bankName} name and policy data`;
    } else {
        uploadFileButton.textContent = "📁 Upload CSV File";
        modifyBankButton.disabled = true;
        modifyBankButton.title = "Select a bank first to modify";
    }
}

function renderMappings(mappings, isFiltered = false) {
    mappingRows.replaceChildren();
    const count = mappings.length;
    if (isFiltered) {
        mappingCount.textContent = `Found ${count.toLocaleString()} matching ${count === 1 ? 'company' : 'companies'}`;
    } else if (count >= 500) {
        mappingCount.textContent = `Showing 500 mappings (use search to find specific company)`;
    } else {
        mappingCount.textContent = count === 1
            ? "1 company mapping"
            : `${count.toLocaleString()} company mappings`;
    }
    mappingEmpty.textContent = count
        ? ""
        : (isFiltered ? "No matching companies found in this bank." : "No company mappings for this bank yet.");
    mappingEmpty.classList.toggle("hidden", count > 0);

    const displayList = mappings.slice(0, 300);
    const fragment = document.createDocumentFragment();

    for (const mapping of displayList) {
        const row = document.createElement("tr");
        const companyCell = document.createElement("td");
        const categoryCell = document.createElement("td");
        const foirCell = document.createElement("td");
        const ccObligationCell = document.createElement("td");
        const actionsCell = document.createElement("td");

        companyCell.textContent = mapping.company_name;
        categoryCell.textContent = mapping.cat || "—";

        if (mapping.bre_configured && Array.isArray(mapping.bre_slabs) && mapping.bre_slabs.length > 0) {
            const badge = document.createElement("span");
            badge.className = "bre-foir-badge";
            badge.setAttribute("role", "note");

            const rangeText = mapping.bre_min_foir === mapping.bre_max_foir
                ? `${mapping.bre_min_foir}%`
                : `${mapping.bre_min_foir}% – ${mapping.bre_max_foir}%`;

            const icon = document.createElement("span");
            icon.className = "bre-foir-badge-icon";
            icon.textContent = "⚡";
            badge.append(icon, document.createTextNode(` ${rangeText} (BRE)`));

            const slabLines = mapping.bre_slabs.map(s => {
                const range = formatSalaryRange(s.min_salary, s.max_salary, s.condition_type);
                return `• ${range}: ${s.foir_percent}% FOIR (${s.rule_name})`;
            }).join("\n");
            badge.title = `${mapping.bank_name || getSelectedBankName()} [${mapping.cat || 'All Categories'}] BRE Slabs:\n${slabLines}`;
            foirCell.append(badge);
        } else if (mapping.foir !== null && mapping.foir !== undefined && !isNaN(Number(mapping.foir)) && Number(mapping.foir) > 0) {
            foirCell.textContent = `${Number(mapping.foir)}%`;
        } else {
            foirCell.textContent = mapping.foir === 0 ? "0%" : "—";
        }

        ccObligationCell.textContent =
            `${Number(mapping.cc_obligation_percent ?? 5)}%`;
        actionsCell.append(
            makeActionButton("Edit", "edit", mapping.id),
            makeActionButton("Delete", "delete", mapping.id, true)
        );
        row.append(
            companyCell,
            categoryCell,
            foirCell,
            ccObligationCell,
            actionsCell
        );
        fragment.append(row);
    }
    mappingRows.append(fragment);
}

function makeActionButton(label, action, id, destructive = false) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = destructive
        ? "row-action row-action-delete"
        : "row-action";
    button.dataset.action = action;
    button.dataset.id = String(id);
    button.textContent = label;
    return button;
}

async function loadBanks(selectedBankName = "") {
    const records = await apiRequest(
        "/api/admin/banks",
        {},
        currentToken()
    );
    if (!Array.isArray(records)) {
        throw new Error("The bank list response was invalid.");
    }
    banks = records;
    renderBanks(selectedBankName || getSelectedBankName());
}

async function loadCompanies() {
    try {
        const records = await apiRequest(
            "/api/admin/companies",
            {},
            currentToken()
        );
        if (Array.isArray(records)) {
            companies = records;
            companyOptions.replaceChildren();
            for (const co of records) {
                const option = document.createElement("option");
                option.value = co.name;
                companyOptions.append(option);
            }
        }
    } catch {
        // Silently tolerate if companies autocomplete fails
    }
}

async function loadCategories() {
    const records = await apiRequest(
        "/api/admin/categories",
        {},
        currentToken()
    );
    if (!Array.isArray(records)) {
        throw new Error("The category list response was invalid.");
    }
    categoryOptions.replaceChildren();
    for (const category of records) {
        const option = document.createElement("option");
        option.value = category.name;
        categoryOptions.append(option);
    }
}

async function loadMappings(searchTerm = "") {
    const bankName = getSelectedBankName();
    if (!bankName) {
        currentBankMappings = [];
        mappingRows.replaceChildren();
        mappingCount.textContent = "";
        mappingEmpty.textContent = "Select a bank to view its company mappings.";
        mappingEmpty.classList.remove("hidden");
        addMappingButton.disabled = true;
        addMappingButton.title = "Select a bank before adding a single mapping.";
        if (mappingFilter) mappingFilter.value = "";
        return;
    }

    addMappingButton.disabled = false;
    addMappingButton.title = "";
    if (mappingsRequest) mappingsRequest.abort();
    mappingsRequest = new AbortController();
    const requestedBank = bankName;
    mappingEmpty.textContent = "Loading company mappings...";
    mappingEmpty.classList.remove("hidden");

    try {
        const queryParams = new URLSearchParams({ limit: "500" });
        if (searchTerm.trim()) {
            queryParams.set("search", searchTerm.trim());
        }
        const records = await apiRequest(
            `/api/admin/banks/${encodeURIComponent(bankName)}/mappings?${queryParams.toString()}`,
            { signal: mappingsRequest.signal },
            currentToken()
        );
        if (requestedBank !== getSelectedBankName()) return;
        if (!Array.isArray(records)) {
            throw new Error("The company mapping response was invalid.");
        }
        currentBankMappings = records;
        renderMappings(records, Boolean(searchTerm.trim()));
    } catch (error) {
        if (error.name === "AbortError") return;
        if (handleAuthorizationError(error)) return;
        setMessage(adminMessage, error.message, "error");
        mappingRows.replaceChildren();
        mappingCount.textContent = "";
        mappingEmpty.textContent = "Failed to load company mappings.";
        mappingEmpty.classList.remove("hidden");
    }
}

async function verifyToken(token) {
    try {
        await apiRequest("/api/admin/banks", {}, token);
        sessionStorage.setItem(TOKEN_KEY, token);
        showManagement(true);
        setMessage(loginMessage, "", "");
        await Promise.all([loadBanks(), loadCompanies(), loadCategories()]);
        setMessage(adminMessage, "Signed in. Bank BRE & company settings loaded from database.", "success");
    } catch (error) {
        sessionStorage.removeItem(TOKEN_KEY);
        showManagement(false);
        setMessage(loginMessage, error.message, "error");
    }
}

function openBankDialog() {
    bankForm.reset();
    setMessage(bankDialogMessage, "", "");
    bankDialog.showModal();
    bankNameInput.focus();
}

async function saveBank(event) {
    event.preventDefault();
    if (!bankForm.reportValidity()) return;

    const newBankName = bankNameInput.value.trim();
    saveBankButton.disabled = true;
    saveBankButton.textContent = "Saving...";
    setMessage(bankDialogMessage, "Saving bank...", "");
    try {
        const response = await apiRequest(
            "/api/admin/banks",
            {
                method: "POST",
                body: JSON.stringify({ name: newBankName })
            },
            currentToken()
        );
        const savedBank = response.bank || { name: newBankName };
        const exists = banks.some(b => b.name.toLowerCase() === savedBank.name.toLowerCase());
        if (!exists) {
            banks.push(savedBank);
            banks.sort((left, right) => left.name.localeCompare(right.name));
        }
        renderBanks(savedBank.name);
        bankDialog.close();
        setMessage(
            adminMessage,
            `${response.message || "Bank added."} Configured for ${savedBank.name}.`,
            "success"
        );
        if (breBankSelect) {
            renderBreBanks(savedBank.name);
        }
        if (activeTab === "bre") {
            void loadBreRules(savedBank.name);
        } else {
            void loadMappings();
        }
    } catch (error) {
        if (!handleAuthorizationError(error)) {
            setMessage(bankDialogMessage, error.message, "error");
        }
    } finally {
        saveBankButton.disabled = false;
        saveBankButton.textContent = "Add Bank";
    }
}

function openModifyBankDialog() {
    const bank = getSelectedBank();
    if (!bank) {
        setMessage(adminMessage, "Please select a bank first to modify.", "error");
        return;
    }
    modifyBankForm.reset();
    modifyBankNameInput.value = bank.name;
    if (modifyBankContext) {
        modifyBankContext.textContent = `Configure details for ${bank.name} (ID: ${bank.id})`;
    }
    setMessage(modifyBankDialogMessage, "", "");
    modifyBankDialog.showModal();
    modifyBankNameInput.focus();
}

async function saveModifyBank(event) {
    event.preventDefault();
    const bank = getSelectedBank();
    if (!bank) return;
    if (!modifyBankForm.reportValidity()) return;

    const newName = modifyBankNameInput.value.trim();
    const foirVal = modifyBankFoirInput.value.trim();
    const ccVal = modifyBankCcInput.value.trim();

    const payload = { name: newName };
    if (foirVal !== "") payload.foir = Number(foirVal);
    if (ccVal !== "") payload.cc_obligation_percent = Number(ccVal);

    saveModifyBankButton.disabled = true;
    saveModifyBankButton.textContent = "Saving...";
    setMessage(modifyBankDialogMessage, "Updating bank details...", "");

    try {
        const response = await apiRequest(
            `/api/admin/banks/${bank.id}`,
            {
                method: "PUT",
                body: JSON.stringify(payload)
            },
            currentToken()
        );

        modifyBankDialog.close();
        setMessage(adminMessage, response.message || "Bank updated successfully.", "success");

        await loadBanks(newName);
        if (breBankSelect) {
            renderBreBanks(newName);
        }
        if (activeTab === "bre") {
            void loadBreRules(newName);
        } else {
            void loadMappings();
        }
    } catch (error) {
        if (!handleAuthorizationError(error)) {
            setMessage(modifyBankDialogMessage, error.message, "error");
        }
    } finally {
        saveModifyBankButton.disabled = false;
        saveModifyBankButton.textContent = "Save Changes";
    }
}

async function deleteCurrentBank() {
    const bank = getSelectedBank();
    if (!bank) return;

    const confirmed = window.confirm(
        `Are you sure you want to deactivate bank "${bank.name}" and all its company mappings?\nThis action will hide this bank from customer loan evaluations.`
    );
    if (!confirmed) return;

    deleteBankButton.disabled = true;
    deleteBankButton.textContent = "Deactivating...";
    setMessage(modifyBankDialogMessage, "Deactivating bank...", "");

    try {
        const response = await apiRequest(
            `/api/admin/banks/${bank.id}`,
            { method: "DELETE" },
            currentToken()
        );

        modifyBankDialog.close();
        setMessage(adminMessage, response.message || `Bank "${bank.name}" deactivated.`, "success");

        await loadBanks("");
        if (breBankSelect) {
            renderBreBanks("");
            const nextBank = breBankSelect.value;
            if (activeTab === "bre") {
                void loadBreRules(nextBank);
            }
        }
        if (activeTab !== "bre") {
            void loadMappings();
        }
    } catch (error) {
        if (!handleAuthorizationError(error)) {
            setMessage(modifyBankDialogMessage, error.message, "error");
        }
    } finally {
        deleteBankButton.disabled = false;
        deleteBankButton.textContent = "🗑️ Delete Bank";
    }
}

function updateMappingBreHint() {
    const hintEl = document.getElementById("mappingBreFoirHint");
    const textEl = document.getElementById("mappingBreFoirText");
    if (!hintEl || !textEl) return;

    const cat = categoryInput ? categoryInput.value.trim().toUpperCase() : "";
    const bankName = (getSelectedBankName() || "").toLowerCase();
    const isIcici = bankName.includes("icici");

    let matched = currentBankMappings.find(m => {
        if (!m.bre_configured || !m.bre_slabs || m.bre_slabs.length === 0) return false;
        if (isIcici) return true;
        const mCat = String(m.cat || "").trim().toUpperCase();
        return mCat === cat || mCat === "ALL";
    });

    if (!matched && isIcici) {
        matched = currentBankMappings.find(m => m.bre_configured && m.bre_slabs && m.bre_slabs.length > 0);
    }

    if (matched && matched.bre_slabs && matched.bre_slabs.length > 0) {
        const rangeText = matched.bre_min_foir === matched.bre_max_foir
            ? `${matched.bre_min_foir}%`
            : `${matched.bre_min_foir}% – ${matched.bre_max_foir}%`;
        textEl.textContent = `${rangeText} across ${matched.bre_slabs.length} salary slabs in BRE`;
        hintEl.style.display = "block";
        if (!foirInput.value || foirInput.value === "0") {
            foirInput.value = String(matched.bre_min_foir);
        }
    } else {
        hintEl.style.display = "none";
    }
}

function openMappingDialog(mapping = null) {
    activeMapping = mapping;
    const editing = Boolean(mapping);
    const bankName = getSelectedBankName();
    dialogTitle.textContent = editing ? "Edit Company Mapping" : "Add Company Mapping";
    dialogBankContext.textContent = `Bank: ${bankName}`;
    companyNameInput.value = mapping ? mapping.company_name : "";
    categoryInput.value = mapping && mapping.cat ? mapping.cat : "";
    foirInput.value = mapping && mapping.foir !== null && mapping.foir !== undefined && !isNaN(Number(mapping.foir))
        ? String(mapping.foir)
        : "70";
    ccObligationInput.value = mapping
        ? String(mapping.cc_obligation_percent ?? 5)
        : "5";
    saveMappingButton.textContent = editing ? "Save changes" : "Add mapping";
    setMessage(dialogMessage, "", "");
    updateMappingBreHint();
    mappingDialog.showModal();
    companyNameInput.focus();
}

async function saveMapping(event) {
    event.preventDefault();
    if (!mappingForm.reportValidity()) return;

    const bankName = getSelectedBankName();
    if (!bankName) {
        setMessage(dialogMessage, "Select a bank first.", "error");
        return;
    }
    const editing = Boolean(activeMapping);
    const path = editing
        ? `/api/admin/banks/${encodeURIComponent(bankName)}/mappings/${encodeURIComponent(activeMapping.id)}`
        : `/api/admin/banks/${encodeURIComponent(bankName)}/mappings`;
    const body = {
        company_name: companyNameInput.value.trim(),
        cat: categoryInput.value.trim(),
        foir: Number(foirInput.value),
        cc_obligation_percent: Number(ccObligationInput.value)
    };

    saveMappingButton.disabled = true;
    saveMappingButton.textContent = "Saving...";
    setMessage(dialogMessage, "Saving mapping...", "");
    try {
        const response = await apiRequest(
            path,
            {
                method: editing ? "PUT" : "POST",
                body: JSON.stringify(body)
            },
            currentToken()
        );
        mappingDialog.close();
        setMessage(adminMessage, response.message, "success");
        mappingForm.reset();
        void refreshAfterSave();
    } catch (error) {
        if (!handleAuthorizationError(error)) {
            setMessage(dialogMessage, error.message, "error");
        }
    } finally {
        saveMappingButton.disabled = false;
        saveMappingButton.textContent = activeMapping
            ? "Save changes"
            : "Add mapping";
    }
}

async function refreshAfterSave() {
    const results = await Promise.allSettled([
        loadMappings(),
        loadCompanies(),
        loadCategories()
    ]);
    const failedRefresh = results.find(result => result.status === "rejected");
    if (failedRefresh) {
        setMessage(
            adminMessage,
            `Mapping saved, but the lists could not be refreshed: ${failedRefresh.reason.message}`,
            "error"
        );
    }
}

async function deleteMapping(mapping) {
    const bankName = getSelectedBankName();
    if (!window.confirm(
        `Delete the ${mapping.company_name} mapping for ${bankName}?`
    )) {
        return;
    }

    try {
        const response = await apiRequest(
            `/api/admin/banks/${encodeURIComponent(bankName)}/mappings/${encodeURIComponent(mapping.id)}`,
            { method: "DELETE" },
            currentToken()
        );
        setMessage(adminMessage, response.message, "success");
        await loadMappings();
    } catch (error) {
        if (!handleAuthorizationError(error)) {
            setMessage(adminMessage, error.message, "error");
        }
    }
}

// ==========================================
// FILE UPLOAD AND CSV IMPORT FLOW
// ==========================================

function openUploadDialog() {
    resetUploadState();
    const bankName = getSelectedBankName();
    const title = document.getElementById("uploadDialogTitle");
    const intro = document.querySelector(".upload-intro");
    const templateHint = document.querySelector(".upload-template-hint");

    if (bankName) {
        if (title) title.textContent = `Upload Company List for ${bankName}`;
        if (intro) {
            intro.innerHTML = `Upload an Excel or CSV file containing company categorizations for <strong>${bankName}</strong>. Supports bank dump format (<code>EMPLOYERID, EMPLOYERNAME, EMPLOYER_CATG</code>) or standard format (<code>Company, Category, FOIR</code>).`;
        }
        if (templateHint) {
            templateHint.innerHTML = `Bank-wise columns: <code>EMPLOYERNAME, EMPLOYER_CATG</code> (or <code>Company, Category</code>)`;
        }
    } else {
        if (title) title.textContent = "Upload Bank Company List";
        if (intro) {
            intro.innerHTML = `Upload a <strong>CSV file</strong> to bulk import company categorizations. Supports multi-bank files or select a bank first to import directly into that bank.`;
        }
        if (templateHint) {
            templateHint.innerHTML = `Columns: <code>Bank Name, Company, Category, FOIR, CC Obligation</code>`;
        }
    }

    setMessage(uploadDialogMessage, "", "");
    uploadDialog.showModal();
}

function resetUploadState() {
    selectedFileText = "";
    parsedUploadRows = [];
    csvFileInput.value = "";
    fileInfoPanel.classList.add("hidden");
    dropZone.classList.remove("hidden");
    filePreviewContainer.classList.add("hidden");
    filePreviewRows.replaceChildren();
    confirmUploadButton.disabled = true;
    setMessage(uploadDialogMessage, "", "");
}

function parseCsvClient(text) {
    const lines = [];
    let currentLine = [];
    let currentField = "";
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                currentField += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            currentLine.push(currentField.trim());
            currentField = "";
        } else if ((char === '\r' || char === '\n') && !inQuotes) {
            if (char === '\r' && nextChar === '\n') {
                i++;
            }
            currentLine.push(currentField.trim());
            if (currentLine.some(f => f.length > 0)) {
                lines.push(currentLine);
            }
            currentLine = [];
            currentField = "";
        } else {
            currentField += char;
        }
    }
    if (currentField.length > 0 || currentLine.length > 0) {
        currentLine.push(currentField.trim());
        if (currentLine.some(f => f.length > 0)) {
            lines.push(currentLine);
        }
    }
    if (lines.length < 2) return [];

    const headers = lines[0].map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ""));
    const records = [];

    const defaultBank = getSelectedBankName();
    for (let i = 1; i < lines.length; i++) {
        const row = lines[i];
        if (row.length === 0 || (row.length === 1 && !row[0])) continue;

        const obj = {};
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = row[j] !== undefined ? row[j].trim() : "";
        }

        const bank = obj.bankname || obj.bank || obj.lender || defaultBank;
        const company =
            obj.companyname ||
            obj.company ||
            obj.employername ||
            obj.employer ||
            obj.entityname ||
            obj.emprname ||
            obj.nameofthecompany ||
            obj.masteremployermasteremployername ||
            obj.firm ||
            obj.name;
        const cat =
            obj.finalcategory ||
            obj.employercatg ||
            obj.employercat ||
            obj.employercategory ||
            obj.empcat ||
            obj.companycategoryc ||
            obj.categories ||
            obj.category ||
            obj.cat ||
            obj.catg ||
            obj.tier ||
            obj.classification ||
            "";
        const rawFoir = obj.foir || obj.foirpercent || obj.foirpercentage;
        const rawCc = obj.ccobligation || obj.ccobligationpercent || obj.ccpercent;

        const sanitizeClient = s => s ? String(s).replace(/[\r\n\t]+/g, " ").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").replace(/\s+/g, " ").trim() : "";

        records.push({
            bank: sanitizeClient(bank || defaultBank) || "—",
            company: sanitizeClient(company) || "—",
            cat: sanitizeClient(cat) || "—",
            foir: rawFoir !== undefined && rawFoir !== "" ? rawFoir.replace("%", "").trim() : "70",
            cc: rawCc !== undefined && rawCc !== "" ? rawCc.replace("%", "").trim() : "5"
        });
    }

    return records;
}

function handleFile(file) {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".csv") && !file.name.toLowerCase().endsWith(".txt")) {
        setMessage(uploadDialogMessage, "Please select a valid .csv file.", "error");
        return;
    }

    fileNameDisplay.textContent = file.name;
    fileSizeDisplay.textContent = `${(file.size / 1024).toFixed(1)} KB`;

    const reader = new FileReader();
    reader.onload = event => {
        selectedFileText = String(event.target.result || "");
        parsedUploadRows = parseCsvClient(selectedFileText);

        if (parsedUploadRows.length === 0) {
            setMessage(
                uploadDialogMessage,
                "No valid data rows found in this file. Check header names.",
                "error"
            );
            confirmUploadButton.disabled = true;
            return;
        }

        const uniqueBanks = new Set(parsedUploadRows.map(r => r.bank).filter(b => b !== "—"));
        const uniqueCompanies = new Set(parsedUploadRows.map(r => r.company).filter(c => c !== "—"));

        filePreviewSummary.textContent = `✓ ${parsedUploadRows.length} mappings detected (${uniqueBanks.size} banks, ${uniqueCompanies.size} companies)`;
        filePreviewRows.replaceChildren();

        const previewLimit = Math.min(parsedUploadRows.length, 5);
        for (let i = 0; i < previewLimit; i++) {
            const rowData = parsedUploadRows[i];
            const tr = document.createElement("tr");

            const tdBank = document.createElement("td");
            tdBank.textContent = rowData.bank;
            const tdComp = document.createElement("td");
            tdComp.textContent = rowData.company;
            const tdCat = document.createElement("td");
            tdCat.textContent = rowData.cat;
            const tdFoir = document.createElement("td");
            tdFoir.textContent = `${rowData.foir}%`;
            const tdCc = document.createElement("td");
            tdCc.textContent = `${rowData.cc}%`;

            tr.append(tdBank, tdComp, tdCat, tdFoir, tdCc);
            filePreviewRows.append(tr);
        }

        filePreviewContainer.classList.remove("hidden");
        fileInfoPanel.classList.remove("hidden");
        dropZone.classList.add("hidden");
        confirmUploadButton.disabled = false;
        setMessage(uploadDialogMessage, "", "");
    };
    reader.onerror = () => {
        setMessage(uploadDialogMessage, "Failed to read the selected file.", "error");
    };
    reader.readAsText(file);
}

function downloadSampleCsv() {
    const bankName = getSelectedBankName();
    let csvContent = "";
    let filename = "loansense_mappings_sample.csv";

    if (bankName) {
        csvContent =
            "EMPLOYERID,EMPLOYERNAME,EMPLOYER_CATG\n" +
            "125799,ANKURA HOSPITALS PUNE PRIVATE LIMITED,CATGMED\n" +
            "112317,1218 INDIA PRIVATE LIMITED,CATGB\n" +
            "183034,123STORES E COMMERCE PRIVATE LIMITED,CATGB\n" +
            "29704,(NARMAC) MOTHER DAIRY HYDERABAD,CATGC\n" +
            "1695255,100X TECHNOLOGIES PRIVATE LIMITED,CATDU\n" +
            "3262554,10DECODERS CONSULTANCY SERVICES PRIVATE LIMITED,CATGC\n";
        filename = `${bankName.toLowerCase().replace(/[^a-z0-9]/g, "_")}_companies_sample.csv`;
    } else {
        csvContent =
            "Bank Name,Company,Category,FOIR,CC Obligation\n" +
            "HDFC Bank,TCS,CAT A,75,2\n" +
            "ICICI Bank,Infosys,CAT A,75,2\n" +
            "Axis Bank,Wipro,CAT B,65,2\n" +
            "SBI,Accenture,CAT A,70,2\n" +
            "Kotak Mahindra,Cognizant,CAT B,65,2\n";
    }

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

async function performCsvImport() {
    if (!selectedFileText) {
        setMessage(uploadDialogMessage, "Select a CSV file first.", "error");
        return;
    }

    confirmUploadButton.disabled = true;
    confirmUploadButton.textContent = "Importing...";
    setMessage(uploadDialogMessage, "Uploading and importing mappings into database (this may take up to a minute for large files)...", "");

    const defaultBank = getSelectedBankName();
    try {
        const response = await apiRequest(
            "/api/admin/mappings/upload",
            {
                method: "POST",
                body: JSON.stringify({
                    csvContent: selectedFileText,
                    defaultBank
                }),
                timeout: 300000 // 5 minutes for large bulk imports (40k+ rows)
            },
            currentToken()
        );

        uploadDialog.close();
        setMessage(adminMessage, response.message, "success");

        const targetBank = defaultBank || (response.summary?.banks?.[0] || "");
        await Promise.all([
            loadBanks(targetBank),
            loadCompanies(),
            loadCategories()
        ]);
        if (targetBank && (!bankSelect.value || bankSelect.value !== targetBank)) {
            bankSelect.value = targetBank;
        }
        await loadMappings();
    } catch (error) {
        if (!handleAuthorizationError(error)) {
            setMessage(uploadDialogMessage, error.message, "error");
        }
    } finally {
        confirmUploadButton.disabled = false;
        confirmUploadButton.textContent = "Import Mappings";
    }
}

// ==========================================
// EVENT LISTENERS
// ==========================================

bankSelect.addEventListener("change", () => {
    setMessage(adminMessage, "", "");
    updateUploadButtonLabel();
    addMappingButton.disabled = !bankSelect.value;
    if (mappingFilter) mappingFilter.value = "";
    void loadMappings();
});

if (mappingFilter) {
    mappingFilter.addEventListener("input", () => {
        clearTimeout(mappingFilterTimer);
        const term = mappingFilter.value.trim();
        mappingFilterTimer = setTimeout(() => {
            void loadMappings(term);
        }, 250);
    });
}

addBankButton.addEventListener("click", openBankDialog);
uploadFileButton.addEventListener("click", openUploadDialog);
addMappingButton.addEventListener("click", () => openMappingDialog());

downloadSampleButton.addEventListener("click", downloadSampleCsv);
removeFileButton.addEventListener("click", resetUploadState);
confirmUploadButton.addEventListener("click", performCsvImport);

dropZone.addEventListener("click", () => csvFileInput.click());
csvFileInput.addEventListener("change", event => {
    if (event.target.files && event.target.files[0]) {
        handleFile(event.target.files[0]);
    }
});

dropZone.addEventListener("dragover", event => {
    event.preventDefault();
    dropZone.classList.add("dragover");
});
dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragover");
});
dropZone.addEventListener("drop", event => {
    event.preventDefault();
    dropZone.classList.remove("dragover");
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
        handleFile(event.dataTransfer.files[0]);
    }
});

closeUploadDialogButton.addEventListener("click", () => uploadDialog.close());
cancelUploadDialogButton.addEventListener("click", () => uploadDialog.close());
uploadDialog.addEventListener("click", event => {
    if (event.target === uploadDialog) uploadDialog.close();
});

mappingRows.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const row = button.closest("tr");
    const mapping = {
        id: button.dataset.id,
        company_name: row.cells[0].textContent,
        cat: row.cells[1].textContent === "—" ? "" : row.cells[1].textContent,
        foir: Number(row.cells[2].textContent.replace("%", "")),
        cc_obligation_percent: Number(row.cells[3].textContent.replace("%", ""))
    };

    if (button.dataset.action === "edit") {
        openMappingDialog(mapping);
    } else if (button.dataset.action === "delete") {
        void deleteMapping(mapping);
    }
});

loginForm.addEventListener("submit", event => {
    event.preventDefault();
    const token = adminTokenInput.value.trim();
    if (!token) {
        setMessage(loginMessage, "Enter the admin API token.", "error");
        return;
    }
    void verifyToken(token);
});

logoutButton.addEventListener("click", () => {
    sessionStorage.removeItem(TOKEN_KEY);
    adminTokenInput.value = "";
    banks = [];
    companies = [];
    renderBanks();
    renderMappings([]);
    showManagement(false);
    setMessage(adminMessage, "", "");
    setMessage(loginMessage, "You have signed out.", "success");
});

mappingForm.addEventListener("submit", saveMapping);
bankForm.addEventListener("submit", saveBank);

document.getElementById("closeDialogButton").addEventListener("click", () => {
    mappingDialog.close();
});
document.getElementById("cancelDialogButton").addEventListener("click", () => {
    mappingDialog.close();
});
mappingDialog.addEventListener("click", event => {
    if (event.target === mappingDialog) mappingDialog.close();
});

if (categoryInput) {
    categoryInput.addEventListener("input", updateMappingBreHint);
    categoryInput.addEventListener("change", updateMappingBreHint);
}

document.getElementById("closeBankDialogButton").addEventListener("click", () => {
    bankDialog.close();
});
document.getElementById("cancelBankDialogButton").addEventListener("click", () => {
    bankDialog.close();
});
bankDialog.addEventListener("click", event => {
    if (event.target === bankDialog) bankDialog.close();
});

modifyBankButton.addEventListener("click", openModifyBankDialog);
modifyBankForm.addEventListener("submit", saveModifyBank);
deleteBankButton.addEventListener("click", deleteCurrentBank);

closeModifyBankDialogButton.addEventListener("click", () => modifyBankDialog.close());
cancelModifyBankDialogButton.addEventListener("click", () => modifyBankDialog.close());
modifyBankDialog.addEventListener("click", event => {
    if (event.target === modifyBankDialog) modifyBankDialog.close();
});

// ------------------------------------------------------------
// POLICY MATRIX MANAGEMENT (Category & Salary -> FOIR %)
// ------------------------------------------------------------
async function loadMatrixRules(filterTerm = "") {
    try {
        const queryParams = new URLSearchParams();
        if (filterTerm.trim()) {
            queryParams.set("category", filterTerm.trim());
        }
        const records = await apiRequest(
            `/api/admin/matrix?${queryParams.toString()}`,
            {},
            currentToken()
        );
        if (!Array.isArray(records)) {
            throw new Error("Invalid policy matrix response.");
        }
        currentMatrixRules = records;
        renderMatrixRules(records, Boolean(filterTerm.trim()));
    } catch (error) {
        if (handleAuthorizationError(error)) return;
        setMessage(adminMessage, error.message, "error");
        matrixRows.replaceChildren();
        matrixCount.textContent = "";
        matrixEmpty.textContent = "Failed to load policy matrix rules.";
        matrixEmpty.classList.remove("hidden");
    }
}

function renderMatrixRules(rules, isFiltered = false) {
    matrixRows.replaceChildren();
    const count = rules.length;
    matrixCount.textContent = isFiltered
        ? `Found ${count} matching rules`
        : `${count} policy matrix rules in database`;
    matrixEmpty.textContent = count ? "" : (isFiltered ? "No matching matrix rules found." : "No policy matrix rules found in the database.");
    matrixEmpty.classList.toggle("hidden", count > 0);

    const fragment = document.createDocumentFragment();
    for (const rule of rules) {
        const row = document.createElement("tr");

        const categoryCell = document.createElement("td");
        categoryCell.style.fontWeight = "700";
        categoryCell.textContent = rule.category;

        const slabCell = document.createElement("td");
        const slabBadge = document.createElement("span");
        slabBadge.className = "matrix-badge-slab";
        slabBadge.textContent = rule.salary_slab || `${Math.round(rule.min_salary / 1000)}K – ${Math.round(rule.max_salary / 1000)}K`;
        slabCell.append(slabBadge);

        const minSalCell = document.createElement("td");
        minSalCell.textContent = `₹${Number(rule.min_salary).toLocaleString()}`;

        const maxSalCell = document.createElement("td");
        maxSalCell.textContent = Number(rule.max_salary) >= 99999999 ? "No limit (>)" : `₹${Number(rule.max_salary).toLocaleString()}`;

        const foirCell = document.createElement("td");
        const foirBadge = document.createElement("span");
        foirBadge.className = "matrix-badge-foir";
        foirBadge.textContent = `${Number(rule.foir_percent)}%`;
        foirCell.append(foirBadge);

        const multCell = document.createElement("td");
        multCell.textContent = rule.multiplier ? `${rule.multiplier}x` : "—";

        const tenureCell = document.createElement("td");
        tenureCell.textContent = `${rule.tenure_months || 60} mo`;

        const bankCell = document.createElement("td");
        bankCell.textContent = rule.bank_name || "STANDARD";

        const actionsCell = document.createElement("td");
        const editBtn = makeActionButton("Edit", "edit-matrix", rule.id);
        const delBtn = makeActionButton("Delete", "delete-matrix", rule.id, true);
        actionsCell.append(editBtn, delBtn);

        row.append(
            categoryCell,
            slabCell,
            minSalCell,
            maxSalCell,
            foirCell,
            multCell,
            tenureCell,
            bankCell,
            actionsCell
        );
        fragment.append(row);
    }
    matrixRows.append(fragment);
}

function openAddMatrixRuleDialog() {
    activeMatrixRuleId = null;
    matrixRuleForm.reset();
    matrixRuleDialogTitle.textContent = "Add Policy Matrix Rule";
    saveMatrixRuleButton.textContent = "Add Rule";
    ruleBankInput.value = "STANDARD";
    ruleTenureInput.value = "60";
    ruleMultiplierInput.value = "20";
    setMessage(matrixRuleDialogMessage, "", "");
    matrixRuleDialog.showModal();
    ruleCategoryInput.focus();
}

function openEditMatrixRuleDialog(rule) {
    activeMatrixRuleId = rule.id;
    matrixRuleDialogTitle.textContent = `Edit Rule #${rule.id} (${rule.category})`;
    saveMatrixRuleButton.textContent = "Save Changes";
    ruleCategoryInput.value = rule.category;
    ruleMinSalaryInput.value = rule.min_salary;
    ruleMaxSalaryInput.value = rule.max_salary;
    ruleFoirInput.value = rule.foir_percent;
    ruleMultiplierInput.value = rule.multiplier;
    ruleTenureInput.value = rule.tenure_months || 60;
    ruleBankInput.value = rule.bank_name || "STANDARD";
    setMessage(matrixRuleDialogMessage, "", "");
    matrixRuleDialog.showModal();
    ruleFoirInput.focus();
}

async function saveMatrixRule(event) {
    event.preventDefault();
    if (!matrixRuleForm.reportValidity()) return;

    const payload = {
        category: ruleCategoryInput.value.trim().toUpperCase(),
        min_salary: Number(ruleMinSalaryInput.value),
        max_salary: Number(ruleMaxSalaryInput.value),
        foir_percent: Number(ruleFoirInput.value),
        multiplier: Number(ruleMultiplierInput.value || 0),
        tenure_months: Number(ruleTenureInput.value || 60),
        bank_name: ruleBankInput.value.trim() || "STANDARD"
    };

    saveMatrixRuleButton.disabled = true;
    saveMatrixRuleButton.textContent = "Saving...";
    setMessage(matrixRuleDialogMessage, "Saving rule in PostgreSQL...", "");

    try {
        if (activeMatrixRuleId) {
            await apiRequest(
                `/api/admin/matrix/${activeMatrixRuleId}`,
                {
                    method: "PUT",
                    body: JSON.stringify(payload)
                },
                currentToken()
            );
            setMessage(adminMessage, `Policy matrix rule #${activeMatrixRuleId} updated successfully.`, "success");
        } else {
            await apiRequest(
                "/api/admin/matrix",
                {
                    method: "POST",
                    body: JSON.stringify(payload)
                },
                currentToken()
            );
            setMessage(adminMessage, `New policy matrix rule for ${payload.category} added successfully.`, "success");
        }
        matrixRuleDialog.close();
        await loadMatrixRules();
    } catch (error) {
        if (handleAuthorizationError(error)) return;
        setMessage(matrixRuleDialogMessage, error.message, "error");
    } finally {
        saveMatrixRuleButton.disabled = false;
        saveMatrixRuleButton.textContent = activeMatrixRuleId ? "Save Changes" : "Add Rule";
    }
}

async function deleteMatrixRule(ruleId) {
    const target = currentMatrixRules.find(r => r.id === ruleId);
    const label = target ? `${target.category} (₹${target.min_salary} - ₹${target.max_salary})` : `#${ruleId}`;
    if (!window.confirm(`Are you sure you want to delete policy rule ${label}?`)) return;

    try {
        await apiRequest(
            `/api/admin/matrix/${ruleId}`,
            { method: "DELETE" },
            currentToken()
        );
        setMessage(adminMessage, `Policy rule ${label} deleted successfully.`, "success");
        await loadMatrixRules();
    } catch (error) {
        if (handleAuthorizationError(error)) return;
        setMessage(adminMessage, error.message, "error");
    }
}

function downloadMatrixSampleCsv() {
    const sampleCsv = `Category,Min Salary,Max Salary,FOIR %,Multiplier,Tenure,Bank
CAT A,0,25000,40,15,60,STANDARD
CAT A,25000,50000,55,20,60,STANDARD
CAT A,50000,75000,65,23,60,STANDARD
CAT A,75000,99999999,70,24,60,STANDARD
CAT B,25000,50000,55,15,60,STANDARD
CAT B,50000,75000,65,20,60,STANDARD
CAT B,75000,99999999,70,22,60,STANDARD
CAT C,0,35000,40,10,60,STANDARD
CAT C,35000,50000,50,13,60,STANDARD
CAT C,50000,75000,65,20,60,STANDARD
CAT C,75000,99999999,70,21,60,STANDARD
CAT D,35000,50000,50,12,60,STANDARD
CAT D,50000,75000,60,14,60,STANDARD
CAT D,75000,99999999,65,15,60,STANDARD
CAT GA,50000,75000,65,20,60,STANDARD
CAT GA,75000,99999999,70,20,60,STANDARD
DEFAULT,0,25000,40,10,60,STANDARD
DEFAULT,25000,50000,55,15,60,STANDARD
DEFAULT,50000,75000,65,20,60,STANDARD
DEFAULT,75000,99999999,70,22,60,STANDARD`;

    const blob = new Blob([sampleCsv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "policy_matrix_sample.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function openMatrixUploadDialog() {
    selectedMatrixFileText = "";
    matrixCsvFileInput.value = "";
    matrixFileInfoPanel.classList.add("hidden");
    matrixDropZone.classList.remove("hidden");
    confirmMatrixUploadButton.disabled = true;
    setMessage(matrixUploadDialogMessage, "", "");
    matrixUploadDialog.showModal();
}

function handleMatrixFile(file) {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".csv") && file.type !== "text/csv") {
        setMessage(matrixUploadDialogMessage, "Please select a valid .csv file.", "error");
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        selectedMatrixFileText = e.target.result;
        matrixFileNameDisplay.textContent = file.name;
        matrixFileSizeDisplay.textContent = `${(file.size / 1024).toFixed(1)} KB`;
        matrixFileInfoPanel.classList.remove("hidden");
        matrixDropZone.classList.add("hidden");
        confirmMatrixUploadButton.disabled = false;
        matrixFileSummary.textContent = `File ready for import. Click "Import Matrix Rules" below.`;
        setMessage(matrixUploadDialogMessage, "", "");
    };
    reader.onerror = () => {
        setMessage(matrixUploadDialogMessage, "Failed to read the file.", "error");
    };
    reader.readAsText(file);
}

async function confirmMatrixUpload() {
    if (!selectedMatrixFileText.trim()) return;

    confirmMatrixUploadButton.disabled = true;
    confirmMatrixUploadButton.textContent = "Importing...";
    setMessage(matrixUploadDialogMessage, "Uploading matrix rules to database...", "");

    try {
        const response = await apiRequest(
            "/api/admin/matrix/upload",
            {
                method: "POST",
                body: JSON.stringify({ csvContent: selectedMatrixFileText }),
                timeout: 300000
            },
            currentToken()
        );
        matrixUploadDialog.close();
        setMessage(adminMessage, response.message || "Matrix rules imported successfully.", "success");
        await loadMatrixRules();
    } catch (error) {
        if (handleAuthorizationError(error)) return;
        setMessage(matrixUploadDialogMessage, error.message, "error");
    } finally {
        confirmMatrixUploadButton.disabled = false;
        confirmMatrixUploadButton.textContent = "Import Matrix Rules";
    }
}

// Tab clicks
if (tabMatrixBtn) tabMatrixBtn.addEventListener("click", () => switchTab("matrix"));
if (tabBanksBtn) tabBanksBtn.addEventListener("click", () => switchTab("banks"));

// Policy Matrix toolbar and actions
if (addMatrixRuleButton) addMatrixRuleButton.addEventListener("click", openAddMatrixRuleDialog);
if (uploadMatrixButton) uploadMatrixButton.addEventListener("click", openMatrixUploadDialog);
if (downloadMatrixSampleButton) downloadMatrixSampleButton.addEventListener("click", downloadMatrixSampleCsv);

if (matrixRuleForm) matrixRuleForm.addEventListener("submit", saveMatrixRule);
if (closeMatrixRuleDialogButton) closeMatrixRuleDialogButton.addEventListener("click", () => matrixRuleDialog.close());
if (cancelMatrixRuleDialogButton) cancelMatrixRuleDialogButton.addEventListener("click", () => matrixRuleDialog.close());
if (matrixRuleDialog) {
    matrixRuleDialog.addEventListener("click", event => {
        if (event.target === matrixRuleDialog) matrixRuleDialog.close();
    });
}

if (matrixRows) {
    matrixRows.addEventListener("click", event => {
        const button = event.target.closest("button");
        if (!button) return;
        const ruleId = Number(button.dataset.id);
        if (button.dataset.action === "edit-matrix") {
            const rule = currentMatrixRules.find(r => r.id === ruleId);
            if (rule) openEditMatrixRuleDialog(rule);
        } else if (button.dataset.action === "delete-matrix") {
            void deleteMatrixRule(ruleId);
        }
    });
}

if (matrixFilter) {
    matrixFilter.addEventListener("input", () => {
        clearTimeout(matrixFilterTimer);
        matrixFilterTimer = setTimeout(() => {
            const term = matrixFilter.value.trim().toLowerCase();
            if (!term) {
                renderMatrixRules(currentMatrixRules, false);
            } else {
                const filtered = currentMatrixRules.filter(r =>
                    r.category.toLowerCase().includes(term) ||
                    (r.bank_name && r.bank_name.toLowerCase().includes(term))
                );
                renderMatrixRules(filtered, true);
            }
        }, 200);
    });
}

// Matrix upload dialog events
if (closeMatrixUploadDialogButton) closeMatrixUploadDialogButton.addEventListener("click", () => matrixUploadDialog.close());
if (cancelMatrixUploadDialogButton) cancelMatrixUploadDialogButton.addEventListener("click", () => matrixUploadDialog.close());
if (matrixUploadDialog) {
    matrixUploadDialog.addEventListener("click", event => {
        if (event.target === matrixUploadDialog) matrixUploadDialog.close();
    });
}
if (matrixDropZone) {
    matrixDropZone.addEventListener("click", () => matrixCsvFileInput.click());
    matrixDropZone.addEventListener("dragover", e => { e.preventDefault(); matrixDropZone.classList.add("drag-over"); });
    matrixDropZone.addEventListener("dragleave", () => matrixDropZone.classList.remove("drag-over"));
    matrixDropZone.addEventListener("drop", e => {
        e.preventDefault();
        matrixDropZone.classList.remove("drag-over");
        if (e.dataTransfer.files.length) handleMatrixFile(e.dataTransfer.files[0]);
    });
}
if (matrixCsvFileInput) {
    matrixCsvFileInput.addEventListener("change", e => {
        if (e.target.files.length) handleMatrixFile(e.target.files[0]);
    });
}
if (removeMatrixFileButton) {
    removeMatrixFileButton.addEventListener("click", () => {
        selectedMatrixFileText = "";
        matrixCsvFileInput.value = "";
        matrixFileInfoPanel.classList.add("hidden");
        matrixDropZone.classList.remove("hidden");
        confirmMatrixUploadButton.disabled = true;
    });
}
if (confirmMatrixUploadButton) confirmMatrixUploadButton.addEventListener("click", confirmMatrixUpload);

// Disable mouse wheel value changes on number inputs
document.addEventListener("wheel", (e) => {
    if (e.target && e.target.tagName === "INPUT" && e.target.type === "number") {
        e.preventDefault();
    }
}, { passive: false });

// ------------------------------------------------------------
// BRE (BUSINESS RULES ENGINE) DYNAMIC LOGIC & APIS
// ------------------------------------------------------------
function updateBreToolbar() {
    const hasBank = Boolean(breBankSelect && breBankSelect.value);
    if (breAddRuleButton) {
        breAddRuleButton.disabled = !hasBank;
        breAddRuleButton.title = hasBank
            ? `+ Add New Rule for ${breBankSelect.value}`
            : "Select a partner bank first to add a rule.";
    }
    if (breEditBankButton) {
        breEditBankButton.disabled = !hasBank;
        breEditBankButton.title = hasBank
            ? `✏️ Edit ${breBankSelect.value} name and settings`
            : "Select a partner bank first to edit";
    }
}

function renderBreBanks(selectedBankName = "") {
    if (!breBankSelect) return;
    const previousVal = selectedBankName || breBankSelect.value;
    breBankSelect.replaceChildren();

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = banks.length
        ? "Select a partner bank"
        : "No banks available in database";
    breBankSelect.append(placeholder);

    for (const bank of banks) {
        const option = document.createElement("option");
        option.value = bank.name;
        option.textContent = bank.name;
        breBankSelect.append(option);
    }

    if (previousVal && banks.some(b => b.name === previousVal)) {
        breBankSelect.value = previousVal;
    } else if (banks.length > 0 && !breBankSelect.value) {
        breBankSelect.value = banks[0].name;
    }

    updateBreToolbar();
    if (breBankSelect.value) {
        void loadBreRules(breBankSelect.value);
    } else {
        renderBreRules([]);
    }
}

async function initBreTab() {
    if (!banks || banks.length === 0) {
        try {
            await loadBanks();
        } catch (err) {
            setMessage(breNotice, "Failed to load partner banks dynamically.", "error");
        }
    }
    renderBreBanks();
}

async function loadBreRules(bankName) {
    if (!bankName) {
        currentBreRules = [];
        renderBreRules([]);
        return;
    }

    if (breEmpty) {
        breEmpty.textContent = `Loading rules for ${bankName} from database...`;
        breEmpty.classList.remove("hidden");
    }
    if (breRuleRows) breRuleRows.replaceChildren();

    try {
        const records = await apiRequest(
            `/api/admin/bre/rules?bank=${encodeURIComponent(bankName)}`,
            {},
            currentToken()
        );
        if (!Array.isArray(records)) {
            throw new Error("Invalid response received from BRE rules API.");
        }
        currentBreRules = records;
        renderBreRules(records);
    } catch (error) {
        if (handleAuthorizationError(error)) return;
        setMessage(breNotice, error.message, "error");
        currentBreRules = [];
        renderBreRules([]);
    }
}

function formatSalaryRange(minSalary, maxSalary, conditionType) {
    const min = Number(minSalary) || 0;
    const max = Number(maxSalary) || 99999999;
    if (conditionType === "less_than" || (min === 0 && max < 99999999)) {
        return `< ₹${max.toLocaleString()}`;
    }
    if (conditionType === "greater_than" || max >= 99999999) {
        return `> ₹${min.toLocaleString()}`;
    }
    return `₹${min.toLocaleString()} – ₹${max.toLocaleString()}`;
}

function renderBreRules(rules) {
    if (!breRuleRows) return;
    breRuleRows.replaceChildren();

    const selectedBank = breBankSelect ? breBankSelect.value : "";
    const isIcici = selectedBank.toLowerCase().includes("icici");
    const breCategoryTh = document.getElementById("breCategoryTh");
    if (breCategoryTh) {
        breCategoryTh.style.display = isIcici ? "none" : "";
    }

    const count = rules.length;
    if (breRuleCount) {
        breRuleCount.textContent = count === 1 ? "1 rule configured" : `${count} rules configured`;
    }

    if (!selectedBank) {
        if (breEmpty) {
            breEmpty.textContent = "Select a partner bank to view and configure its business rules.";
            breEmpty.classList.remove("hidden");
        }
        return;
    }

    if (count === 0) {
        if (breEmpty) {
            breEmpty.textContent = `No rules configured for ${selectedBank}. Click "+ Add New Rule" to create one.`;
            breEmpty.classList.remove("hidden");
        }
        return;
    }

    if (breEmpty) breEmpty.classList.add("hidden");

    const fragment = document.createDocumentFragment();
    for (const rule of rules) {
        const row = document.createElement("tr");

        // 1. Rule ID / Name
        const idCell = document.createElement("td");
        const nameSpan = document.createElement("span");
        nameSpan.className = "bre-rule-name";
        nameSpan.textContent = rule.rule_name || `Rule #${rule.id}`;
        idCell.append(nameSpan);

        // 2. Category
        const catCell = document.createElement("td");
        if (isIcici) {
            catCell.style.display = "none";
        } else {
            const catBadge = document.createElement("span");
            catBadge.className = "matrix-badge-slab";
            catBadge.style.fontWeight = "700";
            catBadge.textContent = rule.category || "CAT A";
            catCell.append(catBadge);
        }

        // 3. Salary Range (Min - Max)
        const rangeCell = document.createElement("td");
        const rangeBadge = document.createElement("span");
        rangeBadge.className = "bre-range-badge";
        rangeBadge.textContent = formatSalaryRange(rule.min_salary, rule.max_salary, rule.condition_type);
        rangeCell.append(rangeBadge);

        // 4. Applicable FOIR (%)
        const foirCell = document.createElement("td");
        const foirBadge = document.createElement("span");
        foirBadge.className = "bre-foir-badge";
        foirBadge.textContent = `${Number(rule.foir_percent)}%`;
        foirCell.append(foirBadge);

        // 5. Status (Toggle Switch)
        const statusCell = document.createElement("td");
        statusCell.style.textAlign = "center";
        const statusWrap = document.createElement("div");
        statusWrap.className = "bre-status-wrap";

        const switchLabel = document.createElement("label");
        switchLabel.className = "bre-switch";
        switchLabel.title = `Click to toggle rule ${rule.active ? "Inactive" : "Active"}`;

        const switchInput = document.createElement("input");
        switchInput.type = "checkbox";
        switchInput.checked = Boolean(rule.active);
        switchInput.dataset.id = String(rule.id);

        const sliderSpan = document.createElement("span");
        sliderSpan.className = "bre-slider";
        switchLabel.append(switchInput, sliderSpan);

        const statusText = document.createElement("span");
        statusText.className = `bre-status-text ${rule.active ? "active" : "inactive"}`;
        statusText.textContent = rule.active ? "Active" : "Inactive";

        switchInput.addEventListener("change", () => {
            void toggleBreRuleStatus(rule.id, switchInput.checked, switchInput, statusText);
        });

        statusWrap.append(switchLabel, statusText);
        statusCell.append(statusWrap);

        // 6. Actions (Edit & Delete buttons)
        const actionsCell = document.createElement("td");
        actionsCell.style.textAlign = "right";

        const editBtn = makeActionButton("Edit", "edit-bre-rule", rule.id);
        const delBtn = makeActionButton("Delete", "delete-bre-rule", rule.id, true);

        actionsCell.append(editBtn, delBtn);

        row.append(idCell, catCell, rangeCell, foirCell, statusCell, actionsCell);
        fragment.append(row);
    }

    breRuleRows.append(fragment);
}

async function toggleBreRuleStatus(ruleId, newActive, switchInput, statusText) {
    switchInput.disabled = true;
    setMessage(breNotice, "", "");
    try {
        const response = await apiRequest(
            `/api/admin/bre/rules/${ruleId}/status`,
            {
                method: "PATCH",
                body: JSON.stringify({ active: newActive })
            },
            currentToken()
        );
        const rule = currentBreRules.find(r => r.id === ruleId);
        if (rule) rule.active = newActive;
        statusText.textContent = newActive ? "Active" : "Inactive";
        statusText.className = `bre-status-text ${newActive ? "active" : "inactive"}`;
        setMessage(breNotice, response.message || `Rule updated.`, "success");
    } catch (error) {
        if (handleAuthorizationError(error)) return;
        // Revert switch on error
        switchInput.checked = !newActive;
        statusText.textContent = !newActive ? "Active" : "Inactive";
        statusText.className = `bre-status-text ${!newActive ? "active" : "inactive"}`;
        setMessage(breNotice, error.message, "error");
    } finally {
        switchInput.disabled = false;
    }
}

function setBreConditionMode(mode) {
    breConditionMode = mode;
    if (breModeRangeBtn) breModeRangeBtn.classList.toggle("active", mode === "range");
    if (breModeSingleBtn) breModeSingleBtn.classList.toggle("active", mode === "single");
    if (breRangeInputsPanel) breRangeInputsPanel.classList.toggle("hidden", mode !== "range");
    if (breSingleInputsPanel) breSingleInputsPanel.classList.toggle("hidden", mode !== "single");
}

function openAddBreRuleDialog() {
    const selectedBank = breBankSelect ? breBankSelect.value : "";
    if (!selectedBank) {
        setMessage(breNotice, "Please select a partner bank first.", "error");
        return;
    }
    const isIcici = selectedBank.toLowerCase().includes("icici");

    editingBreRuleId = null;
    breRuleForm.reset();
    breRuleDialogTitle.textContent = "Add New BRE Rule";
    saveBreRuleButton.textContent = "Save Rule";
    if (breModalBankName) breModalBankName.textContent = selectedBank;

    // Suggest sequential rule name
    const count = currentBreRules.length;
    breRuleNameInput.value = `Rule ${count + 1}`;
    if (breCategoryInput) {
        breCategoryInput.value = isIcici ? "ALL" : "CAT A";
        if (breCategoryInput.parentElement) {
            breCategoryInput.parentElement.style.display = isIcici ? "none" : "";
        }
        if (breRuleNameInput && breRuleNameInput.parentElement && breRuleNameInput.parentElement.parentElement) {
            breRuleNameInput.parentElement.parentElement.style.gridTemplateColumns = isIcici ? "1fr" : "1fr 1fr";
        }
    }
    setBreConditionMode("range");
    breMinSalaryInput.value = "";
    breMaxSalaryInput.value = "";
    breFoirInput.value = "";

    setMessage(breRuleDialogMessage, "", "");
    breRuleDialog.showModal();
    breRuleNameInput.focus();
}

function openEditBreRuleDialog(rule) {
    editingBreRuleId = rule.id;
    breRuleForm.reset();
    breRuleDialogTitle.textContent = `Edit Rule: ${rule.rule_name}`;
    saveBreRuleButton.textContent = "Save Changes";
    if (breModalBankName) breModalBankName.textContent = rule.bank_name;

    const isIcici = (rule.bank_name || (breBankSelect ? breBankSelect.value : "")).toLowerCase().includes("icici");
    breRuleNameInput.value = rule.rule_name;
    if (breCategoryInput) {
        breCategoryInput.value = isIcici ? "ALL" : (rule.category || "CAT A");
        if (breCategoryInput.parentElement) {
            breCategoryInput.parentElement.style.display = isIcici ? "none" : "";
        }
        if (breRuleNameInput && breRuleNameInput.parentElement && breRuleNameInput.parentElement.parentElement) {
            breRuleNameInput.parentElement.parentElement.style.gridTemplateColumns = isIcici ? "1fr" : "1fr 1fr";
        }
    }
    breFoirInput.value = rule.foir_percent;

    if (rule.condition_type === "less_than") {
        setBreConditionMode("single");
        breOperatorSelect.value = "less_than";
        breThresholdSalaryInput.value = rule.max_salary;
    } else if (rule.condition_type === "greater_than" || Number(rule.max_salary) >= 99999999) {
        setBreConditionMode("single");
        breOperatorSelect.value = "greater_than";
        breThresholdSalaryInput.value = rule.min_salary;
    } else {
        setBreConditionMode("range");
        breMinSalaryInput.value = rule.min_salary;
        breMaxSalaryInput.value = rule.max_salary;
    }

    setMessage(breRuleDialogMessage, "", "");
    breRuleDialog.showModal();
    breFoirInput.focus();
}

function checkClientRuleOverlap(category, minSal, maxSal, excludeId, ruleName = "") {
    if (!Array.isArray(currentBreRules)) return null;
    const catNorm = String(category || "CAT A").trim().toUpperCase();
    const isHl = /home\s*lo[ane]/i.test(ruleName || "");
    return currentBreRules.find(r => {
        if (!r.active) return false;
        if (excludeId && Number(r.id) === Number(excludeId)) return false;
        const rCat = String(r.category || "CAT A").trim().toUpperCase();
        if (rCat !== catNorm && rCat !== "ALL" && catNorm !== "ALL") return false;
        if (ruleName) {
            const rIsHl = /home\s*lo[ane]/i.test(r.rule_name || "");
            if (isHl !== rIsHl) return false;
        }
        const rMin = Number(r.min_salary) || 0;
        const rMax = Number(r.max_salary) || 99999999;
        return (minSal < rMax) && (maxSal > rMin);
    }) || null;
}

async function saveBreRule(event) {
    event.preventDefault();
    const selectedBank = breBankSelect ? breBankSelect.value : "";
    if (!selectedBank) {
        setMessage(breRuleDialogMessage, "Partner bank is required.", "error");
        return;
    }

    const ruleName = breRuleNameInput.value.trim();
    if (!ruleName) {
        setMessage(breRuleDialogMessage, "Rule Name / ID is required.", "error");
        breRuleNameInput.focus();
        return;
    }

    const category = breCategoryInput ? (breCategoryInput.value.trim().toUpperCase() || "CAT A") : "CAT A";

    let conditionType = "range";
    let minSal = 0;
    let maxSal = 99999999;

    if (breConditionMode === "single") {
        const op = breOperatorSelect.value;
        const threshold = Number(breThresholdSalaryInput.value);
        if (!Number.isFinite(threshold) || threshold <= 0) {
            setMessage(breRuleDialogMessage, "Please enter a valid threshold salary greater than 0.", "error");
            breThresholdSalaryInput.focus();
            return;
        }
        if (op === "less_than") {
            conditionType = "less_than";
            minSal = 0;
            maxSal = threshold;
        } else {
            conditionType = "greater_than";
            minSal = threshold;
            maxSal = 99999999;
        }
    } else {
        minSal = Number(breMinSalaryInput.value);
        maxSal = Number(breMaxSalaryInput.value);
        if (!Number.isFinite(minSal) || minSal < 0) {
            setMessage(breRuleDialogMessage, "Min salary must be 0 or positive.", "error");
            breMinSalaryInput.focus();
            return;
        }
        if (!Number.isFinite(maxSal) || maxSal <= minSal) {
            setMessage(breRuleDialogMessage, "Max salary must be greater than Min salary.", "error");
            breMaxSalaryInput.focus();
            return;
        }
    }

    const foirVal = Number(breFoirInput.value);
    if (!Number.isFinite(foirVal) || foirVal < 0 || foirVal > 100) {
        setMessage(breRuleDialogMessage, "Applicable FOIR (%) must be between 0 and 100.", "error");
        breFoirInput.focus();
        return;
    }

    // Client-side non-overlapping validation check scoped to category
    const collision = checkClientRuleOverlap(category, minSal, maxSal, editingBreRuleId, ruleName);
    if (collision) {
        const collRange = formatSalaryRange(collision.min_salary, collision.max_salary, collision.condition_type);
        setMessage(
            breRuleDialogMessage,
            `Salary range overlaps with active ${collision.rule_name} in ${collision.category || category} (${collRange}). Please adjust salary bounds.`,
            "error"
        );
        return;
    }

    saveBreRuleButton.disabled = true;
    saveBreRuleButton.textContent = "Saving...";
    setMessage(breRuleDialogMessage, "Saving rule in PostgreSQL...", "");

    const payload = {
        bank_name: selectedBank,
        category: category,
        rule_name: ruleName,
        condition_type: conditionType,
        min_salary: minSal,
        max_salary: maxSal,
        foir_percent: foirVal
    };

    try {
        if (editingBreRuleId) {
            const res = await apiRequest(
                `/api/admin/bre/rules/${editingBreRuleId}`,
                {
                    method: "PUT",
                    body: JSON.stringify(payload)
                },
                currentToken()
            );
            setMessage(breNotice, res.message || `Rule updated.`, "success");
        } else {
            const res = await apiRequest(
                "/api/admin/bre/rules",
                {
                    method: "POST",
                    body: JSON.stringify(payload)
                },
                currentToken()
            );
            setMessage(breNotice, res.message || `Rule added.`, "success");
        }
        breRuleDialog.close();
        await loadBreRules(selectedBank);
    } catch (error) {
        if (handleAuthorizationError(error)) return;
        setMessage(breRuleDialogMessage, error.message, "error");
    } finally {
        saveBreRuleButton.disabled = false;
        saveBreRuleButton.textContent = editingBreRuleId ? "Save Changes" : "Save Rule";
    }
}

function openBreDeleteDialog(rule) {
    deletingBreRuleId = rule.id;
    const rangeText = formatSalaryRange(rule.min_salary, rule.max_salary, rule.condition_type);
    if (breDeleteText) {
        breDeleteText.textContent = `Are you sure you want to permanently delete "${rule.rule_name}" [${rule.category || "CAT A"}] (${rangeText}, FOIR: ${rule.foir_percent}%) for ${rule.bank_name}?`;
    }
    setMessage(breDeleteDialogMessage, "", "");
    breDeleteDialog.showModal();
}

async function confirmBreDelete() {
    if (!deletingBreRuleId) return;
    const selectedBank = breBankSelect ? breBankSelect.value : "";

    confirmBreDeleteButton.disabled = true;
    confirmBreDeleteButton.textContent = "Deleting...";

    try {
        const res = await apiRequest(
            `/api/admin/bre/rules/${deletingBreRuleId}`,
            { method: "DELETE" },
            currentToken()
        );
        breDeleteDialog.close();
        setMessage(breNotice, res.message || "Rule deleted.", "success");
        await loadBreRules(selectedBank);
    } catch (error) {
        if (handleAuthorizationError(error)) return;
        setMessage(breDeleteDialogMessage, error.message, "error");
    } finally {
        confirmBreDeleteButton.disabled = false;
        confirmBreDeleteButton.textContent = "Delete Rule";
    }
}

function openBreUploadDialog() {
    selectedBreFileText = "";
    selectedBreFileName = "";
    if (breCsvFileInput) breCsvFileInput.value = "";
    if (breFileInfoPanel) breFileInfoPanel.classList.add("hidden");
    if (breDropZone) breDropZone.classList.remove("hidden");
    const previewContainer = document.getElementById("brePreviewContainer");
    if (previewContainer) previewContainer.classList.add("hidden");
    const previewRows = document.getElementById("brePreviewRows");
    if (previewRows) previewRows.replaceChildren();

    const bankName = breBankSelect ? breBankSelect.value : "";
    const bankContext = document.getElementById("breUploadBankContext");
    if (bankContext) {
        bankContext.textContent = bankName
            ? `Target Partner Bank: ${bankName}`
            : "Target Bank: Auto-detected from CSV column";
    }

    if (breTargetBankOverrideRow && breTargetBankName && breOverrideBankCheckbox) {
        if (bankName) {
            breTargetBankOverrideRow.style.display = "flex";
            breTargetBankName.textContent = bankName;
            breOverrideBankCheckbox.checked = true;
        } else {
            breTargetBankOverrideRow.style.display = "none";
            breOverrideBankCheckbox.checked = false;
        }
    }

    if (confirmBreUploadButton) {
        confirmBreUploadButton.disabled = true;
        confirmBreUploadButton.textContent = "Import BRE Rules";
    }
    setMessage(breUploadDialogMessage, "", "");
    if (breUploadDialog) breUploadDialog.showModal();
}

function parseBreClientCsv(text) {
    if (!text || typeof text !== "string") return [];
    let delimiter = ",";
    const firstLineEnd = text.search(/[\r\n]/);
    const firstLine = firstLineEnd !== -1 ? text.substring(0, firstLineEnd) : text;
    if (!firstLine.includes(",") && firstLine.includes(";")) {
        delimiter = ";";
    } else if (!firstLine.includes(",") && firstLine.includes("\t")) {
        delimiter = "\t";
    }

    const lines = [];
    let currentLine = [];
    let currentField = "";
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];
        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                currentField += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === delimiter && !inQuotes) {
            currentLine.push(currentField.trim());
            currentField = "";
        } else if ((char === '\r' || char === '\n') && !inQuotes) {
            if (char === '\r' && nextChar === '\n') i++;
            currentLine.push(currentField.trim());
            if (currentLine.some(f => f.length > 0)) lines.push(currentLine);
            currentLine = [];
            currentField = "";
        } else {
            currentField += char;
        }
    }
    if (currentField.length > 0 || currentLine.length > 0) {
        currentLine.push(currentField.trim());
        if (currentLine.some(f => f.length > 0)) lines.push(currentLine);
    }
    if (lines.length < 2) return [];

    let headerLineIndex = 0;
    let titleBank = "";

    if (lines.length >= 2) {
        const line0NonEmpty = lines[0].filter(c => c && c.trim().length > 0);
        const line0Joined = lines[0].join(" ").toLowerCase();
        const hasHeaderKeywords0 = /foir|salary|min|max|income|condition|rule|category|percent/i.test(line0Joined);
        const hasHeaderKeywords1 = lines[1].some(c => /foir|salary|min|max|income|condition|rule|category|percent/i.test(c));

        if (!hasHeaderKeywords0 && (hasHeaderKeywords1 || line0NonEmpty.length === 1)) {
            headerLineIndex = 1;
            if (line0NonEmpty.length > 0) {
                titleBank = line0NonEmpty[0].trim();
            }
        }
    }

    const rawHeaders = lines[headerLineIndex];
    const headers = rawHeaders.map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ""));

    // Check for 2D Matrix Format (Salary Slab in rows, Categories in columns, FOIR in cells)
    const hasFoirHeader = headers.some(h => /^foir|^applicablefoir|^foirpercent/i.test(h));
    const salaryColIndex = headers.findIndex(h => /income|salary|slab|range/i.test(h));

    if (!hasFoirHeader && salaryColIndex !== -1 && rawHeaders.length > 1) {
        const matrixRecords = [];
        for (let i = headerLineIndex + 1; i < lines.length; i++) {
            const row = lines[i];
            if (row.length === 0 || (row.length === 1 && !row[0])) continue;
            const salaryRange = row[salaryColIndex] || "";

            for (let j = 0; j < rawHeaders.length; j++) {
                if (j === salaryColIndex) continue;
                const cellVal = row[j] ? row[j].trim() : "";
                if (!cellVal || /not\s*eligible/i.test(cellVal)) continue;

                // Extract FOIR percentage
                const rangeMatch = cellVal.match(/(\d+(?:\.\d+)?)\s*(?:%|pct)?\s*(?:to|-|–|—)\s*(\d+(?:\.\d+)?)\s*%/i);
                let foir = "";
                if (rangeMatch) {
                    foir = rangeMatch[2];
                } else {
                    const singleMatch = cellVal.match(/(\d+(?:\.\d+)?)\s*%/);
                    if (singleMatch) foir = singleMatch[1];
                }
                if (!foir) continue;

                // Normalize category name
                const rawCat = rawHeaders[j];
                let cat = rawCat.replace(/companies|company/gi, "").trim();
                if (/super\s*a.*cat\s*a/i.test(rawCat)) {
                    cat = "CAT A";
                } else if (/cat\s*b/i.test(rawCat)) {
                    cat = "CAT B";
                } else if (/cat\s*c/i.test(rawCat)) {
                    cat = "CAT C";
                } else if (/non[ -]*listed/i.test(rawCat)) {
                    cat = "NON-LISTED";
                }

                matrixRecords.push({
                    bank: titleBank,
                    category: cat,
                    salaryrange: salaryRange,
                    condition: salaryRange,
                    foir: `${foir}%`,
                    rulename: `Rule ${salaryRange} (${cat})`
                });

                if (/super\s*a.*cat\s*a/i.test(rawCat)) {
                    matrixRecords.push({
                        bank: titleBank,
                        category: "Super A",
                        salaryrange: salaryRange,
                        condition: salaryRange,
                        foir: `${foir}%`,
                        rulename: `Rule ${salaryRange} (Super A)`
                    });
                }
            }
        }
        if (matrixRecords.length > 0) {
            return matrixRecords;
        }
    }

    const records = [];
    for (let i = headerLineIndex + 1; i < lines.length; i++) {
        const row = lines[i];
        if (row.length === 0 || (row.length === 1 && !row[0])) continue;
        const rec = {};
        for (let j = 0; j < headers.length; j++) {
            rec[headers[j]] = row[j] !== undefined ? row[j].trim() : "";
        }
        if (titleBank && !rec.bank && !rec.bankname && !rec.lender) {
            rec.bank = titleBank;
        }
        records.push(rec);
    }
    return records;
}

function renderBrePreview(parsedRows, fileName) {
    const previewContainer = document.getElementById("brePreviewContainer");
    const previewRows = document.getElementById("brePreviewRows");
    if (!previewRows) return;
    previewRows.replaceChildren();

    const defaultBank = breBankSelect ? breBankSelect.value : "";
    const shouldOverride = Boolean(defaultBank && (!breOverrideBankCheckbox || breOverrideBankCheckbox.checked));
    let validCount = 0;

    for (let i = 0; i < parsedRows.length; i++) {
        const r = parsedRows[i];
        const rawBank = shouldOverride ? defaultBank : (r.bank || r.bankname || r.lender || defaultBank || "—");
        const isIcici = rawBank.toLowerCase().includes("icici");
        const rawCat = r.category || r.cat || (isIcici ? "ALL" : "CAT A");

        let rangeDisplay = r.condition || r.conditiontext || r.salaryrange || r.salaryslab || r.slab || r.salary || r.monthlyincome || r.netmonthlyincome || r.income || "";
        if (!rangeDisplay && (r.minsalary !== undefined || r.min !== undefined)) {
            const min = r.minsalary || r.min || "0";
            const max = r.maxsalary || r.max || "No limit";
            rangeDisplay = `₹${min} – ₹${max}`;
        }

        const rawFoir = r.foir || r.foirpercent || r.applicablefoir || r.foirpercentage || r.percentage || "";
        let ruleName = r.ruleno || r.rulename || r.rule || r.name || `Rule ${i + 1}`;
        if (/^\d+$/.test(ruleName)) {
            ruleName = `Rule ${ruleName}`;
        }

        if (rangeDisplay || rawFoir) {
            validCount++;
        }

        if (i < 20) {
            const tr = document.createElement("tr");
            const bTd = document.createElement("td");
            bTd.textContent = rawBank;
            if (shouldOverride) {
                bTd.style.fontWeight = "600";
                bTd.style.color = "#2563eb";
            }
            const cTd = document.createElement("td");
            cTd.textContent = isIcici ? "ALL (Unified)" : rawCat;
            const rTd = document.createElement("td");
            rTd.textContent = ruleName;
            const sTd = document.createElement("td");
            sTd.textContent = rangeDisplay || "—";
            const fTd = document.createElement("td");
            fTd.textContent = rawFoir ? (String(rawFoir).includes("%") ? rawFoir : `${rawFoir}%`) : "—";
            tr.append(bTd, cTd, rTd, sTd, fTd);
            previewRows.append(tr);
        }
    }

    if (previewContainer) {
        previewContainer.classList.remove("hidden");
    }

    if (validCount > 0) {
        if (confirmBreUploadButton) confirmBreUploadButton.disabled = false;
        if (breFileSummary) {
            const targetDesc = shouldOverride ? ` for ${defaultBank}` : "";
            breFileSummary.textContent = `✓ ${validCount} rule${validCount === 1 ? '' : 's'} detected in ${fileName || 'CSV'}. Ready for import${targetDesc}.`;
        }
        setMessage(breUploadDialogMessage, "", "");
    } else {
        if (confirmBreUploadButton) confirmBreUploadButton.disabled = true;
        if (breFileSummary) {
            breFileSummary.textContent = `No rules detected in ${fileName || 'CSV'}.`;
        }
        setMessage(breUploadDialogMessage, "Could not detect Salary and FOIR columns in this CSV file. Please check file headers.", "error");
    }
}

function handleBreFile(file) {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".csv") && file.type !== "text/csv") {
        setMessage(breUploadDialogMessage, "Please select a valid .csv file.", "error");
        return;
    }
    selectedBreFileName = file.name;
    const reader = new FileReader();
    reader.onload = (e) => {
        selectedBreFileText = e.target.result;
        if (breFileNameDisplay) breFileNameDisplay.textContent = file.name;
        if (breFileSizeDisplay) breFileSizeDisplay.textContent = `${(file.size / 1024).toFixed(1)} KB`;
        if (breFileInfoPanel) breFileInfoPanel.classList.remove("hidden");
        if (breDropZone) breDropZone.classList.add("hidden");

        const parsedRows = parseBreClientCsv(selectedBreFileText);
        renderBrePreview(parsedRows, file.name);
    };
    reader.onerror = () => {
        setMessage(breUploadDialogMessage, "Failed to read the file.", "error");
    };
    reader.readAsText(file);
}

async function confirmBreUpload() {
    if (!selectedBreFileText.trim()) return;

    confirmBreUploadButton.disabled = true;
    confirmBreUploadButton.textContent = "Importing...";
    setMessage(breUploadDialogMessage, "Uploading rules to PostgreSQL...", "");

    const currentBank = breBankSelect ? breBankSelect.value : "";
    const shouldOverride = Boolean(currentBank && (!breOverrideBankCheckbox || breOverrideBankCheckbox.checked));

    try {
        const response = await apiRequest(
            "/api/admin/bre/rules/upload",
            {
                method: "POST",
                body: JSON.stringify({
                    csvContent: selectedBreFileText,
                    defaultBank: currentBank,
                    overrideBank: shouldOverride
                }),
                timeout: 300000
            },
            currentToken()
        );
        breUploadDialog.close();
        setMessage(breNotice, response.message || "BRE rules imported successfully.", "success");
        await loadBanks(currentBank);
        const activeBank = breBankSelect ? breBankSelect.value : currentBank;
        if (activeBank) {
            await loadBreRules(activeBank);
        }
    } catch (error) {
        if (handleAuthorizationError(error)) return;
        setMessage(breUploadDialogMessage, error.message, "error");
    } finally {
        confirmBreUploadButton.disabled = false;
        confirmBreUploadButton.textContent = "Import BRE Rules";
    }
}

function downloadBreSampleCsv() {
    const sampleCsv = `Bank,Category,Rule Name,Condition Type,Min Salary,Max Salary,FOIR %,Active
HDFC Bank,CAT A,Rule 1,range,0,50000,50,1
HDFC Bank,CAT A,Rule 2,range,50001,100000,60,1
HDFC Bank,CAT A,Rule 3,greater_than,100001,99999999,70,1
HDFC Bank,CAT B,Rule 1,range,0,50000,45,1
HDFC Bank,CAT B,Rule 2,greater_than,50001,99999999,55,1
ICICI Bank,CAT A,Rule 1,range,0,40000,45,1
ICICI Bank,CAT A,Rule 2,range,40001,80000,55,1
ICICI Bank,CAT A,Rule 3,greater_than,80001,99999999,65,1
SBI,CAT A,Rule 1,range,0,50000,50,1
SBI,CAT A,Rule 2,range,50001,150000,65,1
SBI,CAT A,Rule 3,greater_than,150001,99999999,75,1
Axis Bank,CAT A,Rule 1,range,0,60000,50,1
Axis Bank,CAT A,Rule 2,greater_than,60001,99999999,65,1
Kotak Mahindra,CAT A,Rule 1,range,0,50000,50,1
Kotak Mahindra,CAT A,Rule 2,greater_than,50001,99999999,60,1`;

    const blob = new Blob([sampleCsv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bre_rules_sample.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ------------------------------------------------------------
// BRE EVENT LISTENERS
// ------------------------------------------------------------
if (tabBreBtn) tabBreBtn.addEventListener("click", () => switchTab("bre"));

if (breBankSelect) {
    breBankSelect.addEventListener("change", () => {
        updateBreToolbar();
        void loadBreRules(breBankSelect.value);
    });
}

if (breAddBankButton) breAddBankButton.addEventListener("click", openBankDialog);
if (breEditBankButton) breEditBankButton.addEventListener("click", openModifyBankDialog);
if (breAddRuleButton) breAddRuleButton.addEventListener("click", openAddBreRuleDialog);
if (breUploadRulesButton) breUploadRulesButton.addEventListener("click", openBreUploadDialog);
if (breSampleCsvButton) breSampleCsvButton.addEventListener("click", downloadBreSampleCsv);

if (breRuleRows) {
    breRuleRows.addEventListener("click", event => {
        const button = event.target.closest("button");
        if (!button) return;
        const ruleId = Number(button.dataset.id);
        if (button.dataset.action === "edit-bre-rule") {
            const rule = currentBreRules.find(r => r.id === ruleId);
            if (rule) openEditBreRuleDialog(rule);
        } else if (button.dataset.action === "delete-bre-rule") {
            const rule = currentBreRules.find(r => r.id === ruleId);
            if (rule) openBreDeleteDialog(rule);
        }
    });
}

if (breModeRangeBtn) breModeRangeBtn.addEventListener("click", () => setBreConditionMode("range"));
if (breModeSingleBtn) breModeSingleBtn.addEventListener("click", () => setBreConditionMode("single"));

if (breRuleForm) breRuleForm.addEventListener("submit", saveBreRule);
if (closeBreRuleDialogButton) closeBreRuleDialogButton.addEventListener("click", () => breRuleDialog.close());
if (cancelBreRuleDialogButton) cancelBreRuleDialogButton.addEventListener("click", () => breRuleDialog.close());
if (breRuleDialog) {
    breRuleDialog.addEventListener("click", event => {
        if (event.target === breRuleDialog) breRuleDialog.close();
    });
}

if (confirmBreDeleteButton) confirmBreDeleteButton.addEventListener("click", confirmBreDelete);
if (closeBreDeleteDialogButton) closeBreDeleteDialogButton.addEventListener("click", () => breDeleteDialog.close());
if (cancelBreDeleteDialogButton) cancelBreDeleteDialogButton.addEventListener("click", () => breDeleteDialog.close());
if (breDeleteDialog) {
    breDeleteDialog.addEventListener("click", event => {
        if (event.target === breDeleteDialog) breDeleteDialog.close();
    });
}

// BRE Upload Dialog Events
if (closeBreUploadDialogButton) closeBreUploadDialogButton.addEventListener("click", () => breUploadDialog.close());
if (cancelBreUploadDialogButton) cancelBreUploadDialogButton.addEventListener("click", () => breUploadDialog.close());
if (breUploadDialog) {
    breUploadDialog.addEventListener("click", event => {
        if (event.target === breUploadDialog) breUploadDialog.close();
    });
}
if (breOverrideBankCheckbox) {
    breOverrideBankCheckbox.addEventListener("change", () => {
        if (selectedBreFileText) {
            const parsedRows = parseBreClientCsv(selectedBreFileText);
            renderBrePreview(parsedRows, selectedBreFileName);
        }
    });
}
if (breDropZone) {
    breDropZone.addEventListener("click", () => breCsvFileInput.click());
    breDropZone.addEventListener("dragover", e => { e.preventDefault(); breDropZone.classList.add("drag-over"); });
    breDropZone.addEventListener("dragleave", () => breDropZone.classList.remove("drag-over"));
    breDropZone.addEventListener("drop", e => {
        e.preventDefault();
        breDropZone.classList.remove("drag-over");
        if (e.dataTransfer.files.length) handleBreFile(e.dataTransfer.files[0]);
    });
}
if (breCsvFileInput) {
    breCsvFileInput.addEventListener("change", e => {
        if (e.target.files.length) handleBreFile(e.target.files[0]);
    });
}
if (removeBreFileButton) {
    removeBreFileButton.addEventListener("click", () => {
        selectedBreFileText = "";
        breCsvFileInput.value = "";
        breFileInfoPanel.classList.add("hidden");
        breDropZone.classList.remove("hidden");
        confirmBreUploadButton.disabled = true;
    });
}
if (confirmBreUploadButton) confirmBreUploadButton.addEventListener("click", confirmBreUpload);

// ============================================================
// SERVICEABLE PINCODES & LOCATIONS TAB LOGIC
// ============================================================

async function initPincodesTab() {
    currentPincodePage = 1;
    await Promise.all([
        loadPincodeStats(),
        loadPincodes(1)
    ]);
}

async function loadPincodeStats() {
    try {
        const data = await apiRequest("/api/pincode/stats", {}, currentToken());
        if (data && data.success) {
            const total = data.total || 0;
            const apStat = (data.stats || []).find(s => s.state && s.state.toLowerCase().includes("andhra"));
            const tsStat = (data.stats || []).filter(s => s.state && s.state.toLowerCase().includes("telangana")).reduce((acc, curr) => acc + parseInt(curr.count || 0, 10), 0);
            
            if (pincodesTotalCount) {
                pincodesTotalCount.textContent = `📍 Total: ${total.toLocaleString("en-IN")} Pincodes | AP: ${apStat ? parseInt(apStat.count, 10).toLocaleString("en-IN") : 0} | TS: ${tsStat.toLocaleString("en-IN")}`;
            }
        }
    } catch (_err) {
        if (pincodesTotalCount) pincodesTotalCount.textContent = "📍 Serviceable Pincodes Master";
    }
}

async function loadPincodes(page = 1) {
    if (!pincodeRows) return;
    currentPincodePage = page;
    if (pincodesEmpty) pincodesEmpty.classList.add("hidden");
    pincodeRows.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:24px; color:#64748b;">Loading serviceable pincodes...</td></tr>`;

    const search = pincodeSearchInput ? pincodeSearchInput.value.trim() : "";
    const state = pincodeStateSelect ? pincodeStateSelect.value : "all";
    const tier = pincodeTierSelect ? pincodeTierSelect.value : "all";
    const serviceable = pincodeServiceableSelect ? pincodeServiceableSelect.value : "all";

    const params = new URLSearchParams({
        page: String(page),
        limit: "50"
    });
    if (search) params.set("search", search);
    if (state && state !== "all") params.set("state", state);
    if (tier && tier !== "all") params.set("tier", tier);
    if (serviceable && serviceable !== "all") params.set("serviceable", serviceable);

    try {
        const data = await apiRequest(`/api/admin/pincodes?${params.toString()}`, {}, currentToken());
        if (!data || !data.success) {
            throw new Error(data?.message || "Failed to load pincodes.");
        }

        totalPincodePages = data.totalPages || 1;
        if (pincodesPageInfo) pincodesPageInfo.textContent = `Page ${data.page} of ${totalPincodePages} (${data.total.toLocaleString("en-IN")} total)`;
        if (pincodesPrevBtn) pincodesPrevBtn.disabled = data.page <= 1;
        if (pincodesNextBtn) pincodesNextBtn.disabled = data.page >= totalPincodePages;

        if (data.availableStates && data.availableStates.length > 0) {
            currentAvailableStates = data.availableStates;
            if (pincodeStateSelect) {
                const currentSelected = pincodeStateSelect.value;
                pincodeStateSelect.innerHTML = `<option value="all">All States / Regions</option>`;
                data.availableStates.forEach(st => {
                    const opt = document.createElement("option");
                    opt.value = st;
                    opt.textContent = st;
                    pincodeStateSelect.appendChild(opt);
                });
                if (currentSelected && data.availableStates.includes(currentSelected)) {
                    pincodeStateSelect.value = currentSelected;
                } else if (state !== "all" && data.availableStates.includes(state)) {
                    pincodeStateSelect.value = state;
                }
                if (pincodeEditStateButton) {
                    pincodeEditStateButton.disabled = !pincodeStateSelect.value || pincodeStateSelect.value === "all";
                }
            }
        }

        renderPincodesTable(data.items || []);
    } catch (err) {
        if (!handleAuthorizationError(err)) {
            setMessage(pincodesNotice, err.message, "error");
            pincodeRows.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#e11d48; padding:20px;">${escapeHtml(err.message)}</td></tr>`;
        }
    }
}

function renderPincodesTable(items) {
    pincodeRows.innerHTML = "";
    if (!items || items.length === 0) {
        if (pincodesEmpty) pincodesEmpty.classList.remove("hidden");
        return;
    }
    if (pincodesEmpty) pincodesEmpty.classList.add("hidden");

    items.forEach(item => {
        const tr = document.createElement("tr");
        tr.dataset.id = item.id;

        const isServ = item.serviceable_finnable === 1;
        const tierClass = item.tier === "TIER 1" ? "tier-1" : "tier-2";
        const locationName = item.location || item.city || "—";
        const regionName = item.region || item.city || "—";

        let banksBadgeHtml = "";
        if (Array.isArray(item.serviceable_banks) && item.serviceable_banks.length > 0) {
            banksBadgeHtml = item.serviceable_banks.map(b => `<span class="badge-bank-pill">${escapeHtml(b)}</span>`).join("");
        } else if (isServ) {
            banksBadgeHtml = `<span class="badge-bank-pill">FINNABLE</span>`;
        } else {
            banksBadgeHtml = `<span style="color:#94a3b8; font-size:11px;">None</span>`;
        }

        tr.innerHTML = `
            <td><strong style="font-family:monospace; font-size:13px; color:#0f172a;">${escapeHtml(item.pincode)}</strong></td>
            <td><span style="font-weight:600; color:#1e293b;">${escapeHtml(locationName)}</span></td>
            <td><span style="color:#475569;">${escapeHtml(regionName)}</span></td>
            <td><span style="color:#475569;">${escapeHtml(item.state)}</span></td>
            <td style="text-align:center;">
                <span class="badge-tier-pill ${tierClass}">
                    ${escapeHtml(item.tier)}
                </span>
            </td>
            <td>
                <div style="display:flex; flex-wrap:wrap; gap:3px;">${banksBadgeHtml}</div>
            </td>
            <td style="text-align:right; white-space:nowrap;">
                <button type="button" class="row-action" data-action="edit-pin" data-id="${item.id}" style="font-size:11px; margin-right:4px;">
                    Edit
                </button>
                <button type="button" class="row-action" data-action="toggle" data-id="${item.id}" style="font-size:11px;">
                    ${isServ ? 'Deactivate' : 'Activate'}
                </button>
            </td>
        `;

        tr.querySelectorAll('[data-action="edit-pin"]').forEach(btn => {
            btn.addEventListener("click", () => openEditPincodeDialog(item));
        });
        tr.querySelectorAll('[data-action="toggle"]').forEach(btn => {
            btn.addEventListener("click", () => togglePincodeServiceability(item.id));
        });

        pincodeRows.appendChild(tr);
    });
}

async function togglePincodeServiceability(id) {
    try {
        const res = await apiRequest(`/api/admin/pincodes/${id}/toggle`, { method: "PATCH" }, currentToken());
        if (res && res.success) {
            setMessage(pincodesNotice, res.message, "success");
            setTimeout(() => setMessage(pincodesNotice, "", ""), 4000);
            await loadPincodes(currentPincodePage);
        }
    } catch (err) {
        if (!handleAuthorizationError(err)) {
            setMessage(pincodesNotice, err.message, "error");
        }
    }
}

// ------------------------------------------------------------
// PINCODES CSV TEMPLATE DOWNLOADS
// ------------------------------------------------------------
function downloadSamplePincodesCsv() {
    const csvContent = 
`pincode,location,region,state
500001,Abids,Hyderabad,Telangana
521101,Gannavaram,Krishna,Andhra Pradesh
520001,Governorpet,Vijayawada,Andhra Pradesh
530001,Dwaraka Nagar,Visakhapatnam,Andhra Pradesh
534001,Main Road,Eluru,Andhra Pradesh
517501,Chandragiri,Tirupati,Andhra Pradesh
560001,MG Road,Bangalore,Karnataka
600001,George Town,Chennai,Tamil Nadu
400001,Fort,Mumbai,Maharashtra
110001,Connaught Place,New Delhi,Delhi-NCR
411001,Shivajinagar,Pune,Maharashtra
380001,Lal Darwaja,Ahmedabad,Gujarat
700001,BBD Bagh,Kolkata,West Bengal`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "master_pincodes_template.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function downloadSampleBankPincodesCsv() {
    const csvContent = 
`pincode,serviceable
500001,1
521101,1
560001,1
600001,1
400001,1
110001,1
411001,1
380001,1
700001,1`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bank_serviceability_template.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// ------------------------------------------------------------
// MASTER PINCODES CSV UPLOAD HANDLERS
// ------------------------------------------------------------
const TIER_1_CITIES_CLIENT = [
    "mumbai", "chennai", "delhi", "delhi-ncr", "delhi ncr", "new delhi",
    "gurgaon", "gurugram", "noida", "ghaziabad", "faridabad",
    "bangalore", "bengaluru", "hyderabad", "secunderabad", "pune", "ahmedabad", "kolkata"
];

function getClientTier(location, region) {
    const loc = String(location || "").toLowerCase().trim();
    const reg = String(region || "").toLowerCase().trim();
    if (loc && loc !== "unknown") {
        const isT1 = TIER_1_CITIES_CLIENT.some(t => loc === t || loc.includes(t) || t.includes(loc));
        return isT1 ? "TIER 1" : "TIER 2";
    }
    if (reg && reg !== "unknown") {
        const isT1 = TIER_1_CITIES_CLIENT.some(t => reg === t || reg.includes(t) || t.includes(reg));
        return isT1 ? "TIER 1" : "TIER 2";
    }
    return "TIER 2";
}

function handlePincodeMasterFile(file) {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".csv")) {
        setMessage(pincodeMasterUploadDialogMessage, "Please select a valid .csv file.", "error");
        return;
    }

    pincodeMasterFileNameDisplay.textContent = file.name;
    pincodeMasterFileSizeDisplay.textContent = `${(file.size / 1024).toFixed(1)} KB`;
    pincodeMasterDropZone.classList.add("hidden");
    pincodeMasterFileInfoPanel.classList.remove("hidden");
    setMessage(pincodeMasterUploadDialogMessage, "", "");

    const reader = new FileReader();
    reader.onload = (e) => {
        selectedPincodeMasterFileText = e.target.result || "";
        previewPincodeMasterCsv(selectedPincodeMasterFileText);
    };
    reader.onerror = () => {
        setMessage(pincodeMasterUploadDialogMessage, "Failed to read the file.", "error");
    };
    reader.readAsText(file);
}

function previewPincodeMasterCsv(text) {
    const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
    if (lines.length <= 1) {
        setMessage(pincodeMasterUploadDialogMessage, "CSV file has no data rows.", "error");
        confirmPincodeMasterUploadButton.disabled = true;
        return;
    }

    const header = lines[0].split(",").map(h => h.trim().toLowerCase().replace(/['"]/g, ""));
    const pinIdx = header.findIndex(h => h.includes("pin"));
    const locIdx = header.findIndex(h => h.includes("div") || h.includes("loc") || h.includes("town") || h.includes("area") || h.includes("mandal") || h.includes("city") || h.includes("office"));
    const regIdx = header.findIndex(h => h.includes("reg") || h.includes("dist"));
    const stateIdx = header.findIndex(h => h.includes("state") || h.includes("circle"));

    const previewCount = Math.min(lines.length - 1, 6);
    pincodeMasterPreviewRows.innerHTML = "";

    for (let i = 1; i <= previewCount; i++) {
        const parts = lines[i].split(",").map(p => p.trim().replace(/^["']|["']$/g, ""));
        const pin = pinIdx >= 0 ? parts[pinIdx] : parts[0];
        let location = (locIdx >= 0 ? parts[locIdx] : (parts[1] || "Unknown")).replace(/\s+Division$/i, "");
        let region = (regIdx >= 0 ? parts[regIdx] : (parts[2] || location)).replace(/\s+Region$/i, "");
        const chosenState = (pincodeMasterTargetStateSelect && pincodeMasterTargetStateSelect.value !== "auto") ? pincodeMasterTargetStateSelect.value : "";
        let state = (stateIdx >= 0 ? parts[stateIdx] : (parts[3] || chosenState || "Telangana")).replace(/\s+Circle$/i, "");
        if (!state && chosenState) state = chosenState;
        const autoTier = getClientTier(location, region);

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${escapeHtml(pin)}</strong></td>
            <td>${escapeHtml(location)}</td>
            <td>${escapeHtml(region)}</td>
            <td>${escapeHtml(state)}</td>
            <td><span class="badge-tier-pill ${autoTier === 'TIER 1' ? 'tier-1' : 'tier-2'}">${escapeHtml(autoTier)}</span></td>
        `;
        pincodeMasterPreviewRows.appendChild(tr);
    }

    pincodeMasterFileSummary.textContent = `Found ${lines.length - 1} records. Tier 1 cities automatically classified (Tier 2 default):`;
    pincodeMasterPreviewContainer.classList.remove("hidden");
    confirmPincodeMasterUploadButton.disabled = false;
}

async function confirmPincodeMasterUpload() {
    if (!selectedPincodeMasterFileText) return;
    confirmPincodeMasterUploadButton.disabled = true;
    confirmPincodeMasterUploadButton.textContent = "Importing...";
    setMessage(pincodeMasterUploadDialogMessage, "Processing master pincodes & assigning tiers...", "");

    const defaultState = (pincodeMasterTargetStateSelect && pincodeMasterTargetStateSelect.value !== "auto")
        ? pincodeMasterTargetStateSelect.value
        : "";

    try {
        const res = await apiRequest("/api/admin/pincodes/upload-master", {
            method: "POST",
            body: JSON.stringify({
                csvContent: selectedPincodeMasterFileText,
                defaultState
            })
        }, currentToken());

        if (res && res.success) {
            setMessage(pincodesNotice, `✓ ${res.message}`, "success");
            setTimeout(() => setMessage(pincodesNotice, "", ""), 5000);
            pincodeMasterUploadDialog.close();
            resetPincodeMasterUploadDialog();
            await Promise.all([
                loadPincodeStats(),
                loadPincodes(1)
            ]);
        } else {
            throw new Error(res?.message || "Import failed.");
        }
    } catch (err) {
        if (!handleAuthorizationError(err)) {
            setMessage(pincodeMasterUploadDialogMessage, err.message, "error");
        }
    } finally {
        confirmPincodeMasterUploadButton.disabled = false;
        confirmPincodeMasterUploadButton.textContent = "Import Master Pincodes";
    }
}

function resetPincodeMasterUploadDialog() {
    selectedPincodeMasterFileText = "";
    if (pincodeMasterCsvFileInput) pincodeMasterCsvFileInput.value = "";
    if (pincodeMasterDropZone) pincodeMasterDropZone.classList.remove("hidden", "drag-over");
    if (pincodeMasterFileInfoPanel) pincodeMasterFileInfoPanel.classList.add("hidden");
    if (pincodeMasterPreviewContainer) pincodeMasterPreviewContainer.classList.add("hidden");
    if (pincodeMasterTargetStateSelect) pincodeMasterTargetStateSelect.value = "auto";
    if (pincodeMasterNewStateRow) pincodeMasterNewStateRow.classList.add("hidden");
    if (pincodeMasterNewStateInput) pincodeMasterNewStateInput.value = "";
    if (pincodeMasterEditStateRow) pincodeMasterEditStateRow.classList.add("hidden");
    if (pincodeMasterEditStateInput) pincodeMasterEditStateInput.value = "";
    if (pincodeMasterUploadDialogMessage) setMessage(pincodeMasterUploadDialogMessage, "", "");
    if (confirmPincodeMasterUploadButton) confirmPincodeMasterUploadButton.disabled = true;
    updateMasterStateButtons();
}

function updateMasterStateButtons() {
    const currentState = pincodeMasterTargetStateSelect ? pincodeMasterTargetStateSelect.value : "auto";
    const isStateSelected = Boolean(currentState && currentState !== "auto" && currentState !== "all");

    if (pincodeMasterEditStateButton) {
        pincodeMasterEditStateButton.disabled = !isStateSelected;
        pincodeMasterEditStateButton.title = isStateSelected ? `Edit "${currentState}"` : "Select a state first to edit";
    }
    if (pincodeMasterDeleteStateButton) {
        pincodeMasterDeleteStateButton.disabled = !isStateSelected;
        pincodeMasterDeleteStateButton.title = isStateSelected ? `Delete all PIN codes for "${currentState}"` : "Select a state first to delete";
    }
    if (!isStateSelected && pincodeMasterEditStateRow) {
        pincodeMasterEditStateRow.classList.add("hidden");
    }
}

function renderMasterStateOptions(selectedState = "") {
    if (!pincodeMasterTargetStateSelect) return;

    const currentVal = selectedState || pincodeMasterTargetStateSelect.value || "auto";

    const stateSet = new Set();
    stateSet.add("Telangana");
    stateSet.add("Andhra Pradesh");

    if (Array.isArray(currentAvailableStates)) {
        currentAvailableStates.forEach(st => {
            if (st && st !== "all") stateSet.add(st);
        });
    }

    if (pincodeStateSelect && pincodeStateSelect.options) {
        for (let i = 0; i < pincodeStateSelect.options.length; i++) {
            const val = pincodeStateSelect.options[i].value;
            if (val && val !== "all") stateSet.add(val);
        }
    }

    if (selectedState && selectedState !== "auto") {
        stateSet.add(selectedState.trim());
    }

    const sorted = Array.from(stateSet).sort((a, b) => a.localeCompare(b));

    pincodeMasterTargetStateSelect.innerHTML = `<option value="auto">Auto-detect from CSV (Default)</option>`;
    for (const st of sorted) {
        const opt = document.createElement("option");
        opt.value = st;
        opt.textContent = st;
        if (currentVal && currentVal.toLowerCase() === st.toLowerCase()) {
            opt.selected = true;
        }
        pincodeMasterTargetStateSelect.appendChild(opt);
    }
    updateMasterStateButtons();
}

function savePincodeMasterNewState() {
    if (!pincodeMasterNewStateInput) return;
    const rawName = pincodeMasterNewStateInput.value.trim();
    if (!rawName) {
        setMessage(pincodeMasterUploadDialogMessage, "Please enter a state name.", "error");
        pincodeMasterNewStateInput.focus();
        return;
    }

    const stateName = rawName;

    if (!currentAvailableStates.some(s => s.toLowerCase() === stateName.toLowerCase())) {
        currentAvailableStates.push(stateName);
    }

    renderMasterStateOptions(stateName);
    if (pincodeMasterTargetStateSelect) pincodeMasterTargetStateSelect.value = stateName;

    if (pincodeStateSelect) {
        let exists = false;
        for (let i = 0; i < pincodeStateSelect.options.length; i++) {
            if (pincodeStateSelect.options[i].value.toLowerCase() === stateName.toLowerCase()) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            const opt = document.createElement("option");
            opt.value = stateName;
            opt.textContent = stateName;
            pincodeStateSelect.appendChild(opt);
        }
    }

    if (pincodeMasterNewStateRow) pincodeMasterNewStateRow.classList.add("hidden");
    pincodeMasterNewStateInput.value = "";

    if (selectedPincodeMasterFileText) {
        previewPincodeMasterCsv(selectedPincodeMasterFileText);
    }

    updateMasterStateButtons();
    setMessage(pincodeMasterUploadDialogMessage, `✓ State "${stateName}" selected for import.`, "success");
}

function openMasterEditStateRow() {
    const currentState = pincodeMasterTargetStateSelect ? pincodeMasterTargetStateSelect.value : "";
    if (!currentState || currentState === "auto") {
        setMessage(pincodeMasterUploadDialogMessage, "Please select a specific state to edit.", "error");
        return;
    }

    if (pincodeMasterNewStateRow) pincodeMasterNewStateRow.classList.add("hidden");

    if (pincodeMasterEditStateRow) {
        pincodeMasterEditStateRow.classList.toggle("hidden");
        if (!pincodeMasterEditStateRow.classList.contains("hidden")) {
            if (pincodeMasterEditStateInput) {
                pincodeMasterEditStateInput.value = currentState;
                pincodeMasterEditStateInput.focus();
                pincodeMasterEditStateInput.select();
            }
        }
    }
}

async function saveMasterEditState() {
    const currentState = pincodeMasterTargetStateSelect ? pincodeMasterTargetStateSelect.value : "";
    if (!currentState || currentState === "auto") return;

    const newStateName = pincodeMasterEditStateInput ? pincodeMasterEditStateInput.value.trim() : "";
    if (!newStateName) {
        setMessage(pincodeMasterUploadDialogMessage, "Please enter a valid state name.", "error");
        if (pincodeMasterEditStateInput) pincodeMasterEditStateInput.focus();
        return;
    }

    if (newStateName.toLowerCase() === currentState.toLowerCase()) {
        if (pincodeMasterEditStateRow) pincodeMasterEditStateRow.classList.add("hidden");
        return;
    }

    if (pincodeMasterUpdateStateButton) {
        pincodeMasterUpdateStateButton.disabled = true;
        pincodeMasterUpdateStateButton.textContent = "Updating...";
    }
    setMessage(pincodeMasterUploadDialogMessage, `Renaming "${currentState}" to "${newStateName}" across database...`, "");

    try {
        const res = await apiRequest(`/api/admin/pincodes/states/${encodeURIComponent(currentState)}`, {
            method: "PUT",
            body: JSON.stringify({ newStateName })
        }, currentToken());

        if (res && res.success) {
            currentAvailableStates = currentAvailableStates.map(s => s.toLowerCase() === currentState.toLowerCase() ? newStateName : s);
            if (!currentAvailableStates.some(s => s.toLowerCase() === newStateName.toLowerCase())) {
                currentAvailableStates.push(newStateName);
            }

            renderMasterStateOptions(newStateName);
            if (pincodeMasterTargetStateSelect) pincodeMasterTargetStateSelect.value = newStateName;

            if (pincodeStateSelect) {
                for (let i = 0; i < pincodeStateSelect.options.length; i++) {
                    if (pincodeStateSelect.options[i].value.toLowerCase() === currentState.toLowerCase()) {
                        pincodeStateSelect.options[i].value = newStateName;
                        pincodeStateSelect.options[i].textContent = newStateName;
                    }
                }
            }

            if (pincodeMasterEditStateRow) pincodeMasterEditStateRow.classList.add("hidden");
            if (pincodeMasterEditStateInput) pincodeMasterEditStateInput.value = "";

            if (selectedPincodeMasterFileText) {
                previewPincodeMasterCsv(selectedPincodeMasterFileText);
            }

            updateMasterStateButtons();
            setMessage(pincodeMasterUploadDialogMessage, `✓ ${res.message || `State renamed to "${newStateName}".`}`, "success");

            await Promise.all([
                loadPincodeStats(),
                loadPincodes(currentPincodePage || 1)
            ]);
        } else {
            throw new Error(res?.message || "Failed to update state.");
        }
    } catch (err) {
        if (!handleAuthorizationError(err)) {
            setMessage(pincodeMasterUploadDialogMessage, err.message, "error");
        }
    } finally {
        if (pincodeMasterUpdateStateButton) {
            pincodeMasterUpdateStateButton.disabled = false;
            pincodeMasterUpdateStateButton.textContent = "Update Name";
        }
    }
}

async function deleteMasterState() {
    const currentState = pincodeMasterTargetStateSelect ? pincodeMasterTargetStateSelect.value : "";
    if (!currentState || currentState === "auto") {
        setMessage(pincodeMasterUploadDialogMessage, "Please select a specific state to delete.", "error");
        return;
    }

    const confirmed = confirm(`Are you sure you want to permanently delete ALL master PIN codes and serviceability for state "${currentState}"? This cannot be undone.`);
    if (!confirmed) return;

    if (pincodeMasterDeleteStateButton) {
        pincodeMasterDeleteStateButton.disabled = true;
        pincodeMasterDeleteStateButton.textContent = "Deleting...";
    }
    setMessage(pincodeMasterUploadDialogMessage, `Deleting state "${currentState}"...`, "");

    try {
        const res = await apiRequest(`/api/admin/pincodes/states/${encodeURIComponent(currentState)}`, {
            method: "DELETE"
        }, currentToken());

        if (res && res.success) {
            currentAvailableStates = currentAvailableStates.filter(s => s.toLowerCase() !== currentState.toLowerCase());

            renderMasterStateOptions("auto");
            if (pincodeMasterTargetStateSelect) pincodeMasterTargetStateSelect.value = "auto";

            if (pincodeStateSelect) {
                for (let i = pincodeStateSelect.options.length - 1; i >= 0; i--) {
                    if (pincodeStateSelect.options[i].value.toLowerCase() === currentState.toLowerCase()) {
                        pincodeStateSelect.remove(i);
                    }
                }
                pincodeStateSelect.value = "all";
            }

            if (pincodeMasterEditStateRow) pincodeMasterEditStateRow.classList.add("hidden");
            if (pincodeMasterNewStateRow) pincodeMasterNewStateRow.classList.add("hidden");

            updateMasterStateButtons();
            setMessage(pincodeMasterUploadDialogMessage, `✓ ${res.message || `Deleted state "${currentState}".`}`, "success");

            await Promise.all([
                loadPincodeStats(),
                loadPincodes(1)
            ]);
        } else {
            throw new Error(res?.message || "Failed to delete state.");
        }
    } catch (err) {
        if (!handleAuthorizationError(err)) {
            setMessage(pincodeMasterUploadDialogMessage, err.message, "error");
        }
    } finally {
        if (pincodeMasterDeleteStateButton) {
            pincodeMasterDeleteStateButton.disabled = !pincodeMasterTargetStateSelect.value || pincodeMasterTargetStateSelect.value === "auto";
            pincodeMasterDeleteStateButton.textContent = "🗑️ Delete State";
        }
    }
}

// ------------------------------------------------------------
// BANK SERVICEABILITY CSV UPLOAD HANDLERS
// ------------------------------------------------------------
function handlePincodeBankFile(file) {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".csv")) {
        setMessage(pincodeBankUploadDialogMessage, "Please select a valid .csv file.", "error");
        return;
    }

    pincodeBankFileNameDisplay.textContent = file.name;
    pincodeBankFileSizeDisplay.textContent = `${(file.size / 1024).toFixed(1)} KB`;
    pincodeBankDropZone.classList.add("hidden");
    pincodeBankFileInfoPanel.classList.remove("hidden");
    setMessage(pincodeBankUploadDialogMessage, "", "");

    const reader = new FileReader();
    reader.onload = (e) => {
        selectedPincodeBankFileText = e.target.result || "";
        const lines = selectedPincodeBankFileText.split(/\r?\n/).filter(l => l.trim().length > 0);
        pincodeBankFileSummary.textContent = `Found ${Math.max(0, lines.length - 1)} serviceable PIN entries.`;
        confirmPincodeBankUploadButton.disabled = !bankServiceabilityTargetSelect.value;
    };
    reader.onerror = () => {
        setMessage(pincodeBankUploadDialogMessage, "Failed to read the file.", "error");
    };
    reader.readAsText(file);
}

async function confirmPincodeBankUpload() {
    const bankName = bankServiceabilityTargetSelect.value.trim();
    if (!bankName) {
        setMessage(pincodeBankUploadDialogMessage, "Please select a target bank first.", "error");
        return;
    }
    if (!selectedPincodeBankFileText) {
        setMessage(pincodeBankUploadDialogMessage, "Please choose a CSV file with pincodes.", "error");
        return;
    }

    confirmPincodeBankUploadButton.disabled = true;
    confirmPincodeBankUploadButton.textContent = "Importing...";
    setMessage(pincodeBankUploadDialogMessage, `Updating coverage for ${bankName}...`, "");

    try {
        const res = await apiRequest("/api/admin/pincodes/upload-bank", {
            method: "POST",
            body: JSON.stringify({
                bank_name: bankName,
                csvContent: selectedPincodeBankFileText
            })
        }, currentToken());

        if (res && res.success) {
            setMessage(pincodesNotice, `✓ ${res.message}`, "success");
            setTimeout(() => setMessage(pincodesNotice, "", ""), 5000);
            pincodeBankUploadDialog.close();
            resetPincodeBankUploadDialog();
            await Promise.all([
                loadPincodeStats(),
                loadPincodes(1)
            ]);
        } else {
            throw new Error(res?.message || "Bank serviceability update failed.");
        }
    } catch (err) {
        if (!handleAuthorizationError(err)) {
            setMessage(pincodeBankUploadDialogMessage, err.message, "error");
        }
    } finally {
        confirmPincodeBankUploadButton.disabled = false;
        confirmPincodeBankUploadButton.textContent = "Import Bank Serviceability";
    }
}

function renderBankServiceabilityOptions(selectedBank = "") {
    if (!bankServiceabilityTargetSelect) return;

    const currentVal = selectedBank || bankServiceabilityTargetSelect.value || "";

    const defaultLenders = [
        "FINNABLE",
        "INCRID",
        "POONAWALLA FINCORP",
        "HDFC BANK",
        "ICICI BANK",
        "AXIS BANK",
        "KOTAK MAHINDRA BANK",
        "STATE BANK OF INDIA (SBI)"
    ];

    const bankMap = new Map();
    for (const name of defaultLenders) {
        bankMap.set(name.trim().toUpperCase(), name.trim());
    }

    if (Array.isArray(banks)) {
        for (const b of banks) {
            const name = (typeof b === "string" ? b : (b && b.name) ? b.name : "").trim();
            if (name) {
                const upper = name.toUpperCase();
                if (!bankMap.has(upper)) {
                    bankMap.set(upper, name);
                }
            }
        }
    }

    if (selectedBank && selectedBank.trim()) {
        const selTrim = selectedBank.trim();
        if (!bankMap.has(selTrim.toUpperCase())) {
            bankMap.set(selTrim.toUpperCase(), selTrim);
        }
    }

    const sortedNames = Array.from(bankMap.values()).sort((a, b) => a.localeCompare(b));

    bankServiceabilityTargetSelect.innerHTML = `<option value="">Select a Bank...</option>`;
    for (const name of sortedNames) {
        const opt = document.createElement("option");
        opt.value = name;
        opt.textContent = name;
        if (currentVal && (currentVal.toUpperCase() === name.toUpperCase() || (currentVal.toUpperCase() === "SBI" && name.includes("SBI")))) {
            opt.selected = true;
        }
        bankServiceabilityTargetSelect.appendChild(opt);
    }

    if (confirmPincodeBankUploadButton) {
        confirmPincodeBankUploadButton.disabled = !bankServiceabilityTargetSelect.value || !selectedPincodeBankFileText;
    }
}

async function savePincodeBankNewBank() {
    if (!pincodeBankNewBankInput) return;
    const rawName = pincodeBankNewBankInput.value.trim();
    if (!rawName) {
        setMessage(pincodeBankUploadDialogMessage, "Please enter a bank name.", "error");
        pincodeBankNewBankInput.focus();
        return;
    }

    const newBankName = rawName.toUpperCase();

    if (pincodeBankSaveNewBankButton) {
        pincodeBankSaveNewBankButton.disabled = true;
        pincodeBankSaveNewBankButton.textContent = "Saving...";
    }
    setMessage(pincodeBankUploadDialogMessage, `Saving "${newBankName}"...`, "");

    try {
        const response = await apiRequest(
            "/api/admin/banks",
            {
                method: "POST",
                body: JSON.stringify({ name: newBankName })
            },
            currentToken()
        );

        const savedBank = (response && response.bank) || { name: newBankName };
        const finalName = savedBank.name || newBankName;

        const exists = banks.some(b => b.name && b.name.toLowerCase() === finalName.toLowerCase());
        if (!exists) {
            banks.push(savedBank);
            banks.sort((left, right) => (left.name || "").localeCompare(right.name || ""));
        }

        renderBanks(finalName);
        renderBankServiceabilityOptions(finalName);
        if (bankServiceabilityTargetSelect) bankServiceabilityTargetSelect.value = finalName;

        if (pincodeBankNewBankRow) pincodeBankNewBankRow.classList.add("hidden");
        pincodeBankNewBankInput.value = "";

        if (confirmPincodeBankUploadButton) {
            confirmPincodeBankUploadButton.disabled = !bankServiceabilityTargetSelect.value || !selectedPincodeBankFileText;
        }

        setMessage(pincodeBankUploadDialogMessage, `✓ Bank "${finalName}" saved and selected.`, "success");
    } catch (err) {
        if (!handleAuthorizationError(err)) {
            const errLower = (err.message || "").toLowerCase();
            if (errLower.includes("already exists") || errLower.includes("duplicate")) {
                renderBankServiceabilityOptions(newBankName);
                if (bankServiceabilityTargetSelect) bankServiceabilityTargetSelect.value = newBankName;
                if (pincodeBankNewBankRow) pincodeBankNewBankRow.classList.add("hidden");
                pincodeBankNewBankInput.value = "";
                if (confirmPincodeBankUploadButton) {
                    confirmPincodeBankUploadButton.disabled = !bankServiceabilityTargetSelect.value || !selectedPincodeBankFileText;
                }
                setMessage(pincodeBankUploadDialogMessage, `✓ Bank "${newBankName}" selected.`, "success");
            } else {
                setMessage(pincodeBankUploadDialogMessage, err.message || "Failed to add bank.", "error");
            }
        }
    } finally {
        if (pincodeBankSaveNewBankButton) {
            pincodeBankSaveNewBankButton.disabled = false;
            pincodeBankSaveNewBankButton.textContent = "Save & Select";
        }
    }
}

function resetPincodeBankUploadDialog() {
    selectedPincodeBankFileText = "";
    if (bankServiceabilityTargetSelect) bankServiceabilityTargetSelect.value = "";
    if (pincodeBankCsvFileInput) pincodeBankCsvFileInput.value = "";
    if (pincodeBankDropZone) pincodeBankDropZone.classList.remove("hidden", "drag-over");
    if (pincodeBankFileInfoPanel) pincodeBankFileInfoPanel.classList.add("hidden");
    if (pincodeBankNewBankRow) pincodeBankNewBankRow.classList.add("hidden");
    if (pincodeBankNewBankInput) pincodeBankNewBankInput.value = "";
    if (pincodeBankUploadDialogMessage) setMessage(pincodeBankUploadDialogMessage, "", "");
    if (confirmPincodeBankUploadButton) confirmPincodeBankUploadButton.disabled = true;
}

// ------------------------------------------------------------
// PINCODES EVENT LISTENERS
// ------------------------------------------------------------
if (tabPincodesBtn) tabPincodesBtn.addEventListener("click", () => switchTab("pincodes"));
if (pincodesPrevBtn) pincodesPrevBtn.addEventListener("click", () => {
    if (currentPincodePage > 1) loadPincodes(currentPincodePage - 1);
});
if (pincodesNextBtn) pincodesNextBtn.addEventListener("click", () => {
    if (currentPincodePage < totalPincodePages) loadPincodes(currentPincodePage + 1);
});

if (pincodeStateSelect) pincodeStateSelect.addEventListener("change", () => {
    if (pincodeEditStateButton) {
        pincodeEditStateButton.disabled = !pincodeStateSelect.value || pincodeStateSelect.value === "all";
    }
    loadPincodes(1);
});
if (pincodeTierSelect) pincodeTierSelect.addEventListener("change", () => loadPincodes(1));
if (pincodeServiceableSelect) pincodeServiceableSelect.addEventListener("change", () => loadPincodes(1));

// Add State Listeners
if (pincodeAddStateButton) pincodeAddStateButton.addEventListener("click", openAddStateDialog);
if (closePincodeAddStateDialogBtn) closePincodeAddStateDialogBtn.addEventListener("click", () => pincodeAddStateDialog.close());
if (cancelPincodeAddStateDialogButton) cancelPincodeAddStateDialogButton.addEventListener("click", () => pincodeAddStateDialog.close());
if (pincodeAddStateForm) pincodeAddStateForm.addEventListener("submit", handleAddStateSubmit);

// Edit State Listeners
if (pincodeEditStateButton) pincodeEditStateButton.addEventListener("click", openEditStateDialog);
if (closePincodeEditStateDialogBtn) closePincodeEditStateDialogBtn.addEventListener("click", () => pincodeEditStateDialog.close());
if (cancelPincodeEditStateDialogButton) cancelPincodeEditStateDialogButton.addEventListener("click", () => pincodeEditStateDialog.close());
if (pincodeEditStateForm) pincodeEditStateForm.addEventListener("submit", handleEditStateSubmit);
if (deleteStatePincodesButton) deleteStatePincodesButton.addEventListener("click", handleDeleteState);

// Edit Individual Pincode Listeners
if (closePincodeEditDialogBtn) closePincodeEditDialogBtn.addEventListener("click", () => pincodeEditDialog.close());
if (cancelPincodeEditDialogButton) cancelPincodeEditDialogButton.addEventListener("click", () => pincodeEditDialog.close());
if (pincodeEditForm) pincodeEditForm.addEventListener("submit", handleEditPincodeSubmit);

// Add State & Edit State Functions
function openAddStateDialog() {
    if (newPincodeStateName) newPincodeStateName.value = "";
    if (newPincodePin) newPincodePin.value = "";
    if (newPincodeLocation) newPincodeLocation.value = "";
    if (newPincodeRegion) newPincodeRegion.value = "";
    if (newPincodeTier) newPincodeTier.value = "TIER 2";
    if (pincodeAddStateDialogMessage) setMessage(pincodeAddStateDialogMessage, "", "");
    if (pincodeAddStateDialog) pincodeAddStateDialog.showModal();
}

async function handleAddStateSubmit(e) {
    e.preventDefault();
    const stateName = newPincodeStateName ? newPincodeStateName.value.trim() : "";
    const pin = newPincodePin ? newPincodePin.value.trim().replace(/\D/g, "") : "";
    const location = newPincodeLocation ? newPincodeLocation.value.trim() : stateName;
    const region = newPincodeRegion ? newPincodeRegion.value.trim() : location;
    const tier = newPincodeTier ? newPincodeTier.value : "TIER 2";

    if (!stateName) {
        setMessage(pincodeAddStateDialogMessage, "State name is required.", "error");
        return;
    }
    if (!pin || pin.length < 5 || pin.length > 6) {
        setMessage(pincodeAddStateDialogMessage, "Please enter a valid 6-digit PIN code.", "error");
        return;
    }

    if (confirmPincodeAddStateButton) {
        confirmPincodeAddStateButton.disabled = true;
        confirmPincodeAddStateButton.textContent = "Saving...";
    }

    try {
        const res = await apiRequest("/api/admin/pincodes/states", {
            method: "POST",
            body: JSON.stringify({ stateName, pincode: pin, location, region, tier })
        }, currentToken());

        if (res && res.success) {
            setMessage(pincodesNotice, `✓ ${res.message}`, "success");
            setTimeout(() => setMessage(pincodesNotice, "", ""), 4000);
            if (pincodeAddStateDialog) pincodeAddStateDialog.close();
            await Promise.all([
                loadPincodeStats(),
                loadPincodes(1)
            ]);
        } else {
            throw new Error(res?.message || "Failed to add state.");
        }
    } catch (err) {
        if (!handleAuthorizationError(err)) {
            setMessage(pincodeAddStateDialogMessage, err.message, "error");
        }
    } finally {
        if (confirmPincodeAddStateButton) {
            confirmPincodeAddStateButton.disabled = false;
            confirmPincodeAddStateButton.textContent = "Save State";
        }
    }
}

function openEditStateDialog() {
    const currentState = pincodeStateSelect ? pincodeStateSelect.value : "";
    if (!currentState || currentState === "all") {
        alert("Please select a state from the dropdown first.");
        return;
    }

    if (editStateCurrentName) editStateCurrentName.textContent = currentState;
    if (editStateNameInput) editStateNameInput.value = currentState;
    if (editStateTierSelect) editStateTierSelect.value = "";
    if (pincodeEditStateDialogMessage) setMessage(pincodeEditStateDialogMessage, "", "");
    if (pincodeEditStateDialog) pincodeEditStateDialog.showModal();
}

async function handleEditStateSubmit(e) {
    e.preventDefault();
    const currentState = pincodeStateSelect ? pincodeStateSelect.value : "";
    if (!currentState || currentState === "all") return;

    const newStateName = editStateNameInput ? editStateNameInput.value.trim() : "";
    const tier = editStateTierSelect ? editStateTierSelect.value : "";

    if (!newStateName && !tier) {
        setMessage(pincodeEditStateDialogMessage, "Please specify a new state name or select a tier update.", "error");
        return;
    }

    if (confirmPincodeEditStateButton) {
        confirmPincodeEditStateButton.disabled = true;
        confirmPincodeEditStateButton.textContent = "Updating...";
    }

    try {
        const res = await apiRequest(`/api/admin/pincodes/states/${encodeURIComponent(currentState)}`, {
            method: "PUT",
            body: JSON.stringify({ newStateName, tier })
        }, currentToken());

        if (res && res.success) {
            setMessage(pincodesNotice, `✓ ${res.message}`, "success");
            setTimeout(() => setMessage(pincodesNotice, "", ""), 4000);
            if (pincodeEditStateDialog) pincodeEditStateDialog.close();
            if (newStateName && pincodeStateSelect) pincodeStateSelect.value = newStateName;
            await Promise.all([
                loadPincodeStats(),
                loadPincodes(1)
            ]);
        } else {
            throw new Error(res?.message || "Failed to update state.");
        }
    } catch (err) {
        if (!handleAuthorizationError(err)) {
            setMessage(pincodeEditStateDialogMessage, err.message, "error");
        }
    } finally {
        if (confirmPincodeEditStateButton) {
            confirmPincodeEditStateButton.disabled = false;
            confirmPincodeEditStateButton.textContent = "Update State";
        }
    }
}

async function handleDeleteState() {
    const currentState = pincodeStateSelect ? pincodeStateSelect.value : "";
    if (!currentState || currentState === "all") return;

    const confirmed = confirm(`Are you sure you want to delete ALL PIN codes for state "${currentState}"? This cannot be undone.`);
    if (!confirmed) return;

    if (deleteStatePincodesButton) {
        deleteStatePincodesButton.disabled = true;
        deleteStatePincodesButton.textContent = "Deleting...";
    }

    try {
        const res = await apiRequest(`/api/admin/pincodes/states/${encodeURIComponent(currentState)}`, {
            method: "DELETE"
        }, currentToken());

        if (res && res.success) {
            setMessage(pincodesNotice, `✓ ${res.message}`, "success");
            setTimeout(() => setMessage(pincodesNotice, "", ""), 4000);
            if (pincodeEditStateDialog) pincodeEditStateDialog.close();
            if (pincodeStateSelect) pincodeStateSelect.value = "all";
            await Promise.all([
                loadPincodeStats(),
                loadPincodes(1)
            ]);
        } else {
            throw new Error(res?.message || "Failed to delete state pincodes.");
        }
    } catch (err) {
        if (!handleAuthorizationError(err)) {
            setMessage(pincodeEditStateDialogMessage, err.message, "error");
        }
    } finally {
        if (deleteStatePincodesButton) {
            deleteStatePincodesButton.disabled = false;
            deleteStatePincodesButton.textContent = "🗑️ Delete All PIN Codes for this State";
        }
    }
}

function openEditPincodeDialog(item) {
    if (!item) return;
    if (editPinIdInput) editPinIdInput.value = item.id;
    if (editPinPincodeDisplay) editPinPincodeDisplay.textContent = item.pincode;
    if (editPinLocationInput) editPinLocationInput.value = item.location || item.city || "";
    if (editPinRegionInput) editPinRegionInput.value = item.region || item.city || "";
    if (editPinStateInput) editPinStateInput.value = item.state || "";
    if (editPinTierSelect) editPinTierSelect.value = item.tier === "TIER 1" ? "TIER 1" : "TIER 2";
    if (pincodeEditDialogMessage) setMessage(pincodeEditDialogMessage, "", "");
    if (pincodeEditDialog) pincodeEditDialog.showModal();
}

async function handleEditPincodeSubmit(e) {
    e.preventDefault();
    const id = editPinIdInput ? editPinIdInput.value : "";
    if (!id) return;

    const location = editPinLocationInput ? editPinLocationInput.value.trim() : "";
    const region = editPinRegionInput ? editPinRegionInput.value.trim() : "";
    const state = editPinStateInput ? editPinStateInput.value.trim() : "";
    const tier = editPinTierSelect ? editPinTierSelect.value : "TIER 2";

    if (!location) {
        setMessage(pincodeEditDialogMessage, "Location name is required.", "error");
        return;
    }
    if (!state) {
        setMessage(pincodeEditDialogMessage, "State is required.", "error");
        return;
    }

    if (confirmPincodeEditButton) {
        confirmPincodeEditButton.disabled = true;
        confirmPincodeEditButton.textContent = "Saving...";
    }

    try {
        const res = await apiRequest(`/api/admin/pincodes/${id}`, {
            method: "PUT",
            body: JSON.stringify({ location, region, state, tier })
        }, currentToken());

        if (res && res.success) {
            setMessage(pincodesNotice, `✓ ${res.message}`, "success");
            setTimeout(() => setMessage(pincodesNotice, "", ""), 4000);
            if (pincodeEditDialog) pincodeEditDialog.close();
            await loadPincodes(currentPincodePage);
        } else {
            throw new Error(res?.message || "Failed to update PIN code.");
        }
    } catch (err) {
        if (!handleAuthorizationError(err)) {
            setMessage(pincodeEditDialogMessage, err.message, "error");
        }
    } finally {
        if (confirmPincodeEditButton) {
            confirmPincodeEditButton.disabled = false;
            confirmPincodeEditButton.textContent = "Save Changes";
        }
    }
}

if (pincodeSearchInput) {
    pincodeSearchInput.addEventListener("input", () => {
        clearTimeout(pincodeSearchTimer);
        pincodeSearchTimer = setTimeout(() => loadPincodes(1), 300);
    });
}

// Master Upload Dialog Listeners
if (uploadPincodesButton) {
    uploadPincodesButton.addEventListener("click", () => {
        resetPincodeMasterUploadDialog();
        renderMasterStateOptions();
        pincodeMasterUploadDialog.showModal();
    });
}
if (pincodeMasterAddStateButton) {
    pincodeMasterAddStateButton.addEventListener("click", () => {
        if (pincodeMasterNewStateRow) {
            pincodeMasterNewStateRow.classList.toggle("hidden");
            if (!pincodeMasterNewStateRow.classList.contains("hidden") && pincodeMasterNewStateInput) {
                pincodeMasterNewStateInput.focus();
            }
        }
    });
}
if (pincodeMasterCancelNewStateButton) {
    pincodeMasterCancelNewStateButton.addEventListener("click", () => {
        if (pincodeMasterNewStateRow) pincodeMasterNewStateRow.classList.add("hidden");
        if (pincodeMasterNewStateInput) pincodeMasterNewStateInput.value = "";
    });
}
if (pincodeMasterSaveNewStateButton) {
    pincodeMasterSaveNewStateButton.addEventListener("click", savePincodeMasterNewState);
}
if (pincodeMasterNewStateInput) {
    pincodeMasterNewStateInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            savePincodeMasterNewState();
        } else if (e.key === "Escape") {
            if (pincodeMasterNewStateRow) pincodeMasterNewStateRow.classList.add("hidden");
            pincodeMasterNewStateInput.value = "";
        }
    });
}
if (pincodeMasterTargetStateSelect) {
    pincodeMasterTargetStateSelect.addEventListener("change", () => {
        updateMasterStateButtons();
        if (selectedPincodeMasterFileText) {
            previewPincodeMasterCsv(selectedPincodeMasterFileText);
        }
    });
}
if (pincodeMasterEditStateButton) {
    pincodeMasterEditStateButton.addEventListener("click", openMasterEditStateRow);
}
if (pincodeMasterDeleteStateButton) {
    pincodeMasterDeleteStateButton.addEventListener("click", deleteMasterState);
}
if (pincodeMasterCancelEditStateButton) {
    pincodeMasterCancelEditStateButton.addEventListener("click", () => {
        if (pincodeMasterEditStateRow) pincodeMasterEditStateRow.classList.add("hidden");
        if (pincodeMasterEditStateInput) pincodeMasterEditStateInput.value = "";
    });
}
if (pincodeMasterUpdateStateButton) {
    pincodeMasterUpdateStateButton.addEventListener("click", saveMasterEditState);
}
if (pincodeMasterEditStateInput) {
    pincodeMasterEditStateInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            saveMasterEditState();
        } else if (e.key === "Escape") {
            if (pincodeMasterEditStateRow) pincodeMasterEditStateRow.classList.add("hidden");
        }
    });
}
if (samplePincodesCsvButton) samplePincodesCsvButton.addEventListener("click", downloadSamplePincodesCsv);
if (pincodeMasterDownloadSampleButton) pincodeMasterDownloadSampleButton.addEventListener("click", downloadSamplePincodesCsv);

if (closePincodeMasterUploadDialogButton) closePincodeMasterUploadDialogButton.addEventListener("click", () => pincodeMasterUploadDialog.close());
if (cancelPincodeMasterUploadDialogButton) cancelPincodeMasterUploadDialogButton.addEventListener("click", () => pincodeMasterUploadDialog.close());
if (pincodeMasterUploadDialog) {
    pincodeMasterUploadDialog.addEventListener("click", (e) => {
        if (e.target === pincodeMasterUploadDialog) pincodeMasterUploadDialog.close();
    });
}

if (pincodeMasterBrowseButton && pincodeMasterCsvFileInput) {
    pincodeMasterBrowseButton.addEventListener("click", () => pincodeMasterCsvFileInput.click());
}
if (pincodeMasterDropZone && pincodeMasterCsvFileInput) {
    pincodeMasterDropZone.addEventListener("click", (e) => {
        if (e.target !== pincodeMasterBrowseButton) pincodeMasterCsvFileInput.click();
    });
    pincodeMasterDropZone.addEventListener("dragover", (e) => { e.preventDefault(); pincodeMasterDropZone.classList.add("drag-over"); });
    pincodeMasterDropZone.addEventListener("dragleave", () => pincodeMasterDropZone.classList.remove("drag-over"));
    pincodeMasterDropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        pincodeMasterDropZone.classList.remove("drag-over");
        if (e.dataTransfer.files.length) handlePincodeMasterFile(e.dataTransfer.files[0]);
    });
}
if (pincodeMasterCsvFileInput) {
    pincodeMasterCsvFileInput.addEventListener("change", (e) => {
        if (e.target.files.length) handlePincodeMasterFile(e.target.files[0]);
    });
}
if (pincodeMasterRemoveFileButton) pincodeMasterRemoveFileButton.addEventListener("click", resetPincodeMasterUploadDialog);
if (confirmPincodeMasterUploadButton) confirmPincodeMasterUploadButton.addEventListener("click", confirmPincodeMasterUpload);

// Bank Serviceability Dialog Listeners
if (uploadBankServiceabilityButton) {
    uploadBankServiceabilityButton.addEventListener("click", async () => {
        resetPincodeBankUploadDialog();
        if (!banks || banks.length === 0) {
            try {
                await loadBanks();
            } catch (_e) {
                // Ignore failure
            }
        }
        renderBankServiceabilityOptions();
        pincodeBankUploadDialog.showModal();
    });
}
if (bankServiceabilityTargetSelect) {
    bankServiceabilityTargetSelect.addEventListener("change", () => {
        if (confirmPincodeBankUploadButton) {
            confirmPincodeBankUploadButton.disabled = !bankServiceabilityTargetSelect.value || !selectedPincodeBankFileText;
        }
    });
}
if (pincodeBankAddBankButton) {
    pincodeBankAddBankButton.addEventListener("click", () => {
        if (pincodeBankNewBankRow) {
            pincodeBankNewBankRow.classList.toggle("hidden");
            if (!pincodeBankNewBankRow.classList.contains("hidden") && pincodeBankNewBankInput) {
                pincodeBankNewBankInput.focus();
            }
        }
    });
}
if (pincodeBankCancelNewBankButton) {
    pincodeBankCancelNewBankButton.addEventListener("click", () => {
        if (pincodeBankNewBankRow) pincodeBankNewBankRow.classList.add("hidden");
        if (pincodeBankNewBankInput) pincodeBankNewBankInput.value = "";
        if (pincodeBankUploadDialogMessage) setMessage(pincodeBankUploadDialogMessage, "", "");
    });
}
if (pincodeBankSaveNewBankButton) {
    pincodeBankSaveNewBankButton.addEventListener("click", savePincodeBankNewBank);
}
if (pincodeBankNewBankInput) {
    pincodeBankNewBankInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            savePincodeBankNewBank();
        } else if (e.key === "Escape") {
            if (pincodeBankNewBankRow) pincodeBankNewBankRow.classList.add("hidden");
            pincodeBankNewBankInput.value = "";
        }
    });
}
if (pincodeBankDownloadSampleButton) pincodeBankDownloadSampleButton.addEventListener("click", downloadSampleBankPincodesCsv);
if (closePincodeBankUploadDialogButton) closePincodeBankUploadDialogButton.addEventListener("click", () => pincodeBankUploadDialog.close());
if (cancelPincodeBankUploadDialogButton) cancelPincodeBankUploadDialogButton.addEventListener("click", () => pincodeBankUploadDialog.close());
if (pincodeBankUploadDialog) {
    pincodeBankUploadDialog.addEventListener("click", (e) => {
        if (e.target === pincodeBankUploadDialog) pincodeBankUploadDialog.close();
    });
}
if (pincodeBankBrowseButton && pincodeBankCsvFileInput) {
    pincodeBankBrowseButton.addEventListener("click", () => pincodeBankCsvFileInput.click());
}
if (pincodeBankDropZone && pincodeBankCsvFileInput) {
    pincodeBankDropZone.addEventListener("click", (e) => {
        if (e.target !== pincodeBankBrowseButton) pincodeBankCsvFileInput.click();
    });
    pincodeBankDropZone.addEventListener("dragover", (e) => { e.preventDefault(); pincodeBankDropZone.classList.add("drag-over"); });
    pincodeBankDropZone.addEventListener("dragleave", () => pincodeBankDropZone.classList.remove("drag-over"));
    pincodeBankDropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        pincodeBankDropZone.classList.remove("drag-over");
        if (e.dataTransfer.files.length) handlePincodeBankFile(e.dataTransfer.files[0]);
    });
}
if (pincodeBankCsvFileInput) {
    pincodeBankCsvFileInput.addEventListener("change", (e) => {
        if (e.target.files.length) handlePincodeBankFile(e.target.files[0]);
    });
}
if (pincodeBankRemoveFileButton) pincodeBankRemoveFileButton.addEventListener("click", resetPincodeBankUploadDialog);
if (confirmPincodeBankUploadButton) confirmPincodeBankUploadButton.addEventListener("click", confirmPincodeBankUpload);

const storedToken = currentToken();
if (storedToken) void verifyToken(storedToken);

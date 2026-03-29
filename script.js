const STORAGE_KEY = "east-japan-org-chart-data";
const STORAGE_VERSION = 1;
const SERVER_DATA_ENDPOINT = "/api/org-data";

const DEFAULT_BRANCHES = [
  {
    id: "east-japan",
    name: "東日本支店",
    location: "未設定",
    division: "営業",
    overview: "東日本支店の組織図とメンバープロフィールを確認できます。",
    rootId: "east-japan-1",
    nodes: [
      {
        id: "east-japan-1",
        kind: "person",
        name: "木暮 知之",
        title: "東日本支店長",
        department: "支店統括",
        age: "52歳",
        tenure: "28年",
        history: "首都圏の責任者と東日本エリア統括を経て、東日本支店長に就任。",
        hobbies: ["ゴルフ", "歴史散策"],
        tags: ["支店運営", "組織管理", "営業統括"],
        reports: ["east-japan-2"],
      },
      {
        id: "east-japan-2",
        kind: "person",
        name: "堀内 芳人",
        title: "副支店長",
        department: "支店統括",
        age: "48歳",
        tenure: "22年",
        history: "現場運営と業務管理を歴任し、現在は副支店長として各部を統括。",
        hobbies: ["釣り", "ドライブ"],
        tags: ["支店運営補佐", "組織管理", "営業支援"],
        reports: ["dept-1", "dept-2", "dept-3"],
      },
      {
        id: "dept-1",
        kind: "unit",
        name: "業務1部",
        title: "",
        department: "東日本支店",
        description: "副支店長配下の業務1部です。",
        tags: ["組織"],
        reports: ["dept-1-manager"],
      },
      {
        id: "dept-1-manager",
        kind: "person",
        name: "西原 達也",
        title: "部長",
        department: "業務1部",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
        reports: ["office-101", "office-102", "office-103", "office-104", "office-105"],
      },
      {
        id: "office-101",
        kind: "unit",
        name: "武蔵野",
        title: "",
        department: "業務1部",
        description: "業務1部配下です。",
        tags: ["組織"],
        reports: [],
      },
      {
        id: "office-102",
        kind: "unit",
        name: "安曇野",
        title: "",
        department: "業務1部",
        description: "業務1部配下です。",
        tags: ["組織"],
        reports: [],
      },
      {
        id: "office-103",
        kind: "unit",
        name: "富士見",
        title: "",
        department: "業務1部",
        description: "業務1部配下です。",
        tags: ["組織"],
        reports: [],
      },
      {
        id: "office-104",
        kind: "unit",
        name: "白州",
        title: "",
        department: "業務1部",
        description: "業務1部配下です。",
        tags: ["組織"],
        reports: [],
      },
      {
        id: "office-105",
        kind: "unit",
        name: "白州水",
        title: "",
        department: "業務1部",
        description: "業務1部配下です。",
        tags: ["組織"],
        reports: [],
      },
      {
        id: "dept-2",
        kind: "unit",
        name: "業務2部",
        title: "",
        department: "東日本支店",
        description: "副支店長配下の業務2部です。",
        tags: ["組織"],
        reports: ["office-201", "office-202", "office-203", "office-204", "office-205", "office-206"],
      },
      {
        id: "office-201",
        kind: "unit",
        name: "栃木北",
        title: "",
        department: "業務2部",
        description: "業務2部配下です。",
        tags: ["組織"],
        reports: [],
      },
      {
        id: "office-202",
        kind: "unit",
        name: "栃木",
        title: "",
        department: "業務2部",
        description: "業務2部配下です。",
        tags: ["組織"],
        reports: ["tochigi-1"],
      },
      {
        id: "tochigi-1",
        kind: "person",
        name: "藤原 邦康",
        title: "署長",
        department: "栃木",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
        reports: ["tochigi-2"],
      },
      {
        id: "tochigi-2",
        kind: "person",
        name: "梅原 裕太郎",
        title: "",
        department: "栃木",
        age: "",
        tenure: "",
        historyEntries: [{ year: "2018年", location: "西多摩営業所" }],
        hobbies: [],
        tags: [],
        reports: ["tochigi-3"],
      },
      {
        id: "tochigi-3",
        kind: "person",
        name: "市川 輝",
        title: "",
        department: "栃木",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
        reports: [],
      },
      {
        id: "office-203",
        kind: "unit",
        name: "羽生とちぎ",
        title: "",
        department: "業務2部",
        description: "業務2部配下です。",
        tags: ["組織"],
        reports: [],
      },
      {
        id: "office-204",
        kind: "unit",
        name: "群馬",
        title: "",
        department: "業務2部",
        description: "業務2部配下です。",
        tags: ["組織"],
        reports: [],
      },
      {
        id: "office-205",
        kind: "unit",
        name: "渋川",
        title: "",
        department: "業務2部",
        description: "業務2部配下です。",
        tags: ["組織"],
        reports: [],
      },
      {
        id: "office-206",
        kind: "unit",
        name: "利根川",
        title: "",
        department: "業務2部",
        description: "業務2部配下です。",
        tags: ["組織"],
        reports: [],
      },
      {
        id: "dept-3",
        kind: "unit",
        name: "業務3部",
        title: "",
        department: "東日本支店",
        description: "副支店長配下の業務3部です。",
        tags: ["組織"],
        reports: ["office-301", "office-302", "office-303", "office-304", "office-305", "office-306"],
      },
      {
        id: "office-301",
        kind: "unit",
        name: "群馬藤岡",
        title: "",
        department: "業務3部",
        description: "業務3部配下です。",
        tags: ["組織"],
        reports: [],
      },
      {
        id: "office-302",
        kind: "unit",
        name: "海老名流通",
        title: "",
        department: "業務3部",
        description: "業務3部配下です。",
        tags: ["組織"],
        reports: [],
      },
      {
        id: "office-303",
        kind: "unit",
        name: "北関東流通",
        title: "",
        department: "業務3部",
        description: "業務3部配下です。",
        tags: ["組織"],
        reports: [],
      },
      {
        id: "office-304",
        kind: "unit",
        name: "神奈川綾瀬",
        title: "",
        department: "業務3部",
        description: "業務3部配下です。",
        tags: ["組織"],
        reports: [],
      },
      {
        id: "office-305",
        kind: "unit",
        name: "国立流通",
        title: "",
        department: "業務3部",
        description: "業務3部配下です。",
        tags: ["組織"],
        reports: [],
      },
      {
        id: "office-306",
        kind: "unit",
        name: "青梅流通",
        title: "",
        department: "業務3部",
        description: "業務3部配下です。",
        tags: ["組織"],
        reports: [],
      },
    ],
  },
];

function cloneBranches(data) {
  return JSON.parse(JSON.stringify(data));
}

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeStringArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => normalizeText(String(item)))
    .filter(Boolean);
}

function normalizeReports(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => normalizeText(String(item)))
    .filter(Boolean);
}

function normalizeHistoryEntries(value, legacyHistory = "") {
  if (Array.isArray(value)) {
    return value
      .map((entry) => ({
        year: normalizeText(entry?.year),
        location: normalizeText(entry?.location),
      }))
      .filter((entry) => entry.year || entry.location);
  }

  const fallback = normalizeText(legacyHistory);
  return fallback ? [{ year: "", location: fallback }] : [];
}

function formatHistoryEntry(entry) {
  const year = normalizeText(entry?.year);
  const location = normalizeText(entry?.location);

  if (year && location) {
    return `${year}〜 ${location}`;
  }

  return year || location;
}

function historyText(node) {
  return (node.historyEntries ?? [])
    .map((entry) => formatHistoryEntry(entry))
    .filter(Boolean)
    .join(" ");
}

function isOfficeNode(node) {
  return node?.kind === "unit" && !/^dept-\d+$/.test(node.id);
}

function buildAffiliation(branch, node) {
  const parts = [branch?.name];

  if (node?.kind === "unit") {
    if (node?.name && node.name !== branch?.name) {
      parts.push(node.name);
    }
  } else if (node?.department && node.department !== branch?.name) {
    parts.push(node.department);
  }

  return parts.filter(Boolean).join(" / ");
}

function normalizeNode(node, index) {
  const kind = node?.kind === "unit" ? "unit" : "person";
  const normalized = {
    id: normalizeText(node?.id) || `node-${index + 1}`,
    kind,
    name: normalizeText(node?.name) || "未設定",
    title: normalizeText(node?.title),
    department: normalizeText(node?.department),
    tags: normalizeStringArray(node?.tags),
    reports: normalizeReports(node?.reports),
  };

  if (kind === "person") {
    const joinYear = normalizeText(node?.joinYear);
    const rawAge = normalizeText(node?.age);
    const looksLikeJoinYear = /^(?:19|20)\d{2}(?:年)?$/.test(rawAge);
    normalized.age = looksLikeJoinYear && !joinYear ? "" : rawAge;
    normalized.joinYear = joinYear || (looksLikeJoinYear ? rawAge : "");
    normalized.tenure = normalizeText(node?.tenure);
    normalized.historyEntries = normalizeHistoryEntries(node?.historyEntries, node?.history);
    normalized.hobbies = normalizeStringArray(node?.hobbies);
  } else {
    normalized.description = normalizeText(node?.description);
  }

  return normalized;
}

function normalizeBranch(branch, index) {
  const rawNodes = Array.isArray(branch?.nodes) ? branch.nodes : [];
  const seenNodeIds = new Set();
  const nodes = rawNodes.map((node, nodeIndex) => {
    const normalizedNode = normalizeNode(node, nodeIndex);
    if (seenNodeIds.has(normalizedNode.id)) {
      normalizedNode.id = `${normalizedNode.id}-${nodeIndex + 1}`;
    }
    seenNodeIds.add(normalizedNode.id);
    return normalizedNode;
  });
  const validIds = new Set(nodes.map((node) => node.id));

  nodes.forEach((node) => {
    node.reports = node.reports.filter((reportId) => validIds.has(reportId) && reportId !== node.id);
  });

  if (nodes.length === 0) {
    return null;
  }

  const rootId = normalizeText(branch?.rootId);

  return {
    id: normalizeText(branch?.id) || `branch-${index + 1}`,
    name: normalizeText(branch?.name) || `支店${index + 1}`,
    location: normalizeText(branch?.location),
    division: normalizeText(branch?.division),
    overview: normalizeText(branch?.overview),
    rootId: validIds.has(rootId) ? rootId : nodes[0].id,
    nodes,
  };
}

function extractBranchList(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (data && typeof data === "object" && Array.isArray(data.branches)) {
    return data.branches;
  }

  return null;
}

function parseBranches(data) {
  const branchList = extractBranchList(data);
  if (!branchList || branchList.length === 0) {
    return null;
  }

  const seenBranchIds = new Set();
  const normalized = branchList
    .map((branch, index) => {
      const normalizedBranch = normalizeBranch(branch, index);
      if (!normalizedBranch) {
        return null;
      }

      if (seenBranchIds.has(normalizedBranch.id)) {
        normalizedBranch.id = `${normalizedBranch.id}-${index + 1}`;
      }

      seenBranchIds.add(normalizedBranch.id);
      return normalizedBranch;
    })
    .filter(Boolean);

  return normalized.length > 0 ? normalized : null;
}

function buildStoragePayload() {
  return {
    version: STORAGE_VERSION,
    updatedAt: new Date().toISOString(),
    branches,
  };
}

function loadBranches() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return parseBranches(DEFAULT_BRANCHES) ?? cloneBranches(DEFAULT_BRANCHES);
    }

    const parsed = JSON.parse(raw);
    return parseBranches(parsed) ?? parseBranches(DEFAULT_BRANCHES) ?? cloneBranches(DEFAULT_BRANCHES);
  } catch {
    return parseBranches(DEFAULT_BRANCHES) ?? cloneBranches(DEFAULT_BRANCHES);
  }
}

let branches = loadBranches();
const initialBranch = branches[0] ?? { id: "", rootId: "" };
const persistence = {
  mode: window.location.protocol === "file:" ? "local" : "server",
  serverReachable: false,
};

const state = {
  activeBranchId: initialBranch.id,
  selectedNodeId: initialBranch.rootId,
  searchTerm: "",
  expandedDepartmentIds: new Set(),
  editStatus: "",
  actionStatus: "",
};

const elements = {
  branchTabs: document.getElementById("branchTabs"),
  heroStats: document.getElementById("heroStats"),
  branchSummary: document.getElementById("branchSummary"),
  chartFrame: document.querySelector(".chart-frame"),
  chartTitle: document.getElementById("chartTitle"),
  orgChart: document.getElementById("orgChart"),
  exportButton: document.getElementById("exportButton"),
  importButton: document.getElementById("importButton"),
  resetButton: document.getElementById("resetButton"),
  importFileInput: document.getElementById("importFileInput"),
  actionStatus: document.getElementById("actionStatus"),
  memberGrid: document.getElementById("memberGrid"),
  search: document.getElementById("memberSearch"),
  profileEmpty: document.getElementById("profileEmpty"),
  profileContent: document.getElementById("profileContent"),
  profileBranch: document.getElementById("profileBranch"),
  profileName: document.getElementById("profileName"),
  profileRoleRow: document.getElementById("profileRoleRow"),
  profileRoleValue: document.getElementById("profileRoleValue"),
  profileAffiliationRow: document.getElementById("profileAffiliationRow"),
  profileAffiliationValue: document.getElementById("profileAffiliationValue"),
  profilePersonMetaRow: document.getElementById("profilePersonMetaRow"),
  profileAgeValue: document.getElementById("profileAgeValue"),
  profileJoinYearValue: document.getElementById("profileJoinYearValue"),
  profileTenureValue: document.getElementById("profileTenureValue"),
  profileDescriptionRow: document.getElementById("profileDescriptionRow"),
  profileDescriptionLabel: document.getElementById("profileDescriptionLabel"),
  profileDescriptionValue: document.getElementById("profileDescriptionValue"),
  profileEditor: document.getElementById("profileEditor"),
  profileForm: document.getElementById("profileForm"),
  editName: document.getElementById("editName"),
  editTitle: document.getElementById("editTitle"),
  editDepartment: document.getElementById("editDepartment"),
  editAgeField: document.getElementById("editAgeField"),
  editAge: document.getElementById("editAge"),
  editJoinYearField: document.getElementById("editJoinYearField"),
  editJoinYear: document.getElementById("editJoinYear"),
  editTenureField: document.getElementById("editTenureField"),
  editTenure: document.getElementById("editTenure"),
  editHistoryField: document.getElementById("editHistoryField"),
  editHistoryFieldLabel: document.getElementById("editHistoryFieldLabel"),
  editHistoryRows: document.getElementById("editHistoryRows"),
  addEditHistoryRow: document.getElementById("addEditHistoryRow"),
  editDescriptionField: document.getElementById("editDescriptionField"),
  editDescriptionLabel: document.getElementById("editDescriptionLabel"),
  editDescription: document.getElementById("editDescription"),
  closeEditPanel: document.getElementById("closeEditPanel"),
  editStatus: document.getElementById("editStatus"),
};

initializeExpandedDepartments();

function initializeExpandedDepartments() {
  state.expandedDepartmentIds = new Set();
  const branch = getBranch(state.activeBranchId) ?? branches[0];
  if (branch?.nodes?.some((node) => node.id === 'dept-1')) {
    state.expandedDepartmentIds.add('dept-1');
  }
}

function clearActionStatus() {
  state.actionStatus = "";
}

function setActionStatus(message) {
  state.actionStatus = message;
}

function writeStorageCache() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(buildStoragePayload()));
    return true;
  } catch {
    return false;
  }
}

async function saveBranches() {
  const cached = writeStorageCache();

  if (persistence.mode !== "server") {
    if (!cached) {
      state.editStatus = "このブラウザでは保存できませんでした。";
      setActionStatus("このブラウザでは保存できませんでした。");
      return false;
    }
    return true;
  }

  try {
    const response = await window.fetch(SERVER_DATA_ENDPOINT, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildStoragePayload()),
    });

    if (!response.ok) {
      throw new Error("save-failed");
    }

    persistence.serverReachable = true;
    return true;
  } catch {
    persistence.serverReachable = false;
    state.editStatus = "共有データの保存に失敗しました。";
    setActionStatus("共有保存に失敗しました。サーバー接続を確認してください。");
    return false;
  }
}

async function loadServerBranches() {
  const response = await window.fetch(SERVER_DATA_ENDPOINT, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("load-failed");
  }

  const payload = await response.json();
  const parsedBranches = parseBranches(payload);
  if (parsedBranches) {
    return parsedBranches;
  }

  if (payload && typeof payload === "object" && Array.isArray(payload.branches) && payload.branches.length === 0) {
    return parseBranches(DEFAULT_BRANCHES) ?? cloneBranches(DEFAULT_BRANCHES);
  }

  throw new Error("invalid-data");
}

function getActiveBranch() {
  return branches.find((branch) => branch.id === state.activeBranchId) ?? branches[0];
}

function getBranch(branchId) {
  return branches.find((branch) => branch.id === branchId);
}

function nodeMap(branch) {
  return new Map(branch.nodes.map((node) => [node.id, node]));
}

function personNodes(branch) {
  return branch.nodes.filter((node) => node.kind === "person");
}

function searchText(node) {
  return [node.name, node.title, node.department, historyText(node), node.description ?? "", ...(node.tags ?? [])]
    .join(" ")
    .toLowerCase();
}

function matchesSearch(node) {
  const term = state.searchTerm.trim().toLowerCase();
  if (!term) {
    return true;
  }

  return searchText(node).includes(term);
}

function visibleDescendant(nodeId, nodes, visited = new Set()) {
  if (visited.has(nodeId)) {
    return false;
  }

  const node = nodes.get(nodeId);
  if (!node) {
    return false;
  }

  const nextVisited = new Set(visited);
  nextVisited.add(nodeId);

  return matchesSearch(node) || node.reports.some((reportId) => visibleDescendant(reportId, nodes, nextVisited));
}

function filteredPeople(branch) {
  return personNodes(branch).filter((node) => matchesSearch(node));
}

function isCollapsibleDepartment(nodeId) {
  return /^dept-\d+$/.test(nodeId);
}

function buildParentMap(branch) {
  const parents = new Map();
  branch.nodes.forEach((node) => {
    node.reports.forEach((childId) => {
      parents.set(childId, node.id);
    });
  });
  return parents;
}

function expandPathToNode(branch, nodeId) {
  const parents = buildParentMap(branch);
  let currentId = nodeId;

  while (parents.has(currentId)) {
    const parentId = parents.get(currentId);
    if (isCollapsibleDepartment(parentId)) {
      state.expandedDepartmentIds.add(parentId);
    }
    currentId = parentId;
  }
}

function resetView(branchId = branches[0]?.id) {
  const branch = getBranch(branchId) ?? branches[0];
  if (!branch) {
    return;
  }

  state.activeBranchId = branch.id;
  state.selectedNodeId = branch.rootId;
  state.searchTerm = "";
  state.editStatus = "";
  initializeExpandedDepartments();

  if (elements.search) {
    elements.search.value = "";
  }
}

function selectNode(branchId, nodeId) {
  const branch = getBranch(branchId);
  if (!branch) {
    return;
  }

  state.activeBranchId = branchId;
  state.selectedNodeId = nodeId;
  state.editStatus = "";
  clearActionStatus();
  if (isCollapsibleDepartment(nodeId)) {
    state.expandedDepartmentIds.add(nodeId);
  }
  expandPathToNode(branch, nodeId);
  render();
}

function handleNodeClick(branchId, nodeId) {
  const branch = getBranch(branchId);
  if (!branch) {
    return;
  }

  if (isCollapsibleDepartment(nodeId)) {
    if (state.expandedDepartmentIds.has(nodeId)) {
      state.expandedDepartmentIds.delete(nodeId);
    } else {
      state.expandedDepartmentIds.add(nodeId);
    }

    state.activeBranchId = branchId;
    state.editStatus = "";
    clearActionStatus();
    render();
    return;
  }

  state.activeBranchId = branchId;
  state.selectedNodeId = nodeId;
  state.editStatus = "";
  clearActionStatus();
  expandPathToNode(branch, nodeId);
  render();
}

function renderActionStatus() {
  if (elements.actionStatus) {
    elements.actionStatus.textContent = state.actionStatus;
  }
}

function createHistoryRow(entry = {}) {
  const row = document.createElement("div");
  row.className = "history-row";

  const yearInput = document.createElement("input");
  yearInput.type = "text";
  yearInput.className = "history-year-input";
  yearInput.placeholder = "例: 2018年";
  yearInput.value = normalizeText(entry.year);

  const separator = document.createElement("span");
  separator.className = "history-separator";
  separator.textContent = "〜";

  const locationInput = document.createElement("input");
  locationInput.type = "text";
  locationInput.className = "history-location-input";
  locationInput.placeholder = "例: 西多摩営業所";
  locationInput.value = normalizeText(entry.location);

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "history-remove-button";
  removeButton.textContent = "削除";
  removeButton.addEventListener("click", () => {
    row.remove();
  });

  row.appendChild(yearInput);
  row.appendChild(separator);
  row.appendChild(locationInput);
  row.appendChild(removeButton);
  return row;
}

function renderHistoryRows(container, entries = []) {
  container.innerHTML = "";
  const source = entries.length > 0 ? entries : [{ year: "", location: "" }];
  source.forEach((entry) => {
    container.appendChild(createHistoryRow(entry));
  });
}

function appendHistoryRow(container) {
  container.appendChild(createHistoryRow());
}

function collectHistoryEntries(container) {
  return Array.from(container.querySelectorAll(".history-row"))
    .map((row) => ({
      year: row.querySelector(".history-year-input")?.value.trim() ?? "",
      location: row.querySelector(".history-location-input")?.value.trim() ?? "",
    }))
    .filter((entry) => entry.year || entry.location);
}

function renderHistoryDisplay(target, entries = [], fallback = "未設定") {
  target.innerHTML = "";

  if (entries.length === 0) {
    target.textContent = fallback;
    return;
  }

  entries.forEach((entry) => {
    const line = document.createElement("div");
    line.className = "history-line";
    line.textContent = formatHistoryEntry(entry);
    target.appendChild(line);
  });
}

function toggleEditFormFields(kind) {
  const isPerson = kind === "person";
  elements.editAgeField.hidden = !isPerson;
  elements.editJoinYearField.hidden = !isPerson;
  elements.editTenureField.hidden = !isPerson;
  elements.editHistoryField.hidden = !isPerson;
  elements.editDescriptionField.hidden = isPerson;
}

function renderHeroStats() {
  if (!elements.heroStats) {
    return;
  }

  const totalBranches = branches.length;
  const totalMembers = branches.reduce((sum, branch) => sum + personNodes(branch).length, 0);
  const activeBranch = getActiveBranch();

  elements.heroStats.innerHTML = `
    <article class="stat-card"><span>登録支店</span><strong>${totalBranches}</strong></article>
    <article class="stat-card"><span>全メンバー数</span><strong>${totalMembers}</strong></article>
    <article class="stat-card"><span>${activeBranch.name} の人数</span><strong>${personNodes(activeBranch).length}</strong></article>
  `;
}

function renderBranchTabs() {
  elements.branchTabs.innerHTML = "";

  branches.forEach((branch) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "branch-tab";
    button.role = "tab";
    button.setAttribute("aria-selected", String(branch.id === state.activeBranchId));
    button.textContent = branch.name;
    button.addEventListener("click", () => {
      clearActionStatus();
      resetView(branch.id);
      render();
    });
    elements.branchTabs.appendChild(button);
  });
}

function renderBranchSummary(branch) {
  const peopleCount = personNodes(branch).length;

  elements.branchSummary.innerHTML = `
    <article class="summary-card summary-card-count">
      <span>人数 ${peopleCount}名</span>
    </article>
  `;
}

function shouldRenderChildren(node, nodes) {
  if (node.reports.length === 0) {
    return false;
  }

  if (state.searchTerm.trim()) {
    return node.reports.some((reportId) => visibleDescendant(reportId, nodes));
  }

  if (!isCollapsibleDepartment(node.id)) {
    return true;
  }

  return state.expandedDepartmentIds.has(node.id);
}

function createNode(node, branch, nodes, path = new Set()) {
  const item = document.createElement("li");
  if (path.has(node.id)) {
    item.hidden = true;
    return item;
  }

  const isVisible = matchesSearch(node) || node.reports.some((reportId) => visibleDescendant(reportId, nodes));
  if (!isVisible) {
    item.hidden = true;
    return item;
  }

  const nextPath = new Set(path);
  nextPath.add(node.id);

  const card = document.createElement("button");
  const kindClass = node.kind === "person" ? "person" : "unit";
  const canToggle = isCollapsibleDepartment(node.id);
  const isExpanded = state.expandedDepartmentIds.has(node.id);
  const hasInlineMeta = node.kind === "person" && node.title;
  const isActive = node.id === state.selectedNodeId;
  const isRoot = node.id === branch.rootId;
  const isLeaf = node.reports.length === 0;

  card.type = "button";
  card.className = `node-card ${kindClass}${isActive ? " active" : ""}${isRoot ? " is-root" : ""}${canToggle ? " is-department" : ""}${isLeaf ? " is-leaf" : ""}`;
  card.innerHTML = `
    <div class="node-card-header">
      <div class="node-inline-row${hasInlineMeta ? " has-meta" : ""}">
        ${hasInlineMeta ? `<span class="node-inline-meta">${node.title}</span>` : ""}
        <span class="node-title">${node.name}</span>
      </div>
      ${canToggle ? `<span class="node-toggle-indicator">${isExpanded ? "-" : "+"}</span>` : ""}
    </div>
  `;
  card.addEventListener("click", () => handleNodeClick(branch.id, node.id));
  item.appendChild(card);

  if (shouldRenderChildren(node, nodes)) {
    const children = document.createElement("ul");
    node.reports.forEach((reportId) => {
      const report = nodes.get(reportId);
      if (report) {
        children.appendChild(createNode(report, branch, nodes, nextPath));
      }
    });

    if (Array.from(children.children).some((child) => !child.hidden)) {
      item.appendChild(children);
    }
  }

  return item;
}

function renderOrgChart(branch) {
  const nodes = nodeMap(branch);
  const root = nodes.get(branch.rootId);
  elements.chartTitle.textContent = "組織図";
  elements.orgChart.innerHTML = "";

  if (!root) {
    elements.orgChart.innerHTML = `<div class="empty-state">組織図データがありません。</div>`;
    return;
  }

  const tree = document.createElement("ul");
  tree.appendChild(createNode(root, branch, nodes));

  if (Array.from(tree.children).every((child) => child.hidden)) {
    elements.orgChart.innerHTML = `<div class="empty-state">検索条件に一致する組織がありません。</div>`;
    return;
  }

  const shell = document.createElement("div");
  shell.className = "chart-scale-shell";

  const content = document.createElement("div");
  content.className = "chart-scale-content";
  content.appendChild(tree);

  shell.appendChild(content);
  elements.orgChart.appendChild(shell);
}

function renderMemberGrid(branch) {
  const people = filteredPeople(branch);
  elements.memberGrid.innerHTML = "";

  if (people.length === 0) {
    elements.memberGrid.innerHTML = `<div class="empty-state">該当するメンバーが見つかりません。</div>`;
    return;
  }

  people.forEach((person) => {
    const card = document.createElement("article");
    card.className = `member-card${person.id === state.selectedNodeId ? " active" : ""}`;
    card.innerHTML = `
      <div class="member-inline-row${person.title ? " has-meta" : ""}">
        ${person.title ? `<p class="member-role">${person.title}</p>` : ""}
        <button type="button" class="member-name-button">${person.name}</button>
      </div>
    `;

    card.querySelector(".member-name-button").addEventListener("click", () => selectNode(branch.id, person.id));
    elements.memberGrid.appendChild(card);
  });
}

function renderProfile(branch) {
  const nodes = nodeMap(branch);
  const selected = nodes.get(state.selectedNodeId) ?? nodes.get(branch.rootId);
  if (!selected) {
    elements.profileEmpty.hidden = true;
    elements.profileContent.hidden = true;
    return;
  }

  elements.profileEmpty.hidden = true;
  elements.profileContent.hidden = false;
  elements.profileBranch.textContent = branch.name;
  elements.profileName.textContent = selected.name;
  elements.profileAffiliationRow.hidden = false;
  elements.profileAffiliationValue.textContent = buildAffiliation(branch, selected) || "未設定";

  if (selected.kind === "person") {
    elements.profileRoleRow.hidden = false;
    elements.profileRoleValue.textContent = selected.title || "未設定";
    elements.profilePersonMetaRow.hidden = false;
    elements.profileAgeValue.textContent = selected.age || "未設定";
    elements.profileJoinYearValue.textContent = selected.joinYear || "未設定";
    elements.profileTenureValue.textContent = selected.tenure || "未設定";
    elements.profileDescriptionRow.hidden = false;
    elements.profileDescriptionLabel.textContent = "経歴";
    renderHistoryDisplay(elements.profileDescriptionValue, selected.historyEntries ?? []);
  } else {
    elements.profileRoleRow.hidden = true;
    elements.profilePersonMetaRow.hidden = true;
    elements.profileDescriptionRow.hidden = false;
    elements.profileDescriptionLabel.textContent = isOfficeNode(selected) ? "営業所紹介" : "組織紹介";
    elements.profileDescriptionValue.textContent = selected.description || `${selected.name} の紹介は未設定です。`;
  }

  populateEditForm(selected);
}

function populateEditForm(node) {
  elements.editName.value = node.name ?? "";
  elements.editTitle.value = node.title ?? "";
  elements.editDepartment.value = node.department ?? "";
  elements.editStatus.textContent = state.editStatus;

  if (node.kind === "person") {
    toggleEditFormFields("person");
    elements.editAge.value = node.age ?? "";
    elements.editJoinYear.value = node.joinYear ?? "";
    elements.editTenure.value = node.tenure ?? "";
    renderHistoryRows(elements.editHistoryRows, node.historyEntries ?? []);
    elements.editHistoryFieldLabel.textContent = "経歴";
    elements.editDescription.value = "";
  } else {
    toggleEditFormFields("unit");
    elements.editAge.value = "";
    elements.editJoinYear.value = "";
    elements.editTenure.value = "";
    elements.editDescriptionLabel.textContent = isOfficeNode(node) ? "営業所紹介" : "組織紹介";
    elements.editDescription.value = node.description ?? "";
  }
}

function updateNode(branchId, nodeId, updater) {
  const branch = getBranch(branchId);
  if (!branch) {
    return;
  }

  const index = branch.nodes.findIndex((node) => node.id === nodeId);
  if (index === -1) {
    return;
  }

  branch.nodes[index] = {
    ...branch.nodes[index],
    ...updater,
  };
}

async function handleProfileSave(event) {
  event.preventDefault();

  const branch = getActiveBranch();
  if (!branch) {
    return;
  }

  const nodes = nodeMap(branch);
  const selected = nodes.get(state.selectedNodeId);
  if (!selected) {
    return;
  }

  const updates = {
    name: elements.editName.value.trim() || selected.name,
    title: elements.editTitle.value.trim(),
    department: elements.editDepartment.value.trim() || selected.department,
  };

  if (selected.kind === "person") {
    updates.age = elements.editAge.value.trim();
    updates.joinYear = elements.editJoinYear.value.trim();
    updates.tenure = elements.editTenure.value.trim();
    updates.historyEntries = collectHistoryEntries(elements.editHistoryRows);
  } else {
    updates.description = elements.editDescription.value.trim();
  }

  updateNode(branch.id, selected.id, updates);
  const saved = await saveBranches();
  state.editStatus = saved ? "保存しました。" : "共有データの保存に失敗しました。";
  if (saved) {
    clearActionStatus();
  }
  render();
}

function handleCloseEditPanel() {
  if (elements.profileEditor) {
    elements.profileEditor.open = false;
  }
}

function handleExport() {
  const branch = getActiveBranch();
  const fileDate = new Date().toISOString().slice(0, 10);
  const fileName = `${branch?.name ?? "支店組織図"}-${fileDate}.json`;
  const blob = new Blob([JSON.stringify(buildStoragePayload(), null, 2)], {
    type: "application/json",
  });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);

  setActionStatus("現在のデータを JSON で出力しました。");
  renderActionStatus();
}

async function importBranches(data) {
  const parsedBranches = parseBranches(data);
  if (!parsedBranches) {
    throw new Error("invalid-data");
  }

  branches = parsedBranches;
  resetView(parsedBranches[0].id);
  return saveBranches();
}

async function handleImportFile(event) {
  const [file] = event.target.files ?? [];
  if (!file) {
    return;
  }

  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    const saved = await importBranches(parsed);
    setActionStatus(saved ? `${file.name} を読み込みました。` : `${file.name} は読み込みましたが、共有保存に失敗しました。`);
    render();
  } catch {
    setActionStatus("JSON の読み込みに失敗しました。");
    renderActionStatus();
  } finally {
    event.target.value = "";
  }
}

async function handleReset() {
  const confirmed = window.confirm("編集内容を初期状態に戻します。よろしいですか。");
  if (!confirmed) {
    return;
  }

  branches = cloneBranches(DEFAULT_BRANCHES);
  resetView(branches[0].id);
  const saved = await saveBranches();
  setActionStatus(saved ? "初期状態に戻しました。" : "初期状態には戻しましたが、共有保存に失敗しました。");
  render();
}

function render() {
  const branch = getActiveBranch();
  if (!branch) {
    return;
  }

  renderActionStatus();
  renderHeroStats();
  renderBranchTabs();
  renderBranchSummary(branch);
  renderOrgChart(branch);
  renderMemberGrid(branch);
  renderProfile(branch);
  window.requestAnimationFrame(fitOrgChartToFrame);
}

function fitOrgChartToFrame() {
  const frame = elements.chartFrame;
  const shell = elements.orgChart.querySelector(".chart-scale-shell");
  const content = elements.orgChart.querySelector(".chart-scale-content");
  const tree = content?.querySelector("ul");

  if (!frame || !shell || !content || !tree) {
    return;
  }

  content.style.transform = "scale(1)";
  shell.style.height = "auto";
  shell.style.width = "";
  shell.style.minWidth = "";
  content.style.transformOrigin = "";

  const isMobile = window.matchMedia("(max-width: 720px)").matches;
  const treeRect = tree.getBoundingClientRect();

  if (isMobile) {
    shell.style.width = "max-content";
    shell.style.minWidth = "100%";
    content.style.transformOrigin = "top center";
    shell.style.height = `${Math.ceil(treeRect.height)}px`;

    const maxScrollLeft = Math.max(shell.scrollWidth - frame.clientWidth, 0);
    frame.scrollLeft = Math.round(maxScrollLeft / 2);
    return;
  }

  const frameWidth = Math.max(frame.clientWidth - 20, 0);
  const treeWidth = treeRect.width;
  const treeHeight = treeRect.height;
  const scale = treeWidth > frameWidth && treeWidth > 0 ? frameWidth / treeWidth : 1;

  content.style.transform = `scale(${scale})`;
  shell.style.height = `${Math.ceil(treeHeight * scale)}px`;
}

async function initializeApp() {
  render();

  if (persistence.mode !== "server") {
    return;
  }

  try {
    const serverBranches = await loadServerBranches();
    branches = serverBranches;
    persistence.serverReachable = true;
    resetView(branches[0]?.id);
    setActionStatus("共有データに接続しました。");
    render();
  } catch {
    persistence.mode = "local";
    persistence.serverReachable = false;
    setActionStatus("共有サーバーに接続できないため、このPCの保存データで表示しています。");
    renderActionStatus();
  }
}

elements.search.addEventListener("input", (event) => {
  state.searchTerm = event.target.value;
  clearActionStatus();
  render();
});

if (elements.exportButton) {
  elements.exportButton.addEventListener("click", handleExport);
}

if (elements.importButton && elements.importFileInput) {
  elements.importButton.addEventListener("click", () => {
    elements.importFileInput.click();
  });
  elements.importFileInput.addEventListener("change", handleImportFile);
}

if (elements.resetButton) {
  elements.resetButton.addEventListener("click", handleReset);
}

elements.addEditHistoryRow.addEventListener("click", () => {
  appendHistoryRow(elements.editHistoryRows);
});
elements.profileForm.addEventListener("submit", handleProfileSave);
if (elements.closeEditPanel) {
  elements.closeEditPanel.addEventListener("click", handleCloseEditPanel);
}
window.addEventListener("resize", () => {
  window.requestAnimationFrame(fitOrgChartToFrame);
});

initializeApp();

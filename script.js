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
        reports: ["office-101-mera"],
      },
      {
        id: "office-101-mera",
        kind: "person",
        name: "米良",
        title: "所長",
        department: "武蔵野",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
        reports: ["office-101-nakane"],
      },
      {
        id: "office-101-nakane",
        kind: "person",
        name: "中根",
        title: "係長",
        department: "武蔵野",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
        reports: ["office-101-toshida"],
      },
      {
        id: "office-101-toshida",
        kind: "person",
        name: "土志田",
        title: "スタッフ",
        department: "武蔵野",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
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
        reports: ["office-102-suzuki"],
      },
      {
        id: "office-102-suzuki",
        kind: "person",
        name: "鈴木",
        title: "所長",
        department: "安曇野",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
        reports: ["office-102-yamagata", "office-102-fujii", "office-102-miyake"],
      },
      {
        id: "office-102-yamagata",
        kind: "person",
        name: "山縣",
        title: "スタッフ",
        department: "安曇野",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
        reports: [],
      },
      {
        id: "office-102-fujii",
        kind: "person",
        name: "藤井",
        title: "スタッフ",
        department: "安曇野",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
        reports: [],
      },
      {
        id: "office-102-miyake",
        kind: "person",
        name: "三宅",
        title: "スタッフ",
        department: "安曇野",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
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
        reports: ["office-104-mitsui"],
      },
      {
        id: "office-104-mitsui",
        kind: "person",
        name: "三井",
        title: "所長",
        department: "白州",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
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
        reports: ["office-105-manaka"],
      },
      {
        id: "office-105-manaka",
        kind: "person",
        name: "真中",
        title: "所長",
        department: "白州水",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
        reports: ["office-105-suzuki"],
      },
      {
        id: "office-105-suzuki",
        kind: "person",
        name: "鈴木",
        title: "係長",
        department: "白州水",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
        reports: ["office-105-endo"],
      },
      {
        id: "office-105-endo",
        kind: "person",
        name: "遠藤",
        title: "スタッフ",
        department: "白州水",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
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
        reports: ["office-201-negi"],
      },
      {
        id: "office-201-negi",
        kind: "person",
        name: "根木",
        title: "所長",
        department: "栃木北",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
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
        reports: ["office-203-miki"],
      },
      {
        id: "office-203-miki",
        kind: "person",
        name: "三喜",
        title: "所長",
        department: "羽生とちぎ",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
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
        reports: ["office-204-kitou"],
      },
      {
        id: "office-204-kitou",
        kind: "person",
        name: "鬼頭",
        title: "スタッフ",
        department: "群馬",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
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
        reports: ["office-205-hiroyama"],
      },
      {
        id: "office-205-hiroyama",
        kind: "person",
        name: "弘山",
        title: "所長",
        department: "渋川",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
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
        reports: ["office-206-kataoka"],
      },
      {
        id: "office-206-kataoka",
        kind: "person",
        name: "片岡",
        title: "所長",
        department: "利根川",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
        reports: ["office-206-maezawa"],
      },
      {
        id: "office-206-maezawa",
        kind: "person",
        name: "前澤",
        title: "係長",
        department: "利根川",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
        reports: ["office-206-shinyashiki"],
      },
      {
        id: "office-206-shinyashiki",
        kind: "person",
        name: "新屋敷",
        title: "スタッフ",
        department: "利根川",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
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
        reports: ["office-301-nishi"],
      },
      {
        id: "office-301-nishi",
        kind: "person",
        name: "西",
        title: "所長",
        department: "群馬藤岡",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
        reports: ["office-301-watanabe"],
      },
      {
        id: "office-301-watanabe",
        kind: "person",
        name: "渡辺",
        title: "副長",
        department: "群馬藤岡",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
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
        reports: ["office-302-nishihata"],
      },
      {
        id: "office-302-nishihata",
        kind: "person",
        name: "西畑",
        title: "所長",
        department: "海老名流通",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
        reports: ["office-302-nose"],
      },
      {
        id: "office-302-nose",
        kind: "person",
        name: "能勢",
        title: "スタッフ",
        department: "海老名流通",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
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
        reports: ["office-303-kawai"],
      },
      {
        id: "office-303-kawai",
        kind: "person",
        name: "川井",
        title: "所長",
        department: "北関東流通",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
        reports: ["office-303-nakahara", "office-303-ikeda", "office-303-sato"],
      },
      {
        id: "office-303-nakahara",
        kind: "person",
        name: "中原",
        title: "副長",
        department: "北関東流通",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
        reports: [],
      },
      {
        id: "office-303-ikeda",
        kind: "person",
        name: "池田",
        title: "副長",
        department: "北関東流通",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
        reports: [],
      },
      {
        id: "office-303-sato",
        kind: "person",
        name: "佐藤",
        title: "スタッフ",
        department: "北関東流通",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
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
        reports: ["office-304-onishi-chief"],
      },
      {
        id: "office-304-onishi-chief",
        kind: "person",
        name: "大西",
        title: "所長",
        department: "神奈川綾瀬",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
        reports: ["office-304-taira"],
      },
      {
        id: "office-304-taira",
        kind: "person",
        name: "平良",
        title: "スタッフ",
        department: "神奈川綾瀬",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
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
        reports: ["office-305-yasuda"],
      },
      {
        id: "office-305-yasuda",
        kind: "person",
        name: "安田",
        title: "所長",
        department: "国立流通",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
        reports: ["office-305-kurishima"],
      },
      {
        id: "office-305-kurishima",
        kind: "person",
        name: "栗嶋",
        title: "副長",
        department: "国立流通",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
        reports: ["office-305-tajiri"],
      },
      {
        id: "office-305-tajiri",
        kind: "person",
        name: "田尻",
        title: "係長",
        department: "国立流通",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
        reports: ["office-305-seki"],
      },
      {
        id: "office-305-seki",
        kind: "person",
        name: "関",
        title: "スタッフ",
        department: "国立流通",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
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
        reports: ["office-306-hara"],
      },
      {
        id: "office-306-hara",
        kind: "person",
        name: "原",
        title: "所長",
        department: "青梅流通",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
        reports: ["office-306-kishikawa"],
      },
      {
        id: "office-306-kishikawa",
        kind: "person",
        name: "岸川",
        title: "係長",
        department: "青梅流通",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
        reports: ["office-306-onishi"],
      },
      {
        id: "office-306-onishi",
        kind: "person",
        name: "大西",
        title: "スタッフ",
        department: "青梅流通",
        age: "",
        tenure: "",
        history: "",
        hobbies: [],
        tags: [],
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

function splitNameParts(name, explicitLastName = "", explicitFirstName = "") {
  const lastName = normalizeText(explicitLastName);
  const firstName = normalizeText(explicitFirstName);

  if (lastName || firstName) {
    return { lastName, firstName };
  }

  const normalizedName = normalizeText(name);
  if (!normalizedName) {
    return { lastName: "", firstName: "" };
  }

  const parts = normalizedName.split(/\s+/).filter(Boolean);
  if (parts.length <= 1) {
    return { lastName: normalizedName, firstName: "" };
  }

  return {
    lastName: parts.shift() ?? "",
    firstName: parts.join(" "),
  };
}

function buildDisplayName(lastName, firstName, fallbackName = "") {
  const combined = [normalizeText(lastName), normalizeText(firstName)].filter(Boolean).join(" ");
  return combined || normalizeText(fallbackName);
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

function isCreateTargetNode(branch, node) {
  return Boolean(node) && (node.id === branch?.rootId || node.kind === "unit");
}

function parseNumericValue(value) {
  const matched = normalizeText(value).match(/\d+/);
  return matched ? Number(matched[0]) : -1;
}

function roleWeight(title) {
  const normalized = normalizeText(title);
  if (!normalized) {
    return 0;
  }

  if (normalized.includes("支店長")) {
    return 7;
  }
  if (normalized.includes("副支店長")) {
    return 6;
  }
  if (normalized.includes("部長") || normalized.includes("署長")) {
    return 5;
  }
  if (normalized.includes("所長")) {
    return 4;
  }
  if (normalized.includes("副長")) {
    return 3;
  }
  if (normalized.includes("係長")) {
    return 2;
  }
  if (normalized.includes("スタッフ")) {
    return 1;
  }
  return 0;
}

function comparePeopleForDisplay(leftNode, rightNode) {
  return (
    roleWeight(rightNode?.title) - roleWeight(leftNode?.title) ||
    parseNumericValue(rightNode?.age) - parseNumericValue(leftNode?.age) ||
    normalizeText(leftNode?.name).localeCompare(normalizeText(rightNode?.name), "ja")
  );
}

function createTargetNodes(branch) {
  const nodes = nodeMap(branch);
  const targets = [];
  const root = nodes.get(branch.rootId);

  if (root) {
    targets.push(root);
  }

  branch.nodes.forEach((node) => {
    if (node.id !== branch.rootId && node.kind === "unit") {
      targets.push(node);
    }
  });

  return targets;
}

function createTargetLabel(branch, node) {
  if (!node) {
    return "";
  }

  return node.id === branch.rootId ? branch.name : node.name;
}

function sortReportIdsForDisplay(node, nodes) {
  const reports = node.reports
    .map((reportId, index) => ({
      reportId,
      index,
      report: nodes.get(reportId),
    }))
    .filter((entry) => entry.report);

  if (reports.length === 0) {
    return [];
  }

  const allPeople = reports.every((entry) => entry.report.kind === "person");
  if (!allPeople) {
    return reports.map((entry) => entry.reportId);
  }

  return reports
    .sort((left, right) => comparePeopleForDisplay(left.report, right.report) || left.index - right.index)
    .map((entry) => entry.reportId);
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
  const nameParts = splitNameParts(node?.name, node?.lastName, node?.firstName);
  const normalized = {
    id: normalizeText(node?.id) || `node-${index + 1}`,
    kind,
    name: buildDisplayName(nameParts.lastName, nameParts.firstName, node?.name) || "未設定",
    title: normalizeText(node?.title),
    department: normalizeText(node?.department),
    tags: normalizeStringArray(node?.tags),
    reports: normalizeReports(node?.reports),
  };

  if (kind === "person") {
    normalized.lastName = nameParts.lastName;
    normalized.firstName = nameParts.firstName;
    const joinYear = normalizeText(node?.joinYear);
    const rawAge = normalizeText(node?.age);
    const looksLikeJoinYear = /^(?:19|20)\d{2}(?:年)?$/.test(rawAge);
    normalized.age = looksLikeJoinYear && !joinYear ? "" : rawAge;
    normalized.joinYear = joinYear || (looksLikeJoinYear ? rawAge : "");
    normalized.tenure = normalizeText(node?.tenure);
    normalized.historyEntries = normalizeHistoryEntries(node?.historyEntries, node?.history);
    normalized.hobbies = normalizeStringArray(node?.hobbies);
    normalized.photo = normalizeText(node?.photo);
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

function parseUpdatedAt(value) {
  const timestamp = Date.parse(normalizeText(value));
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function loadStoredPayload() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function loadBranches(payload = null) {
  return parseBranches(payload) ?? parseBranches(DEFAULT_BRANCHES) ?? cloneBranches(DEFAULT_BRANCHES);
}

const storedPayload = loadStoredPayload();
let branches = loadBranches(storedPayload);
const initialBranch = branches[0] ?? { id: "", rootId: "" };
const persistence = {
  mode: window.location.protocol === "file:" ? "local" : "server",
  serverReachable: false,
  localUpdatedAt: normalizeText(storedPayload?.updatedAt),
  serverUpdatedAt: "",
};

const state = {
  activeBranchId: initialBranch.id,
  selectedNodeId: initialBranch.rootId,
  searchTerm: "",
  expandedDepartmentIds: new Set(),
  editStatus: "",
  createStatus: "",
  actionStatus: "",
};

const elements = {
  branchTabs: document.getElementById("branchTabs"),
  heroStats: document.getElementById("heroStats"),
  branchSummary: document.getElementById("branchSummary"),
  chartFrame: document.querySelector(".chart-frame"),
  chartTitle: document.getElementById("chartTitle"),
  orgChart: document.getElementById("orgChart"),
  excelExportButton: document.getElementById("excelExportButton"),
  excelImportButton: document.getElementById("excelImportButton"),
  resetButton: document.getElementById("resetButton"),
  excelImportInput: document.getElementById("excelImportInput"),
  actionStatus: document.getElementById("actionStatus"),
  memberGrid: document.getElementById("memberGrid"),
  search: document.getElementById("memberSearch"),
  profileEmpty: document.getElementById("profileEmpty"),
  profileContent: document.getElementById("profileContent"),
  profileBranch: document.getElementById("profileBranch"),
  profilePhoto: document.getElementById("profilePhoto"),
  profilePhotoImage: document.getElementById("profilePhotoImage"),
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
  editLastName: document.getElementById("editLastName"),
  editFirstName: document.getElementById("editFirstName"),
  editTitle: document.getElementById("editTitle"),
  editDepartment: document.getElementById("editDepartment"),
  editPhotoField: document.getElementById("editPhotoField"),
  editPhoto: document.getElementById("editPhoto"),
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
  profileCreator: document.getElementById("profileCreator"),
  createParentHint: document.getElementById("createParentHint"),
  createForm: document.getElementById("createForm"),
  createOffice: document.getElementById("createOffice"),
  createParent: document.getElementById("createParent"),
  createLastName: document.getElementById("createLastName"),
  createFirstName: document.getElementById("createFirstName"),
  createTitle: document.getElementById("createTitle"),
  createDepartment: document.getElementById("createDepartment"),
  createPhoto: document.getElementById("createPhoto"),
  createAge: document.getElementById("createAge"),
  createJoinYear: document.getElementById("createJoinYear"),
  createTenure: document.getElementById("createTenure"),
  createStatus: document.getElementById("createStatus"),
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
    const payload = buildStoragePayload();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    persistence.localUpdatedAt = payload.updatedAt;
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
    return {
      branches: parsedBranches,
      updatedAt: normalizeText(payload?.updatedAt),
    };
  }

  if (payload && typeof payload === "object" && Array.isArray(payload.branches) && payload.branches.length === 0) {
    return {
      branches: parseBranches(DEFAULT_BRANCHES) ?? cloneBranches(DEFAULT_BRANCHES),
      updatedAt: normalizeText(payload?.updatedAt),
    };
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

function createNodeId(branch, prefix = "person") {
  const existingIds = new Set(branch.nodes.map((node) => node.id));
  const seed = Date.now().toString(36);
  let counter = 1;
  let candidate = `${prefix}-${seed}`;

  while (existingIds.has(candidate)) {
    candidate = `${prefix}-${seed}-${counter}`;
    counter += 1;
  }

  return candidate;
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
  return personNodes(branch)
    .filter((node) => matchesSearch(node))
    .sort(comparePeopleForDisplay);
}

function isCollapsibleDepartment(nodeId) {
  return /^dept-\d+$/.test(nodeId);
}

function isCollapsibleUnitNode(node) {
  return node?.kind === "unit" && (node.reports?.length ?? 0) > 0;
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

function officeNodes(branch) {
  return branch.nodes.filter((node) => isOfficeNode(node));
}

function defaultCreateTarget(branch) {
  return createTargetNodes(branch)[0] ?? null;
}

function findOfficeForNode(branch, nodeId) {
  const nodes = nodeMap(branch);
  const parents = buildParentMap(branch);
  let currentId = nodeId;

  while (currentId) {
    const currentNode = nodes.get(currentId);
    if (isOfficeNode(currentNode)) {
      return currentNode;
    }
    currentId = parents.get(currentId);
  }

  return null;
}

function findFirstOfficeDescendant(branch, nodeId) {
  const nodes = nodeMap(branch);
  const queue = [...(nodes.get(nodeId)?.reports ?? [])];

  while (queue.length > 0) {
    const currentId = queue.shift();
    const currentNode = nodes.get(currentId);
    if (!currentNode) {
      continue;
    }
    if (isOfficeNode(currentNode)) {
      return currentNode;
    }
    queue.push(...currentNode.reports);
  }

  return null;
}

function findCreateTargetForNode(branch, nodeId) {
  const nodes = nodeMap(branch);
  const parents = buildParentMap(branch);
  let currentId = nodeId;

  while (currentId) {
    const currentNode = nodes.get(currentId);
    if (isCreateTargetNode(branch, currentNode)) {
      return currentNode;
    }
    currentId = parents.get(currentId);
  }

  return nodes.get(branch.rootId) ?? null;
}

function findFirstCreateTargetDescendant(branch, nodeId) {
  const nodes = nodeMap(branch);
  const queue = [...(nodes.get(nodeId)?.reports ?? [])];

  while (queue.length > 0) {
    const currentId = queue.shift();
    const currentNode = nodes.get(currentId);
    if (!currentNode) {
      continue;
    }
    if (isCreateTargetNode(branch, currentNode)) {
      return currentNode;
    }
    queue.push(...currentNode.reports);
  }

  return null;
}

function createDepartmentName(branch, targetNode, parentNode = null) {
  if (parentNode?.kind === "person" && parentNode.department) {
    return parentNode.department;
  }

  const office = parentNode?.kind === "person"
    ? findOfficeForNode(branch, parentNode.id)
    : (isOfficeNode(targetNode) ? targetNode : findOfficeForNode(branch, targetNode?.id));

  if (office?.name) {
    return office.name;
  }

  return targetNode?.id === branch.rootId ? branch.name : normalizeText(targetNode?.name);
}

function listCreateParentOptions(branch, targetId) {
  const nodes = nodeMap(branch);
  const targetNode = nodes.get(targetId);
  if (!targetNode) {
    return [];
  }

  const baseLabel = createTargetLabel(branch, targetNode);
  const options = [{ value: targetNode.id, label: `${baseLabel} 直下` }];

  const visit = (nodeId, depth = 1) => {
    const currentNode = nodes.get(nodeId);
    if (!currentNode) {
      return;
    }

    currentNode.reports.forEach((childId) => {
      const childNode = nodes.get(childId);
      if (!childNode) {
        return;
      }

      if (childNode.kind === "person") {
        options.push({
          value: childNode.id,
          label: `${"　".repeat(depth)}${childNode.name}`,
        });
      }

      visit(childNode.id, childNode.kind === "person" ? depth + 1 : depth);
    });
  };

  visit(targetNode.id);
  return options;
}

function setSelectOptions(select, options, preferredValue = "") {
  if (!select) {
    return "";
  }

  select.innerHTML = "";
  options.forEach((option) => {
    const element = document.createElement("option");
    element.value = option.value;
    element.textContent = option.label;
    select.appendChild(element);
  });

  const selectedValue = options.some((option) => option.value === preferredValue)
    ? preferredValue
    : (options[0]?.value ?? "");
  select.value = selectedValue;
  return selectedValue;
}

function syncCreateParentOptions(branch, targetId, preferredParentId = "") {
  const targets = createTargetNodes(branch);
  const fallbackTarget = targets[0] ?? null;
  const resolvedTargetId = targetId || fallbackTarget?.id || "";
  const targetNode = branch.nodes.find((node) => node.id === resolvedTargetId) ?? fallbackTarget;

  if (!targetNode) {
    if (elements.createParent) {
      elements.createParent.innerHTML = "";
    }
    if (elements.createDepartment) {
      elements.createDepartment.value = "";
      elements.createDepartment.placeholder = "所属";
    }
    if (elements.createParentHint) {
      elements.createParentHint.textContent = "追加先を選択してください。";
    }
    return;
  }

  const parentOptions = listCreateParentOptions(branch, targetNode.id);
  const selectedParentId = setSelectOptions(elements.createParent, parentOptions, preferredParentId || targetNode.id);
  const nodes = nodeMap(branch);
  const parentNode = nodes.get(selectedParentId) ?? targetNode;
  const departmentName = createDepartmentName(branch, targetNode, parentNode);

  if (elements.createOffice) {
    elements.createOffice.value = targetNode.id;
  }
  if (elements.createDepartment) {
    elements.createDepartment.value = departmentName;
    elements.createDepartment.placeholder = departmentName || "所属";
  }
  if (elements.createParentHint) {
    const selectedParentLabel = parentOptions.find((option) => option.value === selectedParentId)?.label ?? createTargetLabel(branch, targetNode);
    elements.createParentHint.textContent = `${createTargetLabel(branch, targetNode)} の ${selectedParentLabel.trim()} に追加します。`;
  }
}

function expandPathToNode(branch, nodeId) {
  const parents = buildParentMap(branch);
  const nodes = nodeMap(branch);
  let currentId = nodeId;

  while (parents.has(currentId)) {
    const parentId = parents.get(currentId);
    if (isCollapsibleUnitNode(nodes.get(parentId))) {
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
  state.createStatus = "";
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
  state.createStatus = "";
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

  const node = branch.nodes.find((currentNode) => currentNode.id === nodeId);
  if (!node) {
    return;
  }

  if (isCollapsibleUnitNode(node)) {
    if (state.expandedDepartmentIds.has(nodeId)) {
      state.expandedDepartmentIds.delete(nodeId);
    } else {
      state.expandedDepartmentIds.add(nodeId);
    }

    state.activeBranchId = branchId;
    state.editStatus = "";
    state.createStatus = "";
    clearActionStatus();
    render();
    return;
  }

  if (node.kind === "unit") {
    return;
  }

  state.activeBranchId = branchId;
  state.selectedNodeId = nodeId;
  state.editStatus = "";
  state.createStatus = "";
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

function parseHistoryText(value) {
  return normalizeText(value)
    .split(/\r?\n|\s*\|\s*/)
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const matched = entry.match(/^(.+?)[〜~]\s*(.+)$/);
      if (matched) {
        return {
          year: normalizeText(matched[1]),
          location: normalizeText(matched[2]),
        };
      }

      return {
        year: "",
        location: entry,
      };
    });
}

function serializeHistoryEntries(entries = []) {
  return entries
    .map((entry) => formatHistoryEntry(entry))
    .filter(Boolean)
    .join(" | ");
}

function readImageFileAsDataUrl(file) {
  if (!file) {
    return Promise.resolve("");
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => reject(new Error("image-read-failed"));
    reader.readAsDataURL(file);
  });
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
  if (elements.editPhotoField) {
    elements.editPhotoField.hidden = !isPerson;
  }
  elements.editAgeField.hidden = !isPerson;
  elements.editJoinYearField.hidden = !isPerson;
  elements.editTenureField.hidden = !isPerson;
  elements.editHistoryField.hidden = !isPerson;
  elements.editDescriptionField.hidden = true;
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

  if (!isCollapsibleUnitNode(node)) {
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
  const canToggle = isCollapsibleUnitNode(node);
  const isExpanded = state.expandedDepartmentIds.has(node.id);
  const hasInlineMeta = node.kind === "person" && node.title;
  const isActive = node.id === state.selectedNodeId;
  const isRoot = node.id === branch.rootId;
  const isLeaf = node.reports.length === 0;
  const toneClass = node.kind === "person" && !isRoot ? ` role-tone-${roleWeight(node.title)}` : "";

  card.type = "button";
  card.className = `node-card ${kindClass}${isActive ? " active" : ""}${isRoot ? " is-root" : ""}${canToggle ? " is-department" : ""}${isLeaf ? " is-leaf" : ""}${toneClass}`;
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
    const reportIds = sortReportIdsForDisplay(node, nodes);
    const allPeopleChildren = reportIds.length > 0 && reportIds.every((reportId) => nodes.get(reportId)?.kind === "person");
    if (allPeopleChildren) {
      children.classList.add("vertical-children");
    }

    reportIds.forEach((reportId) => {
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
  if (elements.profileBranch) {
    elements.profileBranch.textContent = branch.name;
  }
  elements.profileName.textContent = selected.name;
  elements.profileName.title = selected.name;
  if (elements.profilePhoto && elements.profilePhotoImage) {
    if (selected.kind === "person" && selected.photo) {
      elements.profilePhoto.hidden = false;
      elements.profilePhotoImage.src = selected.photo;
      elements.profilePhotoImage.alt = `${selected.name} の顔写真`;
    } else {
      elements.profilePhoto.hidden = true;
      elements.profilePhotoImage.removeAttribute("src");
      elements.profilePhotoImage.alt = "";
    }
  }
  elements.profileAffiliationRow.hidden = false;
  elements.profileAffiliationRow.classList.remove("full");
  const affiliation = buildAffiliation(branch, selected) || "未設定";
  elements.profileAffiliationValue.textContent = affiliation;
  elements.profileAffiliationValue.title = affiliation;

  if (selected.kind === "person") {
    elements.profileRoleRow.hidden = false;
    elements.profileRoleRow.classList.remove("full");
    const roleText = selected.title || "未設定";
    elements.profileRoleValue.textContent = roleText;
    elements.profileRoleValue.title = roleText;
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
    elements.profileAffiliationRow.classList.add("full");
    elements.profileDescriptionRow.hidden = true;
    elements.profileDescriptionValue.textContent = "";
  }

  populateEditForm(selected);
  populateCreateForm(branch, selected);
}

function populateEditForm(node) {
  const nameParts = splitNameParts(node.name, node.lastName, node.firstName);
  elements.editLastName.value = nameParts.lastName;
  elements.editFirstName.value = nameParts.firstName;
  elements.editTitle.value = node.title ?? "";
  elements.editDepartment.value = node.department ?? "";
  if (elements.editPhoto) {
    elements.editPhoto.value = "";
  }
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
    elements.editDescription.value = node.description ?? "";
  }
}

function clearCreateFormFields() {
  if (!elements.createForm) {
    return;
  }

  elements.createForm.reset();
  if (elements.createDepartment) {
    elements.createDepartment.value = "";
  }
}

function populateCreateForm(branch, node) {
  if (!elements.createParentHint || !elements.createDepartment || !elements.createStatus || !elements.createOffice) {
    return;
  }

  const targets = createTargetNodes(branch);
  const defaultTarget = isCreateTargetNode(branch, node)
    ? node
    : findCreateTargetForNode(branch, node.id) ?? findFirstCreateTargetDescendant(branch, node.id) ?? defaultCreateTarget(branch);
  const defaultParentId = node.kind === "person" ? node.id : defaultTarget?.id ?? "";

  setSelectOptions(
    elements.createOffice,
    targets.map((targetNode) => ({
      value: targetNode.id,
      label: createTargetLabel(branch, targetNode),
    })),
    defaultTarget?.id ?? ""
  );
  syncCreateParentOptions(branch, elements.createOffice.value, defaultParentId);
  elements.createStatus.textContent = state.createStatus;
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

  const lastName = elements.editLastName.value.trim();
  const firstName = elements.editFirstName.value.trim();
  const displayName = buildDisplayName(lastName, firstName, selected.name) || selected.name;

  if (selected.kind === "person" && !displayName) {
    state.editStatus = "氏名を入力してください。";
    render();
    return;
  }

  const updates = {
    name: displayName,
    title: elements.editTitle.value.trim(),
    department: elements.editDepartment.value.trim() || selected.department,
  };

  if (selected.kind === "person") {
    updates.lastName = lastName;
    updates.firstName = firstName;
    updates.age = elements.editAge.value.trim();
    updates.joinYear = elements.editJoinYear.value.trim();
    updates.tenure = elements.editTenure.value.trim();
    updates.historyEntries = collectHistoryEntries(elements.editHistoryRows);
    const nextPhoto = await readImageFileAsDataUrl(elements.editPhoto?.files?.[0]);
    updates.photo = nextPhoto || selected.photo || "";
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

async function handleCreatePerson(event) {
  event.preventDefault();

  const branch = getActiveBranch();
  if (!branch) {
    return;
  }

  const nodes = nodeMap(branch);
  const targetId = elements.createOffice?.value.trim() ?? "";
  const targetNode = nodes.get(targetId);
  if (!targetNode) {
    state.createStatus = "追加先を選択してください。";
    render();
    return;
  }

  const parentId = elements.createParent?.value.trim() || targetNode.id;
  const parent = nodes.get(parentId) ?? targetNode;
  if (!parent) {
    return;
  }

  const parentIndex = branch.nodes.findIndex((node) => node.id === parent.id);
  if (parentIndex === -1) {
    return;
  }

  const lastName = elements.createLastName?.value.trim() ?? "";
  const firstName = elements.createFirstName?.value.trim() ?? "";
  const name = buildDisplayName(lastName, firstName);
  if (!name) {
    state.createStatus = "氏名を入力してください。";
    render();
    return;
  }

  const photo = await readImageFileAsDataUrl(elements.createPhoto?.files?.[0]);

  const newNode = {
    id: createNodeId(branch, "person"),
    kind: "person",
    name,
    lastName,
    firstName,
    title: elements.createTitle?.value.trim() ?? "",
    department:
      elements.createDepartment?.value.trim() ||
      createDepartmentName(branch, targetNode, parent),
    age: elements.createAge?.value.trim() ?? "",
    joinYear: elements.createJoinYear?.value.trim() ?? "",
    tenure: elements.createTenure?.value.trim() ?? "",
    historyEntries: [],
    tags: [],
    reports: [],
    photo,
  };

  branch.nodes[parentIndex] = {
    ...branch.nodes[parentIndex],
    reports: [...branch.nodes[parentIndex].reports, newNode.id],
  };
  branch.nodes.push(newNode);

  state.selectedNodeId = newNode.id;
  expandPathToNode(branch, newNode.id);

  const saved = await saveBranches();
  state.createStatus = saved ? "新規追加しました。" : "共有データの保存に失敗しました。";
  if (saved) {
    clearActionStatus();
    clearCreateFormFields();
    if (elements.profileCreator) {
      elements.profileCreator.open = false;
    }
  }
  render();
}

function handleCloseEditPanel() {
  if (elements.profileEditor) {
    elements.profileEditor.open = false;
  }
}

function isDescendantOf(branch, nodeId, ancestorId) {
  if (!nodeId || !ancestorId) {
    return false;
  }
  if (nodeId === ancestorId) {
    return true;
  }

  const parents = buildParentMap(branch);
  let currentId = nodeId;

  while (parents.has(currentId)) {
    currentId = parents.get(currentId);
    if (currentId === ancestorId) {
      return true;
    }
  }

  return false;
}

function addChildToParent(branch, parentId, childId) {
  const parentIndex = branch.nodes.findIndex((node) => node.id === parentId);
  if (parentIndex === -1) {
    return;
  }

  const parent = branch.nodes[parentIndex];
  if (parent.reports.includes(childId)) {
    return;
  }

  branch.nodes[parentIndex] = {
    ...parent,
    reports: [...parent.reports, childId],
  };
}

function removeChildFromParent(branch, parentId, childId) {
  const parentIndex = branch.nodes.findIndex((node) => node.id === parentId);
  if (parentIndex === -1) {
    return;
  }

  const parent = branch.nodes[parentIndex];
  branch.nodes[parentIndex] = {
    ...parent,
    reports: parent.reports.filter((reportId) => reportId !== childId),
  };
}

function moveNodeToParent(branch, childId, nextParentId) {
  const parents = buildParentMap(branch);
  const currentParentId = parents.get(childId);

  if (currentParentId === nextParentId) {
    return;
  }

  if (currentParentId) {
    removeChildFromParent(branch, currentParentId, childId);
  }
  addChildToParent(branch, nextParentId, childId);
}

function csvEscape(value) {
  const normalized = String(value ?? "");
  if (/[",\r\n]/.test(normalized)) {
    return `"${normalized.replace(/"/g, "\"\"")}"`;
  }
  return normalized;
}

function stringifyCsv(rows) {
  return rows.map((row) => row.map((value) => csvEscape(value)).join(",")).join("\r\n");
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let index = 0;
  let inQuotes = false;

  while (index < text.length) {
    const character = text[index];

    if (inQuotes) {
      if (character === "\"") {
        if (text[index + 1] === "\"") {
          value += "\"";
          index += 1;
        } else {
          inQuotes = false;
        }
      } else {
        value += character;
      }
    } else if (character === "\"") {
      inQuotes = true;
    } else if (character === ",") {
      row.push(value);
      value = "";
    } else if (character === "\n") {
      row.push(value.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      value = "";
    } else {
      value += character;
    }

    index += 1;
  }

  if (value || row.length > 0) {
    row.push(value.replace(/\r$/, ""));
    rows.push(row);
  }

  return rows.filter((currentRow) => currentRow.some((cell) => normalizeText(cell)));
}

function csvToObjects(text) {
  const rows = parseCsv(text.replace(/^\uFEFF/, ""));
  if (rows.length === 0) {
    return [];
  }

  const headers = rows[0].map((header) => normalizeText(header));
  return rows.slice(1).map((row) => {
    const entry = {};
    headers.forEach((header, columnIndex) => {
      entry[header] = normalizeText(row[columnIndex] ?? "");
    });
    return entry;
  });
}

function findOfficeFromRow(branch, row, existingNode = null) {
  const officeId = normalizeText(row["営業所ID"]);
  if (officeId) {
    const officeById = branch.nodes.find((node) => node.id === officeId && isOfficeNode(node));
    if (officeById) {
      return officeById;
    }
  }

  const officeName = normalizeText(row["営業所名"]);
  if (officeName) {
    const officeByName = branch.nodes.find((node) => isOfficeNode(node) && node.name === officeName);
    if (officeByName) {
      return officeByName;
    }
  }

  return existingNode ? findOfficeForNode(branch, existingNode.id) : null;
}

function resolveParentFromRow(branch, row, office) {
  const parentId = normalizeText(row["親ID"]);
  if (parentId) {
    const parentById = branch.nodes.find((node) => node.id === parentId);
    if (parentById && isDescendantOf(branch, parentById.id, office.id)) {
      return parentById;
    }
  }

  const parentName = normalizeText(row["親名"]);
  if (parentName) {
    const parentByName = branch.nodes.find((node) => node.name === parentName && isDescendantOf(branch, node.id, office.id));
    if (parentByName) {
      return parentByName;
    }
  }

  return office;
}

function buildExcelRows(branch) {
  const nodes = nodeMap(branch);
  const parents = buildParentMap(branch);

  return personNodes(branch).map((person) => {
    const parent = nodes.get(parents.get(person.id));
    const office = findOfficeForNode(branch, person.id);

    return [
      branch.id,
      branch.name,
      person.id,
      person.lastName ?? "",
      person.firstName ?? "",
      person.title ?? "",
      person.department ?? "",
      person.age ?? "",
      person.tenure ?? "",
      person.joinYear ?? "",
      office?.id ?? "",
      office?.name ?? "",
      parent?.id ?? "",
      parent?.name ?? "",
      serializeHistoryEntries(person.historyEntries ?? []),
    ];
  });
}

function importPeopleFromCsv(branch, rows) {
  const summary = { created: 0, updated: 0, skipped: 0 };

  rows.forEach((row) => {
    const personId = normalizeText(row["人物ID"]);
    const existingNode = personId
      ? branch.nodes.find((node) => node.id === personId && node.kind === "person") ?? null
      : null;
    const lastName = normalizeText(row["姓"]);
    const firstName = normalizeText(row["名"]);
    const displayName = buildDisplayName(lastName, firstName, row["氏名"]);
    const office = findOfficeFromRow(branch, row, existingNode);

    if (!office || (!displayName && !existingNode)) {
      summary.skipped += 1;
      return;
    }

    const parent = resolveParentFromRow(branch, row, office);
    const historyEntries = parseHistoryText(row["経歴"]);

    if (existingNode) {
      existingNode.lastName = lastName;
      existingNode.firstName = firstName;
      existingNode.name = displayName || existingNode.name;
      existingNode.title = normalizeText(row["役職"]);
      existingNode.department = normalizeText(row["所属"]) || office.name;
      existingNode.age = normalizeText(row["年齢"]);
      existingNode.tenure = normalizeText(row["勤続"]);
      existingNode.joinYear = normalizeText(row["入社"]);
      existingNode.historyEntries = historyEntries;
      moveNodeToParent(branch, existingNode.id, parent.id);
      summary.updated += 1;
      return;
    }

    const newNodeId = personId || createNodeId(branch, "person");
    branch.nodes.push({
      id: newNodeId,
      kind: "person",
      name: displayName,
      lastName,
      firstName,
      title: normalizeText(row["役職"]),
      department: normalizeText(row["所属"]) || office.name,
      age: normalizeText(row["年齢"]),
      tenure: normalizeText(row["勤続"]),
      joinYear: normalizeText(row["入社"]),
      historyEntries,
      photo: "",
      tags: [],
      reports: [],
    });
    addChildToParent(branch, parent.id, newNodeId);
    summary.created += 1;
  });

  return summary;
}

function handleExport() {
  const branch = getActiveBranch();
  const fileDate = new Date().toISOString().slice(0, 10);
  const fileName = `${branch?.name ?? "支店組織図"}-人物データ-${fileDate}.csv`;
  const csvRows = [
    ["支店ID", "支店名", "人物ID", "姓", "名", "役職", "所属", "年齢", "勤続", "入社", "営業所ID", "営業所名", "親ID", "親名", "経歴"],
    ...buildExcelRows(branch),
  ];
  const blob = new Blob([`\uFEFF${stringifyCsv(csvRows)}`], {
    type: "text/csv;charset=utf-8",
  });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);

  setActionStatus("現在の人物データを Excel 用CSVで出力しました。");
  renderActionStatus();
}

async function handleImportFile(event) {
  const [file] = event.target.files ?? [];
  if (!file) {
    return;
  }

  try {
    const text = await file.text();
    const rows = csvToObjects(text);
    const branch = getActiveBranch();
    const summary = importPeopleFromCsv(branch, rows);
    const saved = await saveBranches();
    setActionStatus(
      saved
        ? `${file.name} を取り込みました。更新 ${summary.updated}件 / 追加 ${summary.created}件 / スキップ ${summary.skipped}件`
        : `${file.name} は取り込みましたが、共有保存に失敗しました。`
    );
    render();
  } catch {
    setActionStatus("Excel用CSVの読み込みに失敗しました。");
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
    shell.style.width = "100%";
    shell.style.minWidth = "0";
    content.style.transformOrigin = "top center";
    shell.style.height = "auto";
    frame.scrollLeft = 0;
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
    const serverState = await loadServerBranches();
    persistence.serverReachable = true;
    persistence.serverUpdatedAt = serverState.updatedAt;

    if (parseUpdatedAt(persistence.localUpdatedAt) > parseUpdatedAt(serverState.updatedAt)) {
      const saved = await saveBranches();
      setActionStatus(saved ? "この端末の最新編集を共有データへ反映しました。" : "この端末の最新編集は残していますが、共有反映に失敗しました。");
      render();
      return;
    }

    branches = serverState.branches;
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

if (elements.excelExportButton) {
  elements.excelExportButton.addEventListener("click", handleExport);
}

if (elements.excelImportButton && elements.excelImportInput) {
  elements.excelImportButton.addEventListener("click", () => {
    elements.excelImportInput.click();
  });
  elements.excelImportInput.addEventListener("change", handleImportFile);
}

if (elements.resetButton) {
  elements.resetButton.addEventListener("click", handleReset);
}

elements.addEditHistoryRow.addEventListener("click", () => {
  appendHistoryRow(elements.editHistoryRows);
});
elements.profileForm.addEventListener("submit", handleProfileSave);
if (elements.createForm) {
  elements.createForm.addEventListener("submit", handleCreatePerson);
}
if (elements.createOffice) {
  elements.createOffice.addEventListener("change", () => {
    const branch = getActiveBranch();
    if (!branch) {
      return;
    }

    syncCreateParentOptions(branch, elements.createOffice.value, elements.createParent?.value ?? "");
  });
}
if (elements.createParent) {
  elements.createParent.addEventListener("change", () => {
    const branch = getActiveBranch();
    if (!branch) {
      return;
    }

    syncCreateParentOptions(branch, elements.createOffice?.value ?? "", elements.createParent.value);
  });
}
if (elements.closeEditPanel) {
  elements.closeEditPanel.addEventListener("click", handleCloseEditPanel);
}
window.addEventListener("resize", () => {
  window.requestAnimationFrame(fitOrgChartToFrame);
});

initializeApp();

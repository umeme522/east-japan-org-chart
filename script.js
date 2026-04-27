const STORAGE_KEY = "east-japan-org-chart-data";
const STORAGE_VERSION = 1;
const PUBLIC_SYNC_ENDPOINT = "https://east-japan-org-chart.pages.dev/api/org-data";
const USE_REMOTE_SYNC_ENDPOINT = window.location.protocol === "file:" || ["localhost", "127.0.0.1", "0.0.0.0"].includes(window.location.hostname);
const KEEP_LOCAL_ONLY_NODES = USE_REMOTE_SYNC_ENDPOINT;
const SERVER_DATA_ENDPOINT = USE_REMOTE_SYNC_ENDPOINT ? PUBLIC_SYNC_ENDPOINT : "/api/org-data";
const SERVER_SYNC_INTERVAL_MS = 8000;
const BUNDLED_UPDATED_AT = "2026-03-31T00:00:00.000Z";
const ORG_DRAG_ENABLED = false;
const EDIT_ROLE_OPTIONS = ["", "支店長", "副支店長", "部長", "所長", "課長", "副長", "係長", "スタッフ"];
const EDIT_TENURE_OPTIONS = Array.from({ length: 61 }, (_, index) => String(index));
const EDIT_JOIN_YEAR_OPTIONS = Array.from(
  { length: new Date().getFullYear() - 1979 },
  (_, index) => String(new Date().getFullYear() - index)
);

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
        name: "大久保",
        lastName: "大久保",
        firstName: "",
        title: "支店長",
        department: "支店統括",
        age: "52歳",
        tenure: "28年",
        history: "",
        hobbies: ["ゴルフ", "歴史散策"],
        tags: ["支店運営", "組織管理", "営業統括"],
        reports: ["east-japan-2", "branch-admin", "sales-innovation"],
      },
      {
        id: "east-japan-2",
        kind: "person",
        name: "堀内 芳人",
        title: "副支店長",
        titles: ["副支店長", "部長"],
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
        reports: ["office-101", "office-102", "office-103", "office-104", "office-105", "office-106"],
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
        reports: ["office-102-yamagata", "office-102-miyake"],
      },
      {
        id: "office-102-yamagata",
        kind: "person",
        name: "山縣",
        title: "スタッフ",
        department: "青梅流通",
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
        id: "office-106",
        kind: "unit",
        name: "南多摩",
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
        managerName: "堀内 芳人",
        managerLastName: "堀内",
        managerFirstName: "芳人",
        managerTitle: "部長",
        managerTitles: ["部長", "副支店長"],
        managerLinkedId: "east-japan-2",
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
        reports: ["office-306-kishikawa", "office-102-fujii"],
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

function normalizeNumericField(value) {
  const digits = normalizeText(value).match(/\d+/g);
  return digits ? digits.join("") : "";
}

function normalizeBirthDate(value) {
  const text = normalizeText(value);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    return "";
  }

  const [yearText, monthText, dayText] = text.split("-");
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const date = new Date(year, month - 1, day);
  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return "";
  }

  return text;
}

function calculateAgeFromBirthDate(birthDate, now = new Date()) {
  const normalizedBirthDate = normalizeBirthDate(birthDate);
  if (!normalizedBirthDate) {
    return "";
  }

  const [yearText, monthText, dayText] = normalizedBirthDate.split("-");
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  let age = now.getFullYear() - year;
  const hasHadBirthdayThisYear =
    now.getMonth() + 1 > month ||
    (now.getMonth() + 1 === month && now.getDate() >= day);

  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }

  return age >= 0 ? String(age) : "";
}

function getDisplayAge(node, now = new Date()) {
  return calculateAgeFromBirthDate(node?.birthDate, now) || normalizeNumericField(node?.age);
}

function normalizeRoleLabel(value) {
  const normalized = normalizeText(value);
  if (normalized === "東日本支店長") {
    return "支店長";
  }
  return normalized;
}

function splitRoleText(value) {
  return normalizeText(value)
    .split(/\s*(?:\/|／|\||｜)\s*/)
    .map((entry) => normalizeRoleLabel(entry))
    .filter(Boolean);
}

function normalizeTitles(value, legacyTitle = "") {
  const candidates = Array.isArray(value)
    ? value.flatMap((entry) => splitRoleText(entry))
    : splitRoleText(value || legacyTitle);

  return Array.from(new Set(candidates));
}

function getNodeTitles(node) {
  return normalizeTitles(node?.titles, node?.title);
}

function getPrimaryTitle(node) {
  return getNodeTitles(node)[0] || "";
}

function getRoleText(node) {
  return getNodeTitles(node).join(" / ");
}

function roleWeight(title) {
  const normalized = normalizeText(title);
  if (!normalized) {
    return 0;
  }

  if (normalized.includes("副支店長")) {
    return 6;
  }
  if (normalized.includes("支店長")) {
    return 7;
  }
  if (normalized.includes("部長")) {
    return 5;
  }
  if (normalized.includes("所長")) {
    return 4;
  }
  if (normalized.includes("課長")) {
    return 3.5;
  }
  if (normalized.includes("副長")) {
    return 3;
  }
  if (normalized.includes("署長")) {
    return 2.25;
  }
  if (normalized.includes("係長")) {
    return 2;
  }
  if (normalized.includes("スタッフ")) {
    return 1;
  }
  return 0;
}

function getRoleWeight(node) {
  const titles = getNodeTitles(node);
  if (titles.length === 0) {
    return 0;
  }

  return Math.max(...titles.map((title) => roleWeight(title)));
}

function roleToneKey(title) {
  const normalized = normalizeText(title);
  if (!normalized) {
    return "base";
  }
  if (normalized.includes("副支店長")) {
    return "deputy-chief";
  }
  if (normalized.includes("支店長")) {
    return "branch-chief";
  }
  if (normalized.includes("部長")) {
    return "director";
  }
  if (normalized.includes("所長")) {
    return "office-chief";
  }
  if (normalized.includes("課長")) {
    return "section-chief";
  }
  if (normalized.includes("副長")) {
    return "assistant-chief";
  }
  if (normalized.includes("署長")) {
    return "office-chief";
  }
  if (normalized.includes("係長")) {
    return "leader";
  }
  if (normalized.includes("スタッフ")) {
    return "staff";
  }
  return "base";
}

function getRoleToneKey(node) {
  const titles = getNodeTitles(node);
  if (titles.length === 0) {
    return "base";
  }

  const topTitle = [...titles].sort((left, right) => roleWeight(right) - roleWeight(left))[0];
  return roleToneKey(topTitle);
}

function comparePeopleForDisplay(leftNode, rightNode) {
  return (
    getRoleWeight(rightNode) - getRoleWeight(leftNode) ||
    normalizeText(leftNode?.name).localeCompare(normalizeText(rightNode?.name), "ja") ||
    parseNumericValue(getDisplayAge(rightNode)) - parseNumericValue(getDisplayAge(leftNode))
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

function getTargetDepth(branch, node) {
  if (!branch || !node) {
    return 0;
  }

  if (node.id === branch.rootId) {
    return 0;
  }

  const nodes = nodeMap(branch);
  const queue = [[branch.rootId, 0]];
  const visited = new Set();

  while (queue.length > 0) {
    const [currentId, depth] = queue.shift();
    if (visited.has(currentId)) {
      continue;
    }
    visited.add(currentId);

    if (currentId === node.id) {
      return depth;
    }

    const currentNode = nodes.get(currentId);
    for (const childId of currentNode?.reports ?? []) {
      if (!visited.has(childId) && nodes.has(childId)) {
        queue.push([childId, depth + 1]);
      }
    }
  }

  return node.kind === "unit" ? 1 : 0;
}

function createTargetLabel(branch, node) {
  if (!node) {
    return "";
  }

  const baseLabel = node.id === branch.rootId ? branch.name : node.name;
  const depth = getTargetDepth(branch, node);
  if (depth <= 0) {
    return baseLabel;
  }

  return `${"　".repeat(depth)}${baseLabel}`;
}

function isDepartmentUnitNode(node) {
  return node?.kind === "unit" && /^dept-\d+$/.test(normalizeText(node?.id));
}

function getInlineUnitLeader(node, nodes) {
  if (node?.kind !== "unit") {
    return null;
  }

  if (node?.managerName) {
    const linkedNode = normalizeText(node.managerLinkedId) ? nodes.get(node.managerLinkedId) : null;
    const managerLastName = normalizeText(node.managerLastName);
    const managerFirstName = normalizeText(node.managerFirstName);
    const managerName = buildDisplayName(managerLastName, managerFirstName, node.managerName);
    const managerTitles = normalizeTitles(node.managerTitles, node.managerTitle);

    return {
      id: linkedNode?.id || `${node.id}-manager`,
      linkedNodeId: linkedNode?.id || "",
      kind: "person",
      name: managerName,
      lastName: managerLastName,
      firstName: managerFirstName,
      title: managerTitles[0] || "",
      titles: managerTitles,
      department: node.name,
      reports: [],
    };
  }

  if (isDepartmentUnitNode(node)) {
    return (
      node.reports
        .map((reportId) => nodes.get(reportId))
        .find((candidate) => candidate?.kind === "person" && getRoleText(candidate).includes("部長")) ??
      null
    );
  }

  if (isOfficeNode(node)) {
    return (
      node.reports
        .map((reportId) => nodes.get(reportId))
        .find((candidate) => candidate?.kind === "person" && /(所長|署長)/.test(getRoleText(candidate))) ??
      null
    );
  }

  if (["branch-admin", "sales-innovation"].includes(node.id)) {
    return (
      node.reports
        .map((reportId) => nodes.get(reportId))
        .find((candidate) => candidate?.kind === "person") ??
      null
    );
  }

  return null;
}

function isDescendantReportId(nodes, ancestorId, targetId, visited = new Set()) {
  if (!ancestorId || !targetId || ancestorId === targetId || visited.has(ancestorId)) {
    return false;
  }

  visited.add(ancestorId);
  const ancestor = nodes.get(ancestorId);
  if (!ancestor) {
    return false;
  }

  for (const childId of ancestor.reports ?? []) {
    if (childId === targetId) {
      return true;
    }
    if (isDescendantReportId(nodes, childId, targetId, visited)) {
      return true;
    }
  }

  return false;
}

function pruneNestedReportIds(reportIds, nodes) {
  const uniqueReportIds = Array.from(new Set(reportIds));
  return uniqueReportIds.filter((reportId, index) => {
    return !uniqueReportIds.some((otherId, otherIndex) => {
      if (index === otherIndex) {
        return false;
      }
      return isDescendantReportId(nodes, otherId, reportId);
    });
  });
}

function normalizeBranchReports(branch) {
  if (!branch?.nodes?.length) {
    return branch;
  }

  const nodes = nodeMap(branch);
  branch.nodes.forEach((node) => {
    node.reports = pruneNestedReportIds(node.reports, nodes);
  });
  return branch;
}

function sortReportIdsForDisplay(node, nodes) {
  const inlineLeader = getInlineUnitLeader(node, nodes);
  const inlineLeaderNode = inlineLeader?.linkedNodeId ? nodes.get(inlineLeader.linkedNodeId) : null;
  const inlineLeaderReports = inlineLeaderNode?.reports ?? inlineLeader?.reports ?? [];
  const specialUnitLeaderId = ["branch-admin", "sales-innovation"].includes(node.id) ? inlineLeader?.id : "";
  const officeChildIds = isOfficeNode(node) && inlineLeader
    ? [
        ...node.reports.filter((reportId) => reportId !== inlineLeader.id),
        ...inlineLeaderReports,
      ]
    : node.reports.filter((reportId) => reportId !== inlineLeader?.id && reportId !== specialUnitLeaderId);

  const reports = pruneNestedReportIds(officeChildIds, nodes)
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

function buildEditRoleOptions(currentTitle = "") {
  const options = EDIT_ROLE_OPTIONS.map((title) => ({
    value: title,
    label: title || "未設定",
  }));

  const normalizedCurrentTitle = normalizeText(currentTitle);
  if (normalizedCurrentTitle && !options.some((option) => option.value === normalizedCurrentTitle)) {
    options.splice(1, 0, {
      value: normalizedCurrentTitle,
      label: normalizedCurrentTitle,
    });
  }

  return options;
}

function setSecondaryRoleVisibility(field, button, visible) {
  if (field) {
    field.hidden = !visible;
  }
  if (button) {
    button.hidden = visible;
  }
}

function populateRoleFields(primarySelect, secondarySelect, secondaryField, addButton, titles = []) {
  const normalizedTitles = normalizeTitles(titles);
  const primaryTitle = normalizedTitles[0] || "";
  const secondaryTitle = normalizedTitles[1] || "";

  setSelectOptions(primarySelect, buildEditRoleOptions(primaryTitle), primaryTitle);
  setSelectOptions(secondarySelect, buildEditRoleOptions(secondaryTitle), secondaryTitle);
  setSecondaryRoleVisibility(secondaryField, addButton, Boolean(secondaryTitle));
}

function collectRoleValues(primarySelect, secondarySelect) {
  return normalizeTitles([
    primarySelect?.value,
    secondarySelect?.value,
  ]);
}

function buildNumericSelectOptions(values, currentValue = "", emptyLabel = "未設定") {
  const options = [{ value: "", label: emptyLabel }];
  values.forEach((value) => {
    options.push({
      value,
      label: value,
    });
  });

  const normalizedCurrentValue = normalizeNumericField(currentValue);
  if (normalizedCurrentValue && !options.some((option) => option.value === normalizedCurrentValue)) {
    options.splice(1, 0, {
      value: normalizedCurrentValue,
      label: normalizedCurrentValue,
    });
  }

  return options;
}

function buildAffiliation(branch, node) {
  if (node?.kind === "person") {
    if (node?.department && node.department !== branch?.name) {
      return node.department;
    }

    const office = findOfficeForNode(branch, node.id);
    if (office?.name && office.name !== branch?.name) {
      return office.name;
    }

    return branch?.name ?? "";
  }

  const parts = [branch?.name];

  if (node?.kind === "unit") {
    if (node?.name && node.name !== branch?.name) {
      parts.push(node.name);
    }
  }

  return parts.filter(Boolean).join(" / ");
}

function normalizeNode(node, index) {
  const kind = node?.kind === "unit" ? "unit" : "person";
  const nameParts = splitNameParts(node?.name, node?.lastName, node?.firstName);
  const titles = normalizeTitles(node?.titles, node?.title);
  const normalized = {
    id: normalizeText(node?.id) || `node-${index + 1}`,
    kind,
    name: buildDisplayName(nameParts.lastName, nameParts.firstName, node?.name) || "未設定",
    title: titles[0] || "",
    titles,
    department: normalizeText(node?.department),
    tags: normalizeStringArray(node?.tags),
    reports: normalizeReports(node?.reports),
  };

  if (kind === "person") {
    normalized.lastName = nameParts.lastName;
    normalized.firstName = nameParts.firstName;
    normalized.employeeNumber = normalizeText(node?.employeeNumber);
    normalized.birthDate = normalizeBirthDate(node?.birthDate);
    const joinYear = normalizeNumericField(node?.joinYear);
    const rawAge = normalizeNumericField(node?.age);
    const looksLikeJoinYear = /^(?:19|20)\d{2}$/.test(rawAge);
    normalized.age = looksLikeJoinYear && !joinYear ? "" : rawAge;
    normalized.joinYear = joinYear || (looksLikeJoinYear ? rawAge : "");
    normalized.tenure = normalizeNumericField(node?.tenure);
    normalized.historyEntries = normalizeHistoryEntries(node?.historyEntries, node?.history);
    normalized.hobbies = normalizeStringArray(node?.hobbies);
    normalized.photo = normalizeText(node?.photo);
  } else {
    normalized.description = normalizeText(node?.description);
    normalized.managerName = normalizeText(node?.managerName);
    normalized.managerLastName = normalizeText(node?.managerLastName);
    normalized.managerFirstName = normalizeText(node?.managerFirstName);
    normalized.managerTitle = normalizeText(node?.managerTitle);
    normalized.managerTitles = normalizeTitles(node?.managerTitles, node?.managerTitle);
    normalized.managerLinkedId = normalizeText(node?.managerLinkedId);
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

  const normalizedNodes = nodes.map((node) => ({ ...node, reports: [...node.reports] }));
  const validIds = new Set(normalizedNodes.map((node) => node.id));

  normalizedNodes.forEach((node) => {
    node.reports = node.reports.filter((reportId) => validIds.has(reportId) && reportId !== node.id);
  });

  if (normalizedNodes.length === 0) {
    return null;
  }

  const rootId = normalizeText(branch?.rootId);

  return {
    id: normalizeText(branch?.id) || `branch-${index + 1}`,
    name: normalizeText(branch?.name) || `支店${index + 1}`,
    location: normalizeText(branch?.location),
    division: normalizeText(branch?.division),
    overview: normalizeText(branch?.overview),
    rootId: validIds.has(rootId) ? rootId : normalizedNodes[0].id,
    nodes: normalizedNodes,
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

function upsertBranchNode(branch, node, options = {}) {
  const { preferExisting = false } = options;
  const index = branch.nodes.findIndex((entry) => entry.id === node.id);
  if (index === -1) {
    branch.nodes.push(node);
    return;
  }

  branch.nodes[index] = {
    ...(preferExisting ? node : branch.nodes[index]),
    ...(preferExisting ? branch.nodes[index] : node),
  };
}

function migrateEastJapanBranch(branch) {
  if (!branch || branch.id !== "east-japan") {
    return branch;
  }

  const rootNode = branch.nodes.find((node) => node.id === branch.rootId);
  const dept1 = branch.nodes.find((node) => node.id === "dept-1");
  const dept1Manager = branch.nodes.find((node) => node.id === "dept-1-manager");
  if (dept1 && dept1Manager) {
    const officeIds = Array.from(new Set([
      ...dept1.reports.filter((reportId) => reportId !== dept1Manager.id),
      ...dept1Manager.reports,
    ]));

    dept1.reports = [dept1Manager.id, ...officeIds];
    dept1Manager.title = "部長";
    dept1Manager.titles = ["部長"];
    dept1Manager.department = "業務1部";
    dept1Manager.reports = [];
  }

  const viceManager = branch.nodes.find((node) => node.id === "east-japan-2");
  if (viceManager) {
    viceManager.name = "堀内 芳人";
    viceManager.lastName = "堀内";
    viceManager.firstName = "芳人";
    viceManager.title = "副支店長";
    viceManager.titles = ["副支店長", "部長"];
  }

  upsertBranchNode(branch, {
    id: "dept-2-manager",
    kind: "person",
    name: "藤原 邦康",
    lastName: "藤原",
    firstName: "邦康",
    title: "部長",
    titles: ["部長"],
    department: "業務2部",
    age: "",
    joinYear: "",
    tenure: "",
    history: "",
    historyEntries: [],
    hobbies: [],
    tags: [],
    reports: [],
  }, { preferExisting: true });

  const dept2 = branch.nodes.find((node) => node.id === "dept-2");
  if (dept2) {
    dept2.reports = ["dept-2-manager", ...dept2.reports.filter((reportId) => reportId !== "dept-2-manager")];
  }

  const dept3 = branch.nodes.find((node) => node.id === "dept-3");
  if (dept3) {
    dept3.managerName = "堀内 芳人";
    dept3.managerLastName = "堀内";
    dept3.managerFirstName = "芳人";
    dept3.managerTitle = "部長";
    dept3.managerTitles = ["部長", "副支店長"];
    dept3.managerLinkedId = "east-japan-2";
    dept3.reports = dept3.reports.filter((reportId) => reportId !== "dept-3-manager");
  }

  branch.nodes = branch.nodes.filter((node) => node.id !== "dept-3-manager");
  branch.nodes = branch.nodes.filter((node) => node.id !== "tochigi-3");

  if (!branch.nodes.some((node) => node.id === "office-106")) {
    upsertBranchNode(branch, {
      id: "office-106",
      kind: "unit",
      name: "南多摩",
      title: "",
      department: "業務1部",
      description: "業務1部配下です。",
      tags: ["組織"],
      reports: [],
    });
  }

  if (dept1) {
    dept1.reports = [...new Set([...dept1.reports, "office-106"])];
  }

  upsertBranchNode(branch, {
    id: "branch-admin",
    kind: "unit",
    name: "支店総務部",
    title: "",
    department: "東日本支店",
    description: "支店総務部です。",
    tags: ["組織"],
    reports: ["branch-admin-inoue", "branch-admin-kitaura", "branch-admin-matsumura"],
  }, { preferExisting: true });

  upsertBranchNode(branch, {
    id: "sales-innovation",
    kind: "unit",
    name: "営業革新部",
    title: "",
    department: "東日本支店",
    description: "営業革新部です。",
    tags: ["組織"],
    reports: ["sales-innovation-kiuchi"],
  }, { preferExisting: true });

  upsertBranchNode(branch, {
    id: "sales-innovation-kiuchi",
    kind: "person",
    name: "木内",
    lastName: "木内",
    firstName: "",
    title: "所長",
    titles: ["所長"],
    department: "営業革新部",
    age: "",
    joinYear: "",
    tenure: "",
    history: "",
    historyEntries: [],
    hobbies: [],
    tags: [],
    reports: [],
    employeeNumber: "",
    birthDate: "",
    photo: "",
  }, { preferExisting: true });

  upsertBranchNode(branch, {
    id: "branch-admin-inoue",
    kind: "person",
    name: "井上 珠美",
    lastName: "井上",
    firstName: "珠美",
    title: "",
    titles: [],
    department: "支店総務部",
    age: "",
    joinYear: "",
    tenure: "",
    history: "",
    historyEntries: [],
    hobbies: [],
    tags: [],
    reports: [],
  }, { preferExisting: true });

  upsertBranchNode(branch, {
    id: "branch-admin-kitaura",
    kind: "person",
    name: "北浦 愛梨",
    lastName: "北浦",
    firstName: "愛梨",
    title: "",
    titles: [],
    department: "支店総務部",
    age: "",
    joinYear: "",
    tenure: "",
    history: "",
    historyEntries: [],
    hobbies: [],
    tags: [],
    reports: [],
  }, { preferExisting: true });

  upsertBranchNode(branch, {
    id: "branch-admin-matsumura",
    kind: "person",
    name: "松村 結花",
    lastName: "松村",
    firstName: "結花",
    title: "",
    titles: [],
    department: "支店総務部",
    age: "",
    joinYear: "",
    tenure: "",
    history: "",
    historyEntries: [],
    hobbies: [],
    tags: [],
    reports: [],
  }, { preferExisting: true });

  if (rootNode) {
    const existingReports = rootNode.reports.filter((reportId) => reportId && reportId !== rootNode.id);
    rootNode.reports = [
      "east-japan-2",
      "branch-admin",
      "sales-innovation",
      ...existingReports.filter((reportId) => !["east-japan-2", "branch-admin", "sales-innovation"].includes(reportId)),
    ];
  }

  return branch;
}

function migrateBranches(branchList) {
  return branchList.map((branch) => normalizeBranchReports(migrateEastJapanBranch(branch)));
}

function buildStoragePayload(updatedAt = "") {
  return buildSnapshotPayload(branches, updatedAt);
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
  return migrateBranches(parseBranches(payload) ?? parseBranches(DEFAULT_BRANCHES) ?? cloneBranches(DEFAULT_BRANCHES));
}

function buildSnapshotPayload(branchList, updatedAt = "") {
  return {
    version: STORAGE_VERSION,
    updatedAt: normalizeText(updatedAt) || new Date().toISOString(),
    branches: Array.isArray(branchList) ? branchList : [],
  };
}

function countPeopleInBranches(branchList = []) {
  return branchList.reduce(
    (sum, branch) => sum + (branch?.nodes?.filter((node) => node.kind === "person").length ?? 0),
    0
  );
}

function countMojibakeChars(value) {
  return (normalizeText(value).match(/[?？�]/g) ?? []).length;
}

function collectBranchTextSamples(branchList = []) {
  const samples = [];

  branchList.forEach((branch) => {
    samples.push(branch?.name, branch?.location, branch?.division, branch?.overview);

    (branch?.nodes ?? []).forEach((node) => {
      samples.push(
        node?.name,
        node?.title,
        node?.department,
        node?.description,
        node?.lastName,
        node?.firstName
      );
      getNodeTitles(node).forEach((title) => samples.push(title));
      (node?.historyEntries ?? []).forEach((entry) => {
        samples.push(entry?.year, entry?.location);
      });
      (node?.hobbies ?? []).forEach((item) => samples.push(item));
      (node?.tags ?? []).forEach((item) => samples.push(item));
    });
  });

  return samples.map((sample) => normalizeText(sample)).filter(Boolean);
}

function looksCorruptedBranches(branchList = []) {
  if (!Array.isArray(branchList) || branchList.length === 0) {
    return false;
  }

  const criticalSamples = branchList.flatMap((branch) => {
    const rootNode = (branch?.nodes ?? []).find((node) => node.id === branch?.rootId);
    return [branch?.name, rootNode?.name, rootNode?.title];
  });

  if (criticalSamples.some((sample) => /[?？�]{2,}/.test(normalizeText(sample)))) {
    return true;
  }

  const mojibakeCount = collectBranchTextSamples(branchList).reduce(
    (sum, sample) => sum + countMojibakeChars(sample),
    0
  );

  return mojibakeCount >= 8;
}

function hasMeaningfulText(value) {
  return normalizeText(value) !== "";
}

function looksCorruptedText(value) {
  return /[?？�]{2,}/.test(normalizeText(value));
}

function mergeTextValue(primaryValue, localValue, options = {}) {
  const { preferLocal = false } = options;
  const primaryText = normalizeText(primaryValue);
  const localText = normalizeText(localValue);

  if (preferLocal && !looksCorruptedText(localText) && localValue !== undefined) {
    return localText;
  }

  if (looksCorruptedText(primaryText) && hasMeaningfulText(localText)) {
    return localText;
  }

  if (looksCorruptedText(localText)) {
    return primaryText;
  }

  return primaryText || localText;
}

function mergeStringArrayValue(primaryValue, localValue, options = {}) {
  const { preferLocal = false } = options;
  const primaryItems = normalizeStringArray(primaryValue);
  const localItems = normalizeStringArray(localValue);

  if (preferLocal && Array.isArray(localValue)) {
    return localItems;
  }

  return primaryItems.length > 0 ? primaryItems : localItems;
}

function mergeHistoryEntriesValue(primaryValue, localValue, options = {}) {
  const { preferLocal = false } = options;
  const primaryItems = normalizeHistoryEntries(primaryValue);
  const localItems = normalizeHistoryEntries(localValue);

  if (preferLocal && Array.isArray(localValue)) {
    return localItems;
  }

  return primaryItems.length > 0 ? primaryItems : localItems;
}

function mergeTitlesValue(primaryNode, localNode, options = {}) {
  const { preferLocal = false } = options;
  const primaryTitles = getNodeTitles(primaryNode);
  const localTitles = getNodeTitles(localNode);

  if (preferLocal && !looksCorruptedText(localTitles.join(" "))) {
    return localTitles;
  }

  if (primaryTitles.length > 0 && !looksCorruptedText(primaryTitles.join(" "))) {
    return primaryTitles;
  }

  return localTitles;
}

function mergeReportIds(primaryReports = [], localReports = [], preferLocal = false) {
  const preferredReports = normalizeReports(preferLocal ? localReports : primaryReports);
  const fallbackReports = normalizeReports(preferLocal ? primaryReports : localReports);
  return preferredReports.length > 0 ? preferredReports : fallbackReports;
}

function mergeNormalizedNode(primaryNode, localNode, options = {}) {
  const { preferLocalEditable = false, keepLocalOnlyNodes = true } = options;

  if (!primaryNode) {
    return keepLocalOnlyNodes ? cloneBranches([localNode])[0] ?? null : null;
  }

  if (!localNode) {
    return cloneBranches([primaryNode])[0] ?? null;
  }

  const merged = cloneBranches([primaryNode])[0];
  merged.kind = primaryNode.kind;
  merged.reports = mergeReportIds(primaryNode.reports, localNode.reports, preferLocalEditable);

  if (merged.kind === "person") {
    merged.lastName = mergeTextValue(primaryNode.lastName, localNode.lastName, { preferLocal: preferLocalEditable });
    merged.firstName = mergeTextValue(primaryNode.firstName, localNode.firstName, { preferLocal: preferLocalEditable });
    merged.name = buildDisplayName(merged.lastName, merged.firstName, mergeTextValue(primaryNode.name, localNode.name, { preferLocal: preferLocalEditable }));
    merged.department = mergeTextValue(primaryNode.department, localNode.department, { preferLocal: preferLocalEditable });
    merged.employeeNumber = mergeTextValue(primaryNode.employeeNumber, localNode.employeeNumber, { preferLocal: preferLocalEditable });
    merged.birthDate = mergeTextValue(primaryNode.birthDate, localNode.birthDate, { preferLocal: preferLocalEditable });
    merged.photo = mergeTextValue(primaryNode.photo, localNode.photo, { preferLocal: preferLocalEditable });
    merged.age = mergeTextValue(primaryNode.age, localNode.age, { preferLocal: preferLocalEditable });
    merged.joinYear = mergeTextValue(primaryNode.joinYear, localNode.joinYear, { preferLocal: preferLocalEditable });
    merged.tenure = mergeTextValue(primaryNode.tenure, localNode.tenure, { preferLocal: preferLocalEditable });
    merged.historyEntries = mergeHistoryEntriesValue(primaryNode.historyEntries, localNode.historyEntries, { preferLocal: preferLocalEditable });
    merged.hobbies = mergeStringArrayValue(primaryNode.hobbies, localNode.hobbies, { preferLocal: preferLocalEditable });
    merged.tags = mergeStringArrayValue(primaryNode.tags, localNode.tags, { preferLocal: preferLocalEditable });
    merged.titles = mergeTitlesValue(primaryNode, localNode, { preferLocal: preferLocalEditable });
    merged.title = merged.titles[0] || "";
    return merged;
  }

  merged.name = mergeTextValue(primaryNode.name, localNode.name);
  merged.title = mergeTextValue(primaryNode.title, localNode.title);
  merged.department = mergeTextValue(primaryNode.department, localNode.department);
  merged.description = mergeTextValue(primaryNode.description, localNode.description);
  merged.tags = mergeStringArrayValue(primaryNode.tags, localNode.tags);
  merged.managerName = mergeTextValue(primaryNode.managerName, localNode.managerName);
  merged.managerLastName = mergeTextValue(primaryNode.managerLastName, localNode.managerLastName);
  merged.managerFirstName = mergeTextValue(primaryNode.managerFirstName, localNode.managerFirstName);
  merged.managerTitle = mergeTextValue(primaryNode.managerTitle, localNode.managerTitle);
  merged.managerTitles = mergeTitlesValue(
    { title: primaryNode.managerTitle, titles: primaryNode.managerTitles },
    { title: localNode.managerTitle, titles: localNode.managerTitles }
  );
  merged.managerLinkedId = mergeTextValue(primaryNode.managerLinkedId, localNode.managerLinkedId);
  return merged;
}

function mergeBranchData(primaryBranch, localBranch, options = {}) {
  const { keepLocalOnlyNodes = true } = options;
  if (!primaryBranch) {
    return keepLocalOnlyNodes ? cloneBranches([localBranch])[0] ?? null : null;
  }

  if (!localBranch) {
    return cloneBranches([primaryBranch])[0] ?? null;
  }

  const merged = cloneBranches([primaryBranch])[0];
  const primaryNodeMap = new Map(primaryBranch.nodes.map((node) => [node.id, node]));
  const localNodeMap = new Map(localBranch.nodes.map((node) => [node.id, node]));
  const mergedNodes = [];

  primaryBranch.nodes.forEach((primaryNode) => {
    mergedNodes.push(mergeNormalizedNode(primaryNode, localNodeMap.get(primaryNode.id), options));
  });

  if (keepLocalOnlyNodes) {
    localBranch.nodes.forEach((localNode) => {
      if (!primaryNodeMap.has(localNode.id)) {
        mergedNodes.push(cloneBranches([localNode])[0]);
      }
    });
  }

  const validIds = new Set(mergedNodes.map((node) => node.id));
  mergedNodes.forEach((node) => {
    const primaryNode = primaryNodeMap.get(node.id);
    const localNode = localNodeMap.get(node.id);
    node.reports = mergeReportIds(primaryNode?.reports, localNode?.reports, options.preferLocalEditable).filter(
      (reportId) => validIds.has(reportId) && reportId !== node.id
    );
  });

  merged.name = mergeTextValue(primaryBranch.name, localBranch.name);
  merged.location = mergeTextValue(primaryBranch.location, localBranch.location);
  merged.division = mergeTextValue(primaryBranch.division, localBranch.division);
  merged.overview = mergeTextValue(primaryBranch.overview, localBranch.overview);
  merged.rootId = validIds.has(primaryBranch.rootId) ? primaryBranch.rootId : localBranch.rootId;
  merged.nodes = mergedNodes;
  return normalizeBranchReports(merged);
}

function mergeBranchLists(primaryBranches = [], localBranches = [], options = {}) {
  const { keepLocalOnlyNodes = true } = options;
  const localBranchMap = new Map((localBranches ?? []).map((branch) => [branch.id, branch]));
  const mergedBranches = (primaryBranches ?? []).map((primaryBranch) =>
    mergeBranchData(primaryBranch, localBranchMap.get(primaryBranch.id), options)
  );

  if (keepLocalOnlyNodes) {
    (localBranches ?? []).forEach((localBranch) => {
      if (!mergedBranches.some((branch) => branch?.id === localBranch.id)) {
        mergedBranches.push(cloneBranches([localBranch])[0]);
      }
    });
  }

  return mergedBranches.filter(Boolean).map((branch) => normalizeBranchReports(branch));
}

const storedPayload = loadStoredPayload();
const bundledBranches = loadBranches(DEFAULT_BRANCHES);
const storedBranches = loadBranches(storedPayload);
const storedUpdatedAt = normalizeText(storedPayload?.updatedAt);
const preferStoredEditable = parseUpdatedAt(storedUpdatedAt) >= parseUpdatedAt(BUNDLED_UPDATED_AT);
let branches = mergeBranchLists(bundledBranches, storedBranches, {
  preferLocalEditable: preferStoredEditable,
  keepLocalOnlyNodes: KEEP_LOCAL_ONLY_NODES,
});
if (!branches.length) {
  branches = bundledBranches;
}
const initialBranch = branches[0] ?? { id: "", rootId: "" };
const persistence = {
  mode: SERVER_DATA_ENDPOINT ? "server" : "local",
  serverReachable: false,
  localUpdatedAt: storedUpdatedAt || BUNDLED_UPDATED_AT,
  serverUpdatedAt: "",
};

const state = {
  activeBranchId: initialBranch.id,
  scopeNodeId: initialBranch.rootId,
  selectedNodeId: initialBranch.rootId,
  searchTerm: "",
  expandedDepartmentIds: new Set(),
  editStatus: "",
  createStatus: "",
  actionStatus: "",
  isSaving: false,
  ignoreNodeClickUntil: 0,
};

const dragState = {
  active: false,
  pointerId: null,
  branchId: "",
  nodeId: "",
  parentId: "",
  startX: 0,
  startY: 0,
  moved: false,
  overNodeId: "",
  placeAfter: false,
};

let syncTimerId = 0;
let syncInFlight = false;

const elements = {
  branchTabs: document.getElementById("branchTabs"),
  heroStats: document.getElementById("heroStats"),
  branchSummary: document.getElementById("branchSummary"),
  chartFrame: document.querySelector(".chart-frame"),
  chartTitle: document.getElementById("chartTitle"),
  orgChart: document.getElementById("orgChart"),
  resetButton: document.getElementById("resetButton"),
  actionStatus: document.getElementById("actionStatus"),
  openCreateButton: document.getElementById("openCreateButton"),
  memberGrid: document.getElementById("memberGrid"),
  search: document.getElementById("memberSearch"),
  profileEmpty: document.getElementById("profileEmpty"),
  profileContent: document.getElementById("profileContent"),
  profileBranch: document.getElementById("profileBranch"),
  profilePhoto: document.getElementById("profilePhoto"),
  profilePhotoImage: document.getElementById("profilePhotoImage"),
  profileName: document.getElementById("profileName"),
  profileRoleValue: document.getElementById("profileRoleValue"),
  profileAffiliationValue: document.getElementById("profileAffiliationValue"),
  profilePersonInfoRow: document.getElementById("profilePersonInfoRow"),
  profileEmployeeNumberValue: document.getElementById("profileEmployeeNumberValue"),
  profileAgeValue: document.getElementById("profileAgeValue"),
  profileJoinYearValue: document.getElementById("profileJoinYearValue"),
  profileTenureValue: document.getElementById("profileTenureValue"),
  profileDescriptionRow: document.getElementById("profileDescriptionRow"),
  profileDescriptionLabel: document.getElementById("profileDescriptionLabel"),
  profileDescriptionValue: document.getElementById("profileDescriptionValue"),
  profileEditButton: document.getElementById("profileEditButton"),
  profileCloseButton: document.getElementById("profileCloseButton"),
  profileEditor: document.getElementById("profileEditor"),
  profileForm: document.getElementById("profileForm"),
  profileSaveButton: document.getElementById("profileSaveButton"),
  deleteProfileButton: document.getElementById("deleteProfileButton"),
  editLastName: document.getElementById("editLastName"),
  editFirstName: document.getElementById("editFirstName"),
  editTitle: document.getElementById("editTitle"),
  editTitleSecondaryField: document.getElementById("editTitleSecondaryField"),
  editTitleSecondary: document.getElementById("editTitleSecondary"),
  editAddTitleButton: document.getElementById("editAddTitleButton"),
  editDepartment: document.getElementById("editDepartment"),
  editEmployeeNumberField: document.getElementById("editEmployeeNumberField"),
  editEmployeeNumber: document.getElementById("editEmployeeNumber"),
  editBirthDateField: document.getElementById("editBirthDateField"),
  editBirthDate: document.getElementById("editBirthDate"),
  editPhotoField: document.getElementById("editPhotoField"),
  editPhoto: document.getElementById("editPhoto"),
  editJoinYearField: document.getElementById("editJoinYearField"),
  editJoinYear: document.getElementById("editJoinYear"),
  editTenureField: document.getElementById("editTenureField"),
  editTenure: document.getElementById("editTenure"),
  editHistoryField: document.getElementById("editHistoryField"),
  editHistoryFieldLabel: document.getElementById("editHistoryFieldLabel"),
  editHistoryRows: document.getElementById("editHistoryRows"),
  addEditHistoryRow: document.getElementById("addEditHistoryRow"),
  closeEditPanel: document.getElementById("closeEditPanel"),
  editStatus: document.getElementById("editStatus"),
  profileCreator: document.getElementById("profileCreator"),
  createForm: document.getElementById("createForm"),
  createOffice: document.getElementById("createOffice"),
  createLastName: document.getElementById("createLastName"),
  createFirstName: document.getElementById("createFirstName"),
  createTitle: document.getElementById("createTitle"),
  createTitleSecondaryField: document.getElementById("createTitleSecondaryField"),
  createTitleSecondary: document.getElementById("createTitleSecondary"),
  createAddTitleButton: document.getElementById("createAddTitleButton"),
  createDepartment: document.getElementById("createDepartment"),
  createEmployeeNumber: document.getElementById("createEmployeeNumber"),
  createBirthDate: document.getElementById("createBirthDate"),
  createPhoto: document.getElementById("createPhoto"),
  createJoinYear: document.getElementById("createJoinYear"),
  createTenure: document.getElementById("createTenure"),
  createStatus: document.getElementById("createStatus"),
};

initializeExpandedDepartments();

function initializeExpandedDepartments() {
  state.expandedDepartmentIds = new Set();
}

function clearActionStatus() {
  state.actionStatus = "";
}

function setActionStatus(message) {
  const normalized = normalizeText(message);
  if (!normalized) {
    state.actionStatus = "";
    return;
  }

  if (/(失敗|できません|できない|確認|入力|選択|読み込み)/.test(normalized)) {
    state.actionStatus = normalized;
    return;
  }

  state.actionStatus = "";
}

function writeStorageCache(payload = buildStoragePayload()) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    persistence.localUpdatedAt = normalizeText(payload.updatedAt);
    return true;
  } catch {
    return false;
  }
}

function writeStorageSnapshot(branchList, updatedAt = "") {
  const payload = buildSnapshotPayload(branchList, updatedAt);
  return writeStorageCache(payload);
}

async function saveBranches() {
  const payload = buildStoragePayload();
  const cached = writeStorageCache(payload);

  if (persistence.mode !== "server") {
    if (!cached) {
      state.editStatus = "このブラウザでは保存できませんでした。";
      setActionStatus("このブラウザでは保存できませんでした。");
      return false;
    }
    return true;
  }

  const controller = typeof AbortController === "function" ? new AbortController() : null;
  const timeoutId = controller
    ? window.setTimeout(() => {
        controller.abort();
      }, 12000)
    : 0;

  try {
    const response = await window.fetch(SERVER_DATA_ENDPOINT, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller?.signal,
    });

    const result = await response.json().catch(() => null);

    if (!response.ok || result?.ok === false) {
      throw new Error("save-failed");
    }

    persistence.serverReachable = true;
    persistence.serverUpdatedAt = normalizeText(result?.updatedAt) || payload.updatedAt;
    writeStorageSnapshot(branches, persistence.serverUpdatedAt);
    return true;
  } catch {
    persistence.serverReachable = false;
    state.editStatus = "共有データの保存に失敗しました。";
    setActionStatus("共有保存に失敗しました。サーバー接続を確認してください。");
    return false;
  } finally {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
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
      branches: migrateBranches(parsedBranches),
      updatedAt: normalizeText(payload?.updatedAt),
    };
  }

  if (payload && typeof payload === "object" && Array.isArray(payload.branches) && payload.branches.length === 0) {
    return {
      branches: loadBranches(DEFAULT_BRANCHES),
      updatedAt: normalizeText(payload?.updatedAt) || BUNDLED_UPDATED_AT,
    };
  }

  throw new Error("invalid-data");
}

function applyServerState(serverState) {
  if (!serverState?.branches?.length) {
    return;
  }

  const previousBranchId = state.activeBranchId;
  const previousScopeNodeId = state.scopeNodeId;
  const previousSelectedNodeId = state.selectedNodeId;
  const previousSearchTerm = state.searchTerm;
  const knownNodeIds = new Set(serverState.branches.flatMap((branch) => branch.nodes.map((node) => node.id)));

  const preferLocalEditable = parseUpdatedAt(persistence.localUpdatedAt) >= parseUpdatedAt(serverState.updatedAt);
  const mergedUpdatedAt = preferLocalEditable ? persistence.localUpdatedAt || serverState.updatedAt : serverState.updatedAt;
  branches = mergeBranchLists(serverState.branches, branches, {
    preferLocalEditable,
    keepLocalOnlyNodes: KEEP_LOCAL_ONLY_NODES,
  });
  writeStorageSnapshot(branches, mergedUpdatedAt);
  persistence.localUpdatedAt = normalizeText(mergedUpdatedAt);

  const branch = getBranch(previousBranchId) ?? branches[0];
  if (!branch) {
    return;
  }

  state.activeBranchId = branch.id;
  state.searchTerm = previousSearchTerm;
  state.expandedDepartmentIds = new Set(
    [...state.expandedDepartmentIds].filter((nodeId) => knownNodeIds.has(nodeId))
  );

  const nodes = nodeMap(branch);
  state.scopeNodeId = nodes.has(previousScopeNodeId) ? previousScopeNodeId : branch.rootId;
  state.selectedNodeId = nodes.has(previousSelectedNodeId)
    ? previousSelectedNodeId
    : firstPersonInScope(branch, state.scopeNodeId)?.id ?? state.scopeNodeId;

  const scopeNode = nodes.get(state.scopeNodeId);
  if (isCollapsibleUnitNode(scopeNode)) {
    state.expandedDepartmentIds.add(scopeNode.id);
  }
  if (state.selectedNodeId) {
    expandPathToNode(branch, state.selectedNodeId);
  }
  if (elements.search) {
    elements.search.value = state.searchTerm;
  }

  render();
}

async function syncBranchesFromServer(options = {}) {
  const { force = false } = options;

  if (persistence.mode !== "server" || syncInFlight || state.isSaving) {
    return;
  }

  if (!force && (elements.profileEditor?.open || elements.profileCreator?.open)) {
    return;
  }

  syncInFlight = true;

  try {
    const serverState = await loadServerBranches();
    persistence.serverReachable = true;
    persistence.serverUpdatedAt = normalizeText(serverState.updatedAt);

    if (
      looksCorruptedBranches(branches) ||
      parseUpdatedAt(serverState.updatedAt) > parseUpdatedAt(persistence.localUpdatedAt) ||
      parseUpdatedAt(persistence.localUpdatedAt) > parseUpdatedAt(serverState.updatedAt)
    ) {
      applyServerState(serverState);
    }
  } catch {
    persistence.serverReachable = false;
  } finally {
    syncInFlight = false;
  }
}

function startServerSyncPolling() {
  if (persistence.mode !== "server" || syncTimerId) {
    return;
  }

  syncTimerId = window.setInterval(() => {
    syncBranchesFromServer();
  }, SERVER_SYNC_INTERVAL_MS);
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

function getScopeNode(branch = getActiveBranch()) {
  if (!branch) {
    return null;
  }

  const nodes = nodeMap(branch);
  return nodes.get(state.scopeNodeId) ?? nodes.get(branch.rootId) ?? null;
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

function collectScopePeople(branch, scopeNodeId = state.scopeNodeId) {
  const nodes = nodeMap(branch);
  const scopeRoot = nodes.get(scopeNodeId) ?? nodes.get(branch.rootId);
  if (!scopeRoot) {
    return [];
  }

  const people = [];
  const visited = new Set();
  const stack = [scopeRoot];

  while (stack.length > 0) {
    const currentNode = stack.pop();
    if (!currentNode || visited.has(currentNode.id)) {
      continue;
    }

    visited.add(currentNode.id);
    if (currentNode.kind === "person") {
      people.push(currentNode);
    }

    [...currentNode.reports].reverse().forEach((childId) => {
      const childNode = nodes.get(childId);
      if (childNode) {
        stack.push(childNode);
      }
    });
  }

  return people;
}

function isNodeInScope(branch, nodeId, scopeNodeId = state.scopeNodeId) {
  return collectScopePeople(branch, scopeNodeId).some((node) => node.id === nodeId);
}

function firstPersonInScope(branch, scopeNodeId = state.scopeNodeId) {
  return collectScopePeople(branch, scopeNodeId)[0] ?? null;
}

function setScope(branchId, scopeNodeId) {
  const branch = getBranch(branchId) ?? branches[0];
  if (!branch) {
    return;
  }

  const nodes = nodeMap(branch);
  const resolvedScopeId = nodes.has(scopeNodeId) ? scopeNodeId : branch.rootId;
  const scopeNode = nodes.get(resolvedScopeId) ?? nodes.get(branch.rootId) ?? null;

  state.activeBranchId = branch.id;
  state.scopeNodeId = resolvedScopeId;
  state.editStatus = "";
  state.createStatus = "";
  clearActionStatus();

  if (scopeNode && isCollapsibleUnitNode(scopeNode)) {
    state.expandedDepartmentIds.add(scopeNode.id);
  }

  if (scopeNode?.kind === "person") {
    state.selectedNodeId = scopeNode.id;
  } else if (!isNodeInScope(branch, state.selectedNodeId, resolvedScopeId)) {
    state.selectedNodeId = firstPersonInScope(branch, resolvedScopeId)?.id ?? scopeNode?.id ?? branch.rootId;
  }

  if (state.selectedNodeId) {
    expandPathToNode(branch, state.selectedNodeId);
  }

  render();
}

function searchText(node) {
  return [node.name, getRoleText(node), node.department, historyText(node), node.description ?? "", ...(node.tags ?? [])]
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
  return collectScopePeople(branch)
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

function buildAffiliationOptions(branch, preferredValue = "") {
  if (!branch) {
    return [];
  }

  const seen = new Set();
  const options = [];
  const pushOption = (value, label = value) => {
    const normalizedValue = normalizeText(value);
    if (!normalizedValue || seen.has(normalizedValue)) {
      return;
    }
    seen.add(normalizedValue);
    options.push({ value: normalizedValue, label: normalizeText(label) || normalizedValue });
  };

  pushOption(branch.name, branch.name);
  pushOption("支店統括", "支店統括");
  branch.nodes.forEach((node) => {
    if (node.kind === "unit") {
      pushOption(node.name, node.name);
    }
  });

  const normalizedPreferredValue = normalizeText(preferredValue);
  if (normalizedPreferredValue && !seen.has(normalizedPreferredValue)) {
    options.splice(1, 0, {
      value: normalizedPreferredValue,
      label: normalizedPreferredValue,
    });
  }

  return options;
}

function createDepartmentName(branch, targetNode) {
  if (!targetNode) {
    return "";
  }

  if (targetNode.id === branch.rootId) {
    return branch.name;
  }

  if (isOfficeNode(targetNode)) {
    return targetNode.name;
  }

  return normalizeText(targetNode.name) || branch.name;
}

function populateCreateSelectFields(defaults = {}) {
  populateRoleFields(
    elements.createTitle,
    elements.createTitleSecondary,
    elements.createTitleSecondaryField,
    elements.createAddTitleButton,
    defaults.titles ?? defaults.title
  );
  if (elements.createBirthDate) {
    elements.createBirthDate.value = normalizeBirthDate(defaults.birthDate);
  }
  setSelectOptions(elements.createJoinYear, buildNumericSelectOptions(EDIT_JOIN_YEAR_OPTIONS, defaults.joinYear), normalizeNumericField(defaults.joinYear));
  setSelectOptions(elements.createTenure, buildNumericSelectOptions(EDIT_TENURE_OPTIONS, defaults.tenure), normalizeNumericField(defaults.tenure));
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
  state.scopeNodeId = branch.rootId;
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

function handleNodeClick(event, branchId, nodeId) {
  if (Date.now() < state.ignoreNodeClickUntil) {
    return;
  }

  const branch = getBranch(branchId);
  if (!branch) {
    return;
  }

  const node = branch.nodes.find((currentNode) => currentNode.id === nodeId);
  if (!node) {
    return;
  }

  const nodes = nodeMap(branch);
  const inlineLeader = getInlineUnitLeader(node, nodes);
  if (inlineLeader && event?.target?.closest(".node-inline-leader") && !isOfficeNode(node)) {
    selectNode(branchId, inlineLeader.linkedNodeId || inlineLeader.id);
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

function clearDragIndicators() {
  document.body.classList.remove("org-drag-active");
  document.querySelectorAll(".org-chart li.is-dragging, .org-chart li.drop-before, .org-chart li.drop-after").forEach((item) => {
    item.classList.remove("is-dragging", "drop-before", "drop-after");
  });
}

function resetDragState() {
  dragState.active = false;
  dragState.pointerId = null;
  dragState.branchId = "";
  dragState.nodeId = "";
  dragState.parentId = "";
  dragState.startX = 0;
  dragState.startY = 0;
  dragState.moved = false;
  dragState.overNodeId = "";
  dragState.placeAfter = false;
}

function beginNodeDrag(event, branchId, nodeId, parentId) {
  if (!parentId) {
    return;
  }

  if (typeof event.button === "number" && event.button !== 0) {
    return;
  }

  const item = event.currentTarget.closest("li[data-node-id]");
  if (!item) {
    return;
  }

  clearDragIndicators();
  resetDragState();

  dragState.active = true;
  dragState.pointerId = event.pointerId;
  dragState.branchId = branchId;
  dragState.nodeId = nodeId;
  dragState.parentId = parentId;
  dragState.startX = event.clientX;
  dragState.startY = event.clientY;

  item.classList.add("is-dragging");
  if (typeof event.currentTarget.setPointerCapture === "function") {
    event.currentTarget.setPointerCapture(event.pointerId);
  }
}

function updateDragTarget(targetItem, placeAfter) {
  document.querySelectorAll(".org-chart li.drop-before, .org-chart li.drop-after").forEach((item) => {
    if (item !== targetItem) {
      item.classList.remove("drop-before", "drop-after");
    }
  });

  targetItem.classList.toggle("drop-before", !placeAfter);
  targetItem.classList.toggle("drop-after", placeAfter);
}

function handleNodePointerMove(event) {
  if (!dragState.active || event.pointerId !== dragState.pointerId) {
    return;
  }

  const distance = Math.hypot(event.clientX - dragState.startX, event.clientY - dragState.startY);
  if (!dragState.moved && distance < 10) {
    return;
  }

  if (!dragState.moved) {
    dragState.moved = true;
    document.body.classList.add("org-drag-active");
  }

  const targetItem = document.elementFromPoint(event.clientX, event.clientY)?.closest("li[data-node-id]");
  if (!targetItem || targetItem.dataset.parentId !== dragState.parentId || targetItem.dataset.nodeId === dragState.nodeId) {
    dragState.overNodeId = "";
    document.querySelectorAll(".org-chart li.drop-before, .org-chart li.drop-after").forEach((item) => {
      item.classList.remove("drop-before", "drop-after");
    });
    return;
  }

  const rect = targetItem.getBoundingClientRect();
  const placeAfter = event.clientY >= rect.top + rect.height / 2;

  dragState.overNodeId = targetItem.dataset.nodeId ?? "";
  dragState.placeAfter = placeAfter;
  updateDragTarget(targetItem, placeAfter);
  event.preventDefault();
}

async function finishNodeDrag(event) {
  if (!dragState.active || event.pointerId !== dragState.pointerId) {
    return;
  }

  const shouldSuppressClick = dragState.moved;
  const branchId = dragState.branchId;
  const parentId = dragState.parentId;
  const nodeId = dragState.nodeId;
  const overNodeId = dragState.overNodeId;
  const placeAfter = dragState.placeAfter;

  clearDragIndicators();
  resetDragState();

  if (shouldSuppressClick) {
    state.ignoreNodeClickUntil = Date.now() + 250;
  }

  if (!shouldSuppressClick || !overNodeId) {
    return;
  }

  const reordered = reorderNodeWithinParent(branchId, parentId, nodeId, overNodeId, placeAfter);
  if (!reordered) {
    render();
    return;
  }

  const saved = await saveBranches();
  setActionStatus(saved ? "組織図の順番を更新しました。" : "順番は更新しましたが、共有保存に失敗しました。");
  render();
}

function cancelNodeDrag(event) {
  if (!dragState.active || event.pointerId !== dragState.pointerId) {
    return;
  }

  clearDragIndicators();
  resetDragState();
}

function renderActionStatus() {
  if (elements.actionStatus) {
    elements.actionStatus.textContent = state.actionStatus;
    delete elements.actionStatus.dataset.state;
  }
}

function waitForNextPaint() {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => {
      window.setTimeout(resolve, 0);
    });
  });
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
  if (elements.editEmployeeNumberField) {
    elements.editEmployeeNumberField.hidden = !isPerson;
  }
  if (elements.editBirthDateField) {
    elements.editBirthDateField.hidden = !isPerson;
  }
  if (!isPerson) {
    setSecondaryRoleVisibility(elements.editTitleSecondaryField, elements.editAddTitleButton, false);
  }
  elements.editJoinYearField.hidden = !isPerson;
  elements.editTenureField.hidden = !isPerson;
  elements.editHistoryField.hidden = !isPerson;
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
  const branch = getActiveBranch();
  elements.branchTabs.innerHTML = "";

  if (!branch) {
    return;
  }

  const select = document.createElement("select");
  select.className = "branch-scope-select";
  select.setAttribute("aria-label", "表示範囲");

  setSelectOptions(
    select,
    createTargetNodes(branch).map((targetNode) => ({
      value: targetNode.id,
      label: createTargetLabel(branch, targetNode),
    })),
    state.scopeNodeId
  );

  select.addEventListener("change", (event) => {
    setScope(branch.id, event.target.value);
  });

  elements.branchTabs.appendChild(select);
}

function renderBranchSummary(branch) {
  const peopleCount = collectScopePeople(branch).length;

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

function createNode(
  node,
  branch,
  nodes,
  path = new Set(),
  scopeRootId = branch.rootId,
  parentId = "",
  options = {}
) {
  const suppressChildrenFor = options.suppressChildrenFor ?? new Set();
  const item = document.createElement("li");
  item.dataset.nodeId = node.id;
  item.dataset.parentId = parentId;
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
  const reportIds = sortReportIdsForDisplay(node, nodes);

  const card = document.createElement("button");
  const kindClass = node.kind === "person" ? "person" : "unit";
  const canToggle = node.kind === "unit" && reportIds.length > 0;
  const isExpanded = state.expandedDepartmentIds.has(node.id);
  const primaryTitle = getPrimaryTitle(node);
  const hasInlineMeta = node.kind === "person" && primaryTitle;
  const inlineLeader = node.kind === "unit" ? getInlineUnitLeader(node, nodes) : null;
  const isActive = node.id === state.selectedNodeId;
  const isRoot = node.id === scopeRootId;
  const isLeaf = reportIds.length === 0;
  const isIndependentUnit = ["branch-admin", "sales-innovation"].includes(node.id);
  const isDepartmentWithLeader = isDepartmentUnitNode(node) && Boolean(inlineLeader);
  const toneClass = node.kind === "person" ? ` role-tone-${getRoleToneKey(node)}` : "";
  const hasInlineLeader = Boolean(inlineLeader);
  const isExecutive = node.kind === "person" && /(支店長|副支店長)/.test(getRoleText(node));
  const isOfficeWithLeader = isOfficeNode(node) && hasInlineLeader;
  const isIndependentUnitWithLeader = ["branch-admin", "sales-innovation"].includes(node.id) && hasInlineLeader;
  const childrenSuppressed = suppressChildrenFor.has(node.id);
  const renderChildReports = !childrenSuppressed && shouldRenderChildren(node, nodes);

  card.type = "button";
  card.className = `node-card ${kindClass}${isActive ? " active" : ""}${isRoot ? " is-root" : ""}${canToggle && !childrenSuppressed ? " is-department" : ""}${isLeaf || childrenSuppressed ? " is-leaf" : ""}${hasInlineLeader ? " has-inline-leader" : ""}${isOfficeWithLeader ? " office-inline-stacked" : ""}${isDepartmentWithLeader ? " department-inline-stacked" : ""}${isIndependentUnitWithLeader ? " unit-inline-stacked" : ""}${isExecutive ? " is-executive" : ""}${toneClass}`;
  if (isIndependentUnit) {
    item.classList.add("is-independent-root");
  }
  if (isOfficeWithLeader) {
    card.innerHTML = `
      <div class="node-card-header office-card-header">
        <span class="node-office-title">${node.name}</span>
        ${hasInlineLeader ? `
          <span class="node-office-leader-line">
            <span class="node-inline-leader-role">${getPrimaryTitle(inlineLeader)}</span>
            <span class="node-inline-leader-name">${inlineLeader.name}</span>
          </span>
        ` : ""}
        ${canToggle ? `<span class="node-toggle-indicator">${isExpanded ? "-" : "+"}</span>` : ""}
      </div>
    `;
  } else if (isDepartmentWithLeader) {
    card.innerHTML = `
      <div class="node-card-header department-card-header">
        <span class="node-dept-title">${node.name}</span>
        <span class="node-dept-leader-line">
          <span class="node-inline-leader-role">${getPrimaryTitle(inlineLeader)}</span>
          <span class="node-inline-leader-name">${inlineLeader.name}</span>
        </span>
        ${canToggle ? `<span class="node-toggle-indicator">${isExpanded ? "-" : "+"}</span>` : ""}
      </div>
    `;
  } else if (isIndependentUnitWithLeader) {
    card.innerHTML = `
      <div class="node-card-header unit-card-header">
        <span class="node-unit-title">${node.name}</span>
        <span class="node-unit-top-name">${inlineLeader.name}</span>
        ${canToggle ? `<span class="node-toggle-indicator">${isExpanded ? "-" : "+"}</span>` : ""}
      </div>
    `;
  } else {
    card.innerHTML = `
      <div class="node-card-header">
        <div class="node-inline-row${hasInlineMeta ? " has-meta" : ""}${hasInlineLeader ? " has-leader" : ""}">
          <span class="node-inline-main">
            ${hasInlineMeta ? `<span class="node-inline-meta">${primaryTitle}</span>` : ""}
            <span class="node-title">${node.name}</span>
          </span>
          ${hasInlineLeader ? `
            <span class="node-inline-leader">
              <span class="node-inline-leader-role">${getPrimaryTitle(inlineLeader)}</span>
              <span class="node-inline-leader-name">${inlineLeader.name}</span>
            </span>
          ` : ""}
        </div>
        ${canToggle ? `<span class="node-toggle-indicator">${isExpanded ? "-" : "+"}</span>` : ""}
      </div>
    `;
  }
  if (ORG_DRAG_ENABLED) {
    card.addEventListener("pointerdown", (event) => beginNodeDrag(event, branch.id, node.id, parentId));
  }
  card.addEventListener("click", (event) => handleNodeClick(event, branch.id, node.id));
  item.appendChild(card);

  if (renderChildReports) {
    const children = document.createElement("ul");
    if (node.kind === "unit") {
      children.classList.add("node-line-children");
    }
    const allPeopleChildren = reportIds.length > 0 && reportIds.every((reportId) => nodes.get(reportId)?.kind === "person");
    if (allPeopleChildren) {
      children.classList.add("vertical-children");
    }

    reportIds.forEach((reportId) => {
      const report = nodes.get(reportId);
      if (report) {
        children.appendChild(createNode(report, branch, nodes, nextPath, scopeRootId, node.id, options));
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
  const root = getScopeNode(branch);
  elements.chartTitle.textContent = "組織図";
  elements.orgChart.innerHTML = "";

  if (!root) {
    elements.orgChart.innerHTML = `<div class="empty-state">組織図データがありません。</div>`;
    return;
  }

  const detachedChildIds = root.id === branch.rootId
    ? root.reports.filter((reportId) => ["branch-admin", "sales-innovation"].includes(reportId))
    : [];
  const detachedChildIdSet = new Set(detachedChildIds);
  const mainRoot = detachedChildIds.length > 0
    ? { ...root, reports: root.reports.filter((reportId) => !detachedChildIdSet.has(reportId)) }
    : root;

  const tree = document.createElement("ul");
  tree.appendChild(createNode(
    mainRoot,
    branch,
    nodes,
    new Set(),
    root.id
  ));

  if (Array.from(tree.children).every((child) => child.hidden)) {
    elements.orgChart.innerHTML = `<div class="empty-state">検索条件に一致する組織がありません。</div>`;
    return;
  }

  const shell = document.createElement("div");
  shell.className = "chart-scale-shell";

  const content = document.createElement("div");
  content.className = `chart-scale-content${detachedChildIds.length > 0 ? " chart-root-layout" : ""}`;
  content.appendChild(tree);

  const detachedRow = document.createElement("div");
  detachedRow.className = "chart-detached-row";
  let hasDetachedRow = false;

  detachedChildIds.forEach((childId) => {
    const childNode = nodes.get(childId);
    if (!childNode) {
      return;
    }
    const detachedTree = document.createElement("ul");
    detachedTree.className = "detached-tree";
    detachedTree.appendChild(createNode(childNode, branch, nodes, new Set(), childNode.id));
    detachedRow.appendChild(detachedTree);
    hasDetachedRow = true;
  });

  if (hasDetachedRow) {
    content.appendChild(detachedRow);
  }

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
    const roleText = getPrimaryTitle(person);
    const toneClass = ` tone-${getRoleToneKey(person)}`;
    card.className = `member-card${person.id === state.selectedNodeId ? " active" : ""}${toneClass}`;
    card.innerHTML = `
      <div class="member-inline-row${roleText ? " has-meta" : ""}">
        <p class="member-role">${roleText || "未設定"}</p>
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
  const affiliation = buildAffiliation(branch, selected) || "未設定";

  if (selected.kind === "person") {
    const roleText = getRoleText(selected) || "未設定";
    elements.profileRoleValue.textContent = roleText;
    elements.profileRoleValue.title = roleText;
    elements.profilePersonInfoRow.hidden = false;
    elements.profileAffiliationValue.textContent = affiliation;
    elements.profileAffiliationValue.title = affiliation;
    elements.profileEmployeeNumberValue.textContent = selected.employeeNumber || "未設定";
    elements.profileEmployeeNumberValue.title = selected.employeeNumber || "未設定";
    elements.profileAgeValue.textContent = getDisplayAge(selected) || "未設定";
    elements.profileTenureValue.textContent = selected.tenure || "未設定";
    elements.profileJoinYearValue.textContent = selected.joinYear || "未設定";
    elements.profileDescriptionRow.hidden = false;
    elements.profileDescriptionLabel.textContent = "経歴";
    renderHistoryDisplay(elements.profileDescriptionValue, selected.historyEntries ?? []);
  } else {
    elements.profilePersonInfoRow.hidden = true;
    elements.profileDescriptionRow.hidden = true;
    elements.profileDescriptionValue.textContent = "";
  }

  if (elements.profileEditor?.open) {
    populateEditForm(selected);
  }
  if (elements.profileCreator?.open) {
    populateCreateForm(branch, selected);
  }
}

function populateEditForm(node) {
  const branch = getActiveBranch();
  const nameParts = splitNameParts(node.name, node.lastName, node.firstName);
  elements.editLastName.value = nameParts.lastName;
  elements.editFirstName.value = nameParts.firstName;
  populateRoleFields(
    elements.editTitle,
    elements.editTitleSecondary,
    elements.editTitleSecondaryField,
    elements.editAddTitleButton,
    node.titles ?? node.title
  );
  setSelectOptions(elements.editDepartment, buildAffiliationOptions(branch, node.department), node.department ?? "");
  if (elements.editEmployeeNumber) {
    elements.editEmployeeNumber.value = node.kind === "person" ? (node.employeeNumber ?? "") : "";
  }
  if (elements.editBirthDate) {
    elements.editBirthDate.value = node.kind === "person" ? normalizeBirthDate(node.birthDate) : "";
  }
  if (elements.editPhoto) {
    elements.editPhoto.value = "";
  }
  elements.editStatus.textContent = state.editStatus;
  if (elements.profileSaveButton) {
    elements.profileSaveButton.disabled = state.isSaving;
    elements.profileSaveButton.textContent = state.isSaving ? "保存中..." : "保存";
  }
  if (elements.deleteProfileButton) {
    elements.deleteProfileButton.disabled = state.isSaving || !branch || node.id === branch.rootId;
  }

  if (node.kind === "person") {
    toggleEditFormFields("person");
    setSelectOptions(elements.editJoinYear, buildNumericSelectOptions(EDIT_JOIN_YEAR_OPTIONS, node.joinYear), normalizeNumericField(node.joinYear));
    setSelectOptions(elements.editTenure, buildNumericSelectOptions(EDIT_TENURE_OPTIONS, node.tenure), normalizeNumericField(node.tenure));
    renderHistoryRows(elements.editHistoryRows, node.historyEntries ?? []);
    elements.editHistoryFieldLabel.textContent = "経歴";
  } else {
    toggleEditFormFields("unit");
    if (elements.editEmployeeNumber) {
      elements.editEmployeeNumber.value = "";
    }
    if (elements.editBirthDate) {
      elements.editBirthDate.value = "";
    }
    setSelectOptions(elements.editJoinYear, buildNumericSelectOptions(EDIT_JOIN_YEAR_OPTIONS), "");
    setSelectOptions(elements.editTenure, buildNumericSelectOptions(EDIT_TENURE_OPTIONS), "");
  }
}

function clearCreateFormFields() {
  if (!elements.createForm) {
    return;
  }

  elements.createForm.reset();
  populateCreateSelectFields();
  setSecondaryRoleVisibility(elements.createTitleSecondaryField, elements.createAddTitleButton, false);
  if (elements.createDepartment) {
    setSelectOptions(elements.createDepartment, [{ value: "", label: "所属" }], "");
  }
}

function populateCreateForm(branch, node) {
  if (!elements.createDepartment || !elements.createStatus || !elements.createOffice) {
    return;
  }

  const targets = createTargetNodes(branch);
  const defaultTarget = isCreateTargetNode(branch, node)
    ? node
    : findOfficeForNode(branch, node.id) ?? defaultCreateTarget(branch);

  setSelectOptions(
    elements.createOffice,
    targets.map((targetNode) => ({
      value: targetNode.id,
      label: createTargetLabel(branch, targetNode),
    })),
    defaultTarget?.id ?? ""
  );
  const resolvedTarget = branch.nodes.find((item) => item.id === elements.createOffice.value) ?? defaultTarget;
  const departmentName = createDepartmentName(branch, resolvedTarget);
  setSelectOptions(elements.createDepartment, buildAffiliationOptions(branch, departmentName), departmentName);
  populateCreateSelectFields();
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

  if (state.isSaving) {
    return;
  }

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
  const nextDepartment = normalizeText(elements.editDepartment.value) || selected.department;
  const selectedTitles = collectRoleValues(elements.editTitle, elements.editTitleSecondary);
  const nextEmployeeNumber = normalizeText(elements.editEmployeeNumber?.value);
  const nextBirthDate = normalizeBirthDate(elements.editBirthDate?.value);
  const hadBirthDate = normalizeBirthDate(selected.birthDate);
  const nextAge = nextBirthDate
    ? calculateAgeFromBirthDate(nextBirthDate)
    : (hadBirthDate ? "" : normalizeNumericField(selected.age));
  const nextJoinYear = normalizeNumericField(elements.editJoinYear.value);
  const nextTenure = normalizeNumericField(elements.editTenure.value);
  const nextHistoryEntries = collectHistoryEntries(elements.editHistoryRows);
  const nextHistory = serializeHistoryEntries(nextHistoryEntries);
  const nextPhotoFile = elements.editPhoto?.files?.[0] ?? null;

  if (selected.kind === "person" && !displayName) {
    state.editStatus = "氏名を入力してください。";
    render();
    return;
  }

  state.isSaving = true;
  state.editStatus = "保存中...";
  render();
  await waitForNextPaint();

  try {
    const updates = {
      name: displayName,
      title: "",
      titles: [],
      department: nextDepartment,
    };

    updates.title = selectedTitles[0] || "";
    updates.titles = selectedTitles;

    if (selected.kind === "person") {
      updates.lastName = lastName;
      updates.firstName = firstName;
      updates.employeeNumber = nextEmployeeNumber;
      updates.birthDate = nextBirthDate;
      updates.age = nextAge;
      updates.joinYear = nextJoinYear;
      updates.tenure = nextTenure;
      updates.historyEntries = nextHistoryEntries;
      updates.history = nextHistory;
      const nextPhoto = await readImageFileAsDataUrl(nextPhotoFile);
      updates.photo = nextPhoto || selected.photo || "";
    }

    updateNode(branch.id, selected.id, updates);

    if (selected.kind === "person") {
      const targetUnit = findUnitByLabel(branch, updates.department);
      const targetParent = resolveParentForPersonPlacement(branch, targetUnit, {
        ...selected,
        ...updates,
      });

      if (targetParent) {
        moveNodeToParent(branch, selected.id, targetParent.id);
      }
    }

    const saved = await saveBranches();
    state.editStatus = saved ? "" : "共有保存に失敗しました。";
    if (saved) {
      clearActionStatus();
    }
  } catch {
    state.editStatus = "保存に失敗しました。";
    setActionStatus("保存に失敗しました。");
  } finally {
    state.isSaving = false;
    render();
  }
}

async function handleDeleteProfile() {
  if (state.isSaving) {
    return;
  }

  const branch = getActiveBranch();
  if (!branch) {
    return;
  }

  const nodes = nodeMap(branch);
  const selected = nodes.get(state.selectedNodeId);
  if (!selected || selected.id === branch.rootId) {
    return;
  }

  const subtreeIds = collectSubtreeNodeIds(branch, selected.id);
  const targetCount = subtreeIds.size;
  const label = selected.kind === "unit" ? `${selected.name} を削除` : `${selected.name} を削除`;
  const detail = targetCount > 1 ? `配下 ${targetCount - 1} 件も削除されます。` : "この操作は元に戻せません。";
  if (!window.confirm(`${label}\n${detail}`)) {
    return;
  }

  state.isSaving = true;
  state.editStatus = "削除中...";
  render();

  try {
    const removed = removeNodeSubtree(branch, selected.id);
    if (!removed) {
      state.editStatus = "削除できませんでした。";
      return;
    }

    const saved = await saveBranches();
    state.editStatus = saved ? "" : "共有保存に失敗しました。";
    if (saved) {
      clearActionStatus();
      handleCloseEditPanel();
    }
  } catch {
    state.editStatus = "削除に失敗しました。";
    setActionStatus("削除に失敗しました。");
  } finally {
    state.isSaving = false;
    render();
  }
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
    title: "",
    titles: collectRoleValues(elements.createTitle, elements.createTitleSecondary),
    department:
      elements.createDepartment?.value.trim() ||
      createDepartmentName(branch, targetNode),
    employeeNumber: normalizeText(elements.createEmployeeNumber?.value),
    birthDate: normalizeBirthDate(elements.createBirthDate?.value),
    age: calculateAgeFromBirthDate(elements.createBirthDate?.value),
    joinYear: normalizeNumericField(elements.createJoinYear?.value),
    tenure: normalizeNumericField(elements.createTenure?.value),
    historyEntries: [],
    tags: [],
    reports: [],
    photo,
  };
  newNode.title = newNode.titles[0] || "";

  const targetIndex = branch.nodes.findIndex((node) => node.id === targetNode.id);
  if (targetIndex === -1) {
    return;
  }

  const targetReports = [...branch.nodes[targetIndex].reports];
  if (!targetReports.includes(newNode.id)) {
    targetReports.push(newNode.id);
  }
  branch.nodes[targetIndex] = {
    ...branch.nodes[targetIndex],
    reports: targetReports,
  };
  branch.nodes.push(newNode);

  state.selectedNodeId = newNode.id;
  expandPathToNode(branch, newNode.id);

  const saved = await saveBranches();
  state.createStatus = saved ? "" : "共有保存に失敗しました。";
  if (saved) {
    clearActionStatus();
    clearCreateFormFields();
    if (elements.profileCreator) {
      elements.profileCreator.open = false;
    }
  }
  render();
}

function openProfileEditor(branchId, nodeId) {
  state.editStatus = "";
  if (elements.profileEditor) {
    elements.profileEditor.open = true;
  }
  selectNode(branchId, nodeId);
  if (elements.profileEditor) {
    elements.profileEditor.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function openCreatePanel() {
  const branch = getActiveBranch();
  if (!branch) {
    return;
  }

  const nodes = nodeMap(branch);
  const selected = nodes.get(state.selectedNodeId) ?? nodes.get(state.scopeNodeId) ?? nodes.get(branch.rootId);
  if (selected) {
    populateCreateForm(branch, selected);
  }

  state.createStatus = "";
  if (elements.profileCreator) {
    elements.profileCreator.open = true;
    elements.profileCreator.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  render();
}

function handleCloseEditPanel() {
  if (elements.profileEditor) {
    elements.profileEditor.open = false;
  }
}

function handleCloseProfilePanel() {
  const branch = getActiveBranch();
  if (!branch) {
    return;
  }

  state.selectedNodeId = state.scopeNodeId || branch.rootId;
  state.editStatus = "";
  state.createStatus = "";
  clearActionStatus();
  if (elements.profileEditor) {
    elements.profileEditor.open = false;
  }
  render();
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

function collectSubtreeNodeIds(branch, rootId) {
  const nodes = nodeMap(branch);
  const collected = new Set();
  const stack = [rootId];

  while (stack.length > 0) {
    const currentId = stack.pop();
    if (!currentId || collected.has(currentId)) {
      continue;
    }

    const currentNode = nodes.get(currentId);
    if (!currentNode) {
      continue;
    }

    collected.add(currentId);
    currentNode.reports.forEach((childId) => {
      stack.push(childId);
    });
  }

  return collected;
}

function removeNodeSubtree(branch, rootId) {
  if (!branch || !rootId || rootId === branch.rootId) {
    return false;
  }

  const existingNode = nodeMap(branch).get(rootId);
  if (!existingNode) {
    return false;
  }

  const subtreeIds = collectSubtreeNodeIds(branch, rootId);
  const parents = buildParentMap(branch);
  const parentId = parents.get(rootId);

  if (parentId) {
    removeChildFromParent(branch, parentId, rootId);
  }

  branch.nodes = branch.nodes
    .filter((node) => !subtreeIds.has(node.id))
    .map((node) => {
      if (node.kind !== "unit") {
        return node;
      }

      const managerLinkedId = normalizeText(node.managerLinkedId);
      if (!managerLinkedId || !subtreeIds.has(managerLinkedId)) {
        return node;
      }

      return {
        ...node,
        managerLinkedId: "",
      };
    });

  if (!state.scopeNodeId || subtreeIds.has(state.scopeNodeId)) {
    state.scopeNodeId = branch.rootId;
  }

  const updatedNodes = nodeMap(branch);
  const fallbackSelection = parentId && updatedNodes.has(parentId)
    ? parentId
    : firstPersonInScope(branch, state.scopeNodeId)?.id ?? branch.rootId;
  state.selectedNodeId = updatedNodes.has(fallbackSelection)
    ? fallbackSelection
    : firstPersonInScope(branch, branch.rootId)?.id ?? branch.rootId;

  return true;
}

function reorderNodeWithinParent(branchId, parentId, nodeId, targetId, placeAfter = false) {
  const branch = getBranch(branchId);
  if (!branch || !parentId || !nodeId || !targetId || nodeId === targetId) {
    return false;
  }

  const parentIndex = branch.nodes.findIndex((node) => node.id === parentId);
  if (parentIndex === -1) {
    return false;
  }

  const parent = branch.nodes[parentIndex];
  const nextReports = [...parent.reports];
  const sourceIndex = nextReports.indexOf(nodeId);
  const targetIndex = nextReports.indexOf(targetId);
  if (sourceIndex === -1 || targetIndex === -1) {
    return false;
  }

  nextReports.splice(sourceIndex, 1);
  const resolvedTargetIndex = nextReports.indexOf(targetId);
  nextReports.splice(placeAfter ? resolvedTargetIndex + 1 : resolvedTargetIndex, 0, nodeId);

  if (nextReports.join("|") === parent.reports.join("|")) {
    return false;
  }

  branch.nodes[parentIndex] = {
    ...parent,
    reports: nextReports,
  };

  return true;
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

function findUnitByLabel(branch, value) {
  const label = normalizeText(value);
  if (!label) {
    return null;
  }

  if (label === branch.name || label === "支店統括") {
    return nodeMap(branch).get(branch.rootId) ?? null;
  }

  return branch.nodes.find((node) => node.kind === "unit" && node.name === label) ?? null;
}

function resolveParentForPersonPlacement(branch, targetUnit, personLikeNode) {
  if (!targetUnit) {
    return null;
  }

  const inlineLeader = getInlineUnitLeader(targetUnit, nodeMap(branch));
  const roleText = getRoleText(personLikeNode);

  if (!inlineLeader) {
    return targetUnit;
  }

  if (
    normalizeText(inlineLeader.name) === normalizeText(personLikeNode?.name) ||
    /(所長|署長|部長|支店長|副支店長)/.test(roleText)
  ) {
    return targetUnit;
  }

  return inlineLeader;
}

async function handleReset() {
  const confirmed = window.confirm("編集内容を初期状態に戻します。よろしいですか。");
  if (!confirmed) {
    return;
  }

  branches = loadBranches(DEFAULT_BRANCHES);
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

  if (isMobile) {
    shell.style.width = "100%";
    shell.style.minWidth = "0";
    content.style.transformOrigin = "top center";
    shell.style.height = "auto";
    frame.scrollLeft = 0;
    return;
  }

  shell.style.width = "max-content";
  shell.style.minWidth = "100%";
  content.style.transformOrigin = "top center";
}

async function initializeApp() {
  render();

  if (persistence.mode !== "server") {
    return;
  }

  startServerSyncPolling();

  try {
    const serverState = await loadServerBranches();
    persistence.serverReachable = true;
    persistence.serverUpdatedAt = normalizeText(serverState.updatedAt);
    applyServerState(serverState);
    setActionStatus("");
  } catch {
    persistence.serverReachable = false;
    setActionStatus("");
    renderActionStatus();
  }
}

elements.search.addEventListener("input", (event) => {
  state.searchTerm = event.target.value;
  clearActionStatus();
  render();
});

if (elements.resetButton) {
  elements.resetButton.addEventListener("click", handleReset);
}

if (elements.profileEditButton) {
  elements.profileEditButton.addEventListener("click", () => {
    const branch = getActiveBranch();
    if (!branch || !state.selectedNodeId) {
      return;
    }

    openProfileEditor(branch.id, state.selectedNodeId);
  });
}
if (elements.profileCloseButton) {
  elements.profileCloseButton.addEventListener("click", handleCloseProfilePanel);
}

elements.addEditHistoryRow.addEventListener("click", () => {
  appendHistoryRow(elements.editHistoryRows);
});
elements.profileForm.addEventListener("submit", handleProfileSave);
if (elements.deleteProfileButton) {
  elements.deleteProfileButton.addEventListener("click", handleDeleteProfile);
}
if (elements.createForm) {
  elements.createForm.addEventListener("submit", handleCreatePerson);
}
if (elements.createOffice) {
  elements.createOffice.addEventListener("change", () => {
    const branch = getActiveBranch();
    if (!branch) {
      return;
    }

    const targetNode = nodeMap(branch).get(elements.createOffice.value);
    const departmentName = createDepartmentName(branch, targetNode ?? defaultCreateTarget(branch));
    if (elements.createDepartment) {
      setSelectOptions(elements.createDepartment, buildAffiliationOptions(branch, departmentName), departmentName);
    }
  });
}
if (elements.editAddTitleButton) {
  elements.editAddTitleButton.addEventListener("click", () => {
    setSecondaryRoleVisibility(elements.editTitleSecondaryField, elements.editAddTitleButton, true);
    setSelectOptions(
      elements.editTitleSecondary,
      buildEditRoleOptions(elements.editTitleSecondary?.value ?? ""),
      elements.editTitleSecondary?.value ?? ""
    );
    elements.editTitleSecondary?.focus();
  });
}
if (elements.createAddTitleButton) {
  elements.createAddTitleButton.addEventListener("click", () => {
    setSecondaryRoleVisibility(elements.createTitleSecondaryField, elements.createAddTitleButton, true);
    setSelectOptions(
      elements.createTitleSecondary,
      buildEditRoleOptions(elements.createTitleSecondary?.value ?? ""),
      elements.createTitleSecondary?.value ?? ""
    );
    elements.createTitleSecondary?.focus();
  });
}
if (elements.closeEditPanel) {
  elements.closeEditPanel.addEventListener("click", handleCloseEditPanel);
}
if (elements.openCreateButton) {
  elements.openCreateButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    openCreatePanel();
  });
}
window.addEventListener("resize", () => {
  window.requestAnimationFrame(fitOrgChartToFrame);
});
window.addEventListener("focus", () => {
  syncBranchesFromServer({ force: true });
});
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    syncBranchesFromServer({ force: true });
  }
});
window.addEventListener("storage", (event) => {
  if (event.key !== STORAGE_KEY || !event.newValue) {
    return;
  }

  try {
    const payload = JSON.parse(event.newValue);
    const parsedBranches = parseBranches(payload);
    const updatedAt = normalizeText(payload?.updatedAt);

    if (!parsedBranches || looksCorruptedBranches(parsedBranches)) {
      return;
    }

    if (
      !looksCorruptedBranches(branches) &&
      parseUpdatedAt(updatedAt) <= parseUpdatedAt(persistence.localUpdatedAt)
    ) {
      return;
    }

    applyServerState({
      branches: migrateBranches(parsedBranches),
      updatedAt,
    });
  } catch {
    // Ignore invalid storage payloads from other tabs.
  }
});
if (ORG_DRAG_ENABLED) {
  window.addEventListener("pointermove", handleNodePointerMove);
  window.addEventListener("pointerup", finishNodeDrag);
  window.addEventListener("pointercancel", cancelNodeDrag);
}

initializeApp();

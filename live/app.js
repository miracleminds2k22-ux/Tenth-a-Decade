/* ============================================================
   TENTH — A DECADE  |  Live Championship App
   Shared logic: Firebase connection, team data, helpers
   ============================================================ */

// ---- Firebase config (safe to be public — access is controlled by DB rules) ----
const firebaseConfig = {
  apiKey: "AIzaSyAr68J3rG5J9U8RK3TP7ztI6IO9kvgpCmQ",
  authDomain: "tenth-a-decade.firebaseapp.com",
  databaseURL: "https://tenth-a-decade-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tenth-a-decade",
  storageBucket: "tenth-a-decade.firebasestorage.app",
  messagingSenderId: "59661974914",
  appId: "1:59661974914:web:05545d7d38c343afc3639b"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ---- Team constants ----
const TEAM_META = {
  red:    { name: "Team Red",    color: "#E63946", icon: "🔴" },
  blue:   { name: "Team Blue",   color: "#3A86FF", icon: "🔵" },
  yellow: { name: "Team Yellow", color: "#FFB627", icon: "🟡" },
  green:  { name: "Team Green",  color: "#2DC653", icon: "🟢" }
};
const TEAM_ORDER = ["red", "blue", "yellow", "green"];

// ---- One-time DB seed (safe to call repeatedly — only writes if missing) ----
function ensureTeamsExist() {
  db.ref("teams").once("value").then(snap => {
    if (snap.exists()) return;
    const seed = {};
    TEAM_ORDER.forEach(key => {
      seed[key] = {
        name: TEAM_META[key].name,
        points: 0,
        captain: "",
        chant: "",
        members: [],
        gamesWon: 0,
        gamesPlayed: 0,
        runnerUp: 0
      };
    });
    db.ref("teams").set(seed);
  });
}
ensureTeamsExist();

// ---- Helpers ----
function fmtTime(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

function fmtDate(d) {
  return d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
}

function rankLabel(i) {
  return ["1ST", "2ND", "3RD", "4TH"][i] || `${i + 1}TH`;
}

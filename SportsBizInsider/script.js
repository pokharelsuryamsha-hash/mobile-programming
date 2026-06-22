/* ===========================================================
   script.js — SportsBizInsider
   Handles screen navigation, form submission, search/filtering,
   dark mode, and rendering of news / live score content.

   User accounts are backed by Firebase Authentication, and each
   user's profile (name, email) is stored in Firebase Realtime
   Database under /users/{uid}. See firebase-config.js for setup
   instructions and firebase-init.js for how the SDK is wired in.
   =========================================================== */

// ---------- Current session user (kept in sync with Firebase Auth) ----------
let currentUser = {
  name: "",
  email: ""
};

let activeNewsArticleId = null;
let activeScoreId = null;
let currentNewsFilter = "all";

// search query state, kept separate per page so switching screens doesn't wipe it out
let homeSearchQuery = "";
let newsSearchQuery = "";
let scoresSearchQuery = "";
let settingsSearchQuery = "";

// set to true once firebase-init.js has finished loading the SDK over the network
let firebaseReady = false;
window.addEventListener("sbiFirebaseReady", function () {
  firebaseReady = true;
  attachAuthListener();
});

// ---------- Screen navigation ----------
const screens = {
  signin: document.getElementById("screen-signin"),
  signup: document.getElementById("screen-signup"),
  home: document.getElementById("screen-home"),
  news: document.getElementById("screen-news"),
  article: document.getElementById("screen-article"),
  scores: document.getElementById("screen-scores"),
  "score-detail": document.getElementById("screen-score-detail"),
  settings: document.getElementById("screen-settings")
};

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.add("hidden"));
  screens[name].classList.remove("hidden");
  // reset scroll position
  const content = screens[name].querySelector(".screen-content");
  if (content) content.scrollTop = 0;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 2200);
}

// small helper: does any of the given strings contain the query (case-insensitive)?
function matchesQuery(query, ...fields) {
  if (!query) return true;
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return fields.some(f => (f || "").toLowerCase().includes(q));
}

// ---------- SIGN IN ----------
document.getElementById("signin-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("signin-email").value.trim().toLowerCase();
  const password = document.getElementById("signin-password").value;
  const errorEl = document.getElementById("signin-error");
  errorEl.textContent = "";

  if (!email || !password) {
    errorEl.textContent = "Please enter both email and password.";
    return;
  }
  if (!firebaseReady) {
    errorEl.textContent = "Still connecting to Firebase, please try again in a moment.";
    return;
  }

  const submitBtn = e.target.querySelector('button[type="submit"]');
  submitBtn.disabled = true;

  const { auth, signInWithEmailAndPassword } = window.sbiFirebase;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      // onAuthStateChanged (attachAuthListener) takes care of loading the
      // profile from Realtime Database and navigating to Home.
      showToast("Signed in successfully");
    })
    .catch((error) => {
      errorEl.textContent = firebaseErrorToMessage(error);
    })
    .finally(() => {
      submitBtn.disabled = false;
    });
});

document.getElementById("forgot-password").addEventListener("click", function (e) {
  e.preventDefault();
  const email = document.getElementById("signin-email").value.trim().toLowerCase();
  if (!email) {
    showToast("Enter your email above first, then tap Forgot Password");
    return;
  }
  if (!firebaseReady) {
    showToast("Still connecting to Firebase, please try again in a moment.");
    return;
  }
  const { auth, sendPasswordResetEmail } = window.sbiFirebase;
  sendPasswordResetEmail(auth, email)
    .then(() => showToast("Password reset email sent to " + email))
    .catch((error) => showToast(firebaseErrorToMessage(error)));
});

document.getElementById("go-to-signup").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("signin-error").textContent = "";
  showScreen("signup");
});

// ---------- SIGN UP ----------
document.getElementById("back-to-signin-from-signup").addEventListener("click", function () {
  showScreen("signin");
});

document.getElementById("go-to-signin").addEventListener("click", function (e) {
  e.preventDefault();
  showScreen("signin");
});

document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim().toLowerCase();
  const password = document.getElementById("signup-password").value;
  const errorEl = document.getElementById("signup-error");
  errorEl.textContent = "";

  if (!name || !email || !password) {
    errorEl.textContent = "Please fill in all fields.";
    return;
  }
  if (password.length < 6) {
    errorEl.textContent = "Password must be at least 6 characters.";
    return;
  }
  if (!firebaseReady) {
    errorEl.textContent = "Still connecting to Firebase, please try again in a moment.";
    return;
  }

  const submitBtn = e.target.querySelector('button[type="submit"]');
  submitBtn.disabled = true;

  const { auth, createUserWithEmailAndPassword, updateProfile, saveUserProfile } = window.sbiFirebase;
  let newUid = null;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      newUid = userCredential.user.uid;
      // Keep the displayName on the Auth user in sync too, and store the
      // full profile in Realtime Database under /users/{uid}.
      return Promise.all([
        updateProfile(userCredential.user, { displayName: name }),
        saveUserProfile(newUid, { name: name, email: email, createdAt: Date.now() })
      ]);
    })
    .then(() => {
      // Set currentUser directly here rather than waiting on the
      // onAuthStateChanged listener, since that listener can fire before
      // these writes finish and would otherwise show a placeholder name
      // for a moment.
      currentUser = { uid: newUid, name: name, email: email };
      updateUserDisplays();
      showScreen("home");
      showToast("Account created");
    })
    .catch((error) => {
      errorEl.textContent = firebaseErrorToMessage(error);
    })
    .finally(() => {
      submitBtn.disabled = false;
    });
});

function updateUserDisplays() {
  document.getElementById("home-username").textContent = currentUser.name;
  // settings name/email are re-rendered inside renderSettingsList(), so just re-render
  renderSettingsList();
}

// Turns Firebase Auth error codes into short, human-readable messages.
function firebaseErrorToMessage(error) {
  const code = error && error.code ? error.code : "";
  switch (code) {
    case "auth/email-already-in-use":
      return "That email is already registered. Try signing in instead.";
    case "auth/invalid-email":
      return "That email address looks invalid.";
    case "auth/weak-password":
      return "Password is too weak (minimum 6 characters).";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/network-request-failed":
      return "Network error — check your connection and try again.";
    default:
      return (error && error.message) ? error.message : "Something went wrong. Please try again.";
  }
}

// Fires whenever Firebase's sign-in state changes: on sign-in, sign-up,
// sign-out, and once automatically on page load if a session already
// exists (so refreshing the page keeps you signed in).
function attachAuthListener() {
  const { auth, onAuthStateChanged, fetchUserProfile } = window.sbiFirebase;

  onAuthStateChanged(auth, function (user) {
    if (user) {
      // Try to load the richer profile from Realtime Database; fall back
      // to whatever Firebase Auth itself knows if that profile is missing.
      fetchUserProfile(user.uid)
        .then((profile) => {
          currentUser = {
            uid: user.uid,
            name: (profile && profile.name) || user.displayName || "SportsBizInsider User",
            email: (profile && profile.email) || user.email
          };
          updateUserDisplays();
          // Only auto-navigate to Home if we're not already past sign-in/sign-up
          // (avoids yanking the user back to Home if they're just browsing settings
          // and Firebase happens to re-fire this listener).
          const onAuthScreen = !screens.signin.classList.contains("hidden") || !screens.signup.classList.contains("hidden");
          if (onAuthScreen) {
            showScreen("home");
          }
        })
        .catch(() => {
          currentUser = { uid: user.uid, name: user.displayName || "SportsBizInsider User", email: user.email };
          updateUserDisplays();
        });
    } else {
      currentUser = { name: "", email: "" };
    }
  });
}

// ---------- HOME ----------
document.getElementById("back-from-home").addEventListener("click", function () {
  signOutCurrentUser();
});

document.getElementById("home-livescores-tab").addEventListener("click", function () {
  renderScoresList();
  showScreen("scores");
});

document.querySelectorAll('#screen-home .tab-bar [data-tab="all-news"]').forEach(btn => {
  btn.addEventListener("click", function () {
    renderNewsList();
    showScreen("news");
  });
});

document.getElementById("portfolio-feature-card").addEventListener("click", function () {
  // The portfolio card links to the F1 TV deal article
  openArticle("n4");
});

document.getElementById("home-search-input").addEventListener("input", function (e) {
  homeSearchQuery = e.target.value;
  renderHomeNewsMini();
});

// ---------- BOTTOM TAB BAR (news / scores / settings screens) ----------
document.querySelectorAll(".tab-bar .tab-btn[data-screen]").forEach(btn => {
  btn.addEventListener("click", function () {
    const target = btn.getAttribute("data-screen");
    if (target === "home") {
      showScreen("home");
    } else if (target === "news") {
      renderNewsList();
      showScreen("news");
    } else if (target === "live-scores") {
      renderScoresList();
      showScreen("scores");
    } else if (target === "settings") {
      renderSettingsList();
      showScreen("settings");
    }
  });
});

// ---------- NEWS LIST ----------
document.getElementById("back-from-news").addEventListener("click", function () {
  showScreen("home");
});

document.querySelectorAll("#news-filters .filter-pill").forEach(pill => {
  pill.addEventListener("click", function () {
    document.querySelectorAll("#news-filters .filter-pill").forEach(p => p.classList.remove("active"));
    pill.classList.add("active");
    currentNewsFilter = pill.getAttribute("data-filter");
    renderNewsList();
  });
});

document.getElementById("news-search-input").addEventListener("input", function (e) {
  newsSearchQuery = e.target.value;
  renderNewsList();
});

function getFilteredNews() {
  let list = currentNewsFilter === "all"
    ? NEWS_DATA
    : NEWS_DATA.filter(n => n.category === currentNewsFilter);

  if (newsSearchQuery.trim()) {
    list = list.filter(n => matchesQuery(newsSearchQuery, n.title, n.tag, n.summary, n.category, n.source, n.keywords));
  }
  return list;
}

function renderNewsList() {
  const container = document.getElementById("news-list-full");
  const emptyMsg = document.getElementById("news-search-empty");
  container.innerHTML = "";
  const filtered = getFilteredNews();

  if (filtered.length === 0) {
    emptyMsg.classList.remove("hidden");
    return;
  }
  emptyMsg.classList.add("hidden");

  filtered.forEach(article => {
    const item = document.createElement("div");
    item.className = "news-item";
    item.innerHTML = `
      <img src="${article.image}" alt="${article.tag}" />
      <div class="news-item-body">
        <span class="news-tag">${article.tag}</span>
        <span class="news-title">${article.title}</span>
      </div>
    `;
    item.addEventListener("click", () => openArticle(article.id));
    container.appendChild(item);
  });
}

function renderHomeNewsMini() {
  const container = document.getElementById("home-news-mini");
  const emptyMsg = document.getElementById("home-search-empty");
  const heading = document.getElementById("home-news-heading");
  const portfolioBlock = document.getElementById("home-portfolio-block");
  container.innerHTML = "";

  const isSearching = homeSearchQuery.trim().length > 0;
  let list = NEWS_DATA;
  if (isSearching) {
    list = NEWS_DATA.filter(n => matchesQuery(homeSearchQuery, n.title, n.tag, n.summary, n.category, n.source, n.keywords));
  } else {
    list = NEWS_DATA.slice(0, 2);
  }

  // hide the portfolio card and tweak the heading while actively searching, so
  // results read clearly as search results rather than the usual home feed
  portfolioBlock.style.display = isSearching ? "none" : "";
  heading.textContent = isSearching ? `Results for "${homeSearchQuery.trim()}"` : "Key Sports Business News";

  if (list.length === 0) {
    emptyMsg.classList.remove("hidden");
    return;
  }
  emptyMsg.classList.add("hidden");

  list.forEach(article => {
    const item = document.createElement("div");
    item.className = "news-mini-item";
    item.innerHTML = `
      <img src="${article.image}" alt="${article.tag}" />
      <div>
        <span class="news-mini-tag">${article.tag}</span>
        <span class="news-mini-title">${article.title}</span>
      </div>
    `;
    item.addEventListener("click", () => openArticle(article.id));
    container.appendChild(item);
  });
}

// ---------- ARTICLE DETAIL ----------
document.getElementById("back-from-article").addEventListener("click", function () {
  // return to whichever list made sense; default to News
  showScreen("news");
});

function renderArticleBodyBlock(block) {
  if (typeof block === "string") {
    return `<p>${block}</p>`;
  }
  // inline image block: { image, caption }
  return `
    <figure class="article-inline-figure">
      <img class="article-inline-img" src="${block.image}" alt="${block.caption || ""}" />
      ${block.caption ? `<figcaption class="article-inline-caption">${block.caption}</figcaption>` : ""}
    </figure>
  `;
}

function openArticle(id) {
  const article = NEWS_DATA.find(n => n.id === id);
  if (!article) return;
  activeNewsArticleId = id;

  const container = document.getElementById("article-content");
  container.innerHTML = `
    <img class="article-hero" src="${article.image}" alt="${article.tag}" />
    <span class="article-tag">${article.tag}</span>
    <h1 class="article-title">${article.title}</h1>
    <p class="article-meta">${article.source} &middot; ${article.date}</p>
    <div class="article-body">
      ${article.body.map(renderArticleBodyBlock).join("")}
    </div>
  `;
  showScreen("article");
}

// ---------- LIVE SCORES LIST ----------
document.getElementById("back-from-scores").addEventListener("click", function () {
  showScreen("home");
});

document.getElementById("scores-search-input").addEventListener("input", function (e) {
  scoresSearchQuery = e.target.value;
  renderScoresList();
});

function matchScoreSearch(match, query) {
  if (!query.trim()) return true;
  const fields = [match.sport, match.league, match.status];
  if (match.teamA) fields.push(match.teamA.name);
  if (match.teamB) fields.push(match.teamB.name);
  if (match.podium) {
    match.podium.forEach(p => fields.push(p.driver));
  }
  return matchesQuery(query, ...fields);
}

function renderScoresList() {
  const container = document.getElementById("scores-list");
  const emptyMsg = document.getElementById("scores-search-empty");
  container.innerHTML = "";

  const filtered = SCORES_DATA.filter(match => matchScoreSearch(match, scoresSearchQuery));

  if (filtered.length === 0) {
    emptyMsg.classList.remove("hidden");
    return;
  }
  emptyMsg.classList.add("hidden");

  filtered.forEach(match => {
    const card = document.createElement("div");
    card.className = "score-card";

    if (match.podium) {
      // motorsport-style podium layout
      card.innerHTML = `
        <div class="score-league">${match.league}</div>
        ${match.podium.map(p => `
          <div class="podium-row">
            <span class="podium-pos">${p.pos}.</span>
            <span class="podium-driver">${p.driver}</span>
            <span class="podium-time">${p.time}</span>
          </div>
        `).join("")}
        <div class="score-footer">
          <span class="score-status">${match.status}</span>
          <span class="score-action">${match.actionLabel}</span>
        </div>
      `;
    } else {
      card.innerHTML = `
        <div class="score-league">${match.league}</div>
        <div class="score-row">
          <span class="score-team"><span class="score-flag">${match.teamA.flag}</span>${match.teamA.name}</span>
          <span class="score-value">${match.teamA.score}</span>
        </div>
        <div class="score-row">
          <span class="score-team"><span class="score-flag">${match.teamB.flag}</span>${match.teamB.name}</span>
          <span class="score-value">${match.teamB.score}</span>
        </div>
        <div class="score-footer">
          <span class="score-status">${match.status}</span>
          <span class="score-action">${match.actionLabel}</span>
        </div>
      `;
    }

    card.addEventListener("click", () => openScoreDetail(match.id));
    container.appendChild(card);
  });
}

// ---------- SCORE DETAIL ----------
document.getElementById("back-from-score-detail").addEventListener("click", function () {
  showScreen("scores");
});

function openScoreDetail(id) {
  const match = SCORES_DATA.find(m => m.id === id);
  if (!match) return;
  activeScoreId = id;

  const container = document.getElementById("score-detail-content");

  const scoreboardHtml = match.podium
    ? `
      <div class="score-detail-scoreboard">
        ${match.podium.map(p => `
          <div class="podium-row">
            <span class="podium-pos">${p.pos}.</span>
            <span class="podium-driver">${p.driver}</span>
            <span class="podium-time">${p.time}</span>
          </div>
        `).join("")}
      </div>
    `
    : `
      <div class="score-detail-scoreboard">
        <div class="score-row">
          <span class="score-team"><span class="score-flag">${match.teamA.flag}</span>${match.teamA.name}</span>
          <span class="score-value">${match.teamA.score}</span>
        </div>
        <div class="score-row">
          <span class="score-team"><span class="score-flag">${match.teamB.flag}</span>${match.teamB.name}</span>
          <span class="score-value">${match.teamB.score}</span>
        </div>
      </div>
    `;

  const timelineHtml = (match.detail.timeline && match.detail.timeline.length)
    ? `
      <h3 class="score-timeline-heading">Match Timeline</h3>
      <div class="score-timeline">
        ${match.detail.timeline.map(t => `
          <div class="timeline-item">
            <div class="timeline-time">${t.time}</div>
            <div class="timeline-text">${t.text}</div>
          </div>
        `).join("")}
      </div>
    `
    : "";

  container.innerHTML = `
    <div class="score-detail-block">
      <span class="article-tag">${match.league}</span>
      <h1 class="score-detail-headline">${match.detail.headline}</h1>
      ${scoreboardHtml}
      <p class="score-detail-summary">${match.detail.summary}</p>
      ${match.detail.stats.map(s => `
        <div class="score-stat-row">
          <span class="score-stat-label">${s.label}</span>
          <span class="score-stat-value">${s.value}</span>
        </div>
      `).join("")}
      ${timelineHtml}
    </div>
  `;
  showScreen("score-detail");
}

// ---------- SETTINGS ----------
document.getElementById("back-from-settings").addEventListener("click", function () {
  showScreen("home");
});

document.getElementById("settings-search-input").addEventListener("input", function (e) {
  settingsSearchQuery = e.target.value;
  renderSettingsList();
});

// Settings content is modeled as data so it can be searched/filtered like
// everything else. Each row knows how to render itself.
function getSettingsGroups() {
  return [
    {
      label: "USER INFO",
      rows: [
        { id: "edit-profile", label: "Edit Profile", type: "action", actionLabel: "Edit" },
        { id: "name", label: "Name", type: "value", value: currentUser.name },
        { id: "email", label: "Email", type: "value", value: currentUser.email }
      ]
    },
    {
      label: "NOTIFICATIONS",
      rows: [
        { id: "alerts-scores", label: "Alerts for scores", type: "toggle", checked: true },
        { id: "alerts-news", label: "Alerts for scores, business news", type: "toggle", checked: true }
      ]
    },
    {
      label: "ACCOUNT",
      rows: [
        { id: "change-password", label: "Password change", type: "action", actionLabel: "Change" },
        { id: "subscription", label: "Subscription details", type: "toggle", checked: false }
      ]
    },
    {
      label: "APP PREFERENCES",
      rows: [
        { id: "dark-mode", label: "Dark Mode", type: "toggle", checked: document.body.classList.contains("dark-mode") }
      ]
    },
    {
      label: "ABOUT",
      rows: [
        { id: "version", label: "Version", type: "value", value: "1.0.0" },
        { id: "logout", label: "Log Out", type: "action", actionLabel: "Log Out", danger: true }
      ]
    }
  ];
}

function renderSettingsRow(row) {
  if (row.type === "value") {
    return `
      <div class="settings-row">
        <span>${row.label}</span>
        <span class="settings-value">${row.value}</span>
      </div>
    `;
  }
  if (row.type === "action") {
    return `
      <div class="settings-row">
        <span>${row.label}</span>
        <button class="link-action${row.danger ? " danger" : ""}" data-row-id="${row.id}">${row.actionLabel}</button>
      </div>
    `;
  }
  if (row.type === "toggle") {
    return `
      <div class="settings-row">
        <span>${row.label}</span>
        <label class="toggle">
          <input type="checkbox" data-row-id="${row.id}" ${row.checked ? "checked" : ""}>
          <span class="toggle-slider"></span>
        </label>
      </div>
    `;
  }
  return "";
}

function renderSettingsList() {
  const container = document.getElementById("settings-groups");
  const emptyMsg = document.getElementById("settings-search-empty");
  if (!container) return; // guard in case called before DOM ready

  container.innerHTML = "";
  const query = settingsSearchQuery.trim().toLowerCase();
  const groups = getSettingsGroups();
  let totalVisibleRows = 0;

  groups.forEach(group => {
    const visibleRows = query
      ? group.rows.filter(r => r.label.toLowerCase().includes(query) || group.label.toLowerCase().includes(query))
      : group.rows;

    if (visibleRows.length === 0) return;
    totalVisibleRows += visibleRows.length;

    const groupEl = document.createElement("div");
    groupEl.className = "settings-group";
    groupEl.innerHTML = `
      <h4 class="settings-section-label">${group.label}</h4>
      ${visibleRows.map(renderSettingsRow).join("")}
    `;
    container.appendChild(groupEl);
  });

  if (totalVisibleRows === 0) {
    emptyMsg.classList.remove("hidden");
  } else {
    emptyMsg.classList.add("hidden");
  }

  attachSettingsRowHandlers();
}

function attachSettingsRowHandlers() {
  const container = document.getElementById("settings-groups");

  container.querySelectorAll('button.link-action[data-row-id]').forEach(btn => {
    btn.addEventListener("click", () => handleSettingsAction(btn.getAttribute("data-row-id")));
  });

  container.querySelectorAll('input[type="checkbox"][data-row-id]').forEach(input => {
    input.addEventListener("change", (e) => handleSettingsToggle(input.getAttribute("data-row-id"), e.target.checked));
  });
}

function handleSettingsAction(rowId) {
  if (rowId === "edit-profile") {
    const newName = prompt("Edit your name:", currentUser.name);
    if (newName && newName.trim()) {
      const trimmedName = newName.trim();
      if (!firebaseReady || !currentUser.uid) {
        showToast("Still connecting to Firebase, please try again in a moment.");
        return;
      }
      const { updateUserProfile } = window.sbiFirebase;
      updateUserProfile(currentUser.uid, { name: trimmedName })
        .then(() => {
          currentUser.name = trimmedName;
          updateUserDisplays();
          showToast("Profile updated");
        })
        .catch((error) => showToast(firebaseErrorToMessage(error)));
    }
  } else if (rowId === "change-password") {
    if (!firebaseReady || !currentUser.email) {
      showToast("Still connecting to Firebase, please try again in a moment.");
      return;
    }
    const { auth, sendPasswordResetEmail } = window.sbiFirebase;
    sendPasswordResetEmail(auth, currentUser.email)
      .then(() => showToast("Password reset email sent to " + currentUser.email))
      .catch((error) => showToast(firebaseErrorToMessage(error)));
  } else if (rowId === "logout") {
    if (confirm("Are you sure you want to log out?")) {
      signOutCurrentUser();
    }
  }
}

function signOutCurrentUser() {
  if (!firebaseReady) {
    showScreen("signin");
    return;
  }
  const { auth, signOut } = window.sbiFirebase;
  signOut(auth)
    .then(() => {
      showToast("Logged out");
      showScreen("signin");
    })
    .catch((error) => showToast(firebaseErrorToMessage(error)));
}

function handleSettingsToggle(rowId, checked) {
  if (rowId === "dark-mode") {
    setDarkMode(checked);
  } else if (rowId === "alerts-scores") {
    showToast(checked ? "Score alerts on" : "Score alerts off");
  } else if (rowId === "alerts-news") {
    showToast(checked ? "News alerts on" : "News alerts off");
  } else if (rowId === "subscription") {
    showToast(checked ? "Subscription activated (demo)" : "Subscription deactivated");
  }
}

// ---------- DARK MODE ----------
const DARK_MODE_STORAGE_KEY = "sbi-dark-mode";

function setDarkMode(enabled) {
  document.body.classList.toggle("dark-mode", enabled);
  saveDarkModePreference(enabled);
  showToast(enabled ? "Dark Mode on" : "Dark Mode off");
}

// same as setDarkMode but without firing a toast (used on startup)
function setDarkModeSilently(enabled) {
  document.body.classList.toggle("dark-mode", enabled);
}

function saveDarkModePreference(enabled) {
  try {
    localStorage.setItem(DARK_MODE_STORAGE_KEY, enabled ? "on" : "off");
  } catch (e) {
    // localStorage can fail in some private-browsing modes; dark mode just
    // won't persist across refreshes in that case, which is a safe fallback.
  }
}

function loadDarkModePreference() {
  try {
    const saved = localStorage.getItem(DARK_MODE_STORAGE_KEY);
    if (saved === "on") return true;
    if (saved === "off") return false;
  } catch (e) {
    // ignore, fall through to default
  }
  return true; // default to on for first-time visitors, matching the wireframe
}

// ---------- INIT ----------
function init() {
  setDarkModeSilently(loadDarkModePreference());

  renderHomeNewsMini();
  renderNewsList();
  renderScoresList();
  renderSettingsList();

  // Default to the sign-in screen. If Firebase reports an existing signed-in
  // session (e.g. the user refreshed the page), attachAuthListener's
  // onAuthStateChanged callback will redirect to Home automatically once
  // the Firebase SDK finishes loading.
  showScreen("signin");
}

init();
/* ===========================================================
   firebase-init.js
   Loaded as a <script type="module">. Initializes Firebase App,
   Auth, and Realtime Database using the modular (v9+) SDK, then
   exposes everything script.js needs on window.sbiFirebase so
   that script.js (a plain, non-module script) can use it without
   needing a bundler.
   =========================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updatePassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  update,
  get
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Save a user's profile to /users/{uid} in Realtime Database.
// Called right after sign-up, and also after any profile edit,
// so the database always reflects the latest name/email.
function saveUserProfile(uid, data) {
  return set(ref(db, "users/" + uid), data);
}

function updateUserProfile(uid, partialData) {
  return update(ref(db, "users/" + uid), partialData);
}

function fetchUserProfile(uid) {
  return get(ref(db, "users/" + uid)).then(snapshot => snapshot.exists() ? snapshot.val() : null);
}

// Everything below is what script.js (plain script, no imports) can call.
window.sbiFirebase = {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updatePassword,
  updateProfile,
  saveUserProfile,
  updateUserProfile,
  fetchUserProfile
};

// Let script.js know the Firebase SDK has finished loading, since
// script.js loads as a regular (non-module) script and may otherwise
// run before this module resolves its network imports.
window.dispatchEvent(new Event("sbiFirebaseReady"));
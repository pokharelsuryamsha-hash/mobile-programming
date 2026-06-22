/* ===========================================================
   firebase-config.js

   PASTE YOUR OWN FIREBASE PROJECT CONFIG BELOW.

   How to get this:
   1. Go to https://console.firebase.google.com and create a project
      (or open an existing one).
   2. Click the gear icon -> "Project settings".
   3. Scroll to "Your apps" and click the </> (web) icon to register
      a new web app (no need to check the Hosting box).
   4. Firebase will show you a firebaseConfig object exactly like the
      shape below — copy/paste those real values in here.
   5. In the left sidebar, go to Build -> Authentication -> Sign-in
      method, and enable "Email/Password".
   6. In the left sidebar, go to Build -> Realtime Database -> Create
      Database. Pick a location, and start in test mode for now (see
      the security rules note at the bottom of this file before you
      ship this anywhere real).

   This file is intentionally separate from script.js so it's obvious
   exactly what you need to edit and nothing else.
   =========================================================== */

const firebaseConfig = {
  apiKey: "AIzaSyCkNs3Csu5sA63Y_KeEhDT8b74VKeUKZ84",
  authDomain: "sportsbizinsider-b112b.firebaseapp.com",
  databaseURL: "https://sportsbizinsider-b112b-default-rtdb.firebaseio.com/",
  projectId: "sportsbizinsider-b112b",
  storageBucket: "sportsbizinsider-b112b.firebasestorage.app",
  messagingSenderId: "476451347322",
  appId: "1:476451347322:web:a84a5edda16dcd8daa54c3",
  measurementId: "G-FHP6WRF88L"
};


/* ===========================================================
   IMPORTANT — Realtime Database security rules

   By default, a brand-new Realtime Database often starts LOCKED
   (denies all reads/writes), which will make sign-up silently fail
   to save user data even though Firebase Auth itself succeeds.

   For development, go to Realtime Database -> Rules in the Firebase
   console and use something like this so each signed-in user can
   only read/write their own data:

   {
     "rules": {
       "users": {
         "$uid": {
           ".read": "$uid === auth.uid",
           ".write": "$uid === auth.uid"
         }
       }
     }
   }

   This is safe for development and reasonable for production too,
   since it stops one user from reading or overwriting another
   user's profile.
   =========================================================== */
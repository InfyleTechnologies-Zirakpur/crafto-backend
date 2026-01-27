// const admin = require("firebase-admin");

// // 👇 yahin se file load hogi
// const serviceAccount = require("../firebaseServiceAccount.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// module.exports = admin;

const admin = require("firebase-admin");

// Load service account
const serviceAccount = require("../firebaseServiceAccount.json");

console.log("\n🔥 Firebase Admin Initialization");
console.log("=====================================");
console.log("📋 Service Account Details:");
console.log("  Project ID:", serviceAccount.project_id);
console.log("  Private Key ID:", serviceAccount.private_key_id.substring(0, 20) + "...");
console.log("  Client Email:", serviceAccount.client_email);

// Check if already initialized
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    
    console.log("\n✅ Firebase Admin Initialized Successfully!");
    console.log("  Project:", serviceAccount.project_id);
    console.log("  Apps count:", admin.apps.length);
    console.log("=====================================\n");
  } catch (error) {
    console.error("\n❌ Firebase Initialization Failed!");
    console.error("  Error:", error.message);
    console.error("=====================================\n");
    throw error;
  }
} else {
  console.log("\n⚠️  Firebase Admin Already Initialized");
  console.log("  Using existing app");
  console.log("=====================================\n");
}

module.exports = admin;
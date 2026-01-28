

// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const helmet = require("helmet");
// const morgan = require("morgan");
// const path = require("path");

// const app = express();


// app.use(helmet());


// app.use(
//   cors({
//     origin: [
//       "https://clonecrafr.vercel.app", // production
//       "http://localhost:3000",         // local development
//     ],
//     // methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// // ✅ Serve static uploads
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // ===== MongoDB Connection =====
// mongoose.set("strictQuery", false);
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ DB Error:", err.message));

// // ===== Routes =====
// const categoryRoutes = require("./routes/categoryRoutes");
// const templateRoutes = require("./routes/templateRoutes");
// const usersRoutes = require("./routes/users");
// const authRoutes = require("./routes/auth");
// const userTemplateRoutes = require("./routes/userTemplateRoutes");
// const adminAuthRoutes = require("./routes/adminAuth");
// const dashboardRoutes = require("./routes/dashboard");
// const subscriptionsRoutes = require("./routes/subscriptions");
// const politicianRoutes = require("./routes/politicianRoutes");
// const frameRoutes = require("./routes/frameRoutes");
// const downloadRoutes = require("./routes/downloadRoutes");
// const shareRoutes = require("./routes/shareRoutes");
// const politicianTemplateRoutes = require("./routes/PoliticianTemplateRoutes");
// const creationRoutes = require("./routes/creationRoutes");
// const religiousRoutes = require("./routes/religiousRoutes");
// const reportsRoutes = require("./routes/reportsRoutes");
// const languageRoutes = require("./routes/languageRoutes");
// const myCreationRoutes = require("./routes/myCreationRoutes");
// const birthdayRoutes = require("./routes/birthdayRoutes");
// const anniversariesRoutes=require("./routes/anniversariesRoutes");
// const roadBannerRoutes=require("./routes/roadBannerRoutes");
// const notiRoutes = require("./routes/notiRoute");

// // ===== Register API Routes =====
// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminAuthRoutes);
// app.use("/api/users", usersRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/templates", templateRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/subscriptions", subscriptionsRoutes);
// app.use("/api/politicians", politicianRoutes);
// app.use("/api/frames", frameRoutes);
// app.use("/api/user/templates", userTemplateRoutes);
// app.use("/api/download", downloadRoutes);
// app.use("/api/share", shareRoutes);
// app.use("/api/politician-templates", politicianTemplateRoutes);
// app.use("/api/creations", creationRoutes); 
// app.use("/api/religious", religiousRoutes);
// app.use("/api/reports", reportsRoutes);
// app.use("/api/mycreations", myCreationRoutes);
// app.use("/api/languages", languageRoutes);
// app.use("/api", require("./routes/render"));
// app.use("/api/festivals", require("./routes/festivalRoutes"));
// app.use("/api/birthdays", birthdayRoutes);
// app.use("/api/anniversaries", anniversariesRoutes);
// app.use("/api/notification", require("./routes/notificationRoutes"));
// app.use("/api/roadBanner", roadBannerRoutes);
// app.use("/api/admob", require("./routes/admobRoutes"));
// app.use("/api/notifications", notiRoutes);
// app.use("/api/downloads", require("./routes/downloadRoutes"));

// app.use("/api/posts", require("./routes/posts"));
// app.get("/", (req, res) => {
//   res.json({ message: "✅ API Running..." });
// });

// // ===== Global Error Handler =====
// app.use((err, req, res, next) => {
//   console.error("❌ Server Error:", err.stack);
//   res.status(500).json({
//     success: false,
//     message: "Something went wrong",
//     error: err.message,
//   });
// });

// // ===== Start Server =====
// const PORT = process.env.PORT || 7000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: [
      "https://clonecrafr.vercel.app", 
    "https://frontend-crafto-sage.vercel.app",
      "http://localhost:3000",         // local development
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ✅ Serve static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===== MongoDB Connection =====
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Error:", err.message));

// ===== Routes =====
const categoryRoutes = require("./routes/categoryRoutes");
const templateRoutes = require("./routes/templateRoutes");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const userTemplateRoutes = require("./routes/userTemplateRoutes");
const adminAuthRoutes = require("./routes/adminAuth");
const dashboardRoutes = require("./routes/dashboard");
const subscriptionsRoutes = require("./routes/subscriptions");
const politicianRoutes = require("./routes/politicianRoutes");
const frameRoutes = require("./routes/frameRoutes");
const downloadRoutes = require("./routes/downloadRoutes");
const shareRoutes = require("./routes/shareRoutes");
const politicianTemplateRoutes = require("./routes/PoliticianTemplateRoutes");
const creationRoutes = require("./routes/creationRoutes");
const religiousRoutes = require("./routes/religiousRoutes");
const reportsRoutes = require("./routes/reportsRoutes");
const languageRoutes = require("./routes/languageRoutes");
const myCreationRoutes = require("./routes/myCreationRoutes");
const birthdayRoutes = require("./routes/birthdayRoutes");
const anniversariesRoutes = require("./routes/anniversariesRoutes");
const roadBannerRoutes = require("./routes/roadBannerRoutes");
const notiRoutes = require("./routes/notiRoute");
const politicianPostRoutes = require("./routes/politicianPostRoutes");

// ===== Register API Routes =====
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/subscriptions", subscriptionsRoutes);
app.use("/api/politicians", politicianRoutes);
app.use("/api/frames", frameRoutes);
app.use("/api/user/templates", userTemplateRoutes);
app.use("/api/download", downloadRoutes);
app.use("/api/share", shareRoutes);
app.use("/api/politician-templates", politicianTemplateRoutes);
app.use("/api/creations", creationRoutes);
app.use("/api/religious", religiousRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/mycreations", myCreationRoutes);
app.use("/api/languages", languageRoutes);
app.use("/api", require("./routes/render"));
app.use("/api/festivals", require("./routes/festivalRoutes"));
app.use("/api/birthdays", birthdayRoutes);
app.use("/api/anniversaries", anniversariesRoutes);
app.use("/api/notification", require("./routes/notificationRoutes"));
app.use("/api/roadBanner", roadBannerRoutes);
app.use("/api/admob", require("./routes/admobRoutes"));
app.use("/api/notifications", notiRoutes);
app.use("/api/downloads", require("./routes/downloadRoutes"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/politician-posts", politicianPostRoutes);
app.use("/api/ads", require("./routes/ads.routes"));
// 🔥 Firebase Admin Check at Startup
try {
  const admin = require("./config/firebase");
  const serviceAccount = require("./firebaseServiceAccount.json");
  console.log("\n🔥 Firebase Admin Status:");
  console.log("✅ Apps initialized:", admin.apps.length);
  console.log("✅ Project ID:", serviceAccount.project_id);
  console.log("✅ Service Email:", serviceAccount.client_email);
  console.log("========================================\n");
} catch (err) {
  console.error("\n❌ Firebase Initialization Error:");
  console.error(err.message);
  console.error("Make sure firebaseServiceAccount.json exists!");
  console.error("========================================\n");
}

app.get("/", (req, res) => {
  res.json({ message: "✅ API Running..." });
});

// ===== Global Error Handler =====
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
    error: err.message,
  });
});

// ===== Start Server =====
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

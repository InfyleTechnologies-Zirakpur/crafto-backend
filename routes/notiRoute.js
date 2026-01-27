
// // // // const express = require("express");
// // // // const router = express.Router();

// // // // const admin = require("../config/firebase");
// // // // const DeviceToken = require("../models/DeviceToken");
// // // // const Notification = require("../models/Noti");

// // // // /* ======================================
// // // //    REGISTER FCM TOKEN
// // // // ====================================== */
// // // // router.post("/register", async (req, res) => {
// // // //   try {
// // // //     const { token, platform } = req.body;

// // // //     if (!token) {
// // // //       return res.status(400).json({ success: false, message: "Token required" });
// // // //     }

// // // //     await DeviceToken.findOneAndUpdate(
// // // //       { token },
// // // //       { token, platform: platform || "android" },
// // // //       { upsert: true, new: true }
// // // //     );

// // // //     res.json({ success: true, message: "Token registered" });
// // // //   } catch (err) {
// // // //     res.status(500).json({ success: false, message: err.message });
// // // //   }
// // // // });

// // // // /* ======================================
// // // //    CREATE NOTIFICATION
// // // // ====================================== */
// // // // router.post("/", async (req, res) => {
// // // //   try {
// // // //     const notification = await Notification.create(req.body);
// // // //     res.json({ success: true, notification });
// // // //   } catch (err) {
// // // //     res.status(500).json({ success: false, message: err.message });
// // // //   }
// // // // });

// // // // /* ======================================
// // // //    GET ALL NOTIFICATIONS (HISTORY)
// // // // ====================================== */
// // // // router.get("/", async (req, res) => {
// // // //   const notifications = await Notification.find().sort({ createdAt: -1 });
// // // //   res.json({ success: true, notifications });
// // // // });

// // // // /* ======================================
// // // //    UPDATE NOTIFICATION
// // // // ====================================== */
// // // // router.put("/:id", async (req, res) => {
// // // //   const notification = await Notification.findByIdAndUpdate(
// // // //     req.params.id,
// // // //     req.body,
// // // //     { new: true }
// // // //   );
// // // //   res.json({ success: true, notification });
// // // // });

// // // // /* ======================================
// // // //    DELETE NOTIFICATION
// // // // ====================================== */
// // // // router.delete("/:id", async (req, res) => {
// // // //   await Notification.findByIdAndDelete(req.params.id);
// // // //   res.json({ success: true, message: "Notification deleted" });
// // // // });

// // // // /* ======================================
// // // //    SEND PUSH NOTIFICATION
// // // // ====================================== */
// // // // router.post("/send/:id", async (req, res) => {
// // // //   try {
// // // //     const notification = await Notification.findById(req.params.id);
// // // //     if (!notification) {
// // // //       return res.status(404).json({ success: false, message: "Not found" });
// // // //     }

// // // //     const devices = await DeviceToken.find().select("token");
// // // //     if (!devices.length) {
// // // //       return res.status(400).json({ success: false, message: "No devices" });
// // // //     }

// // // //     const message = {
// // // //       notification: {
// // // //         title: notification.title,
// // // //         body: notification.body,
// // // //         ...(notification.image && { image: notification.image }),
// // // //       },
// // // //       data: {
// // // //         link: notification.link || "",
// // // //       },
// // // //       tokens: devices.map(d => d.token),
// // // //     };

// // // //     const response = await admin.messaging().sendEachForMulticast(message);

// // // //     notification.sent = true;
// // // //     await notification.save();

// // // //     res.json({
// // // //       success: true,
// // // //       sent: response.successCount,
// // // //       failed: response.failureCount,
// // // //     });
// // // //   } catch (err) {
// // // //     res.status(500).json({ success: false, message: err.message });
// // // //   }
// // // // });

// // // // module.exports = router;

// // // const express = require("express");
// // // const router = express.Router();

// // // const admin = require("../config/firebase");
// // // const DeviceToken = require("../models/DeviceToken");
// // // const Notification = require("../models/Noti");

// // // /* ===============================
// // //    REGISTER FCM TOKEN
// // // =============================== */
// // // router.post("/register", async (req, res) => {
// // //   try {
// // //     const { token, platform } = req.body;

// // //     if (!token) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "FCM token required",
// // //       });
// // //     }

// // //     await DeviceToken.findOneAndUpdate(
// // //       { token },
// // //       { token, platform: platform || "android" },
// // //       { upsert: true, new: true }
// // //     );

// // //     res.json({
// // //       success: true,
// // //       message: "FCM token registered",
// // //     });
// // //   } catch (err) {
// // //     console.error("FCM REGISTER ERROR:", err);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: err.message,
// // //     });
// // //   }
// // // });

// // // /* ===============================
// // //    CREATE NOTIFICATION (SAVE)
// // // =============================== */
// // // router.post("/", async (req, res) => {
// // //   try {
// // //     const { title, body, image, link } = req.body;

// // //     if (!title || !body) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "Title and body required",
// // //       });
// // //     }

// // //     const notification = await Notification.create({
// // //       title,
// // //       body,
// // //       image,
// // //       link,
// // //     });

// // //     res.status(201).json({
// // //       success: true,
// // //       notification,
// // //     });
// // //   } catch (err) {
// // //     console.error("CREATE NOTI ERROR:", err);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: err.message,
// // //     });
// // //   }
// // // });

// // // /* ===============================
// // //    GET ALL NOTIFICATIONS
// // // =============================== */
// // // router.get("/", async (req, res) => {
// // //   const notifications = await Notification.find().sort({ createdAt: -1 });
// // //   res.json({
// // //     success: true,
// // //     notifications,
// // //   });
// // // });

// // // /* ===============================
// // //    UPDATE NOTIFICATION
// // // =============================== */
// // // router.put("/:id", async (req, res) => {
// // //   const notification = await Notification.findByIdAndUpdate(
// // //     req.params.id,
// // //     req.body,
// // //     { new: true }
// // //   );

// // //   res.json({
// // //     success: true,
// // //     notification,
// // //   });
// // // });

// // // /* ===============================
// // //    DELETE NOTIFICATION
// // // =============================== */
// // // router.delete("/:id", async (req, res) => {
// // //   await Notification.findByIdAndDelete(req.params.id);
// // //   res.json({
// // //     success: true,
// // //     message: "Notification deleted",
// // //   });
// // // });

// // // /* ===============================
// // //    SEND PUSH NOTIFICATION
// // // =============================== */
// // // router.post("/send/:id", async (req, res) => {
// // //   try {
// // //     const notification = await Notification.findById(req.params.id);

// // //     if (!notification) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "Notification not found",
// // //       });
// // //     }

// // //     const devices = await DeviceToken.find().select("token");

// // //     if (!devices.length) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "No registered devices",
// // //       });
// // //     }

// // //     const message = {
// // //       notification: {
// // //         title: notification.title,
// // //         body: notification.body,
// // //         ...(notification.image && { image: notification.image }),
// // //       },
// // //       data: {
// // //         link: notification.link || "",
// // //       },
// // //       tokens: devices.map((d) => d.token),
// // //     };

// // //     const response = await admin.messaging().sendEachForMulticast(message);

// // //     notification.sent = true;
// // //     await notification.save();

// // //     res.json({
// // //       success: true,
// // //       sent: response.successCount,
// // //       failed: response.failureCount,
// // //     });
// // //   } catch (err) {
// // //     console.error("SEND NOTI ERROR:", err);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: err.message,
// // //     });
// // //   }
// // // });

// // // module.exports = router;

// // const express = require("express");
// // const router = express.Router();

// // const admin = require("../config/firebase");
// // const DeviceToken = require("../models/DeviceToken");
// // const Notification = require("../models/Noti");

// // /* ===============================
// //    REGISTER FCM TOKEN
// // =============================== */
// // router.post("/register", async (req, res) => {
// //   try {
// //     const { token, platform } = req.body;

// //     if (!token) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "FCM token required",
// //       });
// //     }

// //     await DeviceToken.findOneAndUpdate(
// //       { token },
// //       { token, platform: platform || "android" },
// //       { upsert: true, new: true }
// //     );

// //     res.json({
// //       success: true,
// //       message: "FCM token registered",
// //     });
// //   } catch (err) {
// //     console.error("FCM REGISTER ERROR:", err);
// //     res.status(500).json({
// //       success: false,
// //       message: err.message,
// //     });
// //   }
// // });

// // /* ===============================
// //    CREATE NOTIFICATION (SAVE)
// // =============================== */
// // router.post("/", async (req, res) => {
// //   try {
// //     const { title, body, image, link } = req.body;

// //     if (!title || !body) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Title and body required",
// //       });
// //     }

// //     const notification = await Notification.create({
// //       title,
// //       body,
// //       image,
// //       link,
// //     });

// //     res.status(201).json({
// //       success: true,
// //       notification,
// //     });
// //   } catch (err) {
// //     console.error("CREATE NOTI ERROR:", err);
// //     res.status(500).json({
// //       success: false,
// //       message: err.message,
// //     });
// //   }
// // });

// // /* ===============================
// //    GET ALL NOTIFICATIONS
// // =============================== */
// // router.get("/", async (req, res) => {
// //   const notifications = await Notification.find().sort({ createdAt: -1 });
// //   res.json({
// //     success: true,
// //     notifications,
// //   });
// // });

// // /* ===============================
// //    UPDATE NOTIFICATION
// // =============================== */
// // router.put("/:id", async (req, res) => {
// //   const notification = await Notification.findByIdAndUpdate(
// //     req.params.id,
// //     req.body,
// //     { new: true }
// //   );

// //   res.json({
// //     success: true,
// //     notification,
// //   });
// // });

// // /* ===============================
// //    DELETE NOTIFICATION
// // =============================== */
// // router.delete("/:id", async (req, res) => {
// //   await Notification.findByIdAndDelete(req.params.id);
// //   res.json({
// //     success: true,
// //     message: "Notification deleted",
// //   });
// // });

// // /* ===============================
// //    SEND PUSH NOTIFICATION
// // =============================== */
// // router.post("/send/:id", async (req, res) => {
// //   try {
// //     const notification = await Notification.findById(req.params.id);

// //     if (!notification) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Notification not found",
// //       });
// //     }

// //     const devices = await DeviceToken.find().select("token");

// //     if (!devices.length) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "No registered devices",
// //       });
// //     }

// //     const message = {
// //       notification: {
// //         title: notification.title,
// //         body: notification.body,
// //         ...(notification.image && { image: notification.image }),
// //       },
// //       data: {
// //         link: notification.link || "",
// //       },
// //       tokens: devices.map((d) => d.token),
// //     };

// //     const response = await admin.messaging().sendEachForMulticast(message);

// //     notification.sent = true;
// //     await notification.save();

// //     res.json({
// //       success: true,
// //       sent: response.successCount,
// //       failed: response.failureCount,
// //     });
// //   } catch (err) {
// //     console.error("SEND NOTI ERROR:", err);
// //     res.status(500).json({
// //       success: false,
// //       message: err.message,
// //     });
// //   }
// // });

// // module.exports = router;

// const express = require("express");
// const router = express.Router();

// const admin = require("../config/firebase");
// const DeviceToken = require("../models/DeviceToken");
// const Notification = require("../models/Noti");

// /* ===============================
//    REGISTER FCM TOKEN
// =============================== */
// router.post("/register", async (req, res) => {
//   try {
//     const { token, platform } = req.body;

//     if (!token) {
//       return res.status(400).json({
//         success: false,
//         message: "FCM token required",
//       });
//     }

//     await DeviceToken.findOneAndUpdate(
//       { token },
//       { token, platform: platform || "android" },
//       { upsert: true, new: true }
//     );

//     res.json({
//       success: true,
//       message: "FCM token registered",
//     });
//   } catch (err) {
//     console.error("FCM REGISTER ERROR:", err);
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

// /* ===============================
//    CREATE NOTIFICATION (SAVE)
// =============================== */
// router.post("/", async (req, res) => {
//   try {
//     const { title, body, image, link } = req.body;

//     if (!title || !body) {
//       return res.status(400).json({
//         success: false,
//         message: "Title and body required",
//       });
//     }

//     const notification = await Notification.create({
//       title,
//       body,
//       image,
//       link,
//       sent: false,
//     });

//     res.status(201).json({
//       success: true,
//       notification,
//     });
//   } catch (err) {
//     console.error("CREATE NOTI ERROR:", err);
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

// /* ===============================
//    GET ALL NOTIFICATIONS
// =============================== */
// router.get("/", async (req, res) => {
//   const notifications = await Notification.find().sort({ createdAt: -1 });
//   res.json({
//     success: true,
//     notifications,
//   });
// });

// /* ===============================
//    UPDATE NOTIFICATION
// =============================== */
// router.put("/:id", async (req, res) => {
//   const notification = await Notification.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );

//   res.json({
//     success: true,
//     notification,
//   });
// });

// /* ===============================
//    DELETE NOTIFICATION
// =============================== */
// router.delete("/:id", async (req, res) => {
//   await Notification.findByIdAndDelete(req.params.id);
//   res.json({
//     success: true,
//     message: "Notification deleted",
//   });
// });

// /* ===============================
//    SEND PUSH NOTIFICATION (🔥 FIXED)
// =============================== */
// router.post("/send/:id", async (req, res) => {
//   try {
//     const notification = await Notification.findById(req.params.id);

//     if (!notification) {
//       return res.status(404).json({
//         success: false,
//         message: "Notification not found",
//       });
//     }

//     const devices = await DeviceToken.find().select("token");

//     if (!devices.length) {
//       return res.status(400).json({
//         success: false,
//         message: "No registered devices",
//       });
//     }

//     const message = {
//       tokens: devices.map((d) => d.token),

//       notification: {
//         title: notification.title,
//         body: notification.body,
//       },

//       android: {
//         priority: "high",
//         notification: {
//           channelId: "default", // 🔥 MUST match app channel
//           sound: "default",
//           imageUrl: notification.image || undefined,
//         },
//       },

//       data: {
//         link: notification.link || "",
//       },
//     };

//     const response = await admin.messaging().sendEachForMulticast(message);

//     // ❌ INVALID TOKEN CLEANUP
//     response.responses.forEach(async (resp, index) => {
//       if (!resp.success) {
//         const code = resp.error?.code;
//         if (
//           code === "messaging/registration-token-not-registered" ||
//           code === "messaging/invalid-registration-token"
//         ) {
//           await DeviceToken.deleteOne({
//             token: devices[index].token,
//           });
//         }
//       }
//     });

//     notification.sent = true;
//     await notification.save();

//     res.json({
//       success: true,
//       sent: response.successCount,
//       failed: response.failureCount,
//     });
//   } catch (err) {
//     console.error("SEND NOTI ERROR:", err);
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

// module.exports = router;


// const express = require("express");
// const router = express.Router();

// const admin = require("../config/firebase");
// const DeviceToken = require("../models/DeviceToken");
// const Notification = require("../models/Noti");

// /* =====================================================
//    REGISTER FCM TOKEN
// ===================================================== */
// router.post("/register", async (req, res) => {
//   try {
//     const { token, platform, user } = req.body;

//     if (!token) {
//       return res.status(400).json({
//         success: false,
//         message: "FCM token required",
//       });
//     }

//     await DeviceToken.findOneAndUpdate(
//       { token },
//       {
//         token,
//         platform: platform || "android",
//         user: user || null,
//       },
//       { upsert: true, new: true }
//     );

//     res.json({
//       success: true,
//       message: "FCM token registered",
//     });
//   } catch (err) {
//     console.error("FCM REGISTER ERROR:", err);
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

// /* =====================================================
//    CREATE NOTIFICATION (SAVE ONLY)
// ===================================================== */
// router.post("/", async (req, res) => {
//   try {
//     const { title, body, image, link } = req.body;

//     if (!title || !body) {
//       return res.status(400).json({
//         success: false,
//         message: "Title and body required",
//       });
//     }

//     const notification = await Notification.create({
//       title,
//       body,
//       image: image || "",
//       link: link || "",
//       sent: false,
//     });

//     res.status(201).json({
//       success: true,
//       notification,
//     });
//   } catch (err) {
//     console.error("CREATE NOTI ERROR:", err);
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

// /* =====================================================
//    GET ALL NOTIFICATIONS
// ===================================================== */
// router.get("/", async (req, res) => {
//   const notifications = await Notification.find().sort({ createdAt: -1 });
//   res.json({
//     success: true,
//     notifications,
//   });
// });

// /* =====================================================
//    DELETE NOTIFICATION
// ===================================================== */
// router.delete("/:id", async (req, res) => {
//   await Notification.findByIdAndDelete(req.params.id);
//   res.json({
//     success: true,
//     message: "Notification deleted",
//   });
// });

// /* =====================================================
//    SEND PUSH NOTIFICATION (🔥 FINAL WORKING)
// ===================================================== */
// router.post("/send/:id", async (req, res) => {
//   try {
//     const notification = await Notification.findById(req.params.id);

//     if (!notification) {
//       return res.status(404).json({
//         success: false,
//         message: "Notification not found",
//       });
//     }

//     const devices = await DeviceToken.find().select("token");
//     if (!devices.length) {
//       return res.status(400).json({
//         success: false,
//         message: "No registered devices",
//       });
//     }

//     const tokens = devices.map((d) => d.token);

//     const message = {
//       tokens,

//       notification: {
//         title: notification.title,
//         body: notification.body,
//         image: notification.image || undefined,
//       },

//       data: {
//         link: notification.link || "",
//         notificationId: notification._id.toString(),
//       },

//       android: {
//         priority: "high",
//       },
//     };

//     const response = await admin.messaging().sendEachForMulticast(message);

//     // ❌ Remove invalid tokens
//     response.responses.forEach(async (r, i) => {
//       if (!r.success) {
//         const code = r.error?.code;
//         if (
//           code === "messaging/invalid-registration-token" ||
//           code === "messaging/registration-token-not-registered"
//         ) {
//           await DeviceToken.deleteOne({ token: tokens[i] });
//         }
//       }
//     });

//     if (response.successCount > 0) {
//       notification.sent = true;
//       await notification.save();
//     }

//     res.json({
//       success: true,
//       sent: response.successCount,
//       failed: response.failureCount,
//     });
//   } catch (err) {
//     console.error("SEND NOTI ERROR:", err);
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();

const admin = require("../config/firebase");
const DeviceToken = require("../models/DeviceToken");
const Notification = require("../models/Noti");

/* =====================================================
   📌 REGISTER / UPDATE FCM TOKEN (LOGIN / TOKEN REFRESH)
   POST /api/notifications/register
===================================================== */
router.post("/register", async (req, res) => {
  try {
    const { token, platform, user } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "FCM token required",
      });
    }

    await DeviceToken.findOneAndUpdate(
      { token },
      {
        token,
        platform: platform || "android", // 🔥 Flutter = android
        user: user || null,
      },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: "FCM token registered / updated",
    });
  } catch (err) {
    console.error("FCM REGISTER ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* =====================================================
   ❌ UNREGISTER FCM TOKEN (LOGOUT)
   POST /api/notifications/unregister
===================================================== */
router.post("/unregister", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.json({
        success: true,
        message: "No token provided",
      });
    }

    await DeviceToken.deleteOne({ token });

    res.json({
      success: true,
      message: "FCM token removed on logout",
    });
  } catch (err) {
    console.error("FCM UNREGISTER ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* =====================================================
   📝 CREATE NOTIFICATION (SAVE ONLY)
   POST /api/notifications
===================================================== */
router.post("/", async (req, res) => {
  try {
    const { title, body, image, link } = req.body;

    if (!title || !body) {
      return res.status(400).json({
        success: false,
        message: "Title and body required",
      });
    }

    const notification = await Notification.create({
      title,
      body,
      image: image || "",
      link: link || "",
      sent: false,
    });

    res.status(201).json({
      success: true,
      notification,
    });
  } catch (err) {
    console.error("CREATE NOTI ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* =====================================================
   📥 GET ALL NOTIFICATIONS
   GET /api/notifications
===================================================== */
router.get("/", async (req, res) => {
  const notifications = await Notification.find().sort({ createdAt: -1 });
  res.json({
    success: true,
    notifications,
  });
});

/* =====================================================
   🗑 DELETE NOTIFICATION
   DELETE /api/notifications/:id
===================================================== */
router.delete("/:id", async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id);
  res.json({
    success: true,
    message: "Notification deleted",
  });
});

/* =====================================================
   🚀 SEND PUSH NOTIFICATION (FLUTTER ANDROID – FINAL)
   POST /api/notifications/send/:id
===================================================== */
router.post("/send/:id", async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    // 🔥 ONLY ANDROID TOKENS (FLUTTER)
    const devices = await DeviceToken.find({ platform: "android" });
    if (!devices.length) {
      return res.status(400).json({
        success: false,
        message: "No Android devices found",
      });
    }

    let sent = 0;
    let failed = 0;

    for (const device of devices) {
      const message = {
        token: device.token,

        notification: {
          title: notification.title,
          body: notification.body,
          image: notification.image || undefined,
        },

        data: {
          link: notification.link || "",
          notificationId: notification._id.toString(),
        },

        android: {
          priority: "high",
          notification: {
            channelId: "high_importance_channel",
            sound: "default",
          },
        },
      };

      try {
        await admin.messaging().send(message);
        sent++;
      } catch (err) {
        failed++;

        const code = err?.errorInfo?.code;
        if (
          code === "messaging/invalid-registration-token" ||
          code === "messaging/registration-token-not-registered"
        ) {
          await DeviceToken.deleteOne({ token: device.token });
        }

        console.error("FCM SEND ERROR:", err.message);
      }
    }

    if (sent > 0) {
      notification.sent = true;
      await notification.save();
    }

    res.json({
      success: true,
      sent,
      failed,
    });
  } catch (err) {
    console.error("SEND NOTI ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;

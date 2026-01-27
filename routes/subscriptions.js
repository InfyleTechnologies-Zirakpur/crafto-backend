// // // const express = require("express");
// // // const router = express.Router();
// // // const Subscription = require("../models/Subscription");
// // // const Razorpay = require("razorpay");

// // // // ===== Razorpay Instance =====
// // // const razorpay = new Razorpay({
// // //   key_id: process.env.RAZORPAY_KEY_ID,
// // //   key_secret: process.env.RAZORPAY_KEY_SECRET
// // // });

// // // // ===== GET all subscriptions + stats =====
// // // router.get("/", async (req, res) => {
// // //   try {
// // //     const subscriptions = await Subscription.find().sort({ createdAt: -1 });
// // //     const activeCount = subscriptions.filter(s => s.status === "active").length;
// // //     const revenue = subscriptions.reduce((acc, s) => acc + (s.amount || 0), 0);

// // //     res.json({
// // //       success: true,
// // //       subscriptions,
// // //       stats: {
// // //         activeSubscriptions: activeCount,
// // //         monthlyRevenue: revenue
// // //       }
// // //     });
// // //   } catch (err) {
// // //     console.error("Get subscriptions error:", err);
// // //     res.status(500).json({ success: false, message: "Server error" });
// // //   }
// // // });

// // // // ===== CREATE Subscription =====
// // // router.post("/", async (req, res) => {
// // //   try {
// // //     const { user, plan, amount, currency = "INR", paymentId, startDate, endDate } = req.body;

// // //     const subscription = new Subscription({
// // //       user,
// // //       plan,
// // //       amount,
// // //       currency,
// // //       paymentId,
// // //       startDate,
// // //       endDate,
// // //       status: "active"
// // //     });

// // //     await subscription.save();
// // //     res.json({ success: true, subscription });
// // //   } catch (err) {
// // //     console.error("Create subscription error:", err);
// // //     res.status(500).json({ success: false, message: "Server error" });
// // //   }
// // // });

// // // // ===== UPDATE Subscription =====
// // // router.put("/:id", async (req, res) => {
// // //   try {
// // //     const updated = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true });
// // //     if (!updated) return res.status(404).json({ success: false, message: "Subscription not found" });
// // //     res.json({ success: true, subscription: updated });
// // //   } catch (err) {
// // //     console.error("Update subscription error:", err);
// // //     res.status(500).json({ success: false, message: "Server error" });
// // //   }
// // // });

// // // // ===== DELETE Subscription =====
// // // router.delete("/:id", async (req, res) => {
// // //   try {
// // //     const deleted = await Subscription.findByIdAndDelete(req.params.id);
// // //     if (!deleted) return res.status(404).json({ success: false, message: "Subscription not found" });
// // //     res.json({ success: true, message: "Subscription deleted" });
// // //   } catch (err) {
// // //     console.error("Delete subscription error:", err);
// // //     res.status(500).json({ success: false, message: "Server error" });
// // //   }
// // // });

// // // // ===== Razorpay Create Order =====
// // // router.post("/create-order", async (req, res) => {
// // //   try {
// // //     const { amount, currency = "INR" } = req.body;
// // //     const order = await razorpay.orders.create({
// // //       amount: amount * 100, // convert to paise
// // //       currency,
// // //       payment_capture: 1
// // //     });
// // //     res.json({ success: true, order });
// // //   } catch (err) {
// // //     console.error("Razorpay create order error:", err);
// // //     res.status(500).json({ success: false, message: "Razorpay error" });
// // //   }
// // // });

// // // // ===== Razorpay Payment Verification =====
// // // router.post("/verify-payment", async (req, res) => {
// // //   try {
// // //     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user, plan, amount, startDate, endDate } = req.body;

// // //     // TODO: Optional: verify signature using crypto if needed

// // //     // Save subscription after successful payment
// // //     const subscription = new Subscription({
// // //       user,
// // //       plan,
// // //       amount,
// // //       paymentId: razorpay_payment_id,
// // //       startDate,
// // //       endDate,
// // //       status: "active"
// // //     });

// // //     await subscription.save();
// // //     res.json({ success: true, subscription });
// // //   } catch (err) {
// // //     console.error("Payment verification error:", err);
// // //     res.status(500).json({ success: false, message: "Server error" });
// // //   }
// // // });

// // // module.exports = router;
// // // backend/routes/subscriptions.js




// // const express = require("express");
// // const router = express.Router();
// // const mongoose = require("mongoose");
// // const Subscription = require("../models/Subscription");
// // const Razorpay = require("razorpay");

// // // ===== Razorpay Instance =====
// // const razorpay = new Razorpay({
// //   key_id: process.env.RAZORPAY_KEY_ID,
// //   key_secret: process.env.RAZORPAY_KEY_SECRET,
// // });

// // // ===== GET ALL SUBSCRIPTIONS =====
// // router.get("/", async (req, res) => {
// //   try {
// //     const subscriptions = await Subscription.find().sort({ createdAt: -1 });
// //     res.json({ success: true, subscriptions });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // });

// // // ===== CREATE SUBSCRIPTION =====
// // router.post("/", async (req, res) => {
// //   try {
// //     const { user, plan, amount } = req.body;
// //     const newSub = new Subscription({ user, plan, amount });
// //     await newSub.save();
// //     res.json({ success: true, subscription: newSub });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // });

// // // ===== UPDATE SUBSCRIPTION =====
// // router.put("/:id", async (req, res) => {
// //   try {
// //     const updatedSub = await Subscription.findByIdAndUpdate(
// //       req.params.id,
// //       req.body,
// //       { new: true }
// //     );
// //     res.json({ success: true, subscription: updatedSub });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // });

// // // ===== DELETE SUBSCRIPTION =====
// // router.delete("/:id", async (req, res) => {
// //   try {
// //     await Subscription.findByIdAndDelete(req.params.id);
// //     res.json({ success: true, message: "Subscription deleted" });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // });

// // // ===== CREATE RAZORPAY ORDER =====
// // router.post("/create-order", async (req, res) => {
// //   const { amount, currency } = req.body;
// //   try {
// //     const order = await razorpay.orders.create({
// //       amount: amount * 100, // paise
// //       currency: currency || "INR",
// //       payment_capture: 1,
// //     });
// //     res.json({ success: true, order });
// //   } catch (err) {
// //     console.error("Razorpay create order error:", err);
// //     res.status(500).json({ success: false, message: "Razorpay error" });
// //   }
// // });

// // module.exports = router;




// // const express = require("express");
// // const router = express.Router();

// // const {
// //   getAllSubscriptions,
// //   createSubscription,
// //   updateSubscription,
// //   deleteSubscription,
// //   createOrder,
// // } = require("../controllers/subscriptionController");

// // // Routes
// // router.get("/", getAllSubscriptions);
// // router.post("/", createSubscription);
// // router.put("/:id", updateSubscription);
// // router.delete("/:id", deleteSubscription);

// // // Razorpay order
// // router.post("/create-order", createOrder);

// // module.exports = router;

// const express = require("express");
// const router = express.Router();

// const {
//   getAllSubscriptions,
//   createSubscription,
//   updateSubscription,
//   deleteSubscription,
//   createOrder,
// } = require("../controllers/subscriptionController");

// // ✅ Get all subscriptions
// router.get("/", getAllSubscriptions);

// // ✅ Create subscription (Admin + GST applied in controller)
// router.post("/", createSubscription);

// // ✅ Update subscription (GST recalculated if amount/gstPercent changes)
// router.put("/:id", updateSubscription);

// // ✅ Delete subscription
// router.delete("/:id", deleteSubscription);

// // ✅ Create Razorpay order (finalAmount → controller logic)
// router.post("/create-order", createOrder);

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  getAllSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  createOrder,
  verifyPayment, // ✅ NEW
} = require("../controllers/subscriptionController");

// 🔥 IMPORTANT: Razorpay routes FIRST
router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);

// --------------------
// Normal CRUD routes
// --------------------
router.get("/", getAllSubscriptions);
router.post("/", createSubscription);
router.put("/:id", updateSubscription);
router.delete("/:id", deleteSubscription);

module.exports = router;

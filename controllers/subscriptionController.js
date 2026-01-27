// // const Subscription = require("../models/Subscription");
// // const Razorpay = require("razorpay");

// // // ----------------------
// // // Razorpay Instance
// // // ----------------------
// // const razorpay = new Razorpay({
// //   key_id: process.env.RAZORPAY_KEY_ID,
// //   key_secret: process.env.RAZORPAY_SECRET,
// // });

// // // ----------------------------------------
// // // GET all subscriptions
// // // ----------------------------------------
// // exports.getAllSubscriptions = async (req, res) => {
// //   try {
// //     const subs = await Subscription.find().sort({ createdAt: -1 });
// //     res.json({ success: true, subscriptions: subs });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // ----------------------------------------
// // // Add subscription (Manually by admin)
// // // ----------------------------------------
// // exports.createSubscription = async (req, res) => {
// //   try {
// //     const { user, plan, amount } = req.body;

// //     const newSub = new Subscription({
// //       user,
// //       plan,
// //       amount,
// //       status: "pending",
// //     });

// //     await newSub.save();

// //     res.json({ success: true, subscription: newSub });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // ----------------------------------------
// // // Update subscription (after payment)
// // // ----------------------------------------
// // exports.updateSubscription = async (req, res) => {
// //   try {
// //     const updated = await Subscription.findByIdAndUpdate(
// //       req.params.id,
// //       req.body,
// //       { new: true }
// //     );

// //     res.json({ success: true, subscription: updated });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // ----------------------------------------
// // // DELETE subscription
// // // ----------------------------------------
// // exports.deleteSubscription = async (req, res) => {
// //   try {
// //     await Subscription.findByIdAndDelete(req.params.id);
// //     res.json({ success: true, message: "Subscription deleted" });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // ----------------------------------------
// // // Create Razorpay Order
// // // ----------------------------------------
// // exports.createOrder = async (req, res) => {
// //   const { amount, currency } = req.body;

// //   try {
// //     const order = await razorpay.orders.create({
// //       amount: amount * 100, // convert rupees → paise
// //       currency: currency || "INR",
// //       payment_capture: 1,
// //     });

// //     res.json({ success: true, order });
// //   } catch (err) {
// //     console.error("Razorpay Order Error:", err);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to create Razorpay order",
// //     });
// //   }
// // };

// const Subscription = require("../models/Subscription");
// const Razorpay = require("razorpay");

// // ----------------------
// // Razorpay Instance
// // ----------------------
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET,
// });

// // ----------------------------------------
// // GET all subscriptions
// // ----------------------------------------
// exports.getAllSubscriptions = async (req, res) => {
//   try {
//     const subs = await Subscription.find().sort({ createdAt: -1 });
//     res.json({ success: true, subscriptions: subs });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ----------------------------------------
// // Add subscription (with GST) — FIXED
// // ----------------------------------------
// exports.createSubscription = async (req, res) => {
//   try {
//     let { user, plan, amount, gstPercent = 0 } = req.body;

//     // ⭐ FIX: Convert Strings to Numbers
//     amount = Number(amount);
//     gstPercent = Number(gstPercent);

//     const gstAmount = (amount * gstPercent) / 100;
//     const finalAmount = amount + gstAmount;

//     const newSub = new Subscription({
//       user,
//       plan,
//       amount,
//       gstPercent,
//       gstAmount,
//       finalAmount,
//       status: "pending",
//     });

//     await newSub.save();

//     res.json({ success: true, subscription: newSub });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ----------------------------------------
// // Update subscription (after payment OR GST update) — FIXED
// // ----------------------------------------
// exports.updateSubscription = async (req, res) => {
//   try {
//     const data = req.body;

//     if (data.amount || data.gstPercent) {
//       const amount = Number(data.amount);
//       const gstPercent = Number(data.gstPercent);

//       const gstAmount = (amount * gstPercent) / 100;
//       const finalAmount = amount + gstAmount;

//       data.amount = amount;
//       data.gstPercent = gstPercent;
//       data.gstAmount = gstAmount;
//       data.finalAmount = finalAmount;
//     }

//     const updated = await Subscription.findByIdAndUpdate(req.params.id, data, {
//       new: true,
//     });

//     res.json({ success: true, subscription: updated });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ----------------------------------------
// // Create Razorpay Order (using finalAmount)
// // ----------------------------------------
// exports.createOrder = async (req, res) => {
//   const { finalAmount, currency } = req.body;

//   try {
//     const order = await razorpay.orders.create({
//       amount: Number(finalAmount) * 100, // convert to paise
//       currency: currency || "INR",
//       payment_capture: 1,
//     });

//     res.json({ success: true, order });
//   } catch (err) {
//     console.error("Razorpay Order Error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to create Razorpay order",
//     });
//   }
// };
// // ----------------------------------------
// // DELETE subscription  ✅ REQUIRED
// // ----------------------------------------
// exports.deleteSubscription = async (req, res) => {
//   try {
//     await Subscription.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: "Subscription deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


// const Subscription = require("../models/Subscription");
// const Razorpay = require("razorpay");
// const crypto = require("crypto");

// // ----------------------
// // Razorpay Instance
// // ----------------------
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET,
// });

// // ----------------------------------------
// // GET all subscriptions
// // ----------------------------------------
// exports.getAllSubscriptions = async (req, res) => {
//   try {
//     const subs = await Subscription.find().sort({ createdAt: -1 });
//     res.json({ success: true, subscriptions: subs });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ----------------------------------------
// // Add subscription (with GST)
// // ----------------------------------------
// exports.createSubscription = async (req, res) => {
//   try {
//     let { user, plan, amount, gstPercent = 0 } = req.body;

//     amount = Number(amount);
//     gstPercent = Number(gstPercent);

//     const gstAmount = (amount * gstPercent) / 100;
//     const finalAmount = amount + gstAmount;

//     const newSub = new Subscription({
//       user,
//       plan,
//       amount,
//       gstPercent,
//       gstAmount,
//       finalAmount,
//       status: "pending",
//     });

//     await newSub.save();
//     res.json({ success: true, subscription: newSub });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ----------------------------------------
// // UPDATE subscription
// // ----------------------------------------
// exports.updateSubscription = async (req, res) => {
//   try {
//     const data = req.body;

//     if (data.amount || data.gstPercent) {
//       const amount = Number(data.amount);
//       const gstPercent = Number(data.gstPercent);

//       const gstAmount = (amount * gstPercent) / 100;
//       const finalAmount = amount + gstAmount;

//       data.amount = amount;
//       data.gstPercent = gstPercent;
//       data.gstAmount = gstAmount;
//       data.finalAmount = finalAmount;
//     }

//     const updated = await Subscription.findByIdAndUpdate(req.params.id, data, {
//       new: true,
//     });

//     res.json({ success: true, subscription: updated });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ----------------------------------------
// // ✅ CREATE RAZORPAY ORDER (FIXED)
// // ----------------------------------------
// exports.createOrder = async (req, res) => {
//   try {
//     const { subscriptionId } = req.body;

//     const subscription = await Subscription.findById(subscriptionId);
//     if (!subscription) {
//       return res.status(404).json({
//         success: false,
//         message: "Subscription not found",
//       });
//     }

//     const order = await razorpay.orders.create({
//       amount: subscription.finalAmount * 100,
//       currency: "INR",
//       receipt: `sub_${subscriptionId}`,
//       payment_capture: 1,
//     });

//     // 🔥 SAVE ORDER ID
//     subscription.razorpayOrderId = order.id;
//     await subscription.save();

//     res.json({
//       success: true,
//       order,
//       key: process.env.RAZORPAY_KEY_ID,
//     });
//   } catch (err) {
//     console.error("Order Error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to create order",
//     });
//   }
// };

// // ----------------------------------------
// // ✅ VERIFY RAZORPAY PAYMENT (SECURE)
// // ----------------------------------------
// exports.verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//     } = req.body;

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid signature",
//       });
//     }

//     const subscription = await Subscription.findOne({
//       razorpayOrderId: razorpay_order_id,
//     });

//     if (!subscription) {
//       return res.status(404).json({
//         success: false,
//         message: "Subscription not found for this order",
//       });
//     }

//     subscription.status = "active";
//     subscription.paymentId = razorpay_payment_id;
//     await subscription.save();

//     res.json({
//       success: true,
//       message: "Payment verified & subscription activated",
//       subscription,
//     });
//   } catch (err) {
//     console.error("Verify Error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Verification failed",
//     });
//   }
// };

// // ----------------------------------------
// // DELETE subscription
// // ----------------------------------------
// exports.deleteSubscription = async (req, res) => {
//   try {
//     await Subscription.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: "Subscription deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

const Subscription = require("../models/Subscription");
const Razorpay = require("razorpay");
const crypto = require("crypto");

/* ======================================================
   RAZORPAY INSTANCE
====================================================== */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

/* ======================================================
   GET ALL SUBSCRIPTIONS
====================================================== */
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subs = await Subscription.find().sort({ createdAt: -1 });
    res.json({ success: true, subscriptions: subs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ======================================================
   CREATE SUBSCRIPTION + AUTO CREATE RAZORPAY ORDER
====================================================== */
exports.createSubscription = async (req, res) => {
  try {
    let { user, plan, amount, gstPercent = 0 } = req.body;

    if (!user || !plan || !amount) {
      return res.status(400).json({
        success: false,
        message: "User, plan and amount are required",
      });
    }

    amount = Number(amount);
    gstPercent = Number(gstPercent);

    const gstAmount = (amount * gstPercent) / 100;
    const finalAmount = amount + gstAmount;

    /* 1️⃣ CREATE SUBSCRIPTION */
    const subscription = new Subscription({
      user,
      plan,
      amount,
      gstPercent,
      gstAmount,
      finalAmount,
      status: "pending",
    });

    await subscription.save();

    /* 2️⃣ CREATE RAZORPAY ORDER (FIXED RECEIPT) */
    const receiptId = `sub_${subscription._id.toString().slice(-8)}`;

    const order = await razorpay.orders.create({
      amount: finalAmount * 100, // paise
      currency: "INR",
      receipt: receiptId, // ✅ < 40 chars
      payment_capture: 1,
    });

    /* 3️⃣ SAVE ORDER ID */
    subscription.razorpayOrderId = order.id;
    await subscription.save();

    res.json({
      success: true,
      subscription,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Create Subscription Error:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Subscription creation failed",
    });
  }
};

/* ======================================================
   UPDATE SUBSCRIPTION
====================================================== */
exports.updateSubscription = async (req, res) => {
  try {
    const data = req.body;

    if (data.amount !== undefined || data.gstPercent !== undefined) {
      const amount = Number(data.amount || 0);
      const gstPercent = Number(data.gstPercent || 0);

      const gstAmount = (amount * gstPercent) / 100;
      const finalAmount = amount + gstAmount;

      data.amount = amount;
      data.gstPercent = gstPercent;
      data.gstAmount = gstAmount;
      data.finalAmount = finalAmount;
    }

    const updated = await Subscription.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.json({ success: true, subscription: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ======================================================
   CREATE NEW ORDER (OPTIONAL – PAYMENT RETRY)
====================================================== */
exports.createOrder = async (req, res) => {
  try {
    const { subscriptionId } = req.body;

    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    const receiptId = `retry_${subscription._id.toString().slice(-8)}`;

    const order = await razorpay.orders.create({
      amount: subscription.finalAmount * 100,
      currency: "INR",
      receipt: receiptId, // ✅ FIXED
      payment_capture: 1,
    });

    subscription.razorpayOrderId = order.id;
    subscription.status = "pending";
    await subscription.save();

    res.json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Create Order Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
    });
  }
};

/* ======================================================
   VERIFY RAZORPAY PAYMENT
====================================================== */
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid Razorpay signature",
      });
    }

    const subscription = await Subscription.findOne({
      razorpayOrderId: razorpay_order_id,
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found for this order",
      });
    }

    subscription.status = "active";
    subscription.paymentId = razorpay_payment_id;
    await subscription.save();

    res.json({
      success: true,
      message: "Payment verified & subscription activated",
      subscription,
    });
  } catch (err) {
    console.error("Verify Payment Error:", err);
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};

/* ======================================================
   DELETE SUBSCRIPTION
====================================================== */
exports.deleteSubscription = async (req, res) => {
  try {
    await Subscription.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Subscription deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

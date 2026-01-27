// // // controllers/reportsController.js
// // const Reports = require("../models/reportsModel");

// // exports.createReport = async (req, res) => {
// //   try {
// //     const { email, description } = req.body;

// //     if (!email || !description) {
// //       return res
// //         .status(400)
// //         .json({ success: false, message: "Email and description are required" });
// //     }

// //     const newReport = await Reports.create({ email, description });
// //     res.status(201).json({ success: true, data: newReport });
// //   } catch (err) {
// //     console.error("Error creating report:", err);
// //     res.status(500).json({ success: false, message: "Server Error" });
// //   }
// // };

// // exports.getAllReports = async (req, res) => {
// //   try {
// //     const reports = await Reports.find().sort({ createdAt: -1 });
// //     res.status(200).json({ success: true, data: reports });
// //   } catch (err) {
// //     console.error("Error fetching reports:", err);
// //     res.status(500).json({ success: false, message: "Server Error" });
// //   }
// // };


// const Reports = require("../models/reportsModel");

// // Create Report
// exports.createReport = async (req, res) => {
//   try {
//     const { email, description } = req.body;
//     if (!email || !description) {
//       return res.status(400).json({ success: false, message: "Email and description required" });
//     }
//     const newReport = await Reports.create({ email, description });
//     res.status(201).json({ success: true, data: newReport });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // Get All Reports
// exports.getAllReports = async (req, res) => {
//   try {
//     const reports = await Reports.find().sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: reports });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // Update Report
// exports.updateReport = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { email, description } = req.body;
//     const updated = await Reports.findByIdAndUpdate(
//       id,
//       { email, description },
//       { new: true }
//     );
//     if (!updated) {
//       return res.status(404).json({ success: false, message: "Report not found" });
//     }
//     res.status(200).json({ success: true, data: updated });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // Delete Report
// exports.deleteReport = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Reports.findByIdAndDelete(id);
//     if (!deleted) {
//       return res.status(404).json({ success: false, message: "Report not found" });
//     }
//     res.status(200).json({ success: true, message: "Report deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };


const Reports = require("../models/reportsModel");

/* =====================================================
   ✅ CREATE REPORT
===================================================== */
exports.createReport = async (req, res) => {
  try {
    const { email, description, templateId } = req.body;

    // Validation
    if (!email || !description || !templateId) {
      return res.status(400).json({
        success: false,
        message: "Email, description and templateId are required",
      });
    }

    const newReport = await Reports.create({
      email,
      description,
      templateId,
    });

    res.status(201).json({
      success: true,
      message: "Report submitted successfully",
      data: newReport,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* =====================================================
   ✅ GET ALL REPORTS (ADMIN)
===================================================== */
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Reports.find()
      .populate("templateId", "title thumbnail status") // 🔥 very important
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* =====================================================
   ✅ UPDATE REPORT
===================================================== */
exports.updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, description } = req.body;

    const updatedReport = await Reports.findByIdAndUpdate(
      id,
      { email, description },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Report updated successfully",
      data: updatedReport,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* =====================================================
   ✅ DELETE REPORT
===================================================== */
exports.deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedReport = await Reports.findByIdAndDelete(id);

    if (!deletedReport) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Report deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

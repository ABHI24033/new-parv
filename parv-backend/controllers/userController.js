import User from '../models/User.js';
import Loan from '../models/Loan.js';
import DSAIncome from '../models/DSAIncome.js';
import crypto from 'crypto';
import sendMail from '../emails/mail.js';
import mongoose from 'mongoose';

export const createEmployee = async (req, res) => {
  try {
    console.log("Create Employee Request Body:", req.body); // Debug Log
    const role = req.body?.role; // "RM", "FieldStaff", "Telecaller", "DSA"

    if (!role) {
      return res.status(400).json({
        success: false,
        message: "Role is required."
      });
    }

    // Role → Prefix Mapping
    const rolePrefixes = {
      DSA: "PDSA",
      RM: "RM",
      FieldStaff: "FS",
      Telecaller: "TC"
    };

    const prefix = rolePrefixes[role];

    if (!prefix) {
      return res.status(400).json({
        success: false,
        message: "Invalid role."
      });
    }

    // Count documents for auto-numbering
    const count = await User.countDocuments({ role });
    const nextNumber = count + 1;

    // Format username with padded number
    const username = `${prefix}${String(nextNumber).padStart(4, "0")}`;

    // Generate salt
    const salt = crypto.randomBytes(16).toString("hex");

    // Read body safely
    const fullName = req.body?.full_name || "";
    const phoneNo = req.body?.phone_no || "";
    const email = req.body?.email || "";

    if (fullName.length < 3 || phoneNo.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Full name must be 3+ chars and phone number must be valid."
      });
    }

    // Auto-generate temporary password
    const tempPassword =
      fullName.slice(0, 3).toLowerCase() + phoneNo.slice(0, 3);

    const passwordHash = User.generatePassword(tempPassword, salt);

    // Prepare data
    const employeeData = {
      ...req.body,
      username,
      password: passwordHash,
      salt,
      email,
      role,
      status: "pending",
      createdAt: new Date()
    };

    // Create employee in DB
    const newEmp = await User.create(employeeData);

    // Send welcome email
    const mailRes = await sendMail("PasswordSending", {
      fullName,
      username,
      password: tempPassword,
      email
    });

    // If email failed
    if (mailRes?.err) {
      return res.status(201).json({
        success: true,
        message: "Account created but email failed to send.",
        data: { username, tempPassword }
      });
    }

    // Success response
    res.status(201).json({
      success: true,
      message: `${role} account created successfully.`,
      data: { username, tempPassword }
    });

  } catch (error) {
    console.error("Create Employee Error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Username or email already exists."
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create employee.",
      error: error.message
    });
  }
};

const ALLOWED_USER_STATUSES = new Set(["pending", "approved", "rejected"]);

const updateUserStatusRecord = async ({ userId, status, remarks }) => {
  const user = await User.findById(userId);

  if (!user) {
    return { notFound: true };
  }

  if (!ALLOWED_USER_STATUSES.has(status)) {
    return { invalidStatus: true };
  }

  user.status = status;
  user.approvedAt = status === "approved" ? new Date() : null;
  if (typeof remarks === "string") {
    user.reviewRemarks = remarks.trim();
  }
  await user.save();

  return { user };
};

// Approve DSA Form 
export const approveDSAForm = async (req, res) => {
  try {
    const { formId } = req.params;
    const nextStatus = req.body?.status || "approved";
    const result = await updateUserStatusRecord({
      userId: formId,
      status: nextStatus,
      remarks: req.body?.remarks,
    });

    if (result?.notFound) {
      return res.status(404).json({
        success: false,
        message: 'DSA not found'
      });
    }

    if (result?.invalidStatus) {
      return res.status(400).json({
        success: false,
        message: 'Invalid DSA status'
      });
    }

    const { user } = result;

    if (!user.email || !user.password || !user.username) {
      return res.status(400).json({
        success: false,
        message: 'Invalid DSA data'
      });
    }

    if (user.status !== "approved") {
      return res.status(200).json({
        success: true,
        message: `DSA ${formId} marked as ${user.status}`,
        data: user
      });
    }

    // Send approval email
    const mailRes = await sendMail('dsa_approved', {
      email: user.email,
      fullName: user.full_name || "User",
      username: user.username,
      password: user.password
    }, "DSA Approval Successful");

    if (mailRes?.err) {
      return res.status(200).json({
        success: true,
        message: `DSA ${formId} approved but email failed`,
        data: user
      });
    }

    res.status(200).json({
      success: true,
      message: `DSA ${formId} approved successfully`,
      data: user
    });

  } catch (error) {
    console.error('Approval error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to approve DSA',
      error: error.message
    });
  }
};

export const updateUserApprovalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body || {};

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required"
      });
    }

    const result = await updateUserStatusRecord({
      userId: id,
      status,
      remarks,
    });

    if (result?.notFound) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (result?.invalidStatus) {
      return res.status(400).json({
        success: false,
        message: "Invalid user status"
      });
    }

    const { user } = result;

    if (user.status === "approved" && user.email && user.username && user.password) {
      await sendMail('dsa_approved', {
        email: user.email,
        fullName: user.full_name || "User",
        username: user.username,
        password: user.password
      }, "DSA Approval Successful");
    }

    return res.status(200).json({
      success: true,
      message: `User status updated to ${user.status}`,
      data: user
    });
  } catch (error) {
    console.error("Update user status error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update user status",
      error: error.message
    });
  }
};

export const getDSAData = async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 15;
    const startAfterId = req.query.startAfterId || null;
    const singleId = req.query.id || null;

    // --------------------------------------------------------
    // CASE 1: RETURN SINGLE DSA DETAILS IF ID PROVIDED
    // --------------------------------------------------------
    if (singleId) {
      const details = await User.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(singleId), role: "DSA" } },
        {
          $project: {
            password: 0,
            salt: 0,
            __v: 0
          }
        }
      ]);

      if (!details.length) {
        return res.status(404).json({
          success: false,
          message: "No DSA found with this ID",
        });
      }

      return res.status(200).json({
        success: true,
        data: details[0],
      });
    }

    // --------------------------------------------------------
    // CASE 2: PAGINATED DSA LIST (AGGREGATION)
    // --------------------------------------------------------

    let matchStage = { role: "DSA" };

    // Apply cursor pagination using date & _id
    if (startAfterId) {
      const doc = await User.findById(startAfterId).lean();
      if (doc) {
        matchStage = {
          ...matchStage,
          date: { $lt: doc.date }, // show newer → older
        };
      }
    }

    const pipeline = [
      { $match: matchStage },

      // Sort newest first
      { $sort: { date: -1 } },

      // Limit
      { $limit: pageSize },

      {
        $project: {
          password: 0,
          salt: 0,
          __v: 0,
        }
      },
    ];

    const data = await User.aggregate(pipeline);

    // Get total count
    const totalCount = await User.countDocuments({ role: "DSA" });
    const totalPages = Math.ceil(totalCount / pageSize);

    const firstDoc = data.length ? data[0] : null;
    const lastDoc = data.length ? data[data.length - 1] : null;

    return res.status(200).json({
      success: true,
      data,
      pageSize,
      totalPages,
      totalCount,
      firstDocId: firstDoc ? firstDoc._id.toString() : null,
      lastDocId: lastDoc ? lastDoc._id.toString() : null,
    });

  } catch (error) {
    console.error("Get DSA data error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch DSA data",
      error: error.message,
    });
  }
};
// Get RM Data with Pagination
export const getRMData = async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 15;
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const startAfterDocId = req.query.startAfterDocId || null;

    let query = User.find({ role: 'RM' }).sort({ createdAt: -1 });

    // Apply pagination cursor if not first page
    if (startAfterDocId) {
      const startDoc = await User.findById(startAfterDocId);
      if (startDoc) {
        query = query.where('createdAt').lt(startDoc.createdAt);
      }
    }

    query = query.limit(pageSize);

    const result = await query.select('-password -salt');

    // Get total count
    const totalCount = await User.countDocuments({ role: 'RM' });
    const totalPages = Math.ceil(totalCount / pageSize);

    // Get first & last visible docs
    const firstDoc = result.length > 0 ? result[0] : null;
    const lastDoc = result.length > 0 ? result[result.length - 1] : null;

    res.status(200).json({
      success: true,
      data: result,
      currentPage: pageNumber,
      totalPages,
      totalCount,
      firstDocId: firstDoc ? firstDoc._id.toString() : null,
      lastDocId: lastDoc ? lastDoc._id.toString() : null
    });
  } catch (error) {
    console.error('Get RM data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch RM data',
      error: error.message
    });
  }
};
// Get Telecaller Data with Pagination
export const getTelecallerData = async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 15;
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const startAfterDocId = req.query.startAfterDocId || null;

    let query = User.find({ role: 'Telecaller' }).sort({ createdAt: -1 });

    // Apply pagination cursor if not first page
    if (startAfterDocId) {
      const startDoc = await User.findById(startAfterDocId);
      if (startDoc) {
        query = query.where('createdAt').lt(startDoc.createdAt);
      }
    }

    query = query.limit(pageSize);

    const result = await query.select('-password -salt');

    // Get total count
    const totalCount = await User.countDocuments({ role: 'Telecaller' });
    const totalPages = Math.ceil(totalCount / pageSize);

    // Get first & last visible docs
    const firstDoc = result.length > 0 ? result[0] : null;
    const lastDoc = result.length > 0 ? result[result.length - 1] : null;

    res.status(200).json({
      success: true,
      data: result,
      currentPage: pageNumber,
      totalPages,
      totalCount,
      firstDocId: firstDoc ? firstDoc._id.toString() : null,
      lastDocId: lastDoc ? lastDoc._id.toString() : null
    });
  } catch (error) {
    console.error('Get Telecaller data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Telecaller data',
      error: error.message
    });
  }
};
// Get Field Staff Data with Pagination
export const getFieldStaffData = async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 15;
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const startAfterDocId = req.query.startAfterDocId || null;

    let query = User.find({ role: 'FieldStaff' }).sort({ createdAt: -1 });

    // Apply pagination cursor if not first page
    if (startAfterDocId) {
      const startDoc = await User.findById(startAfterDocId);
      if (startDoc) {
        query = query.where('createdAt').lt(startDoc.createdAt);
      }
    }

    query = query.limit(pageSize);

    const result = await query.select('-password -salt');

    // Get total count
    const totalCount = await User.countDocuments({ role: 'FieldStaff' });
    const totalPages = Math.ceil(totalCount / pageSize);

    // Get first & last visible docs
    const firstDoc = result.length > 0 ? result[0] : null;
    const lastDoc = result.length > 0 ? result[result.length - 1] : null;

    res.status(200).json({
      success: true,
      data: result,
      currentPage: pageNumber,
      totalPages,
      totalCount,
      firstDocId: firstDoc ? firstDoc._id.toString() : null,
      lastDocId: lastDoc ? lastDoc._id.toString() : null
    });
  } catch (error) {
    console.error('Get Field Staff data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Field Staff data',
      error: error.message
    });
  }
};
// Get DSA Data By ID/Username
export const getUserDataById = async (req, res) => {
  try {
    const { username } = req.params;
    // Fix: Query by username field instead of _id
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'No DSA found for this username'
      });
    }

    res.status(200).json({
      success: true,
      data: user,
      message: 'Data fetched successfully'
    });
  } catch (error) {
    console.error('Get DSA by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch DSA data',
      error: error.message
    });
  }
};
export const getLoanDataByType = async (req, res) => {
  try {
    const username = req.query.username || '';
    const pageSize = parseInt(req.query.pageSize) || 5;
    const currentPage = parseInt(req.query.currentPage) || 1;
    const startAfterDocId = req.query.startAfterDocId || null;

    let query = Loan.find({ id_of_connector: username });

    // Count total matching documents
    const totalCount = await Loan.countDocuments({ id_of_connector: username });
    const totalPages = Math.ceil(totalCount / pageSize);

    // Apply cursor-based pagination if startAfterDocId exists
    if (startAfterDocId) {
      const startAfterDoc = await Loan.findById(startAfterDocId);
      if (startAfterDoc) {
        query = query.where('createdAt').lt(startAfterDoc.createdAt);
      }
    }

    query = query.limit(pageSize).sort({ createdAt: -1 });

    const docs = await query;
    const lastDocId = docs.length > 0 ? docs[docs.length - 1]._id.toString() : null;
    const hasMore = docs.length === pageSize;

    res.status(200).json({
      success: true,
      data: docs,
      lastDocId,
      hasMore,
      pageSize,
      currentPage,
      totalPages,
      totalCount
    });
  } catch (error) {
    console.error('Get loan data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch loan data',
      error: error.message
    });
  }
};
// Get DSA Dashboard Data
export const getDSADashboardData = async (req, res) => {
  try {
    const { connectorId } = req.params;

    let totalLoan = 0;
    let totalIncome = 0;
    let paidMoney = 0;
    let remainingMoney = 0;
    const monthlyIncomeMap = new Map();

    // Get income details from dsa_income
    const incomeDocs = await DSAIncome.find({ connectorId });

    incomeDocs.forEach((doc) => {
      const data = doc.toObject();
      totalIncome += Number(data.income || 0);
      paidMoney += Number(data.paid || 0);
      remainingMoney += Number(data.unpaid || 0);
      totalLoan += Number(data.loanAmount || 0);

      const createdAt = data.createdAt;
      if (createdAt) {
        const month = createdAt.toLocaleString('default', { month: 'short' });
        monthlyIncomeMap.set(
          month,
          (monthlyIncomeMap.get(month) || 0) + Number(data.income || 0)
        );
      }
    });

    // Count total loan applications for the connector
    const totalApplications = await Loan.countDocuments({ id_of_connector: connectorId });

    // Get approved (Disbursed) loan count
    const approvedApplications = await Loan.countDocuments({
      id_of_connector: connectorId,
      status: 'Disbursed'
    });

    // Format monthly income chart data
    const chartData = Array.from(monthlyIncomeMap.entries()).map(([month, income]) => ({
      name: month,
      income
    }));

    chartData.sort(
      (a, b) =>
        new Date(`1 ${a.name} 2025`).getMonth() -
        new Date(`1 ${b.name} 2025`).getMonth()
    );

    res.status(200).json({
      success: true,
      data: {
        totalLoan,
        totalIncome,
        paidMoney,
        remainingMoney,
        totalApplications,
        approvedApplications,
        chartData
      }
    });
  } catch (error) {
    console.error('Get dashboard data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data',
      error: error.message
    });
  }
};

// UPDATE EMPLOYEE DETAILS
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Fields that should NOT be updated directly
    const restrictedFields = [
      "password",
      "salt",
      "username",
      "role",
      "createdAt"
    ];

    // Remove restricted fields from request body
    restrictedFields.forEach((field) => delete req.body[field]);

    // Update allowed fields
    Object.assign(user, req.body);
    user.updatedAt = new Date();

    await user.save();

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: user
    });

  } catch (error) {
    console.error("Update employee error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update employee",
      error: error.message
    });
  }
};

// SOFT DELETE EMPLOYEE
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.status = "inactive";
    user.deletedAt = new Date();

    await user.save();

    res.status(200).json({
      success: true,
      message: "Employee deactivated successfully"
    });

  } catch (error) {
    console.error("Delete employee error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete employee",
      error: error.message
    });
  }
};

// HARD DELETE EMPLOYEE (DANGEROUS)
export const hardDeleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee permanently deleted"
    });

  } catch (error) {
    console.error("Hard delete error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to permanently delete employee",
      error: error.message
    });
  }
};



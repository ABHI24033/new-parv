import Lead from "../models/Lead.js";

let startAfterDocId; // Reference for pagination if needed, simulating standard patterns

// Create a new lead
export const createLead = async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: lead,
    });
  } catch (error) {
    console.error("Error creating lead:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create lead",
    });
  }
};

// Get leads with pagination
export const getLeads = async (req, res) => {
  try {
    const { pageSize = 10, currentPage = 1, month, year } = req.query;
    const skip = (parseInt(currentPage) - 1) * parseInt(pageSize);
    
    // Build query
    const query = {};
    if (month && year) {
      query.monthYear = `${year}-${month.padStart(2, '0')}`;
    } else if (month) {
      query.monthYear = new RegExp(`-${month.padStart(2, '0')}$`);
    } else if (year) {
      query.monthYear = new RegExp(`^${year}-`);
    }

    const leads = await Lead.find(query)
      .sort({ createdAt: -1 }) // Newest first
      .skip(skip)
      .limit(parseInt(pageSize));

    const total = await Lead.countDocuments(query);

    res.status(200).json({
      success: true,
      data: leads,
      total,
      currentPage: parseInt(currentPage),
      totalPages: Math.ceil(total / parseInt(pageSize)),
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching leads",
    });
  }
};

// Get all leads (No pagination)
export const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: leads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error fetching all leads",
    });
  }
};

// Update a lead
export const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: lead,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update lead",
    });
  }
};

// Update lead status
export const updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }

    const lead = await Lead.findByIdAndUpdate(
      id,
      { leadStatus: status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    res.status(200).json({
      success: true,
      message: "Lead status updated successfully",
      data: lead,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update lead status",
    });
  }
};

// Delete a lead
export const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findByIdAndDelete(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error deleting lead",
    });
  }
};

// Add lead remark 
export const addLeadRemark = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, createdBy, userId } = req.body;

    if (!text) {
      return res.status(400).json({ success: false, message: "Remark text is required" });
    }

    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    // Push structured remark into the array
    lead.remarks.push({ text, createdBy, userId, createdAt: new Date() });
    await lead.save();

    res.status(200).json({
      success: true,
      message: "Remark added successfully",
      data: lead,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to add remark",
    });
  }
};

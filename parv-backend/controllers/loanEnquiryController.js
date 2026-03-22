import LoanEnquiry from "../models/LoanEnquiry.js";

export const createLoanEnquiry = async (req, res) => {
  try {
    const enquiry = new LoanEnquiry(req.body);
    await enquiry.save();

    return res.status(201).json({
      success: true,
      message: "Loan enquiry submitted successfully",
      data: enquiry,
    });
  } catch (error) {
    console.error("Error creating loan enquiry:", error);
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to submit loan enquiry",
    });
  }
};

export const getLoanEnquiries = async (req, res) => {
  try {
    const enquiries = await LoanEnquiry.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: enquiries,
    });
  } catch (error) {
    console.error("Error fetching loan enquiries:", error);
    return res.status(500).json({
      success: false,
      message: "Server error fetching loan enquiries",
    });
  }
};

export const updateLoanEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }

    const enquiry = await LoanEnquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Loan enquiry not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: enquiry,
    });
  } catch (error) {
    console.error("Error updating loan enquiry status:", error);
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update loan enquiry status",
    });
  }
};

export const deleteLoanEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const enquiry = await LoanEnquiry.findByIdAndDelete(id);

    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Loan enquiry not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Loan enquiry deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting loan enquiry:", error);
    return res.status(500).json({
      success: false,
      message: "Server error deleting loan enquiry",
    });
  }
};


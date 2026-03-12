import mongoose from "mongoose";

import BusinessLoan from "../models/BusinessLoan.js";
import GoldLoan from "../models/GoldLoan.js";
import GroupLoan from "../models/GroupLoan.js";
import HomeLoan from "../models/HomeLoan.js";
import PersonalLoan from "../models/PersonalLoan.js";
import VehicleLoan from "../models/VehicleLoan.js";

const LOAN_MODELS = [
  { key: "personal", label: "Personal", Model: PersonalLoan },
  { key: "business", label: "Business", Model: BusinessLoan },
  { key: "home", label: "Home", Model: HomeLoan },
  { key: "vehicle", label: "Vehicle", Model: VehicleLoan },
  { key: "gold", label: "Gold", Model: GoldLoan },
  { key: "group", label: "Group", Model: GroupLoan },
];

const loanTypeToKey = (loanType) => {
  const normalized = String(loanType || "").trim().toLowerCase();
  const found = LOAN_MODELS.find((x) => x.key === normalized || x.label.toLowerCase() === normalized);
  return found?.key || null;
};

const buildModelFilter = ({ status, search, startDate, endDate }, modelKey) => {
  const filter = { isDeleted: false };

  if (status && status !== "all") filter.status = status;

  if (search) {
    if (modelKey === "group") {
      filter.$or = [
        { group_name: { $regex: search, $options: "i" } },
        { "members.name": { $regex: search, $options: "i" } },
        { "members.phone": { $regex: search, $options: "i" } },
      ];
    } else {
      filter.$or = [
        { applicant_name: { $regex: search, $options: "i" } },
        { phone_no: { $regex: search, $options: "i" } },
      ];
    }
  }

  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = new Date(startDate);
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filter.createdAt.$lte = end;
    }
  }

  return filter;
};

const toUnifiedListItem = (doc, modelKey) => {
  const applicantName =
    doc.applicant_name ||
    doc.group_name ||
    (Array.isArray(doc.members) && doc.members[0]?.name) ||
    "";

  const phone =
    doc.phone_no ||
    doc.phone ||
    (Array.isArray(doc.members) && doc.members[0]?.phone) ||
    "";

  return {
    id: String(doc._id),
    loanType: doc.loanType || LOAN_MODELS.find((x) => x.key === modelKey)?.label || "Unknown",
    applicantName,
    phone,
    loanAmount: doc.loan_amount || "",
    connectorName: doc.name_of_connector || "",
    status: doc.status || "Pending",
    createdAt: doc.createdAt,
  };
};

export const getUnifiedLoans = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      status = "all",
      loanType = "all",
      sortOrder = "desc",
      startDate,
      endDate,
    } = req.query;

    const pageNum = Math.max(Number(page) || 1, 1);
    const pageLimit = Math.min(Math.max(Number(limit) || 10, 1), 200);
    const query = {
      search: String(search || "").trim(),
      status: String(status || "all"),
      startDate,
      endDate,
    };

    const requestedKey = loanTypeToKey(loanType);
    const selectedModels = requestedKey
      ? LOAN_MODELS.filter((x) => x.key === requestedKey)
      : LOAN_MODELS;

    const results = await Promise.all(
      selectedModels.map(async ({ key, Model }) => {
        const filter = buildModelFilter(query, key);
        const docs = await Model.find(filter)
          .select(
            key === "group"
              ? {
                  loanType: 1,
                  loan_amount: 1,
                  name_of_connector: 1,
                  status: 1,
                  createdAt: 1,
                  group_name: 1,
                  members: { $slice: 1 },
                }
              : "loanType loan_amount name_of_connector status createdAt applicant_name phone_no"
          )
          .lean();
        return docs.map((d) => toUnifiedListItem(d, key));
      })
    );

    const all = results.flat();
    all.sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return sortOrder === "asc" ? aTime - bTime : bTime - aTime;
    });

    const totalCount = all.length;
    const start = (pageNum - 1) * pageLimit;
    const data = all.slice(start, start + pageLimit);

    res.json({
      success: true,
      total: totalCount,
      totalCount,
      page: pageNum,
      limit: pageLimit,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUnifiedLoanById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid loan id" });
    }

    const lookups = await Promise.all(
      LOAN_MODELS.map(async ({ key, label, Model }) => {
        const loan = await Model.findOne({ _id: id, isDeleted: false }).lean();
        return loan ? { key, label, loan } : null;
      })
    );

    const found = lookups.find(Boolean);
    if (!found) return res.status(404).json({ success: false, message: "Loan not found" });

    res.json({
      success: true,
      loanType: found.loan.loanType || found.label,
      loanKey: found.key,
      data: found.loan,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

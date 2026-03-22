import mongoose from "mongoose";
import BusinessLoan from "../models/BusinessLoan.js";
import GoldLoan from "../models/GoldLoan.js";
import GroupLoan from "../models/GroupLoan.js";
import HomeLoan from "../models/HomeLoan.js";
import PersonalLoan from "../models/PersonalLoan.js";
import VehicleLoan from "../models/VehicleLoan.js";
import { generateLoanId } from "../utils/generateLoanId.js";

const LOAN_MODELS = [
    { key: "personal", label: "Personal", Model: PersonalLoan },
    { key: "business", label: "Business", Model: BusinessLoan },
    { key: "home", label: "Home", Model: HomeLoan },
    { key: "vehicle", label: "Vehicle", Model: VehicleLoan },
    { key: "gold", label: "Gold", Model: GoldLoan },
    { key: "group", label: "Group", Model: GroupLoan },
];

const getModelInfo = (loanType) => {
    if (!loanType) return null;
    const normalized = String(loanType).trim().toLowerCase();
    const found = LOAN_MODELS.find((x) => x.key === normalized || x.label.toLowerCase() === normalized);
    return found || null;
};

const buildModelFilter = ({ status, search, startDate, endDate }, modelKey) => {
    const filter = { isDeleted: false };

    if (status && status !== "all") filter.status = status;

    if (search) {
        filter.$or = [
            { applicantName: { $regex: search, $options: "i" } },
            { applicant_name: { $regex: search, $options: "i" } },
            { group_name: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
            { phone_no: { $regex: search, $options: "i" } },
            { loanId: { $regex: search, $options: "i" } }
        ];
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
        doc.applicantName ||
        doc.applicant_name ||
        doc.group_name ||
        (Array.isArray(doc.members) && doc.members[0]?.name) ||
        "";

    const phone =
        doc.phone ||
        doc.phone_no ||
        (Array.isArray(doc.members) && doc.members[0]?.phone) ||
        "";

    return {
        id: String(doc._id),
        loanId: doc.loanId || "",
        loanType: doc.loanType || LOAN_MODELS.find((x) => x.key === modelKey)?.label || "Unknown",
        applicantName,
        phone,
        loanAmount: doc.amount || doc.loan_amount || "",
        connectorName: doc.name_of_connector || "",
        status: doc.status || "Pending",
        createdAt: doc.createdAt,
    };
};

export const createLoan = async (req, res) => {
    try {
        const { loanType } = req.body;

        const modelInfo = getModelInfo(loanType);
        if (!modelInfo) {
            return res.status(400).json({ success: false, message: `Unknown or missing loanType: ${loanType}` });
        }

        const Model = modelInfo.Model;

        // Generate a standard loanId
        const loanId = await generateLoanId(modelInfo.label, Model);

        // Construct standard fields from fallbacks if needed
        const loanData = {
            ...req.body,
            loanId,
            loanType: modelInfo.label
        };

        // Handle legacy fallbacks automatically for smooth transition
        // Frontend might still be sending applicant_name instead of applicantName
        if (!loanData.applicantName && loanData.applicant_name) loanData.applicantName = loanData.applicant_name;
        if (!loanData.applicantName && loanData.group_name) loanData.applicantName = loanData.group_name;
        if (!loanData.applicantName && loanData.members && loanData.members.length > 0) loanData.applicantName = loanData.members[0].name;

        if (!loanData.phone && loanData.phone_no) loanData.phone = loanData.phone_no;
        if (!loanData.phone && loanData.members && loanData.members.length > 0) loanData.phone = loanData.members[0].phone;

        if (!loanData.amount && loanData.loan_amount) loanData.amount = loanData.loan_amount;

        const loan = await Model.create(loanData);
        res.status(201).json({ success: true, data: loan });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getAllLoans = async (req, res) => {
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

        const modelInfo = getModelInfo(loanType);
        const selectedModels = modelInfo ? [modelInfo] : LOAN_MODELS;

        const results = await Promise.all(
            selectedModels.map(async ({ key, Model }) => {
                const filter = buildModelFilter(query, key);
                const docs = await Model.find(filter).lean();
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

export const getLoansByType = async (req, res) => {
    try {
        const { loanType } = req.params;
        const reqQuery = { ...req.query, loanType };
        // We can just reuse getAllLoans logic but with loanType pinned!
        req.query = reqQuery;
        return getAllLoans(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getLoanById = async (req, res) => {
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

export const updateLoan = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid loan id" });
        }

        const lookups = await Promise.all(
            LOAN_MODELS.map(async ({ key, label, Model }) => {
                const loan = await Model.findOne({ _id: id, isDeleted: false });
                return loan ? { Model, doc: loan } : null;
            })
        );

        const found = lookups.find(Boolean);
        if (!found) return res.status(404).json({ success: false, message: "Loan not found" });

        const updated = await found.Model.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json({ success: true, data: updated });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const deleteLoan = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid loan id" });
        }

        const lookups = await Promise.all(
            LOAN_MODELS.map(async ({ key, label, Model }) => {
                const loan = await Model.findOne({ _id: id, isDeleted: false });
                return loan ? { Model, doc: loan } : null;
            })
        );

        const found = lookups.find(Boolean);
        if (!found) return res.status(404).json({ success: false, message: "Loan not found" });

        await found.Model.findByIdAndUpdate(id, { isDeleted: true });
        res.json({ success: true, message: "Loan deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

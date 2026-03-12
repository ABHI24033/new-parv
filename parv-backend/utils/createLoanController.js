import { getPagination } from "./pagination.js";

/**
 * Generic controller factory for loan types
 */
export const createLoanController = (Model, loanType) => {
    const createLoan = async (req, res) => {
        try {
            const loan = await Model.create({ ...req.body, loanType });
            res.status(201).json({ success: true, data: loan });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    };

    const getAllLoans = async (req, res) => {
        try {
            const { page, limit, phone_no, pan, city, search, status, startDate, endDate } = req.query;
            const { skip, limit: pageLimit } = getPagination(page, limit);

            const filter = { isDeleted: false };

            if (phone_no) filter.phone_no = phone_no;
            if (pan) filter.pan = pan;
            if (status) filter.status = status;

            if (city) filter[city.includes('permanent') ? 'permanent_city' : 'present_city'] = city;

            // Global search (name or phone)
            if (search) {
                filter.$or = [
                    { applicant_name: { $regex: search, $options: "i" } },
                    { phone_no: { $regex: search, $options: "i" } }
                ];
            }

            // Date Range
            if (startDate || endDate) {
                filter.createdAt = {};
                if (startDate) filter.createdAt.$gte = new Date(startDate);
                if (endDate) {
                    const end = new Date(endDate);
                    end.setHours(23, 59, 59, 999);
                    filter.createdAt.$lte = end;
                }
            }

            const data = await Model.find(filter)
                .skip(skip)
                .limit(pageLimit)
                .sort({ createdAt: -1 });

            const total = await Model.countDocuments(filter);

            res.json({
                success: true,
                total,
                totalCount: total,
                page: Number(page) || 1,
                limit: pageLimit,
                data
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    };

    const getLoanById = async (req, res) => {
        try {
            const loan = await Model.findOne({
                _id: req.params.id,
                isDeleted: false
            });

            if (!loan)
                return res.status(404).json({ success: false, message: "Loan not found" });

            res.json({ success: true, data: loan });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    };

    const updateLoan = async (req, res) => {
        try {
            const loan = await Model.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

            if (!loan)
                return res.status(404).json({ success: false, message: "Loan not found" });

            res.json({ success: true, data: loan });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    };

    const deleteLoan = async (req, res) => {
        try {
            await Model.findByIdAndUpdate(req.params.id, {
                isDeleted: true
            });

            res.json({ success: true, message: "Loan removed successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    };

    const hardDeleteLoan = async (req, res) => {
        try {
            await Model.findByIdAndDelete(req.params.id);
            res.json({ success: true, message: "Loan permanently deleted" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    };

    return {
        createLoan,
        getAllLoans,
        getLoanById,
        updateLoan,
        deleteLoan,
        hardDeleteLoan
    };
};


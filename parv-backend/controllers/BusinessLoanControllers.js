import BusinessLoan from "../models/BusinessLoan.js";
import { createLoanController } from "../utils/createLoanController.js";

const controller = createLoanController(BusinessLoan, "Business");

export const {
    createLoan: createBusinessLoan,
    getAllLoans: getAllBusinessLoans,
    getLoanById: getBusinessLoanById,
    updateLoan: updateBusinessLoan,
    deleteLoan: deleteBusinessLoan,
    hardDeleteLoan: hardDeleteBusinessLoan
} = controller;


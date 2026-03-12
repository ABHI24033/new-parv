import HomeLoan from "../models/HomeLoan.js";
import { createLoanController } from "../utils/createLoanController.js";

const controller = createLoanController(HomeLoan, "Home");

export const {
    createLoan: createHomeLoan,
    getAllLoans: getAllHomeLoans,
    getLoanById: getHomeLoanById,
    updateLoan: updateHomeLoan,
    deleteLoan: deleteHomeLoan,
    hardDeleteLoan: hardDeleteHomeLoan
} = controller;


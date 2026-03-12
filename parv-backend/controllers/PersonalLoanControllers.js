import PersonalLoan from "../models/PersonalLoan.js";
import { createLoanController } from "../utils/createLoanController.js";

const controller = createLoanController(PersonalLoan, "Personal");

export const {
    createLoan: createPersonalLoan,
    getAllLoans: getAllPersonalLoans,
    getLoanById: getPersonalLoanById,
    updateLoan: updatePersonalLoan,
    deleteLoan: deletePersonalLoan,
    hardDeleteLoan: hardDeletePersonalLoan
} = controller;


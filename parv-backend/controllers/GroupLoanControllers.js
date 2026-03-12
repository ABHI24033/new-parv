import GroupLoan from "../models/GroupLoan.js";
import { createLoanController } from "../utils/createLoanController.js";

const controller = createLoanController(GroupLoan, "Group");

export const {
    createLoan: createGroupLoan,
    getAllLoans: getAllGroupLoans,
    getLoanById: getGroupLoanById,
    updateLoan: updateGroupLoan,
    deleteLoan: deleteGroupLoan,
    hardDeleteLoan: hardDeleteGroupLoan
} = controller;


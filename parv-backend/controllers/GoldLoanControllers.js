import GoldLoan from "../models/GoldLoan.js";
import { createLoanController } from "../utils/createLoanController.js";

const controller = createLoanController(GoldLoan, "Gold");

export const createGoldLoan = controller.createLoan;
export const getAllGoldLoans = controller.getAllLoans;
export const getGoldLoanById = controller.getLoanById;
export const updateGoldLoan = controller.updateLoan;
export const deleteGoldLoan = controller.deleteLoan;
export const hardDeleteGoldLoan = controller.hardDeleteLoan;

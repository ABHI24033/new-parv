import VehicleLoan from "../models/VehicleLoan.js";
import { createLoanController } from "../utils/createLoanController.js";

const controller = createLoanController(VehicleLoan, "Vehicle");

export const {
    createLoan: createVehicleLoan,
    getAllLoans: getAllVehicleLoans,
    getLoanById: getVehicleLoanById,
    updateLoan: updateVehicleLoan,
    deleteLoan: deleteVehicleLoan,
    hardDeleteLoan: hardDeleteVehicleLoan
} = controller;


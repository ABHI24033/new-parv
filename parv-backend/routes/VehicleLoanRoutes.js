import express from "express";
import {
    createVehicleLoan,
    getAllVehicleLoans,
    getVehicleLoanById,
    updateVehicleLoan,
    deleteVehicleLoan,
    hardDeleteVehicleLoan
} from "../controllers/VehicleLoanControllers.js";

const router = express.Router();

router.post("/", createVehicleLoan);
router.get("/", getAllVehicleLoans);
router.get("/:id", getVehicleLoanById);
router.put("/:id", updateVehicleLoan);
router.delete("/:id", deleteVehicleLoan);
router.delete("/hard/:id", hardDeleteVehicleLoan);

export default router;


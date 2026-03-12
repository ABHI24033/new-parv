import express from "express";
import {
    createBusinessLoan,
    getAllBusinessLoans,
    getBusinessLoanById,
    updateBusinessLoan,
    deleteBusinessLoan,
    hardDeleteBusinessLoan
} from "../controllers/BusinessLoanControllers.js";

const router = express.Router();

router.post("/", createBusinessLoan);
router.get("/", getAllBusinessLoans);
router.get("/:id", getBusinessLoanById);
router.put("/:id", updateBusinessLoan);
router.delete("/:id", deleteBusinessLoan);
router.delete("/hard/:id", hardDeleteBusinessLoan);

export default router;


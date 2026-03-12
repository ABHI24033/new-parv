import express from "express";
import {
    createGoldLoan,
    getAllGoldLoans,
    getGoldLoanById,
    updateGoldLoan,
    deleteGoldLoan,
    hardDeleteGoldLoan
} from "../controllers/GoldLoanControllers.js";

const router = express.Router();

router.post("/", createGoldLoan);
router.get("/", getAllGoldLoans);
router.get("/:id", getGoldLoanById);
router.put("/:id", updateGoldLoan);
router.delete("/:id", deleteGoldLoan);
router.delete("/hard/:id", hardDeleteGoldLoan);

export default router;

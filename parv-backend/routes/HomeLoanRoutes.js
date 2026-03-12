import express from "express";
import {
    createHomeLoan,
    getAllHomeLoans,
    getHomeLoanById,
    updateHomeLoan,
    deleteHomeLoan,
    hardDeleteHomeLoan
} from "../controllers/HomeLoanControllers.js";

const router = express.Router();

router.post("/", createHomeLoan);
router.get("/", getAllHomeLoans);
router.get("/:id", getHomeLoanById);
router.put("/:id", updateHomeLoan);
router.delete("/:id", deleteHomeLoan);
router.delete("/hard/:id", hardDeleteHomeLoan);

export default router;


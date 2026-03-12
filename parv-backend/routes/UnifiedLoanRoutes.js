import express from "express";
import { getUnifiedLoanById, getUnifiedLoans } from "../controllers/UnifiedLoanControllers.js";

const router = express.Router();

router.get("/", getUnifiedLoans);
router.get("/:id", getUnifiedLoanById);

export default router;


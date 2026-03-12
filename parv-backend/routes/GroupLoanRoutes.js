import express from "express";
import {
    createGroupLoan,
    getAllGroupLoans,
    getGroupLoanById,
    updateGroupLoan,
    deleteGroupLoan,
    hardDeleteGroupLoan
} from "../controllers/GroupLoanControllers.js";

const router = express.Router();

router.post("/", createGroupLoan);
router.get("/", getAllGroupLoans);
router.get("/:id", getGroupLoanById);
router.put("/:id", updateGroupLoan);
router.delete("/:id", deleteGroupLoan);
router.delete("/hard/:id", hardDeleteGroupLoan);

export default router;


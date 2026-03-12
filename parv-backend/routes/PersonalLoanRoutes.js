import express from "express";
import {
    createPersonalLoan,
    getAllPersonalLoans,
    getPersonalLoanById,
    updatePersonalLoan,
    deletePersonalLoan,
    hardDeletePersonalLoan
} from "../controllers/PersonalLoanControllers.js";

const router = express.Router();

router.post("/", createPersonalLoan);
router.get("/", getAllPersonalLoans);
router.get("/:id", getPersonalLoanById);
router.put("/:id", updatePersonalLoan);
router.delete("/:id", deletePersonalLoan);
router.delete("/hard/:id", hardDeletePersonalLoan);

export default router;


import express from "express";
import {
    createLoan,
    getAllLoans,
    getLoanById,
    updateLoan,
    deleteLoan,
    getLoansByType
} from "../controllers/loanController.js";
import { checkAuthentication } from "../middleware/auth.js";

const router = express.Router();

router.use(checkAuthentication);

router.post("/", createLoan);
router.get("/", getAllLoans);
router.get("/:id", getLoanById);
router.put("/:id", updateLoan);
router.delete("/:id", deleteLoan);
router.get("/type/:loanType", getLoansByType);

export default router;

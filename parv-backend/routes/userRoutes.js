import express from 'express';
const router = express.Router();
import {
  getDSAData,
  getUserDataById,
  approveDSAForm,
  getLoanDataByType,
  getRMData,
  getTelecallerData,
  getFieldStaffData,
  getDSADashboardData,
  createEmployee,
  updateUserApprovalStatus,
  updateEmployee,
  deleteEmployee,
  hardDeleteEmployee,
  getDisbursedLoans,
  getCommissionHistory,
  assignCommission,
  updateCommissionPaymentStatus
} from '../controllers/userController.js';
import { checkAuthentication, checkAdmin } from '../middleware/auth.js';

// Public route - DSA registration
router.post('/create-dsa', createEmployee);
// router.put('/:formId/approve', checkAuthentication, checkAdmin, approveDSAForm);
router.put('/:formId/approve', approveDSAForm);

// Protected routes - DSA dashboard
router.get('/loans', checkAuthentication, getLoanDataByType);
router.get('/dashboard/:connectorId', checkAuthentication, getDSADashboardData);

// Protected routes - Admin only
router.get('/dsa', getDSAData);
router.get('/rm', getRMData);
router.get('/telecaller', getTelecallerData);
router.get('/field-staff', getFieldStaffData);
router.get('/:username', getUserDataById);

router.put("/:id", updateEmployee);
router.patch("/:id/status", updateUserApprovalStatus);

// Optional
router.patch("/soft-delete/:id", deleteEmployee);
router.delete("/hard-delete/:id", hardDeleteEmployee);

// Commission Management
router.get('/commissions/disbursed', checkAuthentication, getDisbursedLoans);
router.get('/commissions/history', checkAuthentication, getCommissionHistory);
router.post('/commissions/assign', checkAuthentication, checkAdmin, assignCommission);
router.patch('/commissions/:id/status', checkAuthentication, checkAdmin, updateCommissionPaymentStatus);


export default router;

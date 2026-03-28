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
  hardDeleteEmployee
} from '../controllers/userController.js';
import { checkAuthentication, checkAdmin } from '../middleware/auth.js';

// Public route - DSA registration
router.post('/create-dsa', createEmployee);
// router.put('/:formId/approve', checkAuthentication, checkAdmin, approveDSAForm);
router.put('/:formId/approve', approveDSAForm);

// Protected routes - Admin only
router.get('/dsa', getDSAData);
router.get('/rm', getRMData);
router.get('/telecaller', getTelecallerData);
router.get('/field-staff', getFieldStaffData);
router.get('/:username', getUserDataById);

// Protected routes - DSA dashboard
router.get('/loans', checkAuthentication, getLoanDataByType);
router.get('/dashboard/:connectorId', checkAuthentication, getDSADashboardData);

router.put("/:id", updateEmployee);
router.patch("/:id/status", updateUserApprovalStatus);

// Optional
router.patch("/soft-delete/:id", deleteEmployee);
router.delete("/hard-delete/:id", hardDeleteEmployee);


export default router;


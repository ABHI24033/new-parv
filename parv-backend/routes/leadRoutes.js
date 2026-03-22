import express from 'express';
import {
  createLead,
  getLeads,
  getAllLeads,
  updateLead,
  deleteLead,
  updateLeadStatus,
  addLeadRemark
} from '../controllers/leadController.js';

const router = express.Router();

// Example if auth middleware was needed:
// const { protect, authorize } = require('../middleware/auth');
// router.use(protect);

router.route('/')
  .post(createLead)
  .get(getLeads);

router.get('/all', getAllLeads);

router.route('/:id')
  .put(updateLead)
  .delete(deleteLead);

router.patch('/:id/status', updateLeadStatus);
router.post('/:id/remarks', addLeadRemark);

export default router;

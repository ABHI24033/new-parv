import mongoose from 'mongoose';

const dsaIncomeSchema = new mongoose.Schema({
  connectorId: {
    type: String,
    required: true,
    trim: true
  },
  income: {
    type: Number,
    default: 0
  },
  paid: {
    type: Number,
    default: 0
  },
  unpaid: {
    type: Number,
    default: 0
  },
  loanAmount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const DSAIncome = mongoose.model('DSAIncome', dsaIncomeSchema);
export default DSAIncome;


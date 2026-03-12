export const GroupLoanData = {
  question:"✅ What is a Group Loan? ( समूह ऋण क्या है?)",
  description: "A Group Loan is a type of microfinance loan provided to a group of women, rather than to individuals. It is designed to promote financial inclusion, empowerment, and self-reliance among women in rural or low-income areas.",
  descriptionHindi:"समूह ऋण (Group Loan) एक प्रकार का सूक्ष्म वित्तीय ऋण है जो एक महिला समूह को सामूहिक रूप से दिया जाता है, न कि व्यक्तिगत रूप से। इसका उद्देश्य ग्रामीण और निम्न-आय वर्ग की महिलाओं को आर्थिक रूप से सशक्त बनाना और आत्मनिर्भरता को बढ़ावा देना है।",
  features: [
    {
      icon: "/grouploan/community.png",
      title: "Collective Power",
      desc: "Loans are issued to groups, fostering shared responsibility and mutual accountability.",
    },
    {
      icon: "/grouploan/flexible-term.png",
      title: "Flexible Terms",
      desc: "Repayment schedules and terms can be customized to suit the group’s income cycle.",
    },
    {
      icon: "/grouploan/help-desk.png",
      title: "Dedicated Support",
      desc: "Personalized assistance from field officers during and after disbursement.",
    },
    {
      icon: "/grouploan/no-collateral.png",
      title: "No Collateral Needed",
      desc: "No need to pledge assets. Group trust acts as the guarantee.",
    },
  ],
  eligibility: [
    {
      img: "/grouploan/minimun-members.png",
      title: "Minimum Members",
      desc: "Each group must consist of at least 7 active women members.",
    },
    {
      img: "/grouploan/valid-identification.png",
      title: "Valid Identification",
      desc: "All members must provide valid ID and address proof.",
    },
    {
      img: "/grouploan/eligible-age.png",
      title: "Eligible Age",
      desc: "Members should be between 18 and 60 years of age.",
    },
    {
      img: "/grouploan/same-locality.png",
      title: "Same Locality",
      desc: "Members must reside in the same village or neighborhood.",
    },
  ],
  loanTypes: [
    {
      img: "/grouploan/group-business.png",
      type: "Business Group Loan",
      description: "Support for women-led small businesses such as tailoring, food stalls, or retail shops.",
    },
    {
      img: "/grouploan/community-development.png",
      type: "Community Development Loan",
      description: "For collective goals like water filters, solar panels, or shared livestock.",
    },
    {
      img: "/grouploan/agriculture-group.png",
      type: "Agricultural Group Loan",
      description: "For farming-related needs like seeds, fertilizers, or equipment.",
    },
  ],

  additionalBenefits: [
    {
      benefit: "Low Interest",
      detail: "Affordable interest rates, with special incentives for timely repayments.",
    },
    {
      benefit: "Quick Approval",
      detail: "Minimal paperwork and doorstep KYC ensure fast loan processing.",
    },
    {
      benefit: "Financial Literacy",
      detail: "Free workshops and guidance on budgeting, saving, and business planning.",
    },
    {
      benefit: "Digital Access",
      detail: "Track loan status, EMIs, and repayment dates via our mobile app.",
    },
  ],

  documents: [
    {
      type: "Identity Proof",
      details: ["Aadhar Card", "Voter ID", "Passport"],
    },
    {
      type: "Address Proof",
      details: ["Utility Bill", "Ration Card"],
    },
    {
      type: "Group Agreement",
      details: ["Signed group loan agreement by all members"],
    },
  ],
};

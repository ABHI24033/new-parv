// lib/sidebar-configs.js
"use client"; // This file can be used on the client side for imports

import { ClipboardList } from "lucide-react";
import { ClipboardListIcon } from "lucide-react";
import { Users2 } from "lucide-react";
import { Users } from "lucide-react";
import { User2 } from "lucide-react";
import { User } from "lucide-react";
import {
  BookUser,
  ClipboardType,
  FileUser,
  BriefcaseBusinessIcon,
  HomeIcon,
  CarIcon,
  HandCoinsIcon,
  Users2Icon,
  LucideNotebookPen,
  MessageSquareText,
  Contact2Icon,
  UserPlus2Icon,
  List,
  LayoutDashboard,
  Bike,
  UserPen,
  ChevronDown, // Added for collapsible indicator
} from "lucide-react";

// Map of icon names to actual Lucide React components - EXPORTED NOW
export const iconMap = {
  ClipboardType,
  FileUser,
  BriefcaseBusinessIcon,
  HomeIcon,
  CarIcon,
  HandCoinsIcon,
  Users2Icon,
  BookUser,
  LucideNotebookPen,
  MessageSquareText,
  Contact2Icon,
  UserPlus2Icon,
  List,
  LayoutDashboard,
  Bike,
  UserPen,
  ChevronDown,
};


export const AdminSidebar = {
  navMain: [
    {
      title: "Loan Applications",
      url: "/dashboard",
      icon: ClipboardType,
      isActive: true,
      items: [
        {
          title: "Personal Loan",
          url: "/dashboard/forms/personal_loan",
          icon: FileUser,
          isActive: true,
        },
        {
          title: "Business Loan",
          url: "/dashboard/forms/business_loan",
          icon: BriefcaseBusinessIcon,
          isActive: false,
        },
        {
          title: "Home Loan",
          url: "/dashboard/forms/home_loan",
          icon: HomeIcon,
        },
        {
          title: "Vehicle Loan",
          url: "/dashboard/forms/vehicle_loan",
          icon: CarIcon,
        },
        {
          title: "Gold Loan",
          url: "/dashboard/forms/gold_loan",
          icon: HandCoinsIcon,
        },
        {
          title: "Group Loan",
          url: "/dashboard/forms/group_loan",
          icon: Users2,
        },
      ],
    },
    {
      title: "View Loans",
      url: "#",
      icon: List,
      items: [
        {
          title: "All Loans",
          url: "/dashboard/loans",
        },
        {
          title: "Personal Loan",
          url: "/dashboard/loans/personal_loan",
        },
        {
          title: "Business Loan",
          url: "/dashboard/loans/business_loan",
        },
        {
          title: "Home Loan",
          url: "/dashboard/loans/home_loan",
        },
        {
          title: "Vehicle Loan",
          url: "/dashboard/loans/vehicle_loan",
        },
        {
          title: "Gold Loan",
          url: "/dashboard/loans/gold_loan",
        },
        {
          title: "Group Loan",
          url: "/dashboard/loans/group_loan",
        },
      ],
    },
    {
      title: "Team members",
      url: "#",
      icon: Users2Icon,
      items: [
        {
          title: "DSA",
          url: "/dashboard/list/dsa",
        },
        {
          title: "Relationship manager",
          url: "/dashboard/list/rm",
        },
        {
          title: "Field Staff",
          url: "/dashboard/list/field-staff",
        },
        {
          title: "Telecaller",
          url: "/dashboard/list/telecaller",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: Users2Icon,
      items: [
        {
          title: "Field staff Report",
          url: "/dashboard/reports/field-staff",
        },
        {
          title: "Tellecaller Reports",
          url: "/dashboard/reports/telecaller",
        },
      ],
    },
  ],
  projects: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Applied Loans",
      url: "/dashboard/view/loans",
      icon: HandCoinsIcon,
    },
    {
      title: "Loan Enquiry Data",
      url: "/dashboard/loan-enquiry",
      icon: ClipboardListIcon,
    },
    {
      title: "Lead Generation",
      url: "/dashboard/generate-lead",
      icon: BookUser,
    },
    {
      title: "Account Creation",
      url: "/dashboard/admin/signup",
      icon: UserPlus2Icon,
    },
    {
      title: "Blogs",
      url: "/dashboard/admin/blogs",
      icon: LucideNotebookPen,
    },
    {
      title: "Testimonials",
      url: "/dashboard/admin/testimonials",
      icon: MessageSquareText,
    },
    {
      title: "Contact us",
      url: "/dashboard/admin/contact_data",
      icon: Contact2Icon,
    },
    {
      title: "Career applications",
      url: "/dashboard/admin/careers",
      icon: UserPlus2Icon,
    },
  ],
};

export const RMSidebar = {
  navMain: [
    {
      title: "Loan Applications",
      url: "/dashboard/rm",
      icon: ClipboardType,
      isActive: true,
      items: [
        {
          title: "Personal Loan",
          url: "/dashboard/forms/personal_loan",
          icon: FileUser,
          isActive: true,
        },
        {
          title: "Business Loan",
          url: "/dashboard/forms/business_loan",
          icon: BriefcaseBusinessIcon,
          isActive: false,
        },
        {
          title: "Home Loan",
          url: "/dashboard/forms/home_loan",
          icon: HomeIcon,
        },
        {
          title: "Vehicle Loan",
          url: "/dashboard/forms/vehicle_loan",
          icon: CarIcon,
        },
        {
          title: "Gold Loan",
          url: "/dashboard/forms/gold_loan",
          icon: HandCoinsIcon,
        },
        {
          title: "Group Loan",
          url: "/dashboard/forms/group_loan",
          icon: Users2,
        },
      ],
    },
    {
      title: "View Loans",
      url: "#",
      icon: List,
      items: [
        {
          title: "All Loans",
          url: "/dashboard/loans",
        },
        {
          title: "Personal Loan",
          url: "/dashboard/loans/personal_loan",
        },
        {
          title: "Business Loan",
          url: "/dashboard/loans/business_loan",
        },
        {
          title: "Home Loan",
          url: "/dashboard/loans/home_loan",
        },
        {
          title: "Vehicle Loan",
          url: "/dashboard/loans/vehicle_loan",
        },
        {
          title: "Gold Loan",
          url: "/dashboard/loans/gold_loan",
        },
        {
          title: "Group Loan",
          url: "/dashboard/loans/group_loan",
        },
      ],
    },
    {
      title: "Team members",
      url: "#",
      icon: Users2Icon,
      items: [
        {
          title: "Connectors",
          url: "/dashboard/view/connectors",
        },
        {
          title: "Relationship manager",
          url: "/dashboard/view/rm",
        },
        {
          title: "Field Staff",
          url: "/dashboard/view/fieldstaff",
        },
        {
          title: "Telecaller",
          url: "/dashboard/view/telecaller",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: Users2Icon,
      items: [
        {
          title: "Field staff Report",
          url: "/dashboard/reports/field-staff",
        },
        {
          title: "Tellecaller Reports",
          url: "/dashboard/reports/telecaller",
        },
        {
          title: "Loans Report",
          url: "/dashboard/view/loans",
        },
      ],
    },
  ],
  projects: [
    {
      title: "Dashboard",
      url: "/dashboard/rm",
      icon: LayoutDashboard,
    },
    {
      title: "Profile",
      url: "/dashboard/rm/profile",
      icon: User2,
    },
    {
      title: "Applied Loans",
      url: "/dashboard/view/loans",
      icon: HandCoinsIcon,
    },
    {
      title: "Loan Enquiry Data",
      url: "/dashboard/admin/loan-enquiry",
      icon: ClipboardListIcon,
    },
    {
      title: "Lead Generation",
      url: "/dashboard/generate-lead",
      icon: BookUser,
    },
    {
      title: "Blogs",
      url: "/dashboard/admin/blogs",
      icon: LucideNotebookPen,
    },
    {
      title: "Testimonials",
      url: "/dashboard/admin/testimonials",
      icon: MessageSquareText,
    },
    {
      title: "Contact us",
      url: "/dashboard/admin/contact_data",
      icon: Contact2Icon,
    },
    {
      title: "Career applications",
      url: "/dashboard/admin/careers",
      icon: UserPlus2Icon,
    },
  ],
};

export const DSASidebar = {
  navMain: [
    {
      title: "Loan Applications",
      url: "/dashboard",
      icon: ClipboardType,
      items: [
        {
          title: "Personal Loan",
          url: "/dashboard/forms/personal_loan",
          icon: FileUser,
        },
        {
          title: "Business Loan",
          url: "/dashboard/forms/business_loan",
          icon: BriefcaseBusinessIcon,
        },
        {
          title: "Home Loan",
          url: "/dashboard/forms/home_loan",
          icon: HomeIcon,
        },
        {
          title: "Vehicle Loan",
          url: "/dashboard/forms/vehicle_loan",
          icon: CarIcon,
        },
        {
          title: "Gold Loan",
          url: "/dashboard/forms/gold_loan",
          icon: HandCoinsIcon,
        },
        {
          title: "Group Loan",
          url: "/dashboard/forms/group_loan",
          icon: Users2,
        },
      ],
    },
    {
      title: "View Loans",
      url: "#",
      icon: List,
      items: [
        {
          title: "All Loans",
          url: "/dashboard/loans",
        },
        {
          title: "Personal Loan",
          url: "/dashboard/loans/personal_loan",
        },
        {
          title: "Business Loan",
          url: "/dashboard/loans/business_loan",
        },
        {
          title: "Home Loan",
          url: "/dashboard/loans/home_loan",
        },
        {
          title: "Vehicle Loan",
          url: "/dashboard/loans/vehicle_loan",
        },
        {
          title: "Gold Loan",
          url: "/dashboard/loans/gold_loan",
        },
        {
          title: "Group Loan",
          url: "/dashboard/loans/group_loan",
        },
      ],
    },
  ],
  projects: [
    {
      title: "Dashboard",
      url: "/dashboard/dsa",
      icon: LayoutDashboard,
    },
    {
      title: "Profile",
      url: "/dashboard/dsa/profile",
      icon: User,
    },
    {
      title: "Lead Generation",
      url: "/dashboard/dsa/lead-genarate",
      icon: BookUser,
    },
    {
      title: "My Income",
      url: "/dashboard/dsa/income",
      icon: HandCoinsIcon,
    },
    {
      title: "Applied Loan",
      url: "/dashboard/dsa/applied-loans",
      icon: ClipboardListIcon,
    }


  ],
};
export const TelecallerSidebar = {
  navMain: [
    {
      title: "Loan Applications",
      url: "/dashboard",
      icon: ClipboardType,
      items: [
        {
          title: "Personal Loan",
          url: "/dashboard/forms/personal_loan",
          icon: FileUser,
        },
        {
          title: "Business Loan",
          url: "/dashboard/forms/business_loan",
          icon: BriefcaseBusinessIcon,
        },
        {
          title: "Home Loan",
          url: "/dashboard/forms/home_loan",
          icon: HomeIcon,
        },
        {
          title: "Vehicle Loan",
          url: "/dashboard/forms/vehicle_loan",
          icon: CarIcon,
        },
        {
          title: "Gold Loan",
          url: "/dashboard/forms/gold_loan",
          icon: HandCoinsIcon,
        },
        {
          title: "Group Loan",
          url: "/dashboard/forms/group_loan",
          icon: Users2,
        },
      ],
    },
    {
      title: "View Loans",
      url: "#",
      icon: List,
      items: [
        {
          title: "All Loans",
          url: "/dashboard/loans",
        },
        {
          title: "Personal Loan",
          url: "/dashboard/loans/personal_loan",
        },
        {
          title: "Business Loan",
          url: "/dashboard/loans/business_loan",
        },
        {
          title: "Home Loan",
          url: "/dashboard/loans/home_loan",
        },
        {
          title: "Vehicle Loan",
          url: "/dashboard/loans/vehicle_loan",
        },
        {
          title: "Gold Loan",
          url: "/dashboard/loans/gold_loan",
        },
        {
          title: "Group Loan",
          url: "/dashboard/loans/group_loan",
        },
      ],
    },
  ],
  projects: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Profile",
      url: "/dashboard/telecaller",
      icon: User2,
    },
    // {
    //   title: "Lead Generation",
    //   url: "/dashboard/generate-lead",
    //   icon: BookUser,
    // },
    {
      title: "Calling List",
      url: "/dashboard/telecaller/daily-task",
      icon: List,
    },
    {
      title: "Daily report",
      url: "/dashboard/telecaller/work-report",
      icon: ClipboardList,
    },
    {
      title: "Applied Loans",
      url: "/dashboard/telecaller/",
      icon: LayoutDashboard,
    },
  ],
};
export const FieldStaffSidebar = {
  navMain: [
    {
      title: "Loan Applications",
      url: "/dashboard",
      icon: ClipboardType,
      items: [
        {
          title: "Personal Loan",
          url: "/dashboard/forms/personal_loan",
          icon: FileUser,
        },
        {
          title: "Business Loan",
          url: "/dashboard/forms/business_loan",
          icon: BriefcaseBusinessIcon,
        },
        {
          title: "Home Loan",
          url: "/dashboard/forms/home_loan",
          icon: HomeIcon,
        },
        {
          title: "Vehicle Loan",
          url: "/dashboard/forms/vehicle_loan",
          icon: CarIcon,
        },
        {
          title: "Gold Loan",
          url: "/dashboard/forms/gold_loan",
          icon: HandCoinsIcon,
        },
        {
          title: "Group Loan",
          url: "/dashboard/forms/group_loan",
          icon: Users2,
        },
      ],
    },
    {
      title: "View Loans",
      url: "#",
      icon: List,
      items: [
        {
          title: "All Loans",
          url: "/dashboard/loans",
        },
        {
          title: "Personal Loan",
          url: "/dashboard/loans/personal_loan",
        },
        {
          title: "Business Loan",
          url: "/dashboard/loans/business_loan",
        },
        {
          title: "Home Loan",
          url: "/dashboard/loans/home_loan",
        },
        {
          title: "Vehicle Loan",
          url: "/dashboard/loans/vehicle_loan",
        },
        {
          title: "Gold Loan",
          url: "/dashboard/loans/gold_loan",
        },
        {
          title: "Group Loan",
          url: "/dashboard/loans/group_loan",
        },
      ],
    },
  ],
  projects: [
    {
      title: "Dashboard",
      url: "/dashboard/field-staff",
      icon: LayoutDashboard,
    },
    {
      title: "Profile",
      url: "/dashboard/field-staff/profile",
      icon: UserPen,
    },
    // {
    //   title: "Lead Generation",
    //   url: "/dashboard/generate-lead",
    //   icon: BookUser,
    // },
    {
      title: "Daily Visit report",
      url: "/dashboard/field-staff/visit-report",
      icon: Bike,
    },
    {
      title: "Applied Loans",
      url: "/dashboard/telecaller/",
      icon: LayoutDashboard,
    },
  ],
};

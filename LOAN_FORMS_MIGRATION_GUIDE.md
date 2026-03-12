# Loan Forms Migration Guide

This guide shows how to update all loan form pages to use the new React Query hooks and API structure.

## ✅ Completed

### Backend
- ✅ All loan models created (Gold, Vehicle, Personal, Home, Business, Group)
- ✅ All controllers created with generic factory pattern
- ✅ All routes created and registered in server.js
- ✅ Routes available at `/api/loans/{type}`

### Frontend
- ✅ API files created in `lib/api/loans/`
- ✅ React Query hooks created in `hooks/loans/`
- ✅ Gold Loan form updated as example

## 🔄 Migration Pattern

### Step 1: Update Imports

**Remove:**
```javascript
import { setLoanData } from "@/lib/actions/loan";
import { useUserState } from "../../store";
import { getPublicIdFromUrl, upload_single_file } from "@/lib/utils";
```

**Add:**
```javascript
import { useCreate[LoanType]Loan } from "@/hooks/loans/use[LoanType]Loan";
import { useGetUserDataByToken } from "@/hooks/useUser";
import { del } from "idb-keyval";
import toast from "react-hot-toast";
```

**For each loan type:**
- Gold → `useCreateGoldLoan`
- Vehicle → `useCreateVehicleLoan`
- Personal → `useCreatePersonalLoan`
- Home → `useCreateHomeLoan`
- Business → `useCreateBusinessLoan`
- Group → `useCreateGroupLoan`

### Step 2: Update Component

**Remove:**
```javascript
const userState = useUserState();
```

**Add:**
```javascript
const createLoanMutation = useCreate[LoanType]Loan();
const { data: userData } = useGetUserDataByToken();
const userProfile = userData?.data?.data?.user || {};
```

### Step 3: Update Form Data Initialization

**Change:**
```javascript
id_of_connector: userState?.profile?.role === "Admin" ? "" : userState?.profile?.username,
name_of_connector: userState?.profile?.role === "Admin" ? "" : userState?.profile?.full_name,
```

**To:**
```javascript
id_of_connector: userProfile?.role === "Admin" ? "" : userProfile?.username || "",
name_of_connector: userProfile?.role === "Admin" ? "" : userProfile?.full_name || "",
```

### Step 4: Update handleFinalSubmit

**Remove:**
```javascript
const token = await userState.user.getIdToken();
userState.setShowLoader(true);
const res = await setLoanData(token, dataToSubmit, "LoanType");

if (res?.success) {
    setOpenSuccess(true);
    await del("loanForm");
}
```

**Replace with:**
```javascript
createLoanMutation.mutate(dataToSubmit, {
    onSuccess: async () => {
        setOpenSuccess(true);
        await del("[loanType]LoanForm"); // e.g., "vehicleLoanForm"
    },
    onError: (error) => {
        console.error("Submission failed:", error);
        // Error toast is handled in the hook
    },
});
```

### Step 5: Update Loading States

**Update buttons:**
```javascript
disabled={isSubmitting || createLoanMutation.isPending}
```

**Update loading modal:**
```javascript
<LoadingModal open={isSubmitting || createLoanMutation.isPending} />
```

**Update submit button text:**
```javascript
{createLoanMutation.isPending ? "Submitting..." : "Submit"}
```

## 📋 Forms to Update

### ✅ Completed
- [x] Gold Loan (`app/dashboard/forms/gold_loan/page.jsx`)

### 🔄 Remaining
- [ ] Vehicle Loan (`app/dashboard/forms/vehicle_loan/page.jsx`)
- [ ] Personal Loan (`app/dashboard/forms/personal_loan/page.jsx`)
- [ ] Home Loan (`app/dashboard/forms/home_loan/page.jsx`)
- [ ] Business Loan (`app/dashboard/forms/business_loan/page.jsx`)
- [ ] Group Loan (`app/dashboard/forms/group_loan/page.jsx`)

## 🧹 Cleanup Tasks

### Remove Old Files (after all forms updated)
- [ ] `lib/actions/loan.js` (if exists)
- [ ] `lib/functions/loans.js` (if unused)

### Remove Unused Imports
- Remove all `getPublicIdFromUrl` imports if not used
- Remove `useUserState` imports from form pages
- Remove `setLoanData` imports

## 📝 Notes

1. **File Upload**: The `get_upload_promises` function should still be used for file uploads before submitting
2. **Error Handling**: Errors are automatically shown via toast in the hooks
3. **Loading States**: Use `createLoanMutation.isPending` instead of separate loading state
4. **Success**: Success toast is automatically shown in the hooks

## 🔍 Testing Checklist

For each form:
- [ ] Form submission works
- [ ] Loading states display correctly
- [ ] Error messages show properly
- [ ] Success modal appears
- [ ] Form data persists correctly
- [ ] File uploads work
- [ ] Validation still works


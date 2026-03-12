# Migration Guide: Firebase to Backend API with TanStack Query

This document outlines the migration from Firebase to a localhost backend (port 5000) with TanStack Query.

## Overview

The application has been migrated from Firebase/Firestore to use:
- **Backend API**: `http://localhost:5000/api` (configurable via `NEXT_PUBLIC_API_URL`)
- **TanStack Query**: For all API fetching and state management
- **Custom Hooks**: All functionalities moved to reusable hooks in `/hooks` directory

## What's Been Done

### 1. Infrastructure Setup
- ✅ Installed `@tanstack/react-query`
- ✅ Created API client (`lib/api/client.js`)
- ✅ Set up QueryProvider wrapper (`components/providers/QueryProviderWrapper.jsx`)
- ✅ Updated root layout to include QueryProvider

### 2. Hooks Created
All hooks are located in the `/hooks` directory:

- **Authentication**: `hooks/useAuth.js`
  - `useLogin()` - User login
  - `useLogout()` - User logout
  - `useCheckAuth()` - Check authentication status
  - `useGetProfile()` - Get user profile
  - `useSendOTP()` - Send OTP for password reset
  - `useVerifyOTP()` - Verify OTP
  - `useChangePassword()` - Change password

- **User Management**: `hooks/useUser.js`
  - `useGetUserDataByToken()` - Get current user data
  - `useGetUserData(username)` - Get user by username
  - `useCreateAccount()` - Create new account
  - `useUpdateAccount()` - Update account

- **DSA Operations**: `hooks/useDSA.js`
  - `useCreateDSAAccount()` - Create DSA account
  - `useGetDSAData()` - Get paginated DSA data
  - `useGetDSADataById()` - Get DSA by ID
  - `useApproveDSAForm()` - Approve DSA form
  - `useGetLoanDataByType()` - Get loans by type for DSA
  - `useGetDSADashboardData()` - Get DSA dashboard data

- **Loan Operations**: `hooks/useLoan.js`
  - `useSetLoanData()` - Submit/create loan
  - `useGetLoanData()` - Get paginated loans
  - `useGetAllLoanData()` - Get all loans
  - `useGetLoanByID()` - Get loan by ID
  - `useSetLoanByID()` - Update loan
  - `useDeleteLoanData()` - Delete loan
  - `useUpdateLoanStatus()` - Update loan status
  - `useSaveApplicationData()` - Save application data
  - `useGetConnectorIncomes()` - Get connector incomes
  - `useGetDashboardStats()` - Get dashboard statistics

- **Lead Generation**: `hooks/useLead.js`
  - `useAddLead()` - Add new lead
  - `useGetLeads()` - Get paginated leads
  - `useGetAllLeads()` - Get all leads
  - `useUpdateLead()` - Update lead
  - `useUpdateLeadStatus()` - Update lead status
  - `useDeleteLead()` - Delete lead
  - `useAddLeadRemark()` - Add remark to lead

- **Enquiry**: `hooks/useEnquiry.js`
  - `useSubmitEnquiry()` - Submit enquiry
  - `useGetPaginatedEnquiries()` - Get paginated enquiries
  - `useGetAllEnquiries()` - Get all enquiries
  - `useDeleteEnquiry()` - Delete enquiry

- **Admin Operations**: `hooks/useAdmin.js`
  - `useCreateContactSubmission()` - Create contact submission
  - `useGetAllContactSubmissions()` - Get contact submissions
  - `useCreateTestimonial()` - Create testimonial
  - `useGetAllTestimonials()` - Get all testimonials

- **Telecaller**: `hooks/useTelecaller.js`
  - `useFetchTelecallerDailyReport()` - Get daily reports
  - `useSetTelecallersData()` - Set telecaller data
  - `useGetTelecallersData()` - Get telecallers data
  - `useDeleteTelecallerReport()` - Delete report
  - `useFetchTelecallerDashboardData()` - Get dashboard data
  - `useSubmitTelecallerSummary()` - Submit summary

- **Field Staff**: `hooks/useFieldStaff.js`
  - `useSubmitDailyVisitReport()` - Submit visit report
  - `useGetDailyVisitReports()` - Get daily reports
  - `useGetFieldStaffsData()` - Get field staff data

- **RM Operations**: `hooks/useRM.js`
  - `useGetRMData()` - Get RM data

- **File Operations**: `hooks/useFile.js`
  - `useUploadDoc()` - Upload document
  - `useRemoveDoc()` - Remove document

### 3. Components Updated
- ✅ `app/login/page.jsx` - Now uses `useLogin()` hook, Firebase removed
- ✅ `components/Lead/LeadForm.jsx` - Uses `useAddLead()` and `useUpdateLead()`
- ✅ `components/Lead/LeadTable.jsx` - Uses `useGetLeads()` and `useDeleteLead()`

## How to Use the Hooks

### Query Hooks (Data Fetching)
```javascript
import { useGetLeads } from "@/hooks/useLead";

function MyComponent() {
  const { data, isLoading, error, refetch } = useGetLeads(
    pageSize, 
    startAfterDocId, 
    currentPage
  );
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{/* Use data */}</div>;
}
```

### Mutation Hooks (Data Modification)
```javascript
import { useAddLead } from "@/hooks/useLead";

function MyComponent() {
  const addLeadMutation = useAddLead();
  
  const handleSubmit = (formData) => {
    addLeadMutation.mutate(formData, {
      onSuccess: (data) => {
        console.log("Success!", data);
      },
      onError: (error) => {
        console.error("Error:", error);
      },
    });
  };
  
  return (
    <button 
      onClick={handleSubmit} 
      disabled={addLeadMutation.isPending}
    >
      {addLeadMutation.isPending ? "Submitting..." : "Submit"}
    </button>
  );
}
```

## Backend API Endpoints Expected

Your backend should provide the following endpoints (all under `/api`):

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/verify` - Verify token
- `GET /api/auth/profile` - Get profile
- `POST /api/auth/send-otp` - Send OTP
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/change-password` - Change password

### Users
- `GET /api/user/me` - Get current user
- `GET /api/user/:username` - Get user by username
- `POST /api/user/account` - Create account
- `PUT /api/user/account/:username` - Update account

### DSA
- `POST /api/dsa/create` - Create DSA account
- `GET /api/dsa` - Get DSA list (with pagination params)
- `GET /api/dsa/:username` - Get DSA by username
- `POST /api/dsa/approve/:formId` - Approve DSA form
- `GET /api/dsa/loans` - Get loans for DSA
- `GET /api/dsa/dashboard/:connectorId` - Get dashboard data

### Loans
- `POST /api/loans` - Create loan
- `GET /api/loans` - Get loans (with filters)
- `GET /api/loans/all` - Get all loans
- `GET /api/loans/:id` - Get loan by ID
- `PUT /api/loans/:id` - Update loan
- `DELETE /api/loans/:id` - Delete loan
- `PATCH /api/loans/:id/status` - Update loan status
- `POST /api/loans/application-data` - Save application data
- `GET /api/loans/connector-incomes/:connectorId` - Get connector incomes
- `GET /api/loans/dashboard-stats` - Get dashboard stats

### Leads
- `POST /api/leads` - Create lead
- `GET /api/leads` - Get leads (with pagination)
- `GET /api/leads/all` - Get all leads
- `PUT /api/leads/:id` - Update lead
- `PATCH /api/leads/:id/status` - Update lead status
- `DELETE /api/leads/:id` - Delete lead
- `POST /api/leads/:id/remarks` - Add remark

### Enquiries
- `POST /api/enquiries` - Submit enquiry
- `GET /api/enquiries` - Get enquiries (with pagination)
- `GET /api/enquiries/all` - Get all enquiries
- `DELETE /api/enquiries/:id` - Delete enquiry

### Admin
- `POST /api/admin/contact` - Create contact submission
- `GET /api/admin/contact` - Get contact submissions
- `POST /api/admin/testimonials` - Create testimonial
- `GET /api/admin/testimonials` - Get testimonials

### Telecaller
- `GET /api/telecaller/reports/daily` - Get daily reports
- `POST /api/telecaller/data` - Set telecaller data
- `GET /api/telecaller` - Get telecallers data
- `DELETE /api/telecaller/reports/:reportId` - Delete report
- `GET /api/telecaller/dashboard` - Get dashboard data
- `POST /api/telecaller/summary` - Submit summary

### Field Staff
- `POST /api/field-staff/visit-reports` - Submit visit report
- `GET /api/field-staff/visit-reports/daily` - Get daily reports
- `GET /api/field-staff` - Get field staff data

### RM
- `GET /api/rm` - Get RM data (with pagination)

### Files
- `POST /api/files/upload` - Upload file (multipart/form-data)
- `DELETE /api/files/:publicId` - Delete file

## Remaining Components to Update

The following components still need to be updated to use hooks instead of server actions:

1. All components in `/app/dashboard/**` that use server actions
2. Components that import from `/lib/actions/**`
3. Any component using Firebase directly

## Search Pattern for Finding Components to Update

```bash
# Find all imports from lib/actions
grep -r "from.*@/lib/actions" --include="*.jsx" --include="*.js"
```

## Step-by-Step Update Process

1. **Identify the component** that uses a server action
2. **Find the corresponding hook** in `/hooks`
3. **Replace the import**: Change from `import { action } from "@/lib/actions/..."` to `import { useHook } from "@/hooks/..."`
4. **Replace usage**: 
   - For queries: Replace `useEffect` + `useState` pattern with hook
   - For mutations: Replace manual API calls with mutation hook
5. **Update loading/error states**: Use `isLoading`/`isError` from hook
6. **Remove Firebase imports** if present

## Example: Converting a Component

### Before (Server Action):
```javascript
import { getLeads } from "@/lib/actions/leadgeneration";

function MyComponent() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const res = await getLeads(10, null, 1);
      setLeads(res.data);
      setLoading(false);
    }
    fetch();
  }, []);
  
  return <div>{/* render leads */}</div>;
}
```

### After (Hook):
```javascript
import { useGetLeads } from "@/hooks/useLead";

function MyComponent() {
  const { data, isLoading } = useGetLeads(10, null, 1);
  const leads = data?.data || [];
  
  if (isLoading) return <div>Loading...</div>;
  
  return <div>{/* render leads */}</div>;
}
```

## Environment Variables

Make sure to set:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

If not set, it defaults to `http://localhost:5000/api`.

## Removing Firebase Dependencies

After migration is complete, you can remove:
- `firebase` package
- `firebase-admin` package (if only used in server actions)
- `lib/firebaseConfig.js` file

## Testing

1. Start your backend on port 5000
2. Install dependencies: `pnpm install` (or `npm install`)
3. Run the development server: `pnpm dev`
4. Test each functionality to ensure API endpoints match

## Notes

- All hooks use TanStack Query's caching and automatic refetching
- Error handling is built into hooks via `toast.error()`
- Loading states are managed automatically by TanStack Query
- Queries are automatically invalidated after mutations


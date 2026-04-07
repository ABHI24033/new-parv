# Admin Dashboard Enhancement - Implementation Guide

## Overview
This guide provides complete instructions for implementing the enhanced admin dashboard with advanced filtering, Excel export, and employee management features.

## Features Implemented

### 1. Month-wise Filtering
- Filter tables by month and year
- Server-side filtering for performance
- Maintains pagination after filtering
- Default to current month

**Files:**
- `components/dashboard/filters/MonthFilter.jsx` - Month/Year selector component
- `hooks/useFilteredLoans.js` - Custom hook for filtered data
- `routes/adminFilteredRoutes.js` - Backend API endpoints

### 2. Excel Export Functionality
- Export complete dataset (all pages, not just current page)
- Includes all columns and all records
- Dynamic file naming based on applied filters
- Uses ExcelJS for efficient processing

**Files:**
- `components/dashboard/filters/ExcelExportButton.jsx` - Export button component
- `routes/adminExportRoutes.js` - Backend export endpoints

### 3. Employee Management
- Centralized DSA, RM, and Staff management
- View performance metrics
- Activate/Deactivate employees
- Assign leads and track activity

**Files:**
- `components/dashboard/EmployeeManagement.jsx` - Employee management dashboard

### 4. Filtered Data Table
- Generic table component with built-in filtering
- Supports month, status, and search filters
- Sticky filter section
- Loading states and empty states

**Files:**
- `components/dashboard/FilteredDataTable.jsx` - Reusable table component

### 5. Admin Pages
- Applied Loans admin page
- Enquiries admin page
- Leads admin page

**Files:**
- `app/dashboard/admin/loans/page.jsx`
- `app/dashboard/admin/enquiries/page.jsx`
- `app/dashboard/admin/leads/page.jsx`

## Backend Setup

### Step 1: Install Dependencies
```bash
npm install exceljs
# or
pnpm add exceljs
```

### Step 2: Add Routes to server.js
The routes have already been added to `server.js`:
```javascript
import adminExportRoutes from './routes/adminExportRoutes.js';
import adminFilteredRoutes from './routes/adminFilteredRoutes.js';

app.use('/api/admin/export', adminExportRoutes);
app.use('/api/admin', adminFilteredRoutes);
```

### Step 3: Update Database Models
Ensure your models have the required fields:

**Loan Model:**
```javascript
{
    loanId: String,
    applicantName: String,
    loanType: String,
    loanAmount: Number,
    status: String, // 'Pending', 'Approved', 'Rejected', 'Disbursed'
    assignedTo: String, // DSA/RM Name
    createdAt: Date
}
```

**Enquiry Model:**
```javascript
{
    enquiryId: String,
    name: String,
    phone: String,
    email: String,
    loanType: String,
    amount: Number,
    createdAt: Date
}
```

**Lead Model:**
```javascript
{
    leadId: String,
    name: String,
    phone: String,
    email: String,
    city: String,
    state: String,
    createdAt: Date
}
```

### Step 4: Update Backend Routes
Replace mock data in `adminFilteredRoutes.js` and `adminExportRoutes.js` with actual database queries:

```javascript
// Example: Get filtered loans
const getFilteredLoans = async (month, year, status) => {
    const startDate = new Date(year, parseInt(month) - 1, 1);
    const endDate = new Date(year, parseInt(month), 0);

    let query = {
        createdAt: {
            $gte: startDate,
            $lte: endDate,
        }
    };

    if (status) {
        query.status = status;
    }

    return await Loan.find(query).lean();
};
```

## Frontend Setup

### Step 1: Use the Components

**Applied Loans Page Example:**
```jsx
'use client'

import React, { useState } from 'react';
import { useFilteredLoans } from '@/hooks/useFilteredLoans';
import FilteredDataTable from '@/components/dashboard/FilteredDataTable';

export default function AppliedLoansPage() {
    const {
        data,
        isLoading,
        filters,
        handleMonthChange,
        handleStatusChange,
        handleSearch,
    } = useFilteredLoans();

    const columns = [
        { key: 'loanId', label: 'Loan ID' },
        { key: 'applicantName', label: 'Applicant Name' },
        { key: 'loanType', label: 'Loan Type' },
        { key: 'loanAmount', label: 'Amount', type: 'currency', align: 'right' },
        { key: 'status', label: 'Status', type: 'badge' },
        { key: 'assignedTo', label: 'Assigned To' },
    ];

    return (
        <FilteredDataTable
            title="Applied Loans"
            description="Manage all loan applications"
            columns={columns}
            data={data}
            isLoading={isLoading}
            onMonthChange={handleMonthChange}
            onStatusChange={handleStatusChange}
            onSearch={handleSearch}
            exportEndpoint="/api/admin/export/applied-loans"
            hasMonthFilter={true}
            hasStatusFilter={true}
            statusOptions={[
                { value: 'Pending', label: 'Pending' },
                { value: 'Approved', label: 'Approved' },
                { value: 'Rejected', label: 'Rejected' },
                { value: 'Disbursed', label: 'Disbursed' },
            ]}
        />
    );
}
```

### Step 2: API Endpoints
The following API endpoints are now available:

**Filtered Data:**
- `GET /api/admin/loans/filtered?month=01&year=2026&status=Approved`
- `GET /api/admin/enquiries/filtered?month=01&year=2026`
- `GET /api/admin/leads/filtered?month=01&year=2026`

**Export Data:**
- `GET /api/admin/export/applied-loans?month=01&year=2026`
- `GET /api/admin/export/enquiries?month=01&year=2026`
- `GET /api/admin/export/leads?month=01&year=2026`

## Advanced Customization

### Add More Filters
```jsx
// In FilteredDataTable, add new filter sections:
<Select value={customFilter} onValueChange={setCustomFilter}>
    <SelectTrigger>
        <SelectValue placeholder="Custom Filter" />
    </SelectTrigger>
    <SelectContent>
        {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
                {option.label}
            </SelectItem>
        ))}
    </SelectContent>
</Select>
```

### Add Bulk Actions
```jsx
// Add checkbox selection to table rows
<input 
    type="checkbox" 
    onChange={(e) => updateSelection(row.id, e.target.checked)}
/>

// Add bulk action buttons
<Button onClick={handleBulkApprove}>Bulk Approve</Button>
<Button onClick={handleBulkReject}>Bulk Reject</Button>
```

### Add Real-time Updates
```jsx
// Use WebSocket or polling
useEffect(() => {
    const interval = setInterval(() => {
        fetchData(filters);
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
}, [filters]);
```

## Performance Tips

1. **Database Indexing:**
   ```javascript
   // Add indexes for better query performance
   db.loans.createIndex({ createdAt: 1 });
   db.loans.createIndex({ status: 1 });
   db.enquiries.createIndex({ createdAt: 1 });
   ```

2. **Pagination:**
   - Keep pagination limit reasonable (50-100 records per page)
   - Use offset-based or cursor-based pagination

3. **Caching:**
   - Implement Redis for frequently accessed data
   - Cache employee management data

4. **Excel Export:**
   - For datasets > 100K records, consider:
     - Streaming export
     - Queue-based processing
     - Email delivery instead of direct download

## Testing Checklist

- [ ] Month filter changes table data correctly
- [ ] Year filter works properly
- [ ] Status filter updates correctly
- [ ] Search functionality finds records
- [ ] Reset button clears all filters
- [ ] Excel export downloads correct file
- [ ] Exported file contains all records
- [ ] Employee management shows correct data
- [ ] DSA section displays commission info
- [ ] RM section shows conversion rates
- [ ] Staff section filters by role
- [ ] Actions dropdown works properly
- [ ] Table remains responsive on mobile
- [ ] Loading state displays correctly
- [ ] Empty state message appears when no data

## Troubleshooting

**Excel export returns 404:**
- Verify routes are added to server.js
- Check endpoint URL in ExcelExportButton

**Filters not working:**
- Verify API endpoint URLs match
- Check database query in backend
- Check browser console for errors

**Employee data not displaying:**
- Verify mock data is updated with real queries
- Check authentication middleware

**Performance issues:**
- Add database indexes
- Implement pagination
- Use caching strategies
- Consider lazy loading

## Future Enhancements

1. **Bulk Operations:**
   - Bulk status updates
   - Bulk employee assignments
   - Bulk data deletion

2. **Advanced Analytics:**
   - Charts for conversion rates
   - DSA performance dashboards
   - Revenue tracking

3. **Notifications:**
   - Real-time filter updates
   - Export completion notifications
   - Status change alerts

4. **Audit Logging:**
   - Track all filter operations
   - Log all exports
   - Audit trail for status changes

## Support and Maintenance

For issues or feature requests, refer to:
- Backend documentation: `parv-backend/README.md`
- Frontend documentation: `parv-frontend/README.md`
- API Documentation: `parv-backend/API_DOCS.md`

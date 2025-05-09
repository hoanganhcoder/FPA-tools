// Load ví dụ. lưu ý phải load hết mới được thêm vào
const sampleData = [
    { module: 'Customers', functionName: 'Customers', description: '', type: 'ILF', det: 12, retFtr: 1, remarks: '' },
    { module: 'Employees', functionName: 'Employees', description: '', type: 'ILF', det: 7, retFtr: 1, remarks: '' },
    { module: 'Orders', functionName: 'Corporate Information', description: '', type: 'ILF', det: 12, retFtr: 1, remarks: '' },
    { module: 'Orders', functionName: 'Parts', description: '', type: 'ILF', det: 4, retFtr: 1, remarks: '' },
    { module: 'Accounts', functionName: 'Payments', description: '', type: 'ILF', det: 10, retFtr: 2, remarks: '' },
    { module: 'Orders', functionName: 'Workorders', description: '', type: 'ILF', det: 23, retFtr: 3, remarks: '' },
    { module: 'Customers', functionName: 'Credit rating', description: '', type: 'EIF', det: 8, retFtr: 1, remarks: '' },
    { module: 'Employees', functionName: 'Add and edit employees', description: '', type: 'EI', det: 8, retFtr: 1, remarks: '' },
    { module: 'Customers', functionName: 'Add and edit customers', description: '', type: 'EI', det: 18, retFtr: 2, remarks: '' },
    { module: 'Orders', functionName: 'Add and edit corporate information', description: '', type: 'EI', det: 14, retFtr: 1, remarks: '' },
    { module: 'Orders', functionName: 'Add and edit parts', description: '', type: 'EI', det: 8, retFtr: 1, remarks: '' },
    { module: 'Accounts', functionName: 'Add payment', description: '', type: 'EI', det: 15, retFtr: 2, remarks: '' },
    { module: 'Accounts', functionName: 'Adjust account', description: '', type: 'EI', det: 14, retFtr: 2, remarks: '' },
    { module: 'Orders', functionName: 'Add workorder', description: '', type: 'EI', det: 27, retFtr: 4, remarks: '' },
    { module: 'Orders', functionName: 'Update workorder', description: '', type: 'EI', det: 25, retFtr: 4, remarks: '' },
    { module: 'Accounts', functionName: 'Produce invoices', description: '', type: 'EO', det: 32, retFtr: 5, remarks: '' },
    { module: 'Orders', functionName: 'Workorder productivity report', description: '', type: 'EO', det: 47, retFtr: 4, remarks: '' },
    { module: 'Accounts', functionName: 'Sales report', description: '', type: 'EO', det: 39, retFtr: 5, remarks: '' },
    { module: 'Orders', functionName: 'Parts inventory report', description: '', type: 'EO', det: 27, retFtr: 3, remarks: '' },
    { module: 'Customers', functionName: 'Customer profile query', description: '', type: 'EQ', det: 14, retFtr: 1, remarks: '' }
];

sampleData.forEach(data => addFunction(data));
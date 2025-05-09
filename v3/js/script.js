document.addEventListener('DOMContentLoaded', function() {
    // Xóa 3 cái này code éo chạy rasngg chịu
    const saveAs = window.saveAs;
    const ExcelJS = window.ExcelJS;
    const jspdf = window.jspdf;
    

    let functions = [];
    let vafTotal = 0; 
    let currentLanguage = 'english';
    
    // DOM elements
    const vafInputs = document.querySelectorAll('.vaf-input');
    const vafTotalElement = document.getElementById('vaf-total');
    const unadjustedFpDisplay = document.getElementById('unadjusted-fp-display');
    const adjustedFpDisplay = document.getElementById('adjusted-fp-display');
    const functionTableBody = document.getElementById('function-table-body');
    const addFunctionBtn = document.getElementById('add-function');
    const exportExcelBtn = document.getElementById('export-excel');
    const exportPdfBtn = document.getElementById('export-pdf');
    const exportHtmlBtn = document.getElementById('export-html');
    const saveDataBtn = document.getElementById('save-data');
    const loadDataBtn = document.getElementById('load-data');
    const fileInput = document.getElementById('file-input');
    const functionModal = document.getElementById('function-modal');
    const functionForm = document.getElementById('function-form');
    const closeModalBtn = document.querySelector('.close');
    const cancelFunctionBtn = document.getElementById('cancel-function');
    const languageSelector = document.getElementById('language');
    const reportTemplate = document.getElementById('report-template');
    
    // Project info elements
    const projectName = document.getElementById('project-name');
    const projectCode = document.getElementById('project-code');
    const clientName = document.getElementById('client-name');
    const analystName = document.getElementById('analyst-name');
    const analysisDate = document.getElementById('analysis-date');
    const projectDescription = document.getElementById('project-description');
    
    // Set default analysis date to today
    analysisDate.valueAsDate = new Date();
    
    // Language translations
    const translations = {
        english: {
            title: "FUNCTION POINT CALCULATION",
            language: "Language",
            adjustedFP: "Adjusted FP",
            projectInfo: "Project Information",
            projectName: "Project Name:",
            projectCode: "Project Code:",
            client: "Client:",
            analyst: "Analyst:",
            analysisDate: "Analysis Date:",
            description: "Description:",
            enterProjectName: "Enter project name",
            enterProjectCode: "Enter project code",
            enterClientName: "Enter client name",
            enterAnalystName: "Enter analyst name",
            enterProjectDescription: "Enter project description",
            exportExcel: "Export to Excel",
            exportPDF: "Export to PDF",
            exportHTML: "Export to HTML",
            saveData: "Save Project",
            loadData: "Import Project",
            vafTitle: "Value Adjustment Factors (VAF)",
            no: "No.",
            vaf: "VAF",
            weight: "Weight: 0 (low) - 5 (high)",
            vaf1: "Data communications",
            vaf2: "Distributed data processing",
            vaf3: "Performance",
            vaf4: "Heavily used configuration",
            vaf5: "Transaction rate",
            vaf6: "On-Line data entry",
            vaf7: "End-user efficiency",
            vaf8: "On-Line update",
            vaf9: "Complex processing",
            vaf10: "Reusability",
            vaf11: "Installation ease",
            vaf12: "Operational ease",
            vaf13: "Multiple sites",
            vaf14: "Facilitate change",
            total: "Total",
            legendFP: "Function Point",
            legendVAF: "Value Added Factor",
            legendDET: "Data Element Type",
            legendRET: "Record Element Type",
            legendFTR: "File Types Referenced",
            legendILF: "Internal Logical Files",
            legendEIF: "External Interface Files",
            legendEI: "External Inputs",
            legendEO: "External Outputs",
            legendEQ: "External Inquiry",
            unadjustedFP: "Unadjusted FP",
            functionDetails: "Function Point Details",
            module: "Module",
            functionName: "Function Name",
            type: "Type",
            det: "DET",
            retFtr: "RET/FTR",
            complexity: "Complexity",
            fp: "FP",
            adjust: "Adjust",
            fpAdjusted: "FP adjusted",
            remarks: "Remarks",
            action: "Action",
            addFunction: "Add Function",
            addEditFunction: "Add/Edit Function",
            save: "Save",
            cancel: "Cancel",
            edit: "Edit",
            delete: "Delete",
            confirmDelete: "Are you sure you want to delete this function?",
            dataLoadedSuccess: "Data loaded successfully!",
            errorLoadingData: "Error loading data: ",
            lowComplexity: "Low",
            averageComplexity: "Average",
            highComplexity: "High",
            reportTitle: "Function Point Analysis Report",
            reportDate: "Report Date:",
            reportSummary: "Summary",
            reportGeneratedBy: "Report generated by FPA Calculator",
            reportPage: "Page",
            reportOf: "of",
            libraryError: "Required library is not loaded. Please check your internet connection and refresh the page."
        },
        vietnamese: {
            title: "TÍNH TOÁN ĐIỂM CHỨC NĂNG",
            language: "Ngôn ngữ",
            adjustedFP: "FP Điều chỉnh",
            projectInfo: "Thông tin dự án",
            projectName: "Tên dự án:",
            projectCode: "Mã dự án:",
            client: "Khách hàng:",
            analyst: "Người phân tích:",
            analysisDate: "Ngày phân tích:",
            description: "Mô tả:",
            enterProjectName: "Nhập tên dự án",
            enterProjectCode: "Nhập mã dự án",
            enterClientName: "Nhập tên khách hàng",
            enterAnalystName: "Nhập tên người phân tích",
            enterProjectDescription: "Nhập mô tả dự án",
            exportExcel: "Xuất Excel",
            exportPDF: "Xuất PDF",
            exportHTML: "Xuất HTML",
            saveData: "Lưu dự án",
            loadData: "Nhập dự án",
            vafTitle: "Các yếu tố điều chỉnh giá trị (VAF)",
            no: "STT",
            vaf: "VAF",
            weight: "Trọng số: 0 (thấp) - 5 (cao)",
            vaf1: "Truyền thông dữ liệu",
            vaf2: "Xử lý dữ liệu phân tán",
            vaf3: "Hiệu suất",
            vaf4: "Cấu hình sử dụng nhiều",
            vaf5: "Tốc độ giao dịch",
            vaf6: "Nhập liệu trực tuyến",
            vaf7: "Hiệu quả người dùng cuối",
            vaf8: "Cập nhật trực tuyến",
            vaf9: "Xử lý phức tạp",
            vaf10: "Khả năng tái sử dụng",
            vaf11: "Dễ dàng cài đặt",
            vaf12: "Dễ dàng vận hành",
            vaf13: "Nhiều địa điểm",
            vaf14: "Tạo điều kiện thay đổi",
            total: "Tổng",
            legendFP: "Điểm chức năng",
            legendVAF: "Yếu tố điều chỉnh giá trị",
            legendDET: "Loại phần tử dữ liệu",
            legendRET: "Loại phần tử bản ghi",
            legendFTR: "Loại tệp tham chiếu",
            legendILF: "Tệp logic nội bộ",
            legendEIF: "Tệp giao diện bên ngoài",
            legendEI: "Đầu vào bên ngoài",
            legendEO: "Đầu ra bên ngoài",
            legendEQ: "Truy vấn bên ngoài",
            unadjustedFP: "FP chưa điều chỉnh",
            functionDetails: "Chi tiết điểm chức năng",
            module: "Module",
            functionName: "Tên chức năng",
            type: "Loại",
            det: "DET",
            retFtr: "RET/FTR",
            complexity: "Độ phức tạp",
            fp: "FP",
            adjust: "Điều chỉnh",
            fpAdjusted: "FP đã điều chỉnh",
            remarks: "Ghi chú",
            action: "Thao tác",
            addFunction: "Thêm chức năng",
            addEditFunction: "Thêm/Sửa chức năng",
            save: "Lưu",
            cancel: "Hủy",
            edit: "Sửa",
            delete: "Xóa",
            confirmDelete: "Bạn có chắc chắn muốn xóa chức năng này?",
            dataLoadedSuccess: "Dữ liệu đã được tải thành công!",
            errorLoadingData: "Lỗi khi tải dữ liệu: ",
            lowComplexity: "Thấp",
            averageComplexity: "Trung bình",
            highComplexity: "Cao",
            reportTitle: "Báo cáo phân tích điểm chức năng",
            reportDate: "Ngày báo cáo:",
            reportSummary: "Tổng kết",
            reportGeneratedBy: "Báo cáo được tạo bởi FPA Calculator",
            reportPage: "Trang",
            reportOf: "của",
            libraryError: "Thư viện cần thiết không được tải. Vui lòng kiểm tra kết nối internet và làm mới trang."
        }
    };
    
    // Complexity matrices for different function types
    const complexityMatrices = {
        ILF: {
            // [RET][DET] - DET ranges: 1-19, 20-50, 51+
            // RET ranges: 1, 2-5, 6+
            complexity: [
                ['Low', 'Low', 'Average'],
                ['Low', 'Average', 'High'],
                ['Average', 'High', 'High']
            ],
            // Complexity to FP mapping
            fp: {
                'Low': 7,
                'Average': 10,
                'High': 15
            }
        },
        EIF: {
            complexity: [
                ['Low', 'Low', 'Average'],
                ['Low', 'Average', 'High'],
                ['Average', 'High', 'High']
            ],
            fp: {
                'Low': 5,
                'Average': 7,
                'High': 10
            }
        },
        EI: {
            // [FTR][DET] - DET ranges: 1-4, 5-15, 16+
            // FTR ranges: 0-1, 2, 3+
            complexity: [
                ['Low', 'Low', 'Average'],
                ['Low', 'Average', 'High'],
                ['Average', 'High', 'High']
            ],
            fp: {
                'Low': 3,
                'Average': 4,
                'High': 6
            }
        },
        EO: {
            complexity: [
                ['Low', 'Low', 'Average'],
                ['Low', 'Average', 'High'],
                ['Average', 'High', 'High']
            ],
            fp: {
                'Low': 4,
                'Average': 5,
                'High': 7
            }
        },
        EQ: {
            complexity: [
                ['Low', 'Low', 'Average'],
                ['Low', 'Average', 'High'],
                ['Average', 'High', 'High']
            ],
            fp: {
                'Low': 3,
                'Average': 4,
                'High': 6
            }
        }
    };
    
    // Apply language to UI elements
    function applyLanguage(lang) {
        currentLanguage = lang;
        const langData = translations[lang];
        
        // Update all elements with data-lang attribute
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (langData[key]) {
                element.textContent = langData[key];
            }
        });
        
        // Update placeholders
        document.querySelectorAll('[data-lang-placeholder]').forEach(element => {
            const key = element.getAttribute('data-lang-placeholder');
            if (langData[key]) {
                element.placeholder = langData[key];
            }
        });
        
        // Update edit/delete buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.textContent = langData.edit;
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.textContent = langData.delete;
        });
        
        // Re-render function table to update complexity text
        renderFunctionTable();
    }
    
    // Helper function to determine complexity and FP based on type, DET, and RET/FTR
    function calculateComplexity(type, det, retFtr) {
        let detIndex, retFtrIndex;
        
        if (type === 'ILF' || type === 'EIF') {
            // DET ranges: 1-19, 20-50, 51+
            if (det <= 19) detIndex = 0;
            else if (det <= 50) detIndex = 1;
            else detIndex = 2;
            
            // RET ranges: 1, 2-5, 6+
            if (retFtr <= 1) retFtrIndex = 0;
            else if (retFtr <= 5) retFtrIndex = 1;
            else retFtrIndex = 2;
        } else {
            // EI, EO, EQ
            // DET ranges: 1-4, 5-15, 16+
            if (det <= 4) detIndex = 0;
            else if (det <= 15) detIndex = 1;
            else detIndex = 2;
            
            // FTR ranges: 0-1, 2, 3+
            if (retFtr <= 1) retFtrIndex = 0;
            else if (retFtr === 2) retFtrIndex = 1;
            else retFtrIndex = 2;
        }
        
        const complexity = complexityMatrices[type].complexity[retFtrIndex][detIndex];
        const fp = complexityMatrices[type].fp[complexity];
        
        return { complexity, fp };
    }
    
    // Calculate VAF (Value Adjustment Factor)
    function calculateVAF() {
        let total = 0;
        vafInputs.forEach(input => {
            total += parseInt(input.value || 0);
        });
        vafTotalElement.textContent = total;
        vafTotal = total;
        
        return 0.65 + (0.01 * total);
    }
    
    // Calculate unadjusted and adjusted FP
    function calculateFP() {
        let unadjustedFP = 0;
        
        functions.forEach(func => {
            unadjustedFP += func.fp;
        });
        
        const vaf = calculateVAF();
        const adjustedFP = (unadjustedFP * vaf).toFixed(2);
        
        unadjustedFpDisplay.value = unadjustedFP;
        adjustedFpDisplay.value = adjustedFP;
        
        return { unadjustedFP, adjustedFP };
    }
    
    // Get translated complexity text
    function getComplexityText(complexity) {
        const langData = translations[currentLanguage];
        if (complexity === 'Low') return langData.lowComplexity;
        if (complexity === 'Average') return langData.averageComplexity;
        if (complexity === 'High') return langData.highComplexity;
        return complexity;
    }
    
    // Render function table
    function renderFunctionTable() {
        functionTableBody.innerHTML = '';
        const langData = translations[currentLanguage];
        
        functions.forEach((func, index) => {
            const row = document.createElement('tr');
            const complexityText = getComplexityText(func.complexity);
            
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${func.module}</td>
                <td>${func.functionName}</td>
                <td>${func.description || ''}</td>
                <td>${func.type}</td>
                <td>${func.det}</td>
                <td>${func.retFtr}</td>
                <td class="complexity-cell ${func.complexity.toLowerCase()}">${complexityText}</td>
                <td>${func.fp}</td>
                <td>${func.adjust || func.fp}</td>
                <td>${func.fpAdjusted || func.fp}</td>
                <td>${func.remarks || ''}</td>
                <td>
                    <button class="edit-btn" data-index="${index}">${langData.edit}</button>
                    <button class="delete-btn" data-index="${index}">${langData.delete}</button>
                </td>
            `;
            
            functionTableBody.appendChild(row);
        });
        
        // Add event listeners to edit and delete buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                editFunction(index);
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                deleteFunction(index);
            });
        });
        
        calculateFP();
    }
    
    // Add a new function
    function addFunction(functionData) {
        const { complexity, fp } = calculateComplexity(
            functionData.type, 
            parseInt(functionData.det), 
            parseInt(functionData.retFtr)
        );
        
        const newFunction = {
            ...functionData,
            complexity,
            fp,
            fpAdjusted: fp
        };
        
        functions.push(newFunction);
        renderFunctionTable();
    }
    
    // Edit an existing function
    function editFunction(index) {
        const func = functions[index];
        
        document.getElementById('edit-index').value = index;
        document.getElementById('module').value = func.module;
        document.getElementById('function-name').value = func.functionName;
        document.getElementById('description').value = func.description || '';
        document.getElementById('type').value = func.type;
        document.getElementById('det').value = func.det;
        document.getElementById('ret-ftr').value = func.retFtr;
        document.getElementById('remarks').value = func.remarks || '';
        
        functionModal.style.display = 'block';
    }
    
    // Delete a function
    function deleteFunction(index) {
        const langData = translations[currentLanguage];
        if (confirm(langData.confirmDelete)) {
            functions.splice(index, 1);
            renderFunctionTable();
        }
    }
    
    // Check if a library is available
    function checkLibrary(library, name) {
        if (typeof library === 'undefined') {
            const langData = translations[currentLanguage];
            alert(`${langData.libraryError} (${name})`);
            return false;
        }
        return true;
    }
    
    // Export to Excel
    function exportToExcel() {
        // Check if ExcelJS is available
        if (!checkLibrary(window.ExcelJS, 'ExcelJS') || !checkLibrary(window.saveAs, 'FileSaver')) {
            return;
        }
        

        var borderStyles = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" }
          };

        const workbook = new window.ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('FPA Calculation', {views:[{ showGridLines:false}]});
        const langData = translations[currentLanguage];
        
        // Add project information
        worksheet.mergeCells('A1:B1');
        const projectTitleCell = worksheet.getCell('A1');
        projectTitleCell.value = langData.projectInfo;
        projectTitleCell.font = { bold: true, size: 14 };
        
        worksheet.getCell('A2').value = langData.projectName;
        worksheet.getCell('B2').value = projectName.value || 'N/A';
        
        worksheet.getCell('A3').value = langData.projectCode;
        worksheet.getCell('B3').value = projectCode.value || 'N/A';
        
        worksheet.getCell('A4').value = langData.client;
        worksheet.getCell('B4').value = clientName.value || 'N/A';
        
        worksheet.getCell('A5').value = langData.analyst;
        worksheet.getCell('B5').value = analystName.value || 'N/A';
        
        worksheet.getCell('A6').value = langData.analysisDate;
        worksheet.getCell('B6').value = analysisDate.value || 'N/A';
        
        worksheet.getCell('A7').value = langData.description;
        worksheet.getCell('B7').value = projectDescription.value || 'N/A';
        
        // Add title
        worksheet.mergeCells('A9:F9');
        const titleCell = worksheet.getCell('A9');
        titleCell.value = langData.title;
        titleCell.font = { bold: true, size: 16 };
        titleCell.alignment = { horizontal: 'left' };
        
        // Add language selector
        worksheet.mergeCells('G9:H9');
        worksheet.getCell('G9').value = langData.language;
        worksheet.getCell('G9').font = { bold: true };
        
        worksheet.mergeCells('I9:J9');
        worksheet.getCell('I9').value = currentLanguage;
        
        
        
        // Add VAF table
        worksheet.getCell('A11').value = langData.no;
        worksheet.getCell('B11').value = langData.vaf;
        worksheet.getCell('C11').value = langData.weight;
        

        // bảng này chỉ 3 dòng thôi
        ["A11", "B11", "C11"].forEach((key, index) => {
            const cell = worksheet.getCell( key );
            cell.font = { bold: true };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFE0E0E0' }
            };
            cell.border = borderStyles;
        })

        // worksheet.getRow(11).font = { bold: true };
        // worksheet.getRow(11).fill = {
        //     type: 'pattern',
        //     pattern: 'solid',
        //     fgColor: { argb: 'FFE0E0E0' }
        // };
        
        // Add VAF data
        const vafKeys = [
            'vaf1', 'vaf2', 'vaf3', 'vaf4', 'vaf5', 'vaf6', 'vaf7',
            'vaf8', 'vaf9', 'vaf10', 'vaf11', 'vaf12', 'vaf13', 'vaf14'
        ];
        
        vafKeys.forEach((key, index) => {
            const rowIndex = index + 12;
            worksheet.getCell(`A${rowIndex}`).value = index + 1;
            worksheet.getCell(`A${rowIndex}`).border = borderStyles;

            worksheet.getCell(`B${rowIndex}`).value = langData[key];
            worksheet.getCell(`B${rowIndex}`).border = borderStyles;

            
            worksheet.getCell(`C${rowIndex}`).value = parseInt(vafInputs[index].value);
            worksheet.getCell(`C${rowIndex}`).border = borderStyles;

        });
        
        // Add VAF total
        worksheet.getCell(`A${vafKeys.length + 12}`).value = langData.total;
        worksheet.getCell(`C${vafKeys.length + 12}`).value = vafTotal;
        worksheet.getCell(`C${vafKeys.length + 12}`).border = borderStyles;
        worksheet.getRow(vafKeys.length + 12).font = { bold: true };

        
        // Add legend
        const legendKeys = [
            { key: 'FP:', valueKey: 'legendFP' },
            { key: 'VAF:', valueKey: 'legendVAF' },
            { key: 'DET:', valueKey: 'legendDET' },
            { key: 'RET:', valueKey: 'legendRET' },
            { key: 'FTR:', valueKey: 'legendFTR' },
            { key: 'ILF:', valueKey: 'legendILF' },
            { key: 'EIF:', valueKey: 'legendEIF' },
            { key: 'EI:', valueKey: 'legendEI' },
            { key: 'EO:', valueKey: 'legendEO' },
            { key: 'EQ:', valueKey: 'legendEQ' }
        ];
        
        legendKeys.forEach((item, index) => {
            const rowIndex = index + 12;
            const colIndex = 'E' ;
            const valueColIndex = 'F';
            
            worksheet.getCell(`${colIndex}${rowIndex}`).value = item.key;
            worksheet.getCell(`${colIndex}${rowIndex}`).font = { bold: true };
            worksheet.getCell(`${valueColIndex}${rowIndex}`).value = langData[item.valueKey];
        });

        // Add adjusted FP  
        worksheet.getCell('K27').value = langData.adjustedFP;
        worksheet.getCell('K27').font = { bold: true };
        worksheet.getCell('K27').border = borderStyles;
        worksheet.getCell('L27').value = parseFloat(adjustedFpDisplay.value);
        worksheet.getCell('L27').font = { bold: true };
        worksheet.getCell('L27').border = borderStyles;
        
        // Add unadjusted FP
        worksheet.getCell('K28').value = langData.unadjustedFP;
        worksheet.getCell('K28').font = { bold: true };
        worksheet.getCell('K28').border = borderStyles;
        worksheet.getCell('L28').value = parseInt(unadjustedFpDisplay.value);
        worksheet.getCell('L28').font = { bold: true };
        worksheet.getCell('L28').border = borderStyles;
        
        // Add function table header
        const functionHeaderRow = 30;
        const functionHeaderKeys = [
            'no', 'module', 'functionName', 'description', 'type', 
            'det', 'retFtr', 'complexity', 'fp', 'adjust', 'fpAdjusted', 'remarks'
        ];
        
        functionHeaderKeys.forEach((key, index) => {
            const cell = worksheet.getCell(functionHeaderRow, index + 1);
            cell.value = langData[key];
            cell.font = { bold: true };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFE0E0E0' }
            };
            cell.border = borderStyles;
        });
        
        // Add function data
        functions.forEach((func, index) => {
            const rowIndex = functionHeaderRow + index + 1;
            const complexityText = getComplexityText(func.complexity);
            
            worksheet.getCell(rowIndex, 1).value = index + 1;
            worksheet.getCell(rowIndex, 2).value = func.module;
            worksheet.getCell(rowIndex, 3).value = func.functionName;
            worksheet.getCell(rowIndex, 4).value = func.description || '';
            worksheet.getCell(rowIndex, 5).value = func.type;
            worksheet.getCell(rowIndex, 6).value = func.det;
            worksheet.getCell(rowIndex, 7).value = func.retFtr;
            worksheet.getCell(rowIndex, 8).value = complexityText;
            worksheet.getCell(rowIndex, 9).value = func.fp;
            worksheet.getCell(rowIndex, 10).value = func.adjust || func.fp;
            worksheet.getCell(rowIndex, 11).value = func.fpAdjusted || func.fp;
            worksheet.getCell(rowIndex, 12).value = func.remarks || '';

            for (i = 1; i <= 12 ; i++){
                worksheet.getCell(rowIndex, i).border = borderStyles
            }
        });
        
        // Set column widths
        worksheet.columns.forEach(column => {
            column.width = 15;
        });
        worksheet.columns.forEach(column => {
            const lengths = column.values.map(v => v.toString().length);
            const maxLength = Math.max(...lengths.filter(v => typeof v === 'number'));
            column.width = maxLength;
          });
        // Generate Excel file
        workbook.xlsx.writeBuffer().then(buffer => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            window.saveAs(blob, `${projectName.value || 'FPA'}_Calculation.xlsx`);
        });
    }
    
    // Export to PDF
    function exportToPDF() {
        // Check if jsPDF is available
        if (!checkLibrary(window.jspdf, 'jsPDF')) {
            return;
        }
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const langData = translations[currentLanguage];
        
        // Set document properties
        doc.setProperties({
            title: `${projectName.value || 'FPA'} - ${langData.reportTitle}`,
            subject: langData.title,
            author: analystName.value || 'FPA Calculator',
            keywords: 'FPA, Function Point Analysis',
            creator: 'FPA Calculator'
        });
        
        // Add header
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text(langData.reportTitle, 105, 15, { align: 'center' });
        
        // Add project information
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(langData.projectInfo, 14, 25);
        doc.setFont('helvetica', 'normal');
        
        const projectInfoY = 30;
        doc.text(`${langData.projectName} ${projectName.value || 'N/A'}`, 14, projectInfoY);
        doc.text(`${langData.projectCode} ${projectCode.value || 'N/A'}`, 14, projectInfoY + 7);
        doc.text(`${langData.client} ${clientName.value || 'N/A'}`, 14, projectInfoY + 14);
        doc.text(`${langData.analyst} ${analystName.value || 'N/A'}`, 14, projectInfoY + 21);
        doc.text(`${langData.analysisDate} ${analysisDate.value || 'N/A'}`, 14, projectInfoY + 28);
        
        // Add description (with word wrap)
        if (projectDescription.value) {
            const splitDescription = doc.splitTextToSize(
                `${langData.description} ${projectDescription.value}`, 
                180
            );
            doc.text(splitDescription, 14, projectInfoY + 35);
        }
        
        // Add summary
        const summaryY = projectInfoY + (projectDescription.value ? 50 : 40);
        doc.setFont('helvetica', 'bold');
        doc.text(langData.reportSummary, 14, summaryY);
        doc.setFont('helvetica', 'normal');
        
        const { unadjustedFP, adjustedFP } = calculateFP();
        doc.text(`${langData.unadjustedFP}: ${unadjustedFP}`, 14, summaryY + 7);
        doc.text(`${langData.adjustedFP}: ${adjustedFP}`, 14, summaryY + 14);
        doc.text(`VAF: ${vafTotal} (${(0.65 + 0.01 * vafTotal).toFixed(2)})`, 14, summaryY + 21);
        
        // Add VAF table
        const vafTableY = summaryY + 30;
        doc.setFont('helvetica', 'bold');
        doc.text(langData.vafTitle, 14, vafTableY);
        
        // Create VAF table data
        const vafTableData = [];
        const vafKeys = [
            'vaf1', 'vaf2', 'vaf3', 'vaf4', 'vaf5', 'vaf6', 'vaf7',
            'vaf8', 'vaf9', 'vaf10', 'vaf11', 'vaf12', 'vaf13', 'vaf14'
        ];
        
        vafKeys.forEach((key, index) => {
            vafTableData.push([
                index + 1,
                langData[key],
                parseInt(vafInputs[index].value)
            ]);
        });
        
        // Add VAF table
        doc.autoTable({
            startY: vafTableY + 5,
            head: [[langData.no, langData.vaf, langData.weight]],
            body: vafTableData,
            theme: 'grid',
            headStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0] },
            styles: { font: 'helvetica', fontSize: 8 },
            columnStyles: { 0: { cellWidth: 10 }, 1: { cellWidth: 120 }, 2: { cellWidth: 30 } }
        });
        
        // Add function table on a new page
        doc.addPage();
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(langData.functionDetails, 14, 15);
        
        // Create function table data
        const functionTableData = [];
        
        functions.forEach((func, index) => {
            functionTableData.push([
                index + 1,
                func.module,
                func.functionName,
                func.type,
                func.det,
                func.retFtr,
                getComplexityText(func.complexity),
                func.fp,
                func.fpAdjusted || func.fp
            ]);
        });
        
        // Add function table
        doc.autoTable({
            startY: 20,
            head: [[
                langData.no, 
                langData.module, 
                langData.functionName, 
                langData.type, 
                langData.det, 
                langData.retFtr, 
                langData.complexity, 
                langData.fp, 
                langData.fpAdjusted
            ]],
            body: functionTableData,
            theme: 'grid',
            headStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0] },
            styles: { font: 'helvetica', fontSize: 8 },
            columnStyles: {
                0: { cellWidth: 10 },
                3: { cellWidth: 15 },
                4: { cellWidth: 15 },
                5: { cellWidth: 15 },
                6: { cellWidth: 25 },
                7: { cellWidth: 15 },
                8: { cellWidth: 20 }
            }
        });
        
        // Add footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setFont('helvetica', 'italic');
            
            // Add date
            const today = new Date().toLocaleDateString();
            doc.text(`${langData.reportDate} ${today}`, 14, 285);
            
            // Add page numbers
            doc.text(
                `${langData.reportPage} ${i} ${langData.reportOf} ${pageCount}`,
                195,
                285,
                { align: 'right' }
            );
            
            // Add footer text
            doc.text(langData.reportGeneratedBy, 105, 292, { align: 'center' });
        }
        
        // Save the PDF
        doc.save(`${projectName.value || 'FPA'}_Report.pdf`);
    }
    
    // Export to HTML
    function exportToHTML() {
        // Check if saveAs is available
        if (!checkLibrary(window.saveAs, 'FileSaver')) {
            return;
        }
        
        const langData = translations[currentLanguage];
        const { unadjustedFP, adjustedFP } = calculateFP();
        const today = new Date().toLocaleDateString();
        
        // Create HTML content
        let htmlContent = `
        <!DOCTYPE html>
        <html lang="${currentLanguage === 'english' ? 'en' : 'vi'}">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${projectName.value || 'FPA'} - ${langData.reportTitle}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .report-header {
                    text-align: center;
                    margin-bottom: 30px;
                    border-bottom: 2px solid #333;
                    padding-bottom: 10px;
                }
                .report-header h1 {
                    font-size: 24px;
                    margin-bottom: 10px;
                    color: #333;
                }
                .report-date {
                    font-size: 14px;
                    color: #666;
                }
                .report-section {
                    margin-bottom: 30px;
                }
                .report-section h2 {
                    font-size: 18px;
                    margin-bottom: 15px;
                    border-bottom: 1px solid #ddd;
                    padding-bottom: 5px;
                    color: #333;
                }
                .info-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 15px;
                    margin-bottom: 20px;
                }
                .info-item {
                    display: flex;
                }
                .info-label {
                    font-weight: bold;
                    min-width: 150px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                    font-weight: bold;
                }
                .summary-box {
                    background-color: #f9f9f9;
                    border: 1px solid #ddd;
                    padding: 15px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }
                .complexity-low {
                    color: green;
                    font-weight: bold;
                }
                .complexity-average {
                    color: orange;
                    font-weight: bold;
                }
                .complexity-high {
                    color: red;
                    font-weight: bold;
                }
                .report-footer {
                    margin-top: 50px;
                    text-align: center;
                    font-size: 12px;
                    color: #666;
                    border-top: 1px solid #ddd;
                    padding-top: 10px;
                }
                @media print {
                    body {
                        padding: 0;
                    }
                    .no-print {
                        display: none;
                    }
                    @page {
                        margin: 2cm;
                    }
                }
            </style>
        </head>
        <body>
            <div class="report-header">
                <h1>${langData.reportTitle}</h1>
                <div class="report-date">${langData.reportDate} ${today}</div>
            </div>
            
            <div class="report-section">
                <h2>${langData.projectInfo}</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">${langData.projectName}</div>
                        <div>${projectName.value || 'N/A'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">${langData.projectCode}</div>
                        <div>${projectCode.value || 'N/A'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">${langData.client}</div>
                        <div>${clientName.value || 'N/A'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">${langData.analyst}</div>
                        <div>${analystName.value || 'N/A'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">${langData.analysisDate}</div>
                        <div>${analysisDate.value || 'N/A'}</div>
                    </div>
                </div>
                
                <div class="info-item" style="margin-top: 10px;">
                    <div class="info-label">${langData.description}</div>
                    <div>${projectDescription.value || 'N/A'}</div>
                </div>
            </div>
            
            <div class="report-section">
                <h2>${langData.reportSummary}</h2>
                <div class="summary-box">
                    <div class="info-item">
                        <div class="info-label">${langData.unadjustedFP}:</div>
                        <div>${unadjustedFP}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">${langData.adjustedFP}:</div>
                        <div>${adjustedFP}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">VAF:</div>
                        <div>${vafTotal} (${(0.65 + 0.01 * vafTotal).toFixed(2)})</div>
                    </div>
                </div>
            </div>
            
            <div class="report-section">
                <h2>${langData.vafTitle}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>${langData.no}</th>
                            <th>${langData.vaf}</th>
                            <th>${langData.weight}</th>
                        </tr>
                    </thead>
                    <tbody>`;
        
        // Add VAF rows
        const vafKeys = [
            'vaf1', 'vaf2', 'vaf3', 'vaf4', 'vaf5', 'vaf6', 'vaf7',
            'vaf8', 'vaf9', 'vaf10', 'vaf11', 'vaf12', 'vaf13', 'vaf14'
        ];
        
        vafKeys.forEach((key, index) => {
            htmlContent += `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${langData[key]}</td>
                            <td>${parseInt(vafInputs[index].value)}</td>
                        </tr>`;
        });
        
        htmlContent += `
                        <tr>
                            <td colspan="2"><strong>${langData.total}</strong></td>
                            <td><strong>${vafTotal}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="report-section">
                <h2>${langData.functionDetails}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>${langData.no}</th>
                            <th>${langData.module}</th>
                            <th>${langData.functionName}</th>
                            <th>${langData.type}</th>
                            <th>${langData.det}</th>
                            <th>${langData.retFtr}</th>
                            <th>${langData.complexity}</th>
                            <th>${langData.fp}</th>
                            <th>${langData.fpAdjusted}</th>
                        </tr>
                    </thead>
                    <tbody>`;
        
        // Add function rows
        functions.forEach((func, index) => {
            const complexityText = getComplexityText(func.complexity);
            const complexityClass = `complexity-${func.complexity.toLowerCase()}`;
            
            htmlContent += `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${func.module}</td>
                            <td>${func.functionName}</td>
                            <td>${func.type}</td>
                            <td>${func.det}</td>
                            <td>${func.retFtr}</td>
                            <td class="${complexityClass}">${complexityText}</td>
                            <td>${func.fp}</td>
                            <td>${func.fpAdjusted || func.fp}</td>
                        </tr>`;
        });
        
        htmlContent += `
                    </tbody>
                </table>
            </div>
            
            <div class="report-section">
                <h2>${langData.legendFP}</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">FP:</div>
                        <div>${langData.legendFP}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">VAF:</div>
                        <div>${langData.legendVAF}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">DET:</div>
                        <div>${langData.legendDET}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">RET:</div>
                        <div>${langData.legendRET}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">FTR:</div>
                        <div>${langData.legendFTR}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">ILF:</div>
                        <div>${langData.legendILF}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">EIF:</div>
                        <div>${langData.legendEIF}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">EI:</div>
                        <div>${langData.legendEI}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">EO:</div>
                        <div>${langData.legendEO}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">EQ:</div>
                        <div>${langData.legendEQ}</div>
                    </div>
                </div>
            </div>
            
            <div class="report-footer">
                ${langData.reportGeneratedBy} - ${today}
            </div>
            
            <div class="no-print" style="margin-top: 20px; text-align: center;">
                <button onclick="window.print()" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">Print Report</button>
            </div>
        </body>
        </html>`;
        
        // Create a blob and download the HTML file
        const blob = new Blob([htmlContent], { type: 'text/html' });
        window.saveAs(blob, `${projectName.value || 'FPA'}_Report.html`);
    }
    
    // Save data to JSON file
    function saveDataToFile() {
        // Check if saveAs is available
        if (!checkLibrary(window.saveAs, 'FileSaver')) {
            return;
        }
        
        // Collect VAF values
        const vafValues = [];
        vafInputs.forEach(input => {
            vafValues.push(parseInt(input.value || 0));
        });
        
        // Collect project information
        const projectInfo = {
            projectName: projectName.value,
            projectCode: projectCode.value,
            clientName: clientName.value,
            analystName: analystName.value,
            analysisDate: analysisDate.value,
            projectDescription: projectDescription.value
        };
        
        // Create data object
        const data = {
            projectInfo,
            vafValues,
            functions,
            language: currentLanguage
        };
        
        // Convert to JSON and save
        const jsonData = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        window.saveAs(blob, `${projectName.value || 'FPA'}_Data.json`);
    }
    
    // Load data from JSON file
    function loadDataFromFile(file) {
        const reader = new FileReader();
        const langData = translations[currentLanguage];
        
        reader.onload = function(event) {
            try {
                const data = JSON.parse(event.target.result);
                
                // Validate data structure
                if (!data || typeof data !== 'object') {
                    throw new Error('Invalid JSON file structure');
                }

                // Validate project info
                if (data.projectInfo) {
                    if (typeof data.projectInfo !== 'object') {
                        throw new Error('Invalid project info format');
                    }
                    
                    if (!data.projectInfo.projectName || typeof data.projectInfo.projectName !== 'string') {
                        throw new Error('Invalid project name');
                    }
                    
                    projectName.value = data.projectInfo.projectName;
                    projectCode.value = data.projectInfo.projectCode || '';
                    clientName.value = data.projectInfo.clientName || '';
                    analystName.value = data.projectInfo.analystName || '';
                    analysisDate.value = data.projectInfo.analysisDate || '';
                    projectDescription.value = data.projectInfo.projectDescription || '';
                }
                
                // Validate language
                if (data.language) {
                    if (!['english', 'vietnamese'].includes(data.language)) {
                        throw new Error('Invalid language value');
                    }
                    languageSelector.value = data.language;
                    applyLanguage(data.language);
                }
                
                // Validate VAF values
                if (data.vafValues) {
                    if (!Array.isArray(data.vafValues) || data.vafValues.length !== vafInputs.length) {
                        throw new Error('Invalid VAF values array');
                    }
                    
                    if (!data.vafValues.every(value => Number.isInteger(value) && value >= 0 && value <= 5)) {
                        throw new Error('VAF values must be integers between 0 and 5');
                    }
                    
                    vafInputs.forEach((input, index) => {
                        input.value = data.vafValues[index];
                    });
                }
                
                // Validate functions
                if (data.functions) {
                    if (!Array.isArray(data.functions)) {
                        throw new Error('Invalid functions array');
                    }
                    
                    for (const func of data.functions) {
                        if (!func.module || !func.functionName || !func.type || 
                            !Number.isInteger(func.det) || !Number.isInteger(func.retFtr)) {
                            throw new Error('Invalid function data structure');
                        }
                        
                        if (!['ILF', 'EIF', 'EI', 'EO', 'EQ'].includes(func.type)) {
                            throw new Error('Invalid function type');
                        }
                        
                        if (func.det < 0 || func.retFtr < 0) {
                            throw new Error('DET and RET/FTR must be non-negative');
                        }
                    }
                    
                    functions = data.functions;
                    renderFunctionTable();
                }
                
                calculateFP();
                alert(langData.dataLoadedSuccess);
            } catch (error) {
                alert(langData.errorLoadingData + error.message);
            }
        };
        
        reader.readAsText(file);
    }
    
    // Event listeners
    vafInputs.forEach(input => {
        input.addEventListener('change', calculateFP);
    });
    
    addFunctionBtn.addEventListener('click', function() {
        document.getElementById('edit-index').value = -1;
        document.getElementById('function-form').reset();
        functionModal.style.display = 'block';
    });
    
    closeModalBtn.addEventListener('click', function() {
        functionModal.style.display = 'none';
    });
    
    cancelFunctionBtn.addEventListener('click', function() {
        functionModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === functionModal) {
            functionModal.style.display = 'none';
        }
    });
    
    exportExcelBtn.addEventListener('click', exportToExcel);
    exportPdfBtn.addEventListener('click', exportToPDF);
    exportHtmlBtn.addEventListener('click', exportToHTML);
    
    saveDataBtn.addEventListener('click', saveDataToFile);
    
    loadDataBtn.addEventListener('click', function() {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', function(event) {
        if (event.target.files.length > 0) {
            loadDataFromFile(event.target.files[0]);
            // Reset file input
            event.target.value = '';
        }
    });
    
    languageSelector.addEventListener('change', function() {
        applyLanguage(this.value);
    });
    
    functionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const editIndex = parseInt(document.getElementById('edit-index').value);
        const functionData = {
            module: document.getElementById('module').value,
            functionName: document.getElementById('function-name').value,
            description: document.getElementById('description').value,
            type: document.getElementById('type').value,
            det: parseInt(document.getElementById('det').value),
            retFtr: parseInt(document.getElementById('ret-ftr').value),
            remarks: document.getElementById('remarks').value
        };
        
        if (editIndex >= 0) {
            // Edit existing function
            const { complexity, fp } = calculateComplexity(
                functionData.type, 
                functionData.det, 
                functionData.retFtr
            );
            
            functions[editIndex] = {
                ...functionData,
                complexity,
                fp,
                fpAdjusted: fp
            };
        } else {
            // Add new function
            addFunction(functionData);
        }
        
        functionModal.style.display = 'none';
        renderFunctionTable();
    });
    
    
    
    // Initial calculation
    calculateFP();
    
    // Apply initial language
    applyLanguage(currentLanguage);
});
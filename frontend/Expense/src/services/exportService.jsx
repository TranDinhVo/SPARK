import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import * as XLSX from "xlsx";
import { formatDate } from "../helpers/formatDateTime";
import { formatCurrency } from "../helpers/formatCurrency";

// Hàm xuất PDF - chỉ xuất bảng dữ liệu giao dịch
export const exportToPdf = async (data, summary) => {
  const doc = new jsPDF('p', 'mm', 'a4');

  // Tiêu đề
  doc.setFontSize(20);
  doc.text("Báo Cáo Thống Kê Giao Dịch", 14, 22);
  doc.setFontSize(12);
  doc.text(`Ngày xuất: ${formatDate(new Date())}`, 14, 30);

  // Tóm tắt
  doc.setFontSize(14);
  doc.text("Tóm Tắt", 14, 45);
  const summaryText = `
    Tổng Thu Nhập: ${formatCurrency(summary.totalIncome)}
    Tổng Chi Tiêu: ${formatCurrency(summary.totalExpense)}
    Thu Nhập Ròng: ${formatCurrency(summary.netAmount)}
    Số Lượng Giao Dịch: ${summary.transactionCount}
  `;
  doc.setFontSize(12);
  doc.text(summaryText, 14, 52);

  // Bảng giao dịch
  const tableColumn = ["Ngày", "Mô tả", "Danh mục", "Loại", "Số tiền"];
  const tableRows = [];

  data.forEach(item => {
    const transactionData = [
      formatDate(new Date(item.createdAt)),
      item.description || "N/A",
      item.name || "N/A",
      item.type === 'Thu' ? "Thu nhập" : "Chi tiêu",
      formatCurrency(item.amount)
    ];
    tableRows.push(transactionData);
  });

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 80
  });

  doc.save("bao_cao_giao_dich.pdf");
};

// Hàm xuất Excel
export const exportToExcel = (data, summary) => {
  const summaryData = [
    ["Báo Cáo Thống Kê Giao Dịch"],
    [`Ngày xuất: ${formatDate(new Date())}`],
    [],
    ["Tóm Tắt"],
    ["Tổng Thu Nhập", formatCurrency(summary.totalIncome)],
    ["Tổng Chi Tiêu", formatCurrency(summary.totalExpense)],
    ["Thu Nhập Ròng", formatCurrency(summary.netAmount)],
    ["Số Lượng Giao Dịch", summary.transactionCount],
    [],
  ];

  const ws = XLSX.utils.aoa_to_sheet(summaryData);

  const header = ["Ngày", "Mô tả", "Danh mục", "Loại", "Số tiền"];
  const excelData = data.map(item => ({
    Ngày: formatDate(new Date(item.createdAt)),
    "Mô tả": item.description || "N/A",
    "Danh mục": item.name || "N/A",
    Loại: item.type === 'Thu' ? "Thu nhập" : "Chi tiêu",
    "Số tiền": item.amount
  }));

  XLSX.utils.sheet_add_json(ws, excelData, {
    header: header,
    origin: -1 // Bắt đầu ghi từ dòng cuối cùng
  });

  // Điều chỉnh độ rộng cột
  const colWidths = header.map(h => ({ wch: h.length + 30 }));
  ws["!cols"] = colWidths;
  
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "BaoCaoGiaoDich");

  XLSX.writeFile(wb, "bao_cao_giao_dich.xlsx");
}; 
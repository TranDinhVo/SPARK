export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return "0 VNĐ";

  if (amount >= 1_000_000_000) {
    const ty = (amount / 1_000_000_000).toFixed(1);
    return `${ty} tỷ VNĐ`;
  } else if (amount >= 1_000_000) {
    return amount.toLocaleString("vi-VN") + " VNĐ";
  } else {
    return amount.toLocaleString("vi-VN") + " đ";
  }
};

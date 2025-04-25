export const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  if (isNaN(date)) return ""; // Trường hợp ngày không hợp lệ

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const calculateNextDueDate = (currentDate, type) => {
  const date = new Date(currentDate);

  switch (type) {
    case "tuan":
      date.setDate(date.getDate() + 7);
      break;
    case "thang":
      date.setMonth(date.getMonth() + 1);
      break;
    case "nam":
      date.setFullYear(date.getFullYear() + 1);
      break;
    case "quy":
      date.setMonth(date.getMonth() + 3);
      break;
    default:
      return null;
  }

  return date;
};

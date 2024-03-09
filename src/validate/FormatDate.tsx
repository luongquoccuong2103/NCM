export const FormatDate = (date) => {
  const parts = date.split("-");
  const dateFormat = new Date(parts[2], parts[1] - 1, parts[0]);

  let day = dateFormat.getDate();
  let month = dateFormat.getMonth() + 1;
  let year = dateFormat.getFullYear();

  // Đảm bảo ngày và tháng luôn có 2 chữ số
  let formattedDay = day < 10 ? `0${day}` : day;
  let formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}-${formattedMonth}-${year}`;
};

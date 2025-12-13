export const formatVietnamDateHour = (timestamp) => {
  const date = new Date(timestamp);
  if (!timestamp || isNaN(date)) return "";
  return date.toLocaleString("vi-VN", { 
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit"
  });
};

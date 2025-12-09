export const formatVietnamTime = (timestamp) => {
  const date = new Date(timestamp);
  if (!timestamp || isNaN(date)) return "";
  return date.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
};

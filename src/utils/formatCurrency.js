export const formatCurrency = (value) => {
  if (!value) return "0 đ";
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(value);
};
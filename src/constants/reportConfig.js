export const STORE_REPORT_CONFIG = {
  overviewHeaders: [
    { label: "Tổng Khách", key: "kpis.total_visitors" },
    { label: "Doanh Thu", key: "kpis.total_revenue" },
    { label: "Đơn Hàng", key: "kpis.total_invoices" },
    { label: "TB Giỏ Hàng", key: "kpis.avg_basket_value" },
  ],
  zoneHeaders: [
    { label: "Khu Vực", key: "category_name" },
    { label: "TG Dừng (s)", key: "performance.avg_dwell_time" },
    { label: "Lượt Ghé", key: "performance.people_count" },
    { label: "Doanh Số", key: "performance.total_sales_value" },
  ],
  productHeaders: [
    { label: "Hạng", key: "rank" },
    { label: "Tên SP", key: "product_name", width: 30 },
    { label: "Số Lượng", key: "total_quantity" },
    { label: "Doanh Thu", key: "total_revenue" },
  ],
};

function KpiCard({ title, value, color }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-medium">{title}</h3>
      <p className={`text-2xl ${color}`}>{value}%</p>
    </div>
  );
}

export default KpiCard;

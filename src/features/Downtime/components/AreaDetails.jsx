// Hàm định dạng thời gian
const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "0s";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    let result = '';
    if (m > 0) result += `${m}m `;
    if (s > 0 || m === 0) result += `${s}s`;
    return result.trim();
};

const levelStyles = {
    Cao: { bg: 'bg-green-100', text: 'text-green-800', tagBg: 'bg-green-200' },
    TB: { bg: 'bg-yellow-100', text: 'text-yellow-800', tagBg: 'bg-yellow-200' },
    Thấp: { bg: 'bg-red-100', text: 'text-red-800', tagBg: 'bg-red-200' },
};

function AreaDetails({ data }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm h-full">
      <h2 className="text-lg font-semibold mb-4">Chi tiết theo khu vực</h2>
      <div className="space-y-3 overflow-y-auto">
        {data.map((item, index) => {
          const styles = levelStyles[item.level] || levelStyles.TB;
          return (
            <div key={index} className={`${styles.bg} ${styles.text} p-3 rounded-lg`}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{item.name}</h3>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${styles.tagBg}`}>
                  {item.level}
                </span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-2xl font-bold">{formatTime(item.time)}</p>
                </div>
                <div className="text-xs text-right text-gray-600">
                  <p>Số lượt dừng: <span className="font-semibold">{item.stops}</span></p>
                  <p>Tỷ lệ tương tác: <span className="font-semibold">{item.interactionRate}%</span></p>
                  <p>Thời gian tối đa: <span className="font-semibold">{formatTime(item.maxTime)}</span></p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AreaDetails;
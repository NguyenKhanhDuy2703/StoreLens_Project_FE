const icons = {
    green: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    red: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    blue: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
}

const colorStyles = {
    green: { bg: 'bg-green-100', text: 'text-green-800', changeText: 'text-green-600' },
    red: { bg: 'bg-red-100', text: 'text-red-800', changeText: 'text-red-600' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-800', changeText: 'text-green-600' }, // Thay đổi ở đây nếu cần
}

function KpiCard({ title, value, subtitle, change, changeType, color }) {
  const styles = colorStyles[color] || colorStyles.blue;

  return (
    <div className={`${styles.bg} ${styles.text} p-5 rounded-xl shadow-sm flex flex-col`}>
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-base">{title}</h3>
        {icons[color]}
      </div>
      <div className="mt-2">
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm font-medium">{subtitle}</p>
      </div>
      <div className="mt-auto pt-2">
         <p className={`text-sm ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
            {change}
        </p>
      </div>
    </div>
  );
}

export default KpiCard;
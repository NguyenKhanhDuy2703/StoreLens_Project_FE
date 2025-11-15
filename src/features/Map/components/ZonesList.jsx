const ZonesList = ({ zones = [] }) => {
  if (!zones || zones.length === 0) {
    return (
      <div className="py-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400">
            <path d="M12 2L2 7l10 5 10-5-10-5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="text-xs text-gray-500 font-medium">No zones yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-300px)]">
      {zones.map((zone) => (
        <div
          key={zone.zone_id}
          className="p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-400 transition-all"
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-4 h-4 rounded flex-shrink-0 border border-gray-200"
              style={{ backgroundColor: zone?.color }}
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-xs text-gray-900 truncate">{zone?.zone_name || 'Unnamed Zone'}</h3>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Category:</span>
              <span
                className="px-1.5 py-0.5 rounded text-xs font-medium"
                style={{
                  backgroundColor: zone?.color + '20',
                  color: zone?.color
                }}
              >
                {zone?.category_name}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Points:</span>
              <span className="text-gray-700 font-mono">{zone?.coordinates?.length || 0}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ZonesList;
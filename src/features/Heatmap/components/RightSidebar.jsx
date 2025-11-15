const RightSidebard = () => {
   const zoneData = 
       [
        {
        categoryName: "Khu vực 1",
        zodeId: "Z01",
        people_count: 120,
        avg_dwell_time: 15,
        geometry: {
            type: "Polygon",
            color: "rgba(128, 0, 128, 0.3)"
        }
       }
    ]
    return <>
     <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm" style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
            <h3 className="text-sm font-semibold text-gray-800 mb-4 sticky top-0 bg-white pb-2 z-10 border-b border-gray-100">
              Chi tiết khu vực
            </h3>
            
            <div className="space-y-3">
              {zoneData.map((zone, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-purple-400 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-gray-800 text-sm">{zone.categoryName}</div>
                      <div className="text-xs text-gray-500">{zone.zodeId}</div>
                    </div>
                    <div 
                      className="w-3 h-3 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: zone.geometry.color.replace('0.3', '1') }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white rounded p-2 border border-gray-200">
                      <div className="text-gray-500 mb-0.5">Lượt khách</div>
                      <div className="font-bold text-gray-800">{zone.people_count}</div>
                    </div>
                    <div className="bg-white rounded p-2 border border-gray-200">
                      <div className="text-gray-500 mb-0.5">TG ở lại</div>
                      <div className="font-bold text-gray-800">{zone.avg_dwell_time}m</div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-purple-400 h-1.5 rounded-full transition-all"
                        style={{ width: `${Math.min(100, (zone.people_count / 200) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
    
    </>
}
export default RightSidebard;
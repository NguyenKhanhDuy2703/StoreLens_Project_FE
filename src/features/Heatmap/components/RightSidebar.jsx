import { useSelector } from "react-redux";

const RightSidebar = () => {
  const zoneData = useSelector((state) => state.heatmap.metricHeatmapWithZone);

  const zoneColors = {
    Z01: "rgba(128, 0, 128, 0.8)",
    Z02: "rgba(59, 130, 246, 0.8)",
    Z03: "rgba(16, 185, 129, 0.8)",
    Z04: "rgba(245, 158, 11, 0.8)",
  };

  const calculateTotalPeople = (timeline) => {
    return timeline.reduce((sum, item) => sum + item.people_count, 0);
  };

  const calculateAvgDwellTime = (timeline) => {
    const avg =
      timeline.reduce((sum, item) => sum + item.people_count, 0) /
      timeline.length;
    return Math.round(avg);
  };

  const getLatestPeopleCount = (timeline) => {
    return timeline[timeline.length - 1]?.people_count || 0;
  };

  return (
    <div
      className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
      style={{ height: "calc(100vh - 120px)", overflowY: "auto" }}
    >
      <h3 className="text-sm font-semibold text-gray-800 mb-4 sticky top-0 bg-white pb-2 z-10 border-b border-gray-100">
        Chi tiết khu vực
      </h3>

      <div className="space-y-3">
        {zoneData.map((zone, idx) => {
          const totalPeople = calculateTotalPeople(zone.TraficFlowTimeline);
          const avgPeople = calculateAvgDwellTime(zone.TraficFlowTimeline);
          const latestCount = getLatestPeopleCount(zone.TraficFlowTimeline);
          return (
            <div
              key={idx}
              className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-purple-400 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold text-gray-800 text-sm">
                      {zone.categoryName}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {zone.zoneId} • {zone.cameraCode}
                  </div>
                </div>
                <div
                  className="w-3 h-3 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                  style={{
                    backgroundColor:
                      zoneColors[zone.zoneId] || "rgba(128, 0, 128, 0.8)",
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                <div className="bg-white rounded p-2 border border-gray-200">
                  <div className="text-gray-500 mb-0.5">Hiện tại</div>
                  <div className={`font-bold `}>{latestCount} người</div>
                </div>
                <div className="bg-white rounded p-2 border border-gray-200">
                  <div className="text-gray-500 mb-0.5">TB/giờ</div>
                  <div className="font-bold text-gray-800">{avgPeople}</div>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, (totalPeople / 200) * 100)}%`,
                    backgroundColor:
                      zoneColors[zone.zoneId] || "rgba(128, 0, 128, 0.8)",
                  }}
                />
              </div>
              <div className="text-xs text-gray-500 text-right mt-1">
                Tổng: {totalPeople} lượt
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RightSidebar;

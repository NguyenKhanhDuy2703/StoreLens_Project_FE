import { Users, Clock, Activity } from "lucide-react";

const StatusBar = ({customerCurrent , checkoutLength , peakHours}) => (
  <div className="w-full px-4 py-4">
    <div className="flex gap-4 overflow-x-auto">
      <div className="min-w-[320px] flex-1 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 p-5 text-white shadow-lg">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-white/20 p-2.5 backdrop-blur-sm">
            <Users className="h-6 w-6" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium opacity-90 uppercase tracking-wide">
              Khách hàng trong cửa hàng
            </p>
            <p className="mt-1 text-3xl font-bold">{`${customerCurrent}`}</p>
            <p className="mt-1.5 text-xs opacity-75 flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              Theo dõi thời gian thực
            </p>
          </div>
        </div>
      </div>

      <div className="min-w-[320px] flex-1 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-700 p-5 text-white shadow-lg">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-white/20 p-2.5 backdrop-blur-sm">
            <Activity className="h-6 w-6" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium opacity-90 uppercase tracking-wide">
              Độ dài hàng chờ
            </p>
            <p className="mt-1 text-3xl font-bold">{`${checkoutLength}`}</p>
            <p className="mt-1.5 text-xs opacity-75">
              Thời gian chờ TB: 4 phút
            </p>
          </div>
        </div>
      </div>

      <div className="min-w-[320px] flex-1 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-700 p-5 text-white shadow-lg">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-white/20 p-2.5 backdrop-blur-sm">
            <Clock className="h-6 w-6" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium opacity-90 uppercase tracking-wide">
              Dự báo giờ cao điểm
            </p>
            <p className="mt-1 text-3xl font-bold">{`${peakHours} giờ ` }</p>
            <p className="mt-1.5 text-xs opacity-75">
              Công suất: 85%
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default StatusBar;
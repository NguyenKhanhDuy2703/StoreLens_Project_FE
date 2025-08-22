import { Video } from "lucide-react";


function StatusDot({ ok = true }) {
    return (
    <span className={`inline-block w-2 h-2 rounded-full ${ok ? "bg-emerald-500" : "bg-red-500"}`} />
    );
}


export default function CameraItem({ item, onClick }) {
    const active = item.active;
    return (
        <button
        onClick={onClick}
        className={`w-full text-left rounded-xl border transition-all ${
        active ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
        } p-3 hover:border-blue-300 mb-3 shadow-sm`}
        >
        <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${active ? "bg-blue-600" : "bg-gray-200"}`}>
                <Video className={`w-5 h-5 ${active ? "text-white" : "text-gray-600"}`} />
            </div>
            <div className="flex-1 min-w-0">
            <div className={`font-medium ${active ? "text-blue-700" : "text-gray-800"}`}>{item.name}</div>
            <div className="text-xs text-gray-500 truncate">Khu vực: {item.area}</div>
            <div className="flex items-center gap-1 text-xs mt-1">
                <StatusDot ok />
                    <span className="text-emerald-600">{item.status}</span>
            </div>
            </div>
            </div>
        </button>
    );
}

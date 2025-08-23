const HANDLE_SIZE = 10;


export default function ROIBox({ roi, onMouseDownROI }) {
    return (
    <div
        className="absolute border-2 border-blue-400 bg-blue-500/10 rounded-lg shadow-[0_0_0_2px_rgba(59,130,246,0.25)_inset]"
        style={{ left: `${roi.x}%`, top: `${roi.y}%`, width: `${roi.w}%`, height: `${roi.h}%` }}
        onMouseDown={(e) => onMouseDownROI(e, "move")}
    >
    
    <div className="absolute -top-7 left-0 text-white/80 text-xs select-none">{roi.sub}</div>


    
    <div className="absolute left-1/2 -translate-x-1/2 top-2 px-2 py-1 text-xs rounded bg-blue-100 text-blue-700 font-semibold">
        {roi.label}
    </div>


   
    <div
        onMouseDown={(e) => onMouseDownROI(e, "se")}
        className="absolute"
        style={{ right: -HANDLE_SIZE / 2, bottom: -HANDLE_SIZE / 2, width: HANDLE_SIZE, height: HANDLE_SIZE }}
    >
        <div className="w-full h-full rounded-full bg-blue-500 border-2 border-white shadow" />
        </div>
    </div>
    );
}
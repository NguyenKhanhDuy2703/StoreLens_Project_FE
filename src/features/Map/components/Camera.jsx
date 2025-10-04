import React from "react";
import { Trash2, RotateCw } from "lucide-react";
import CCTV_ICON from "../assets/cctv.png";


const Camera = ({ c, scale, handleMouseDown, rotateItem, removeCamera }) => {
  return (
    <div
      className="absolute w-8 h-8 cursor-move flex items-center justify-center group"
      style={{ left: c.x, top: c.y, transform: `rotate(${c.rotation}deg)` }}
      onMouseDown={(e) => handleMouseDown(e, c)}
    >
      <img src={CCTV_ICON} alt="CCTV" className="w-8 h-8" />

      {/* Tooltip */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-700 bg-white border rounded px-1 shadow opacity-0 group-hover:opacity-100 transition">
        {`(${(c.x / scale).toFixed(1)}m, ${(c.y / scale).toFixed(1)}m)`}
      </div>

      {/* Toolbar */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={(e) => {
            e.stopPropagation();
            rotateItem(c.id, "camera");
          }}
          className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center hover:bg-purple-600"
        >
          <RotateCw size={10} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeCamera(c.id);
          }}
          className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
        >
          <Trash2 size={10} />
        </button>
      </div>
    </div>
  );
};

export default Camera;

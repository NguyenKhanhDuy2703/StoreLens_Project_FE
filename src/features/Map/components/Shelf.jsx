import React from "react";
import { Trash2, RotateCw } from "lucide-react";

const Shelf = ({
  shelf,
  scale,
  editingShelf,
  setEditingShelf,
  shelves,
  setShelves,
  handleMouseDown,
  handleResizeMouseDown,
  rotateItem,
  removeShelf,
}) => {
  return (
    <div
      className="absolute bg-purple-100 border-2 border-purple-500 cursor-move group rounded"
      style={{
        left: shelf.x,
        top: shelf.y,
        width: shelf.width,
        height: shelf.height,
        transform: `rotate(${shelf.rotation}deg)`,
      }}
      onMouseDown={(e) => handleMouseDown(e, shelf)}
    >
      {/* Editable name */}
      {editingShelf === shelf.id ? (
        <input
          autoFocus
          type="text"
          defaultValue={shelf.name}
          className="text-xs w-full text-center border rounded"
          onBlur={(e) => {
            setShelves(
              shelves.map((s) =>
                s.id === shelf.id ? { ...s, name: e.target.value } : s
              )
            );
            setEditingShelf(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.target.blur();
          }}
        />
      ) : (
        <span
          className="text-xs block text-center text-gray-700 cursor-text"
          onDoubleClick={() => setEditingShelf(shelf.id)}
        >
          {shelf.name}
        </span>
      )}

      {/* Resize handles */}
      {[
        "top",
        "right",
        "bottom",
        "left",
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
      ].map((dir) => (
        <div
          key={dir}
          onMouseDown={(e) => handleResizeMouseDown(e, shelf, dir)}
          className="absolute w-2 h-2 bg-purple-700"
          style={{
            cursor: `${dir}-resize`,
            ...(dir.includes("top") ? { top: -1 } : {}),
            ...(dir.includes("bottom") ? { bottom: -1 } : {}),
            ...(dir.includes("left") ? { left: -1 } : {}),
            ...(dir.includes("right") ? { right: -1 } : {}),
            ...(dir === "top-left" ? { top: -2, left: -2 } : {}),
            ...(dir === "top-right" ? { top: -2, right: -2 } : {}),
            ...(dir === "bottom-left" ? { bottom: -2, left: -2 } : {}),
            ...(dir === "bottom-right" ? { bottom: -2, right: -2 } : {}),
          }}
        />
      ))}

      {/* Info tooltip */}
      <div className="absolute -bottom-6 left-0 text-[10px] text-gray-700 bg-white border rounded px-1 shadow opacity-0 group-hover:opacity-100 transition">
        {`(${(shelf.x / scale).toFixed(1)}m, ${(shelf.y / scale).toFixed(
          1
        )}m) - ${(shelf.width / scale).toFixed(1)}m x ${(
          shelf.height / scale
        ).toFixed(1)}m`}
      </div>

      {/* Toolbar */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={(e) => {
            e.stopPropagation();
            rotateItem(shelf.id, "shelf");
          }}
          className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center hover:bg-purple-600"
        >
          <RotateCw size={10} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeShelf(shelf.id);
          }}
          className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
        >
          <Trash2 size={10} />
        </button>
      </div>
    </div>
  );
};

export default Shelf;

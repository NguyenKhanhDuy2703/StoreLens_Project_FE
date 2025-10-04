import React, { useState, useRef } from "react";
import Sidebar from "./components/Sidebar";
import Shelf from "./components/Shelf";
import Camera from "./components/Camera";

const Map = () => {
  const [shelves, setShelves] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizingShelf, setResizingShelf] = useState(null);
  const [editingShelf, setEditingShelf] = useState(null);
  const [resizeDir, setResizeDir] = useState(null);

  const [shelfW, setShelfW] = useState(2);
  const [shelfH, setShelfH] = useState(1);
  const canvasRef = useRef(null);

  const scale = 50; // 1m = 50px

  // === Add item ===
  const addShelf = () => {
    const newShelf = {
      id: Date.now(),
      x: 100,
      y: 100,
      width: shelfW * scale,
      height: shelfH * scale,
      rotation: 0,
      name: `Kệ ${shelves.length + 1}`,
      type: "shelf",
    };
    setShelves([...shelves, newShelf]);
  };

  const addCamera = () => {
    const newCamera = {
      id: Date.now(),
      x: 50,
      y: 50,
      rotation: 0,
      type: "camera",
    };
    setCameras([...cameras, newCamera]);
  };

  const removeShelf = (id) => setShelves(shelves.filter((s) => s.id !== id));
  const removeCamera = (id) => setCameras(cameras.filter((c) => c.id !== id));
  const resetLayout = () => {
    setShelves([]);
    setCameras([]);
  };

  const rotateItem = (id, type) => {
    if (type === "shelf") {
      setShelves(
        shelves.map((shelf) =>
          shelf.id === id
            ? { ...shelf, rotation: (shelf.rotation + 90) % 360 }
            : shelf
        )
      );
    } else {
      setCameras(
        cameras.map((c) =>
          c.id === id ? { ...c, rotation: (c.rotation + 45) % 360 } : c
        )
      );
    }
  };

  // === Drag & Resize ===
  const handleMouseDown = (e, item) => {
    if (resizingShelf) return;
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    setDraggedItem(item);
    setDragOffset({
      x: e.clientX - rect.left - item.x,
      y: e.clientY - rect.top - item.y,
    });
  };

  const handleResizeMouseDown = (e, shelf, dir) => {
    e.stopPropagation();
    const rect = canvasRef.current.getBoundingClientRect();
    setResizingShelf(shelf);
    setResizeDir(dir);
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Dragging
    if (draggedItem) {
      const newX = mouseX - dragOffset.x;
      const newY = mouseY - dragOffset.y;

      if (draggedItem.type === "shelf") {
        setShelves(
          shelves.map((s) =>
            s.id === draggedItem.id ? { ...s, x: newX, y: newY } : s
          )
        );
      } else {
        setCameras(
          cameras.map((c) =>
            c.id === draggedItem.id ? { ...c, x: newX, y: newY } : c
          )
        );
      }
    }

    // Resizing
    if (resizingShelf) {
      const dx = mouseX - dragOffset.x;
      const dy = mouseY - dragOffset.y;

      setShelves(
        shelves.map((s) => {
          if (s.id !== resizingShelf.id) return s;
          let { x, y, width, height } = s;

          if (resizeDir.includes("right")) width = Math.max(20, s.width + dx);
          if (resizeDir.includes("bottom")) height = Math.max(20, s.height + dy);
          if (resizeDir.includes("left")) {
            const newWidth = Math.max(20, s.width - dx);
            x += dx;
            width = newWidth;
          }
          if (resizeDir.includes("top")) {
            const newHeight = Math.max(20, s.height - dy);
            y += dy;
            height = newHeight;
          }

          return { ...s, x, y, width, height };
        })
      );
      setDragOffset({ x: mouseX, y: mouseY });
    }
  };

  const handleMouseUp = () => {
    setDraggedItem(null);
    setResizingShelf(null);
    setResizeDir(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto flex gap-6">
        {/* Sidebar */}
        <Sidebar
          shelfW={shelfW}
          setShelfW={setShelfW}
          shelfH={shelfH}
          setShelfH={setShelfH}
          addShelf={addShelf}
          addCamera={addCamera}
          resetLayout={resetLayout}
        />

        {/* Map Area */}
        <div
          ref={canvasRef}
          className="relative flex-1 border-2 border-gray-300 overflow-scroll bg-white"
          style={{ width: "100%", height: "80vh" }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Grid */}
          <div
            className="absolute"
            style={{
              width: "5000px",
              height: "5000px",
              backgroundSize: `${scale}px ${scale}px`,
              backgroundImage:
                "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
            }}
          />

          {/* Shelves */}
          {shelves.map((shelf) => (
            <Shelf
              key={shelf.id}
              shelf={shelf}
              scale={scale}
              editingShelf={editingShelf}
              setEditingShelf={setEditingShelf}
              shelves={shelves}
              setShelves={setShelves}
              handleMouseDown={handleMouseDown}
              handleResizeMouseDown={handleResizeMouseDown}
              rotateItem={rotateItem}
              removeShelf={removeShelf}
            />
          ))}

          {/* Cameras */}
          {cameras.map((c) => (
            <Camera
              key={c.id}
              c={c}
              scale={scale}
              handleMouseDown={handleMouseDown}
              rotateItem={rotateItem}
              removeCamera={removeCamera}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Map;

import { useState } from "react";
import useImage from "use-image";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  ZoomIn,
  ZoomOut,
  Info,
} from "lucide-react";
import { Stage, Layer, Rect, Group, Text, Image } from "react-konva";
const HeatmapVisualization = () => {
  const [zoom, setZoom] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);

  const totalFrames = 13;
  const currentHour = 9 + currentFrame;
  const startHour = 9;
  const endHour = 21;
  // --- Hiển thị hình ảnh camera ---
  const KonvaImage = ({ src, height, width }) => {
    const cleanSrc = src?.split("\n")[0].trim();
    const [image] = useImage(cleanSrc, "anonymous");
    if (!image) return <Text text="Loading image..." fill="red" />;
    return <Image image={image} width={width} height={height} />;
  };

  return (
    <div className="w-full h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm h-full flex flex-col">
        {/* Header */}
        <div className="mb-3 pb-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Camera C01</h2>
                <p className="text-sm text-gray-500">
                  STORE001 • {currentHour.toString().padStart(2, "0")}:00:00
                  20/11/2025
                </p>
              </div>

              <div className="h-10 w-px bg-gray-300" />

              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-gray-500">Matrix:</span>
                  <span className="ml-1 font-semibold text-gray-800">
                    48 × 27
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Grid:</span>
                  <span className="ml-1 font-semibold text-gray-800">40px</span>
                </div>
                <div>
                  <span className="text-gray-500">Frame:</span>
                  <span className="ml-1 font-semibold text-gray-800">
                    1920 × 1080
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-200">
              <Info size={16} className="text-blue-600" />
              <span className="text-xs text-blue-700 font-semibold">
                Giờ {currentHour}:00 • Frame {currentFrame + 1}/{totalFrames}
              </span>
            </div>
          </div>
        </div>

        {/* Canvas Area - Placeholder */}
        <div className="flex-1 overflow-auto rounded-lg bg-gray-900 border border-gray-200 mb-3 flex items-center justify-center">
          <Stage width={1280 * zoom} height={720 * zoom} scaleX={zoom} scaleY={zoom}>
            <Layer>
              <KonvaImage src="https://res.cloudinary.com/dospk2dnl/image/upload/v1764489663/Screenshot_2025-11-29_203644_pgeltu.png" width={1280} height={720} />
            </Layer>
          </Stage>
        </div>

        {/* Color Legend */}
        <div className="mb-3 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-600">Mật độ:</span>
            <div
              className="flex-1 h-3 rounded-full overflow-hidden shadow-inner"
              style={{
                background:
                  "linear-gradient(to right, rgb(0,0,255), rgb(0,255,255), rgb(0,255,0), rgb(255,255,0), rgb(255,0,0))",
              }}
            />
            <div className="flex gap-4 text-xs text-gray-600">
              <span>Thấp (-2)</span>
              <span>Cao (64)</span>
            </div>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentFrame(Math.max(0, currentFrame - 1))}
              className="p-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg transition disabled:opacity-50"
              title="Previous Frame"
              disabled={currentFrame === 0}
            >
              <SkipBack size={18} className="text-gray-700" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 bg-purple-600 hover:bg-purple-700 rounded-lg transition shadow-sm"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause size={20} className="text-white" />
              ) : (
                <Play size={20} className="text-white" />
              )}
            </button>

            <button
              onClick={() =>
                setCurrentFrame(Math.min(totalFrames - 1, currentFrame + 1))
              }
              className="p-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg transition disabled:opacity-50"
              title="Next Frame"
              disabled={currentFrame === totalFrames - 1}
            >
              <SkipForward size={18} className="text-gray-700" />
            </button>

            {/* Timeline */}
            <div className="flex-1 flex items-center gap-2">
              <span className="text-xs text-gray-600 font-semibold whitespace-nowrap bg-gray-100 px-2 py-1 rounded">
                {startHour}:00
              </span>
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="0"
                  max={totalFrames - 1}
                  value={currentFrame}
                  onChange={(e) => setCurrentFrame(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  style={{
                    background: `linear-gradient(to right, #9333ea 0%, #9333ea ${
                      (currentFrame / (totalFrames - 1)) * 100
                    }%, #e5e7eb ${
                      (currentFrame / (totalFrames - 1)) * 100
                    }%, #e5e7eb 100%)`,
                  }}
                />
                {/* Hiển thị giờ hiện tại */}
                <div
                  className="absolute -top-8 bg-purple-600 text-white px-2 py-1 rounded text-xs font-bold shadow-lg"
                  style={{
                    left: `${(currentFrame / (totalFrames - 1)) * 100}%`,
                    transform: "translateX(-50%)",
                  }}
                >
                  {currentHour}:00
                </div>
                {/* Các markers cho mỗi giờ */}
                <div className="absolute top-3 left-0 right-0 flex justify-between px-1">
                  {Array.from({ length: totalFrames }).map((_, idx) => (
                    <div
                      key={idx}
                      className="w-0.5 h-2 bg-gray-400"
                      style={{ opacity: idx % 2 === 0 ? 1 : 0.5 }}
                    />
                  ))}
                </div>
              </div>
              <span className="text-xs text-gray-600 font-semibold whitespace-nowrap bg-gray-100 px-2 py-1 rounded">
                {endHour}:00
              </span>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-2 ml-3 border-l border-gray-300 pl-3">
              <button
                onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
                className="p-1.5 bg-white hover:bg-gray-100 rounded border border-gray-300 transition disabled:opacity-50"
                disabled={zoom <= 0.5}
                title="Zoom Out"
              >
                <ZoomOut size={16} className="text-gray-700" />
              </button>
              <span className="text-xs text-gray-600 w-12 text-center font-mono">
                {(zoom * 100).toFixed(0)}%
              </span>
              <button
                onClick={() => setZoom(Math.min(3, zoom + 0.25))}
                className="p-1.5 bg-white hover:bg-gray-100 rounded border border-gray-300 transition disabled:opacity-50"
                disabled={zoom >= 3}
                title="Zoom In"
              >
                <ZoomIn size={16} className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatmapVisualization;

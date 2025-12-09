import { useState, useRef, use, useEffect } from "react";
import { Stage, Layer, Rect, Group } from "react-konva";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  ZoomIn,
  ZoomOut,
  Info,
  Loader,
} from "lucide-react";
import {
  CameraImage,
  DrawingPoints,
  GridLines,
  HeatmapGrid,
  ZoneShape,
} from "./CanvaHeatmap";
import { useSelector } from "react-redux";
import Loading from "../../../components/common/Loading";
const HeatmapCanvas = ({
  infoHeatmapMatrix,
  storeId,
  cameraCode,
  isLoading,
}) => {
  const [zoom, setZoom] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const containerRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 1280, height: 720 });
  const statusCurrent = useSelector((state) => state.heatmap.statusCurrent);
  const { grid, zone, opacity } = statusCurrent;
  
  const totalFrames = 13;
  const currentHour = 9 + currentFrame;

  const scaleX = 1;
  const scaleY = 1;
  
  if (isLoading && infoHeatmapMatrix.length === 0) {
    return (
      <Loading isLoading={true}  />
    );
  }
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-base font-bold text-gray-800">
                Camera {cameraCode}
              </h2>
              <p className="text-xs text-gray-500">
                {storeId} • {currentHour.toString().padStart(2, "0")}:00:00
                20/11/2025
              </p>
            </div>
            <div className="h-8 w-px bg-gray-300" />
            <div className="flex gap-4 text-xs">
              <div>
                <span className="text-gray-500">Matrix:</span>
                <span className="ml-1 font-semibold text-gray-800">
                  {infoHeatmapMatrix[0]?.heatmapMatrix[0]?.length || 0} ×{" "}
                  {infoHeatmapMatrix[0]?.heatmapMatrix?.length || 0}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Grid:</span>
                <span className="ml-1 font-semibold text-gray-800">
                  {infoHeatmapMatrix[0]?.gridSize}px
                </span>
              </div>
              <div>
                <span className="text-gray-500">Frame:</span>
                <span className="ml-1 font-semibold text-gray-800">
                  {infoHeatmapMatrix[0]?.frameWidth} ×{" "}
                  {infoHeatmapMatrix[0]?.frameHeight}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Canvas Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-hidden bg-gray-900 flex items-center justify-center p-4"
      >
        <Stage
          width={infoHeatmapMatrix[0]?.frameWidth * zoom}
          height={infoHeatmapMatrix[0]?.frameHeight * zoom}
          scaleX={zoom}
          scaleY={zoom}
        >
          <Layer>
            <Rect
              x={0}
              y={0}
              width={canvasSize.width}
              height={canvasSize.height}
              fill="#1a1a1a"
            />
            <CameraImage
              src={infoHeatmapMatrix[0]?.backgroundImage}
              width={infoHeatmapMatrix[0]?.frameWidth}
              height={infoHeatmapMatrix[0]?.frameHeight}
            />
            <Group scaleX={scaleX} scaleY={scaleY}>
              <HeatmapGrid
                matrix={infoHeatmapMatrix[0]?.heatmapMatrix}
                gridSize={infoHeatmapMatrix[0]?.gridSize}
                frameWidth={infoHeatmapMatrix[0]?.frameWidth}
                frameHeight={infoHeatmapMatrix[0]?.frameHeight}
                opacity={opacity }
              />
              {zone && (
                <>   
                  {infoHeatmapMatrix[0]?.zones.map((z, idx) => (
                    <>
                    <ZoneShape zone={z} />
                    <DrawingPoints key={idx} points={z.coordinates} /> 
                    </>
                  ))}
                </>
              )}
              {grid && (
                <GridLines
                  gridSize={infoHeatmapMatrix[0]?.gridSize}
                  frameWidth={infoHeatmapMatrix[0]?.frameWidth}
                  frameHeight={infoHeatmapMatrix[0]?.frameHeight}
                />
              )}
              <Rect
                x={0}
                y={0}
                width={infoHeatmapMatrix[0]?.frameWidth}
                height={infoHeatmapMatrix[0]?.frameHeight}
                fill={"black"}
                opacity={0.4}
              />
            </Group>
          </Layer>
        </Stage>
      </div>
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-gray-600">Mật độ:</span>
          <div
            className="flex-1 h-2.5 rounded-full overflow-hidden shadow-inner"
            style={{
              background:
                "linear-gradient(to right, rgb(0,0,255), rgb(0,255,255), rgb(0,255,0), rgb(255,255,0), rgb(255,0,0))",
            }}
          />
          <div className="flex gap-4 text-xs text-gray-600">
            <span>Thấp</span>
            <span>Cao</span>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentFrame(Math.max(0, currentFrame - 1))}
            className="p-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg transition disabled:opacity-50"
            disabled={currentFrame === 0}
          >
            <SkipBack size={16} className="text-gray-700" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition shadow-sm"
          >
            {isPlaying ? (
              <Pause size={18} className="text-white" />
            ) : (
              <Play size={18} className="text-white" />
            )}
          </button>
          <button
            onClick={() =>
              setCurrentFrame(Math.min(totalFrames - 1, currentFrame + 1))
            }
            className="p-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg transition disabled:opacity-50"
            disabled={currentFrame === totalFrames - 1}
          >
            <SkipForward size={16} className="text-gray-700" />
          </button>
          <div className="flex-1 flex items-center gap-2">
            <span className="text-xs text-gray-600 font-semibold whitespace-nowrap bg-gray-100 px-2 py-1 rounded">
              09:00
            </span>
            <div className="flex-1 relative">
              <input
                type="range"
                min="0"
                max={totalFrames - 1}
                value={currentFrame}
                onChange={(e) => setCurrentFrame(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #9333ea 0%, #9333ea ${
                    (currentFrame / (totalFrames - 1)) * 100
                  }%, #e5e7eb ${
                    (currentFrame / (totalFrames - 1)) * 100
                  }%, #e5e7eb 100%)`,
                }}
              />
              <div
                className="absolute -top-7 bg-purple-600 text-white px-2 py-0.5 rounded text-xs font-bold shadow-lg"
                style={{
                  left: `${(currentFrame / (totalFrames - 1)) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {currentHour}:00
              </div>
            </div>
            <span className="text-xs text-gray-600 font-semibold whitespace-nowrap bg-gray-100 px-2 py-1 rounded">
              21:00
            </span>
          </div>
          {/* Zoom Controls */}
          <div className="flex items-center gap-2 ml-3 border-l border-gray-300 pl-3">
            <button
              onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
              className="p-1.5 bg-white hover:bg-gray-100 rounded border border-gray-300 transition disabled:opacity-50"
              disabled={zoom <= 0.5}
            >
              <ZoomOut size={14} className="text-gray-700" />
            </button>
            <span className="text-xs text-gray-600 w-12 text-center font-mono">
              {(zoom * 100).toFixed(0)}%
            </span>
            <button
              onClick={() => setZoom(Math.min(3, zoom + 0.25))}
              className="p-1.5 bg-white hover:bg-gray-100 rounded border border-gray-300 transition disabled:opacity-50"
              disabled={zoom >= 3}
            >
              <ZoomIn size={14} className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatmapCanvas;

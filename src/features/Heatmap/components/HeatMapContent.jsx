import { useState, useRef, useEffect, use } from "react";
import { Layer, Rect, Group, Stage } from "react-konva";
import { SkipBack, SkipForward, ZoomIn, ZoomOut } from "lucide-react";
import {
  CameraImage,
  DrawingPoints,
  GridLines,
  HeatmapGrid,
  ZoneShape,
} from "./CanvaHeatmap";
import Loading from "../../../components/common/Loading";
import { setCurrentHeatmap } from "../HeatmapSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatVietnamDateHour } from "../../../utils/formatVietNam";
const HeatmapCanvas = ({ storeId, cameraCode, isLoading, timeLine }) => {
  const [zoom, setZoom] = useState(1);
  const [currentFrame, setCurrentFrame] = useState(0);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1280, height: 720 });
  const statusCurrent = useSelector((state) => state.heatmap.statusCurrent);

  let totalFrames = 0;
  const { grid, zone, opacity } = statusCurrent;

  const currentHour = 9 + currentFrame;

  if (timeLine.length != 0) {
    totalFrames = timeLine.length;
  }
  const dispatch = useDispatch();
  const { currentHeatmap, startTimeLine, endTimeLine } = useSelector(
    (state) => state.heatmap
  );

  const onChangeFrame = (value) => {
    dispatch(setCurrentHeatmap(timeLine[value]));
    setCurrentFrame(value);
  };

  const frameWidth = currentHeatmap[0]?.frameWidth || 634;
  const frameHeight = currentHeatmap[0]?.frameHeight || 360;
  console.log(currentHeatmap);
  // Tính toán kích thước canvas để fit vào container
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current && currentHeatmap.length > 0) {
        const container = containerRef.current;
        const containerWidth = container.clientWidth - 32; // trừ padding
        const containerHeight = container.clientHeight - 32;

        // Tính tỷ lệ để fit vào container
        const scaleX = containerWidth / frameWidth;
        const scaleY = containerHeight / frameHeight;
        const scale = Math.min(scaleX, scaleY, 1); // không zoom lớn hơn 100%

        setDimensions({
          width: frameWidth,
          height: frameHeight,
        });
      }
    };
    setCurrentFrame(
      timeLine.filter((item) => item === currentHeatmap[0]?.timeStamp)[0]
    );

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [frameWidth, frameHeight, currentHeatmap.length]);

  if (isLoading) {
    return <Loading isLoading={true} />;
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
                  {currentHeatmap[0]?.heatmapMatrix[0]?.length || 0} ×{" "}
                  {currentHeatmap[0]?.heatmapMatrix?.length || 0}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Grid:</span>
                <span className="ml-1 font-semibold text-gray-800">
                  {currentHeatmap[0]?.gridSize}px
                </span>
              </div>
              <div>
                <span className="text-gray-500">Frame:</span>
                <span className="ml-1 font-semibold text-gray-800">
                  {frameWidth} × {frameHeight}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      {currentHeatmap.length > 0 ? (
        <div
          ref={containerRef}
          className="flex-1 overflow-hidden bg-gray-900 flex items-center justify-center p-4"
        >
          <Stage
            width={dimensions.width}
            height={dimensions.height}
            scaleX={zoom}
            scaleY={zoom}
          >
            <Layer>
              <Rect
                x={0}
                y={0}
                width={frameWidth}
                height={frameHeight}
                fill="#1a1a1a"
              />
              <CameraImage
                src={currentHeatmap[0]?.backgroundImage}
                width={frameWidth}
                height={frameHeight}
              />
              <HeatmapGrid
                matrix={currentHeatmap[0]?.heatmapMatrix}
                gridSize={currentHeatmap[0]?.gridSize}
                frameWidth={frameWidth}
                frameHeight={frameHeight}
                opacity={opacity}
              />
              {zone && (
                <>
                  {currentHeatmap[0]?.zones.map((z, idx) => (
                    <Group key={idx}>
                      <ZoneShape zone={z} />
                      <DrawingPoints points={z.coordinates} />
                    </Group>
                  ))}
                </>
              )}
              {grid && (
                <GridLines
                  gridSize={currentHeatmap[0]?.gridSize}
                  frameWidth={frameWidth}
                  frameHeight={frameHeight}
                />
              )}
              <Rect
                x={0}
                y={0}
                width={frameWidth}
                height={frameHeight}
                fill={"black"}
                opacity={0.4}
              />
            </Layer>
          </Stage>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-2xl font-medium text-gray-600 text-center p-6">
            Bản đồ nhiệt chưa được phân tích cho ngày hôm nay
          </div>
        </div>
      )}

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
            onClick={() => onChangeFrame(currentFrame - 1)}
            className="p-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg transition disabled:opacity-50"
            disabled={currentFrame === 0}
          >
            <SkipBack size={16} className="text-gray-700" />
          </button>

          <button
            onClick={() => onChangeFrame(currentFrame + 1)}
            className="p-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg transition disabled:opacity-50"
            disabled={currentFrame === totalFrames - 1}
          >
            <SkipForward size={16} className="text-gray-700" />
          </button>

          <div className="flex-1 flex items-center gap-2">
            <span className="text-xs text-gray-600 font-semibold whitespace-nowrap bg-gray-100 px-2 py-1 rounded">
              {startTimeLine}
            </span>

            <div className="flex-1 relative">
              <input
                type="range"
                min={0}
                max={timeLine.length - 1}
                value={currentFrame}
                step={1}
                onChange={(e) => {
                  onChangeFrame(Number(e.target.value));
                }}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #9333ea 0%, #9333ea ${
                    (currentFrame / (timeLine.length - 1)) * 100
                  }%, #e5e7eb ${
                    (currentFrame / (timeLine.length - 1)) * 100
                  }%, #e5e7eb 100%)`,
                }}
              />

              <div className="flex justify-between text-xs mt-1">
                {timeLine.map((_, i) => {
                  const seconds = i * 15; // convert frame → 15s
                  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
                  const s = String(seconds % 60).padStart(2, "0");
                  return (
                    <span key={i} className="text-gray-500">
                      {m}:{s}
                    </span>
                  );
                })}
              </div>

              {/* <div
                className="absolute -top-7 bg-purple-600 text-white px-2 py-0.5 rounded text-xs font-bold shadow-lg"
                style={{
                  left: `${(currentFrame / (timeLine.length - 1)) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {timeLine[currentFrame] < 10
                  ? `0${timeLine[currentFrame]}`
                  : timeLine[currentFrame]}
                :00
              </div> */}
            </div>

            <span className="text-xs text-gray-600 font-semibold whitespace-nowrap bg-gray-100 px-2 py-1 rounded">
              {endTimeLine}
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

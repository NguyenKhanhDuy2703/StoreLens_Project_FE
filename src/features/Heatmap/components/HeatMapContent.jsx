import { useEffect, useRef, useState } from "react";
import { Pause, Play, SkipBack, SkipForward, ZoomIn, ZoomOut, Info } from "lucide-react";

const HeatmapVisualization = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const backgroundImageRef = useRef(null);
  
  const [zoom, setZoom] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  
  // Mock data giống như API của bạn - tạo data cho mỗi giờ từ 9h đến 21h
  const mockData = Array.from({ length: 13 }, (_, i) => {
    const hour = 9 + i; // 9h -> 21h
    return {
      cameraCode: "C01",
      storeId: "STORE001",
      hour: `${hour.toString().padStart(2, '0')}:00:00 20/11/2025`,
      withMaxtrix: 48,
      heightMatrix: 27,
      gridSize: 40,
      withFrame: 1920,
      heightFrame: 1080,
      background_image: "",
      heatmapMatrix: Array(27).fill(null).map((_, rowIndex) => {
        return Array(48).fill(null).map((_, colIndex) => {
          // Tạo pattern khác nhau theo giờ
          const centerX = 24 + Math.cos(i * 0.5) * 10;
          const centerY = 13 + Math.sin(i * 0.5) * 5;
          const distX = Math.abs(colIndex - centerX);
          const distY = Math.abs(rowIndex - centerY);
          const dist = Math.sqrt(distX * distX + distY * distY);
          const intensity = 40 + (i * 2); // Tăng dần theo giờ
          return Math.max(-2, intensity - dist * 2);
        });
      })
    };
  });

  const currentData = mockData[currentFrame % mockData.length];
  
  // Extract giờ từ hour string
  const getHourFromString = (hourStr) => {
    return parseInt(hourStr.split(':')[0]);
  };
  
  const currentHour = getHourFromString(currentData.hour);
  const startHour = 9;
  const endHour = 21;

  // Hàm chuyển giá trị thành màu
  const getColorFromValue = (value, minVal, maxVal) => {
    const normalized = Math.max(0, Math.min(1, (value - minVal) / (maxVal - minVal)));
    let r, g, b;
    
    if (normalized < 0.25) {
      const t = normalized / 0.25;
      r = 0;
      g = Math.floor(t * 255);
      b = 255;
    } else if (normalized < 0.5) {
      const t = (normalized - 0.25) / 0.25;
      r = 0;
      g = 255;
      b = Math.floor((1 - t) * 255);
    } else if (normalized < 0.75) {
      const t = (normalized - 0.5) / 0.25;
      r = Math.floor(t * 255);
      g = 255;
      b = 0;
    } else {
      const t = (normalized - 0.75) / 0.25;
      r = 255;
      g = Math.floor((1 - t) * 255);
      b = 0;
    }
    
    return `rgba(${r}, ${g}, ${b}, 0.7)`;
  };

  // Vẽ heatmap lên canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !currentData?.heatmapMatrix) return;

    const ctx = canvas.getContext("2d");
    const { withMaxtrix, heightMatrix, gridSize, heatmapMatrix } = currentData;
    
    const canvasWidth = withMaxtrix * gridSize;
    const canvasHeight = heightMatrix * gridSize;
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Tìm min/max
    let minVal = Infinity;
    let maxVal = -Infinity;
    
    heatmapMatrix.forEach(row => {
      row.forEach(val => {
        if (val < minVal) minVal = val;
        if (val > maxVal) maxVal = val;
      });
    });

    // Vẽ background nếu có
    if (backgroundLoaded && backgroundImageRef.current) {
      ctx.globalAlpha = 0.3;
      ctx.drawImage(backgroundImageRef.current, 0, 0, canvasWidth, canvasHeight);
      ctx.globalAlpha = 1;
    }

    // Vẽ từng cell với hiệu ứng blur
    ctx.filter = 'blur(8px)';
    heatmapMatrix.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        const x = colIndex * gridSize;
        const y = rowIndex * gridSize;
        
        ctx.fillStyle = getColorFromValue(value, minVal, maxVal);
        ctx.fillRect(x, y, gridSize, gridSize);
      });
    });
    
    ctx.filter = 'none';

    // Vẽ grid nếu zoom đủ lớn
    if (zoom >= 1.2) {
      heatmapMatrix.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
          const x = colIndex * gridSize;
          const y = rowIndex * gridSize;
          
          ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, gridSize, gridSize);
          
          // Hiển thị giá trị khi zoom lớn
          if (zoom >= 2) {
            ctx.fillStyle = value > (maxVal + minVal) / 2 ? "#fff" : "#000";
            ctx.font = `${Math.floor(gridSize / 3.5)}px monospace`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(
              value.toFixed(1),
              x + gridSize / 2,
              y + gridSize / 2
            );
          }
        });
      });
    }

  }, [currentData, zoom, backgroundLoaded]);

  // Animation playback - chuyển frame mỗi giây
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev >= mockData.length - 1 ? 0 : prev + 1));
    }, 1000); // 1 giây mỗi frame (mỗi giờ)
    
    return () => clearInterval(interval);
  }, [isPlaying, mockData.length]);

  return (
    <div className="w-full h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm h-full flex flex-col">
        
        {/* Header */}
        <div className="mb-3 pb-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Camera {currentData.cameraCode}
                </h2>
                <p className="text-sm text-gray-500">
                  {currentData.storeId} • {currentData.hour}
                </p>
              </div>
              
              <div className="h-10 w-px bg-gray-300" />
              
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-gray-500">Matrix:</span>
                  <span className="ml-1 font-semibold text-gray-800">
                    {currentData.withMaxtrix} × {currentData.heightMatrix}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Grid:</span>
                  <span className="ml-1 font-semibold text-gray-800">
                    {currentData.gridSize}px
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Frame:</span>
                  <span className="ml-1 font-semibold text-gray-800">
                    {currentData.withFrame} × {currentData.heightFrame}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-200">
              <Info size={16} className="text-blue-600" />
              <span className="text-xs text-blue-700 font-semibold">
                Giờ {currentHour}:00 • Frame {currentFrame + 1}/{mockData.length}
              </span>
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div
          ref={containerRef}
          className="flex-1 overflow-auto rounded-lg bg-gray-900 border border-gray-200 mb-3 flex items-center justify-center"
        >
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "center",
              transition: "transform 0.2s ease-out",
            }}
          >
            <canvas
              ref={canvasRef}
              className="rounded-lg shadow-lg"
              style={{ 
                imageRendering: "auto",
                display: "block",
                maxWidth: "100%"
              }}
            />
          </div>
        </div>

        {/* Color Legend */}
        <div className="mb-3 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-600">Mật độ:</span>
            <div className="flex-1 h-3 rounded-full overflow-hidden flex shadow-inner">
              {[...Array(100)].map((_, i) => {
                const value = -2 + (66 * i / 100);
                const color = getColorFromValue(value, -2, 64);
                return (
                  <div
                    key={i}
                    style={{ 
                      width: "1%", 
                      backgroundColor: color,
                      height: "100%"
                    }}
                  />
                );
              })}
            </div>
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
              onClick={() => setCurrentFrame(Math.min(mockData.length - 1, currentFrame + 1))}
              className="p-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg transition disabled:opacity-50"
              title="Next Frame"
              disabled={currentFrame === mockData.length - 1}
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
                  max={mockData.length - 1}
                  value={currentFrame}
                  onChange={(e) => setCurrentFrame(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  style={{
                    background: `linear-gradient(to right, #9333ea 0%, #9333ea ${(currentFrame / (mockData.length - 1)) * 100}%, #e5e7eb ${(currentFrame / (mockData.length - 1)) * 100}%, #e5e7eb 100%)`
                  }}
                />
                {/* Hiển thị giờ hiện tại */}
                <div 
                  className="absolute -top-8 bg-purple-600 text-white px-2 py-1 rounded text-xs font-bold shadow-lg"
                  style={{
                    left: `${(currentFrame / (mockData.length - 1)) * 100}%`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  {currentHour}:00
                </div>
                {/* Các markers cho mỗi giờ */}
                <div className="absolute top-3 left-0 right-0 flex justify-between px-1">
                  {mockData.map((_, idx) => (
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
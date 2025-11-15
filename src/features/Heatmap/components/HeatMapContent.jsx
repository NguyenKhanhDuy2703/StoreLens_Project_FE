import { Pause, Play, SkipBack, SkipForward, ZoomIn, ZoomOut } from "lucide-react";

const HeatMapContent = ({containerRef , zoom ,  isPlaying , canvasRef , currentFrame }) => {
  return (
    <>
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm h-full">
        <div
          ref={containerRef}
          className="relative overflow-auto rounded-lg bg-gray-50 border border-gray-200"
          style={{ height: "calc(100vh - 200px)" }}
        >
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
              transition: "transform 0.2s",
            }}
          >
            <canvas
              ref={canvasRef}
              className="rounded-lg"
              style={{ imageRendering: "crisp-edges" }}
            />
          </div>
        </div>

        {/* Playback Controls */}
        <div className="mt-4 bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentFrame(Math.max(0, currentFrame - 1))}
              className="p-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg transition"
            >
              <SkipBack size={18} className="text-gray-700" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 bg-purple-600 hover:bg-purple-700 rounded-lg transition shadow-sm"
            >
              {isPlaying ? (
                <Pause size={20} className="text-white" />
              ) : (
                <Play size={20} className="text-white" />
              )}
            </button>
            <button
              onClick={() => setCurrentFrame(Math.min(99, currentFrame + 1))}
              className="p-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg transition"
            >
              <SkipForward size={18} className="text-gray-700" />
            </button>

            <div className="flex-1 flex items-center gap-2">
              <span className="text-xs text-gray-600 whitespace-nowrap">
                09:00
              </span>
              <input
                type="range"
                min="0"
                max="100"
                value={currentFrame}
                onChange={(e) => setCurrentFrame(Number(e.target.value))}
                className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <span className="text-xs text-gray-600 whitespace-nowrap">
                21:00
              </span>
            </div>

            <div className="flex items-center gap-2 ml-3 border-l border-gray-300 pl-3">
              <button
                onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
                className="p-1.5 bg-white hover:bg-gray-100 rounded border border-gray-300"
              >
                <ZoomOut size={16} className="text-gray-700" />
              </button>
              <span className="text-xs text-gray-600 w-12 text-center">
                {(zoom * 100).toFixed(0)}%
              </span>
              <button
                onClick={() => setZoom(Math.min(2, zoom + 0.25))}
                className="p-1.5 bg-white hover:bg-gray-100 rounded border border-gray-300"
              >
                <ZoomIn size={16} className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HeatMapContent;

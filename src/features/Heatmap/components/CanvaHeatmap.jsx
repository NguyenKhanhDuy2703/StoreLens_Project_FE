import {
  Rect,
  Group,
  Line,
  Image as KonvaImage,
  Circle,
  Text,
} from "react-konva";
import useImage from "use-image";
import Konva from "konva";
import { scaleSequential } from "d3-scale";
import { interpolateTurbo } from "d3-scale-chromatic";
import { useMemo, useRef, useEffect } from "react";
export const CameraImage = ({ src, width, height }) => {
  const [image] = useImage(src, "anonymous");
  return image ? (
    <KonvaImage image={image} width={width} height={height} />
  ) : null;
};

export const HeatmapGrid = ({
  matrix,
  gridSize,
  frameWidth,
  frameHeight,
  opacity,
}) => {
  const groupRef = useRef(null);

  const colorScale = useMemo(() => {
    if (!matrix || matrix.length === 0) return null;
    const flatValues = matrix.flat();
    const minValue = Math.min(...flatValues) || 0;
    const maxValue = Math.max(...flatValues) || 1;

    if (minValue === maxValue) return () => "rgba(0,0,255,0)";
    return scaleSequential(interpolateTurbo).domain([minValue, maxValue]);
  }, [matrix]);

  useEffect(() => {
    const node = groupRef.current; 
    if (
      node &&
      typeof node.cache === "function" &&
      frameWidth > 0 &&
      frameHeight > 0
    ) {
      const padding = 30;
      try {
        node.cache({
          x: -padding,
          y: -padding,
          width: frameWidth + padding * 2,
          height: frameHeight + padding * 2,
          pixelRatio: 2,
        });
      } catch (e) {
        console.warn("Konva caching failed:", e); // Giữ lại dòng này để theo dõi
      }
    }
  }, [matrix, gridSize, frameWidth, frameHeight, opacity]);

  if (!matrix || matrix.length === 0 || !colorScale) return null;

  return (
    <Group
      ref={groupRef}
      filters={[Konva.Filters.Blur]}
      blurRadius={40}
      globalCompositeOperation="screen"
    >
      {matrix.map((row, rowIdx) =>
        row.map((value, colIdx) => {
          if (value === 0) return null;

          return (
            <Rect
              key={`${rowIdx}-${colIdx}`}
              x={colIdx * gridSize}
              y={rowIdx * gridSize}
              width={gridSize}
              height={gridSize}
              fill={colorScale(value)}
              opacity={Math.max(0.01, opacity / 100)}
              stroke={colorScale(value)}
              strokeWidth={10}
            />
          );
        })
      )}
    </Group>
  );
};

// Component vẽ grid lines
export const GridLines = ({ gridSize, frameWidth, frameHeight }) => {
  const lines = [];

  // Vertical lines
  for (let x = 0; x <= frameWidth; x += gridSize) {
    lines.push(
      <Line
        key={`v-${x}`}
        points={[x, 0, x, frameHeight]}
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth={1}
      />
    );
  }

  // Horizontal lines
  for (let y = 0; y <= frameHeight; y += gridSize) {
    lines.push(
      <Line
        key={`h-${y}`}
        points={[0, y, frameWidth, y]}
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth={1}
      />
    );
  }

  return <Group>{lines}</Group>;
};

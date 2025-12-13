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
export const DrawingPoints = ({ points }) => {
  let pointPairs = [];
  if (points.length > 0) {
    if (typeof points[0] === "number") {
      for (let i = 0; i < points.length; i += 2) {
        pointPairs.push([points[i], points[i + 1]]);
      }
    } else {
      pointPairs = points;
    }
  }
  return (
    <>
      {pointPairs.map((p, i) => (
        <Group key={i}>
          <Circle
            x={p[0]}
            y={p[1]}
            radius={6}
            fill="#EF4444"
            stroke="#FFF"
            strokeWidth={2}
          />
          <Text
            x={p[0] - 5}
            y={p[1] - 6}
            text={String(i + 1)}
            fontSize={12}
            fontStyle="bold"
            fill="#FFF"
          />
          {i > 0 && (
            <Line
              points={[pointPairs[i - 1][0], pointPairs[i - 1][1], p[0], p[1]]}
              stroke="#3B82F6"
              strokeWidth={2}
            />
          )}
        </Group>
      ))}

      {pointPairs.length === 4 && (
        <Line
          points={[
            pointPairs[3][0],
            pointPairs[3][1],
            pointPairs[0][0],
            pointPairs[0][1],
          ]}
          stroke="#3B82F6"
          strokeWidth={2}
        />
      )}
    </>
  );
};
// --- Vẽ một vùng (Zone) ---
export const ZoneShape = ({ zone }) => {
  const points = zone.coordinates.flatMap((coord) => coord);

  const centerX =
    zone.coordinates.reduce((sum, c) => sum + c[0], 0) /
    zone.coordinates.length;
  const centerY =
    zone.coordinates.reduce((sum, c) => sum + c[1], 0) /
    zone.coordinates.length;

  return (
    <Group visible={zone.visible !== false}>
      <Line
        points={points}
        closed
        fill={zone.color + "22"}
        stroke={zone.color}
        strokeWidth={3}
      />
      <Rect
        x={centerX - 60}
        y={centerY - 25}
        width={120}
        height={40}
        fill="rgba(0,0,0,0.7)"
        cornerRadius={4}
      />
      <Text
        x={centerX - 60}
        y={centerY - 15}
        width={120}
        text={zone.zone_name || "Zone"}
        fontSize={14}
        fontStyle="bold"
        fill="#FFF"
        align="center"
      />
      <Text
        x={centerX - 60}
        y={centerY + 2}
        width={120}
        text={zone.category_name}
        fontSize={12}
        fill={zone.color}
        align="center"
      />
    </Group>
  );
};

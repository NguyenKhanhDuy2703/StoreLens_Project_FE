
import { Circle, Line, Group, Text, Rect } from "react-konva";

export const DrawingPoints = ({ points, scale = 1 }) => {
  let pointPairs = [];
  if (points.length > 0) {
    for (let i = 0; i < points.length; i += 2) {
      pointPairs.push([points[i], points[i + 1]]);
    }
  }
  const radius = 5 / scale;
  const strokeWidth = 2 / scale;
  const fontSize = 12 / scale;
  const textOffset = 8 / scale;

  return (
    <>
      {pointPairs.map((p, i) => (
        <Group key={i}>
          <Circle
            x={p[0]}
            y={p[1]}
            radius={radius}
            fill="#EF4444" 
            stroke="#FFF"
            strokeWidth={strokeWidth}
          />
          <Text
            x={p[0] - textOffset}
            y={p[1] - textOffset - radius}
            text={String(i + 1)}
            fontSize={fontSize}
            fontStyle="bold"
            fill="#FFF"
            shadowColor="black"
            shadowBlur={2}
          />
          {i > 0 && (
            <Line
              points={[pointPairs[i - 1][0], pointPairs[i - 1][1], p[0], p[1]]}
              stroke="#3B82F6"
              strokeWidth={strokeWidth}
            />
          )}
        </Group>
      ))}
      {pointPairs.length >= 3 && (
        <Line
          points={[
            pointPairs[pointPairs.length - 1][0],
            pointPairs[pointPairs.length - 1][1],
            pointPairs[0][0],
            pointPairs[0][1],
          ]}
          stroke="#3B82F6"
          strokeWidth={strokeWidth}
          dash={[10 / scale, 5 / scale]}
        />
      )}
    </>
  );
};

export const ZoneShape = ({ zone, scale = 1, imageSize }) => {
  if (!imageSize?.width || !imageSize?.height) return null;
  const rawPoints = zone.coordinates.flat(); 
  const displayPoints = [];

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

  for (let i = 0; i < rawPoints.length; i += 2) {

    const x = rawPoints[i] * imageSize.width;
    const y = rawPoints[i + 1] * imageSize.height;
    
    displayPoints.push(x, y);

    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }

  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  const strokeWidth = 3 / scale;
  const fontSize = 14 / scale;
  const fontSizeSmall = 12 / scale;
  const rectWidth = 120 / scale;
  const rectHeight = 40 / scale;
  const cornerRadius = 4 / scale;

  return (
    <Group visible={zone.visible !== false}>
      <Line
        points={displayPoints}
        closed
        fill={zone.color + "22"} 
        stroke={zone.color}
        strokeWidth={strokeWidth}
      />
      <Rect
        x={centerX - rectWidth / 2}
        y={centerY - rectHeight / 2}
        width={rectWidth}
        height={rectHeight}
        fill="rgba(0,0,0,0.7)"
        cornerRadius={cornerRadius}
      />
      <Text
        x={centerX - rectWidth / 2}
        y={centerY - rectHeight * 0.3}
        width={rectWidth}
        text={zone.zoneName || zone.zone_name || "Zone"}
        fontSize={fontSize}
        fontStyle="bold"
        fill="#FFF"
        align="center"
      />
      <Text
        x={centerX - rectWidth / 2}
        y={centerY + rectHeight * 0.15}
        width={rectWidth}
        text={zone.categoryName ||zone.category_name || "Type"}
        fontSize={fontSizeSmall}
        fill={zone.color}
        align="center"
      />
    </Group>
  );
};

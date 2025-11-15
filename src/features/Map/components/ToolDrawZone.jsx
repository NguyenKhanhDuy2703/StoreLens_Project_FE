import useImage from "use-image";
import { Image, Line, Circle, Text, Rect, Group } from "react-konva";

// --- Hiển thị hình ảnh camera ---
const KonvaImage = ({ src  , height , width}) => {
  const cleanSrc = src?.split("\n")[0].trim(); // loại bỏ nhiều URL
  const [image, status] = useImage(cleanSrc, "anonymous"); // anonymous để tránh CORS

  if (!image) return <Text text="Loading image..." fill="red" />;

  return <Image image={image} width={width} height={height} />;
};

// --- Vẽ một vùng (Zone) ---
const ZoneShape = ({ zone }) => {
  // Flatten coordinates từ [[x,y], [x,y]...] thành [x, y, x, y...]
  const points = zone.coordinates.flatMap((coord) => coord);

  // Tính tâm của zone
  const centerX = zone.coordinates.reduce((sum, coord) => sum + coord[0], 0) / zone.coordinates.length;
  const centerY = zone.coordinates.reduce((sum, coord) => sum + coord[1], 0) / zone.coordinates.length;

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
        fill="rgba(0, 0, 0, 0.7)" 
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

// --- Vẽ các điểm đang được tạo ---
const DrawingPoints = ({ points }) => (
  <>
    {points.map((p, i) => (
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
            points={[points[i - 1][0], points[i - 1][1], p[0], p[1]]} 
            stroke="#3B82F6" 
            strokeWidth={2} 
          />
        )}
      </Group>
    ))}
    {points.length === 4 && (
      <Line 
        points={[points[3][0], points[3][1], points[0][0], points[0][1]]} 
        stroke="#3B82F6" 
        strokeWidth={2} 
      />
    )}
  </>
);

export { KonvaImage, ZoneShape, DrawingPoints };
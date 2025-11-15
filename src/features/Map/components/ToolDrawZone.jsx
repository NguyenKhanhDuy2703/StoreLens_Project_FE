import useImage from "use-image";
import { Image, Line, Circle, Text, Rect, Group } from "react-konva";

// --- Hiển thị hình ảnh camera ---
const KonvaImage = ({ src, height, width }) => {
  const cleanSrc = src?.split("\n")[0].trim();
  const [image] = useImage(cleanSrc, "anonymous");
  if (!image) return <Text text="Loading image..." fill="red" />;
  return <Image image={image} width={width} height={height} />;
};

// --- Vẽ một vùng (Zone) ---
const ZoneShape = ({ zone }) => {
  const points = zone.coordinates.flatMap(coord => coord);

  const centerX = zone.coordinates.reduce((sum, c) => sum + c[0], 0) / zone.coordinates.length;
  const centerY = zone.coordinates.reduce((sum, c) => sum + c[1], 0) / zone.coordinates.length;

  return (
    <Group visible={zone.visible !== false}>
      <Line points={points} closed fill={zone.color + "22"} stroke={zone.color} strokeWidth={3} />
      <Rect x={centerX - 60} y={centerY - 25} width={120} height={40} fill="rgba(0,0,0,0.7)" cornerRadius={4} />
      <Text x={centerX - 60} y={centerY - 15} width={120} text={zone.zone_name || "Zone"} fontSize={14} fontStyle="bold" fill="#FFF" align="center" />
      <Text x={centerX - 60} y={centerY + 2} width={120} text={zone.category_name} fontSize={12} fill={zone.color} align="center" />
    </Group>
  );
};

// --- Vẽ các điểm đang tạo ---
const DrawingPoints = ({ points }) => {
  console.log("DrawingPoints rendering with points:", points);

  // Convert flat array [x1,y1,x2,y2,...] thành [[x1,y1],[x2,y2],...]
  let pointPairs = [];
  if (points.length > 0) {
    if (typeof points[0] === "number") {
      for (let i = 0; i < points.length; i += 2) {
        pointPairs.push([points[i], points[i + 1]]);
      }
    } else {
      pointPairs = points; // đã là [[x,y],...]
    }
  }

  return (
    <>
      {pointPairs.map((p, i) => (
        <Group key={i}>
          <Circle x={p[0]} y={p[1]} radius={6} fill="#EF4444" stroke="#FFF" strokeWidth={2} />
          <Text x={p[0] - 5} y={p[1] - 6} text={String(i + 1)} fontSize={12} fontStyle="bold" fill="#FFF" />
          {i > 0 && <Line points={[pointPairs[i - 1][0], pointPairs[i - 1][1], p[0], p[1]]} stroke="#3B82F6" strokeWidth={2} />}
        </Group>
      ))}

      {pointPairs.length === 4 && <Line points={[pointPairs[3][0], pointPairs[3][1], pointPairs[0][0], pointPairs[0][1]]} stroke="#3B82F6" strokeWidth={2} />}
    </>
  );
};

export { KonvaImage, ZoneShape, DrawingPoints };

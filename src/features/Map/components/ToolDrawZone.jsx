import useImage from "use-image";
import { Stage, Layer, Image, Line, Circle, Text, Rect, Group } from "react-konva";
// --- Hiển thị hình ảnh camera ---
const KonvaImage = ({ src }) => {
  const [image] = useImage(src);
  return <Image image={image} width={800} height={600} />;
};

// --- Vẽ một vùng (Zone) ---
const ZoneShape = ({ zone }) => {
  const points = zone.points.flatMap((p) => [p.x, p.y]);
  const centerX = zone.points.reduce((sum, p) => sum + p.x, 0) / zone.points.length;
  const centerY = zone.points.reduce((sum, p) => sum + p.y, 0) / zone.points.length;

  return (
    <Group visible={zone.visible}>
      <Line points={points} closed fill={zone.labelColor + "22"} stroke={zone.labelColor} strokeWidth={3} />
      <Rect x={centerX - 60} y={centerY - 25} width={120} height={40} fill="rgba(0, 0, 0, 0.7)" cornerRadius={4} />
      <Text x={centerX - 60} y={centerY - 15} width={120} text={zone.name || "Zone"} fontSize={14} fontStyle="bold" fill="#FFF" align="center" />
      <Text x={centerX - 60} y={centerY + 2} width={120} text={zone.labelName} fontSize={12} fill={zone.labelColor} align="center" />
    </Group>
  );
};

// --- Vẽ các điểm người dùng đang chọn ---
const DrawingPoints = ({ points }) => (
  <>
    {points.map((p, i) => (
      <Group key={i}>
        <Circle x={p.x} y={p.y} radius={6} fill="#EF4444" stroke="#FFF" strokeWidth={2} />
        <Text x={p.x - 5} y={p.y - 6} text={String(i + 1)} fontSize={12} fontStyle="bold" fill="#FFF" />
        {i > 0 && <Line points={[points[i - 1].x, points[i - 1].y, p.x, p.y]} stroke="#3B82F6" strokeWidth={2} />}
      </Group>
    ))}
    {points.length === 4 && <Line points={[points[3].x, points[3].y, points[0].x, points[0].y]} stroke="#3B82F6" strokeWidth={2} />}
  </>
);

export { KonvaImage, ZoneShape, DrawingPoints };
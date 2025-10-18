import ZoneListItem from "./ZonelistItem";

const ZonesList = ({ zones, onToggleVisibility, onEdit, onDelete }) => (
  <div className="mt-4">
    <h3 className="font-semibold mb-2">
      Danh sách Zones ({zones.length})
    </h3>
    <div className="space-y-2 max-h-64 overflow-y-auto">
      {zones.map(zone => (
        <ZoneListItem
          key={zone.id}
          zone={zone}
          onToggleVisibility={() => onToggleVisibility(zone.id)}
          onEdit={() => onEdit(zone)}
          onDelete={() => onDelete(zone.id)}
        />
      ))}
    </div>
  </div>
);
export default ZonesList;
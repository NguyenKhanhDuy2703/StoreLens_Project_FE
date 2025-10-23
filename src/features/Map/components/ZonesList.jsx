import ZoneListItem from "./ZonelistItem";

const ZonesList = ({ zones, onToggleVisibility, onEdit, onDelete }) => {
  return (
    <>
      {zones?.length > 0 ? (
        <div className="mt-4">
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {zones.map((zone) => (
              <ZoneListItem
                key={zone.id}
                zone={zone}
                onToggleVisibility={() => onToggleVisibility(zone.id)}
                onEdit={() => onEdit(zone.id)}
                onDelete={() => onDelete(zone.id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 text-sm text-gray-400 italic">
          Chưa có zone nào được tạo
        </div>
      )}
    </>
  );
};

export default ZonesList;

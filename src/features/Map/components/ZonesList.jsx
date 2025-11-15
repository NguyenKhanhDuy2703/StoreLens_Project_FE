import ZoneListItem from "./ZonelistItem";
import { Layers } from "lucide-react";

const ZonesList = ({ zones, onToggleVisibility, onEdit, onDelete }) => {

  return (
    <>
      {zones?.length > 0 ? (
        <div className="mt-4">
          <div className="space-y-3  overflow-y-auto pr-2 ">
            {zones.map((zone) => (
              <ZoneListItem
                key={zone.zone_id}
                zone={zone}
                onToggleVisibility={() => onToggleVisibility(zone.zone_id)}
                onEdit={() => onEdit(zone.zone_id)}
                onDelete={() => onDelete(zone.zone_id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 py-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-3">
            <Layers size={32} className="text-gray-400" />
          </div>
          <p className="text-sm text-gray-500 font-medium">No zones created yet</p>
          <p className="text-xs text-gray-400 mt-1">Start by drawing zones on the canvas</p>
        </div>
      )}

      
    </>
  );
};
export default ZonesList;

import MainChart from "./components/MainChart";
import MovementFlowtap from "./components/MovementFlowTap";
import Sidebar from "./components/Sidebar";
import Timeline from "./components/Timeline";

const MovementFlow = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Header with filters */}
        <MovementFlowtap />
        
        {/* Main content area */}
        <div className="flex gap-6 h-[calc(100vh-200px)]">
          {/* Sidebar */}
          <Sidebar />
          
          {/* Main chart area */}
          <MainChart />
        </div>
        
        {/* Timeline at bottom */}
        <Timeline />
      </div>
    </div>
  );
};
export default MovementFlow;
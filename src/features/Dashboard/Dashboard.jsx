import FilterBar from "./components/FillterBar";
import MetricsPanel from "./components/MetricsPanel";
import TrafficCharts from "./components/TrafficCharts";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
       
      {/* Main Dashboard */}
      <div className="min-h-screen">
        {/* Filter Bar */}
        <FilterBar />
        
        {/* Metrics Panel */}
        <MetricsPanel />
        
        {/* Traffic Charts */}
        <TrafficCharts />
      </div>
      
   
    </div>
  );
};

export default Dashboard;
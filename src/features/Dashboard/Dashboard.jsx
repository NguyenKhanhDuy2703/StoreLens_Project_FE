import FilterBar from "./components/FillterBar";
import MetricsPanel from "./components/MetricsPanel";
import TrafficCharts from "./components/TrafficCharts";
// import fetchPeopleEntrened from dashboardslice => call api 
import {fetchPeopleEntrened} from "../../redux/dashboard/dashboard";
// useSekector =>  chose data , useDispatch ???
import { useSelector, useDispatch } from "react-redux";
import {useEffect} from "react"
const Dashboard = () => {
  const dispatch = useDispatch();
  const peopleEntrened = useSelector((state) => state.dashboard);

  useEffect(() => {
    // tạo hàm async bên trong
    const fetchData = async () => {
      try {
        const data = await dispatch(fetchPeopleEntrened({ store_id: "store_001", range: '7days' }));
        console.log(data);
      } catch (error) {
        console.error("Error fetching peopleEntrened:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  console.log(peopleEntrened);
  return (
    <div className="min-h-screen bg-gray-50">
       
      {/* Main Dashboard */}
      <div className="min-h-screen">
        {/* Filter Bar */}
        <FilterBar />
        
        {/* Metrics Panel */}
        <MetricsPanel  peopleEntrened = {peopleEntrened}  />
        
        {/* Traffic Charts */}
        <TrafficCharts />
      </div>
      
   
    </div>
  );
};

export default Dashboard;
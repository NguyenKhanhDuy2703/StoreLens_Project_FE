
import CESHeader from './components/CESHeader';
import CESMetricsPanel from './components/CESMetricsPanel';
import TopProductsPanel from './components/TopProductsPanel';
import OverallCESGauge from './components/OverallCESGauge';
import InteractionTypesPanel from './components/InteractionTypesPanel';
import HourlyTrendsChart from './components/HourlyTrendsChart';
import ZonePerformancePanel from './components/ZonePerformancePanel';

const CES = () => {
    return (
        <>
            {/* Phần tiêu đề và bộ lọc của trang */}
            <CESHeader />

            {/* Panel chứa 4 thẻ thông số quan trọng */}
            <CESMetricsPanel />

            {/* Lưới nội dung chính với 3 cột */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <TopProductsPanel />
                <OverallCESGauge />
                <InteractionTypesPanel />
            </div>

            {/* Lưới phân tích bổ sung với 2 cột */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <HourlyTrendsChart />
                <ZonePerformancePanel />
            </div>
        </>
    );
};

export default CES;
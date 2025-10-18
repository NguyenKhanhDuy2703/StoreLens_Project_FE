import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      <Header />
      <main className="flex-grow w-full  mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="bg-white  rounded-lg ">
          <Outlet /> 
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
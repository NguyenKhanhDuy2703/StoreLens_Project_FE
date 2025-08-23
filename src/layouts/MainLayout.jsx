// src/layouts/MainLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    // Sử dụng flexbox để tạo layout co giãn và đẩy footer xuống cuối trang
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <Navbar />
      
      {/* Phần nội dung chính sẽ tự động lấp đầy không gian còn lại */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Outlet /> {/* Nội dung của các page sẽ được render ở đây */}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
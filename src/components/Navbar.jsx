// src/layouts/components/Navbar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';

// Cập nhật lại 'path' để khớp với Router
const navItems = [
  { id: 'tl', label: 'Thống kê lưu lượng', path: '/', icon: '📊' },
  { id: 'lm', label: 'Luồng di chuyển', path: '/movement-flow', icon: '↔️' },
  { id: 'hm', label: 'Heatmap', path: '/heatmap', icon: '🔥' },
  { id: 'td', label: 'Thời gian dừng', path: '/thoi-gian-dung', icon: '⏱️' },
  { id: 'roi', label: 'Vùng quan tâm', path: '/vung-quan-tam', icon: '🎯' },
  { id: 'ces', label: 'Điểm tương tác', path: '/diem-tuong-tac', icon: '👋' },
];

const Navbar = () => {
  // ... phần còn lại của component giữ nguyên ...
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-16 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 h-14 overflow-x-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `
                flex items-center space-x-2 px-4 py-2 text-sm font-medium border-b-2
                transition-colors duration-200 ease-in-out whitespace-nowrap h-full
                ${
                  isActive
                    ? 'border-purple-600 text-purple-600 font-semibold'
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                }
              `}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
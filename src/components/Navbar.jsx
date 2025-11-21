import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { id: 'tl', label: 'Thống kê', path: '/' },
  // { id: 'lm', label: 'Luồng di chuyển', path: '/movement-flow' },
  { id: 'hm', label: 'Heatmap', path: '/heatmap' },
  { id: 'td', label: 'Thời gian', path: '/thoi-gian-dung' },
  // { id: 'roi', label: 'Vùng quan tâm', path: '/vung-quan-tam' },
  { id: 'ces', label: 'Tương tác', path: '/diem-tuong-tac' },
  { id: 'quản lý camera', label: 'Quản lý camera', path: '/quan-ly-cameras' },
  { id: 'qlsp', label: 'Quản lý sản phẩm', path: '/quan-ly-san-pham' },
];
const Navbar = () => {
  return (
    <nav className="flex items-center space-x-1 overflow-x-auto">
      {navItems.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          end={item.path === '/'}
          className={({ isActive }) =>
            `flex items-center space-x-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              isActive
                ? 'bg-purple-100 text-purple-700 font-semibold'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`
          }
        >

          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
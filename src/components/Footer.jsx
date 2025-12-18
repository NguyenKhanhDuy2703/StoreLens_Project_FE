import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Linkedin, 
  Github, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
// Import Logo nếu có (ví dụ)
// import Logo from '../assets/logo.png'; 

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 w-full mt-auto">
      {/* Phần nội dung chính */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Cột 1: Thông tin dự án & Giá trị cốt lõi */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              {/* <img src={Logo} alt="StoreLens Logo" className="h-8 w-8" /> */}
              StoreLens
            </h2>
            <p className="text-sm leading-relaxed text-slate-400">
              Giải pháp tối ưu hóa bán lẻ thời gian thực sử dụng Edge AI. 
              Biến dữ liệu hành vi vô hình thành chiến lược kinh doanh hữu hình.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
              <ShieldCheck size={16} />
              <span>Privacy by Design (Ẩn danh tuyệt đối)</span>
            </div>
          </div>

          {/* Cột 2: Tính năng (Dựa trên quy trình xử lý cốt lõi) */}
          <div>
            <h3 className="text-white font-semibold uppercase tracking-wider mb-4">
              Giải pháp
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors duration-200 flex items-center gap-2">
                  <ArrowRight size={14} /> Edge AI Tracking
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors duration-200 flex items-center gap-2">
                  <ArrowRight size={14} /> Phân tích Heatmap
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors duration-200 flex items-center gap-2">
                  <ArrowRight size={14} /> Tích hợp POS & Doanh thu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors duration-200 flex items-center gap-2">
                  <ArrowRight size={14} /> Báo cáo hiệu suất (KPIs)
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ & Tài nguyên */}
          <div>
            <h3 className="text-white font-semibold uppercase tracking-wider mb-4">
              Tài nguyên
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Tài liệu kỹ thuật (Documentation)
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Hướng dẫn sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Điều khoản dịch vụ
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 4: Liên hệ */}
          <div>
            <h3 className="text-white font-semibold uppercase tracking-wider mb-4">
              Liên hệ
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-emerald-500 mt-1" size={18} />
                <span className="text-sm">
                  Đại học Duy Tân, Đà Nẵng, Việt Nam<br/>
                  (International School)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-emerald-500" size={18} />
                <a href="mailto:contact@storelens.ai" className="text-sm hover:text-white">
                  contact@storelens.ai
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-emerald-500" size={18} />
                <span className="text-sm">+84 905 XXX XXX</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Phần Bottom Bar: Copyright & Social */}
      <div className="bg-slate-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 text-center md:text-left">
            Copyright © {currentYear} <span className="text-emerald-500 font-bold">StoreLens</span>. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className="text-slate-400 hover:text-white transition-transform hover:-translate-y-1">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-transform hover:-translate-y-1">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-transform hover:-translate-y-1">
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
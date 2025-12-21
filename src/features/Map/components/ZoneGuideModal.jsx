import React from 'react';
import { X, CheckCircle, AlertTriangle, Image as ImageIcon, Maximize, Layers } from 'lucide-react';

const ZoneGuideModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-blue-50">
          <h3 className="text-lg font-bold text-blue-800 flex items-center gap-2">
            <AlertTriangle size={24} className="text-blue-600" />
            Quy tắc vẽ Zone chuẩn cho AI
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-1 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <p className="text-gray-600 text-sm italic">
            Để hệ thống AI (Tracking & Heatmap) hoạt động chính xác, vui lòng tuân thủ các nguyên tắc sau:
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Rule 1 */}
            <div className="border border-blue-100 bg-blue-50/50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <ImageIcon size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">1. Tỷ lệ ảnh chuẩn</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Bắt buộc dùng ảnh <strong>Snapshot từ Camera</strong> (thường là 16:9). Không dùng ảnh bị cắt, ảnh dọc hoặc sơ đồ 2D.
                  </p>
                </div>
              </div>
            </div>

            {/* Rule 2 */}
            <div className="border border-green-100 bg-green-50/50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-lg text-green-600">
                  <Layers size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">2. Vẽ dưới mặt sàn</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Vẽ vùng bao quanh <strong>khu vực đi lại</strong> của khách hàng. Không vẽ trùm lên nóc kệ hàng hay trần nhà.
                  </p>
                </div>
              </div>
            </div>

            {/* Rule 3 */}
            <div className="border border-orange-100 bg-orange-50/50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                  <Maximize size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">3. Kích thước đủ lớn</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Vùng vẽ phải đủ rộng để chứa trọn vẹn <strong>ít nhất 1 người</strong>. Tránh vẽ các đường quá mảnh hoặc vùng quá nhỏ.
                  </p>
                </div>
              </div>
            </div>

            {/* Rule 4 */}
            <div className="border border-purple-100 bg-purple-50/50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">4. Tránh chồng lấn</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Hạn chế vẽ các vùng đè lên nhau để tránh việc một người bị tính trùng lặp ở nhiều khu vực.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition shadow-md"
          >
            Đã hiểu, bắt đầu vẽ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZoneGuideModal;
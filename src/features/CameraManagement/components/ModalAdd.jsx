import React, { useState } from 'react';
import { X, Video, Link2, FileText } from 'lucide-react';

const ModalAdd = ({ isOpen, onClose, onSubmit }) => {
  // prop "isOpen" để component biết khi nào nên render
  if (!isOpen) {
    return null;
  }

  // State cho form
  const [formState, setFormState] = useState({
    name: '',
    url: '',
    description: '',
  });

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState(prevState => ({ ...prevState, [id]: value }));
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.url.trim()) {
      alert('Vui lòng nhập Tên Camera và Địa chỉ luồng!');
      return;
    }
    // Gửi dữ liệu về cho component cha
    onSubmit({
      name: formState.name,
      url: formState.url,
      // Các giá trị mặc định khác
      status: 'online',
      quality: 'HD',
    });
    //Sau khi submit thành công, gọi hàm onClose để đóng modal
    onClose();
  };

  return (
    // Lớp phủ nền
    <div className="fixed inset-0 bg-black bg-opacity-60 z-60 flex justify-center items-center">
      {/* Khung Modal */}
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg relative">
        {/* Nút đóng ở góc */}
        <button
          onClick={onClose} //  Gán sự kiện onClose cho nút này
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Thêm Camera Mới</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Tên Camera *</label>
            <div className="relative">
              <Video className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="name"
                type="text"
                required
                value={formState.name}
                onChange={handleChange}
                placeholder="Ví dụ: Camera kho hàng"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ luồng (RTSP URL) *</label>
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="url"
                type="text"
                required
                value={formState.url}
                onChange={handleChange}
                placeholder="rtsp://192.168.1.100:554/stream"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
            <div className="relative">
               <FileText className="absolute left-3 top-3 text-gray-400" size={20} />
              <textarea
                id="description"
                rows="3"
                value={formState.description}
                onChange={handleChange}
                placeholder="Mô tả vị trí hoặc mục đích sử dụng..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose} 
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-semibold"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Thêm Camera
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAdd;
'use client';

import { useState } from 'react';
import { Save, Calendar } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Student } from '../../types';
import { mockFaculties, mockMajors, mockClasses } from '../../services/mockData';

export const StudentProfile = () => {
  const user = useAuthStore((state) => state.user) as Student;
  const updateProfile = useAuthStore((state) => state.updateProfile);
  
  // Generate years for dropdowns
  const currentYear = new Date().getFullYear();
  const admissionYears = Array.from({ length: 10 }, (_, i) => (currentYear - i).toString());
  const academicYears = Array.from({ length: 5 }, (_, i) => {
    const year = currentYear - i;
    return `${year}-${year + 1}`;
  });
  
  // Form state - Thông tin sinh viên
  const [admissionYear, setAdmissionYear] = useState(user.admissionYear?.toString() || '2021');
  const [facultyId, setFacultyId] = useState('1');
  const [majorId, setMajorId] = useState('1');
  const [classId, setClassId] = useState('1');
  const [studentCode, setStudentCode] = useState(user.studentCode);
  const [fullName, setFullName] = useState(user.fullName);
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
  
  // Kỳ đánh giá
  const [semester, setSemester] = useState<'HK1' | 'HK2'>('HK1');
  const [academicYear, setAcademicYear] = useState(academicYears[0]);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile({ phoneNumber });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // Filter majors and classes based on selection
  const filteredMajors = mockMajors.filter(m => m.facultyId === facultyId);
  const filteredClasses = mockClasses.filter(c => c.majorId === majorId && c.facultyId === facultyId);

  return (
    <div className="max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Thông tin cá nhân và kỳ đánh giá</h1>

      {/* Thông tin sinh viên */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6 text-blue-600">Thông tin sinh viên</h2>
        
        <div className="space-y-6">
          {/* Row 1: Năm trúng tuyển, Ngành */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Năm trúng tuyển <span className="text-red-500">*</span>
              </label>
              <select
                value={admissionYear}
                onChange={(e) => setAdmissionYear(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {admissionYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Khoa (đơn vị quản lý sinh viên) <span className="text-red-500">*</span>
              </label>
              <select
                value={facultyId}
                onChange={(e) => setFacultyId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {mockFaculties.map(faculty => (
                  <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Ngành, Lớp */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ngành/chuyên ngành <span className="text-red-500">*</span>
              </label>
              <select
                value={majorId}
                onChange={(e) => setMajorId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {filteredMajors.map(major => (
                  <option key={major.id} value={major.id}>{major.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lớp <span className="text-red-500">*</span>
              </label>
              <select
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {filteredClasses.map(cls => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: Mã SV, Họ tên */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mã sinh viên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={studentCode}
                onChange={(e) => setStudentCode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Nhập mã sinh viên"
              />
              <p className="text-xs text-gray-500 mt-1">
                Hoặc có thể chọn từ danh sách nếu hệ thống hỗ trợ
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Tự động hiển thị hoặc nhập vào"
              />
            </div>
          </div>

          {/* Row 4: Ngày sinh, SĐT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ngày sinh <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Tự động hiển thị hoặc nhập vào
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Nhập số điện thoại"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-6 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Save size={20} />
          Lưu thông tin
        </button>

        {saved && (
          <p className="mt-4 text-green-600 text-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-green-600 rounded-full"></span>
            Đã lưu thông tin thành công!
          </p>
        )}
      </div>

      {/* Kỳ đánh giá */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-6 text-blue-600 flex items-center gap-2">
          <Calendar size={24} />
          Đánh giá kết quả rèn luyện
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Học kỳ <span className="text-red-500">*</span>
            </label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value as 'HK1' | 'HK2')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="HK1">Kỳ I</option>
              <option value="HK2">Kỳ II</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Năm học <span className="text-red-500">*</span>
            </label>
            <select
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {academicYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-medium text-blue-900 mb-1">
            Kỳ đánh giá: <span className="font-bold">{semester === 'HK1' ? 'Học kỳ I' : 'Học kỳ II'}</span> - Năm học <span className="font-bold">{academicYear}</span>
          </p>
          <p className="text-sm text-blue-700">
            Trạng thái phiếu: <span className="text-orange-600 font-medium">Chưa nộp</span>
          </p>
          <p className="text-sm text-blue-700 mt-1">
            Hạn nộp: <span className="font-medium">31/12/{academicYear.split('-')[0]}</span>
          </p>
        </div>

        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm font-medium text-yellow-900 mb-2">📝 Lưu ý:</p>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Các trường có dấu <span className="text-red-500">*</span> là bắt buộc</li>
            <li>• Mã sinh viên: Nhập vào hoặc chọn từ ComboBox (nếu hệ thống hỗ trợ)</li>
            <li>• Họ tên, Ngày sinh: Tự động hiển thị nếu chọn mã SV, hoặc nhập thủ công</li>
            <li>• Vui lòng kiểm tra kỹ thông tin trước khi lưu</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

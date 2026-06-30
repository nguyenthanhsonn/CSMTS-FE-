import { useState, useEffect } from 'react';
import { Save, Calendar } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import type { Student } from '../../types/student';
import { mockFaculties, mockMajors, mockClasses } from '../../services/mockData';

export const StudentProfile = () => {
  const user = useAuthStore((state) => state.user) as Student;
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate years for dropdowns
  const currentYear = new Date().getFullYear();
  const admissionYears = Array.from({ length: 10 }, (_, i) => (currentYear - i).toString());
  const academicYears = Array.from({ length: 5 }, (_, i) => {
    const year = currentYear - i;
    return `${year}-${year + 1}`;
  });
  
  // Form state - Thông tin sinh viên
  const [admissionYear, setAdmissionYear] = useState('2021');
  const [facultyId, setFacultyId] = useState('1');
  const [majorId, setMajorId] = useState('1');
  const [classId, setClassId] = useState('1');
  const [studentCode, setStudentCode] = useState('');
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Sync state once user is available on the client
  useEffect(() => {
    if (user) {
      setAdmissionYear(user.admissionYear?.toString() || '2021');
      setStudentCode(user.studentCode || '');
      setFullName(user.fullName || '');
      setDateOfBirth(user.dateOfBirth || '');
      setPhoneNumber(user.phoneNumber || '');
    }
  }, [user]);
  
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

  if (!mounted) {
    return <div className="p-6 text-gray-500 bg-white rounded-xl shadow-sm border">Đang tải thông tin...</div>;
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto w-full">
      {/* Header title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Thông tin cá nhân & Kỳ đánh giá</h1>
          <p className="text-sm text-gray-500 mt-1">Cập nhật hồ sơ sinh viên và kiểm tra thông tin kỳ đánh giá hiện tại.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Side: Thông tin sinh viên (spans 2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          <div className="p-5 border-b border-gray-100 bg-gray-50">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-blue-600 rounded-full"></span>
              Thông tin sinh viên
            </h2>
          </div>
          
          <div className="p-5 space-y-4 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3.5">
              {/* Field: Năm trúng tuyển */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Năm trúng tuyển <span className="text-red-500">*</span>
                </label>
                <select
                  value={admissionYear}
                  onChange={(e) => setAdmissionYear(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-11 bg-white"
                >
                  {admissionYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Field: Khoa */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Khoa <span className="text-red-500">*</span>
                </label>
                <select
                  value={facultyId}
                  onChange={(e) => setFacultyId(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-11 bg-white"
                >
                  {mockFaculties.map(faculty => (
                    <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
                  ))}
                </select>
              </div>

              {/* Field: Ngành */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Ngành/chuyên ngành <span className="text-red-500">*</span>
                </label>
                <select
                  value={majorId}
                  onChange={(e) => setMajorId(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-11 bg-white"
                >
                  {filteredMajors.map(major => (
                    <option key={major.id} value={major.id}>{major.name}</option>
                  ))}
                </select>
              </div>

              {/* Field: Lớp */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Lớp học <span className="text-red-500">*</span>
                </label>
                <select
                  value={classId}
                  onChange={(e) => setClassId(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-11 bg-white"
                >
                  {filteredClasses.map(cls => (
                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                  ))}
                </select>
              </div>

              {/* Field: Mã sinh viên */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Mã sinh viên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={studentCode}
                  onChange={(e) => setStudentCode(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-11 bg-white"
                  placeholder="Nhập mã sinh viên"
                />
              </div>

              {/* Field: Họ và tên */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-11 bg-white"
                  placeholder="Tự động hiển thị hoặc nhập vào"
                />
              </div>

              {/* Field: Ngày sinh */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Ngày sinh <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-11 bg-white"
                />
              </div>

              {/* Field: Số điện thoại */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-11 bg-white"
                  placeholder="Nhập số điện thoại"
                />
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-4">
            <div className="min-w-0">
              {saved && (
                <p className="text-green-600 text-sm font-semibold flex items-center gap-1.5 animate-fade-in">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full inline-block animate-ping"></span>
                  Lưu thông tin thành công!
                </p>
              )}
            </div>
            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition cursor-pointer min-h-[44px] min-w-[120px] shadow-sm shrink-0"
            >
              <Save size={18} />
              Lưu thông tin
            </button>
          </div>
        </div>

        {/* Right Side: Kỳ đánh giá & Quy chế (spans 1 col) */}
        <div className="space-y-6">
          {/* Card: Kỳ đánh giá */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-blue-600" />
              Kỳ đánh giá hiện tại
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Học kỳ <span className="text-red-500">*</span>
                </label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value as 'HK1' | 'HK2')}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-11 bg-white"
                >
                  <option value="HK1">Học kỳ I</option>
                  <option value="HK2">Học kỳ II</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Năm học <span className="text-red-500">*</span>
                </label>
                <select
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-11 bg-white"
                >
                  {academicYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="mt-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Kỳ học:</span>
                  <span className="font-bold text-blue-900">{semester === 'HK1' ? 'Học kỳ I' : 'Học kỳ II'}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Năm học:</span>
                  <span className="font-bold text-blue-900">{academicYear}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Trạng thái:</span>
                  <span className="font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">Chưa nộp</span>
                </div>
                <div className="flex justify-between text-xs border-t border-blue-100/50 pt-2">
                  <span className="text-gray-500">Hạn nộp:</span>
                  <span className="font-semibold text-red-600">31/12/{academicYear.split('-')[0]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Quy chế / Lưu ý */}
          <div className="bg-amber-50/50 rounded-xl border border-amber-200/60 p-5">
            <h3 className="text-sm font-bold text-amber-900 mb-3 flex items-center gap-1.5">
              <span>⚠️</span> Lưu ý điền phiếu:
            </h3>
            <ul className="text-xs text-amber-800 space-y-2.5 leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-amber-500 shrink-0">•</span>
                <span>Các trường có dấu <span className="text-red-500 font-bold">*</span> là bắt buộc nhập thông tin.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-500 shrink-0">•</span>
                <span>Mã sinh viên: Nhập thủ công hoặc chọn từ danh sách hiển thị gợi ý.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-500 shrink-0">•</span>
                <span>Họ tên, Ngày sinh: Hệ thống tự điền nếu khớp mã SV, hoặc cho phép nhập.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-500 shrink-0">•</span>
                <span>Vui lòng kiểm tra kỹ tất cả thông tin cá nhân và lớp trước khi bấm Lưu.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

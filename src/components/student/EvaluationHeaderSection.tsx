'use client';

import { User, ChevronUp, ChevronDown } from 'lucide-react';

const admissionYears = ['2020', '2021', '2022', '2023', '2024'];
const mockFaculties = [
  { id: 'cntt', name: 'Công nghệ thông tin' },
  { id: 'dtvt', name: 'Điện tử viễn thông' },
  { id: 'kt', name: 'Kinh tế & Quản trị' }
];
const mockMajors = [
  { id: 'khmt', name: 'Khoa học máy tính', facultyId: 'cntt' },
  { id: 'cnpm', name: 'Công nghệ phần mềm', facultyId: 'cntt' },
  { id: 'dttg', name: 'Điện tử truyền thông', facultyId: 'dtvt' },
  { id: 'qtkd', name: 'Quản trị kinh doanh', facultyId: 'kt' }
];
const mockClasses = [
  { id: 'cntt-k18', name: 'CNTT K18', majorId: 'khmt' },
  { id: 'cnpm-k19', name: 'CNPM K19', majorId: 'cnpm' },
  { id: 'dt-k18', name: 'ĐTVT K18', majorId: 'dttg' },
  { id: 'qt-k19', name: 'QTKD K19', majorId: 'qtkd' }
];

interface EvaluationHeaderSectionProps {
  expanded: boolean;
  onToggle: () => void;
  admissionYear: string;
  setAdmissionYear: (val: string) => void;
  facultyId: string;
  setFacultyId: (val: string) => void;
  majorId: string;
  setMajorId: (val: string) => void;
  classId: string;
  setClassId: (val: string) => void;
  studentCode: string;
  setStudentCode: (val: string) => void;
  fullName: string;
  setFullName: (val: string) => void;
  dateOfBirth: string;
  setDateOfBirth: (val: string) => void;
  phoneNumber: string;
  setPhoneNumber: (val: string) => void;
  semester: 'HK1' | 'HK2';
  setSemester: (val: 'HK1' | 'HK2') => void;
  academicYear: string;
  setAcademicYear: (val: string) => void;
  isSuspended: boolean;
  setIsSuspended: (val: boolean) => void;
  isSubmittedLate: boolean;
  setIsSubmittedLate: (val: boolean) => void;
}

export const EvaluationHeaderSection = ({
  expanded,
  onToggle,
  admissionYear,
  setAdmissionYear,
  facultyId,
  setFacultyId,
  majorId,
  setMajorId,
  classId,
  setClassId,
  studentCode,
  setStudentCode,
  fullName,
  setFullName,
  dateOfBirth,
  setDateOfBirth,
  phoneNumber,
  setPhoneNumber,
  semester,
  setSemester,
  academicYear,
  setAcademicYear,
  isSuspended,
  setIsSuspended,
  isSubmittedLate,
  setIsSubmittedLate,
}: EvaluationHeaderSectionProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 sm:p-5 bg-gray-50 border-b border-gray-100 hover:bg-gray-100/70 transition cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <User className="text-blue-600" size={20} />
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Thông tin sinh viên & Học kỳ</h2>
        </div>
        {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {expanded && (
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Năm trúng tuyển *</label>
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

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Khoa quản lý *</label>
              <select
                value={facultyId}
                onChange={(e) => setFacultyId(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-11 bg-white"
              >
                {mockFaculties.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Ngành học *</label>
              <select
                value={majorId}
                onChange={(e) => setMajorId(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-11 bg-white"
              >
                {mockMajors.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Lớp học *</label>
              <select
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-11 bg-white"
              >
                {mockClasses.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Mã sinh viên *</label>
              <input
                type="text"
                value={studentCode}
                onChange={(e) => setStudentCode(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-11 bg-white"
                placeholder="Nhập mã sinh viên"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Họ và tên *</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-11 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Ngày sinh *</label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-11 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Số điện thoại</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-11 bg-white"
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Học kỳ đánh giá *</label>
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
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Năm học *</label>
              <select
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-11 bg-white"
              >
                <option value="2024-2025">2024-2025</option>
                <option value="2023-2024">2023-2024</option>
              </select>
            </div>
          </div>

          {/* Special Compliance Flags */}
          <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
            <label className="flex items-center gap-2 text-xs font-bold text-red-600 cursor-pointer min-h-[44px] sm:min-h-0">
              <input
                type="checkbox"
                checked={isSuspended}
                onChange={(e) => setIsSuspended(e.target.checked)}
                className="h-4.5 w-4.5 rounded text-red-600 focus:ring-red-500 cursor-pointer"
              />
              Bị đình chỉ học tập từ 30 ngày trở xuống (Xếp loại không quá Khá)
            </label>
            <label className="flex items-center gap-2 text-xs font-bold text-amber-600 cursor-pointer min-h-[44px] sm:min-h-0">
              <input
                type="checkbox"
                checked={isSubmittedLate}
                onChange={(e) => setIsSubmittedLate(e.target.checked)}
                className="h-4.5 w-4.5 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
              />
              Nộp phiếu trễ hạn / Không đúng hạn (Xếp loại Yếu/Kém)
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

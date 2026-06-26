'use client';

import { useState } from 'react';
import { Plus, Trash2, Search } from 'lucide-react';
import { mockClasses, mockMajors, mockFaculties } from '../../services/mockData';

interface Student {
  id: string;
  studentCode: string;
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
}

export const AdminClassList = () => {
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [students] = useState<Student[]>([
    { id: '1', studentCode: 'SV001', fullName: 'Nguyễn Văn A', dateOfBirth: '2003-05-15', phoneNumber: '0123456789' },
    { id: '2', studentCode: 'SV002', fullName: 'Trần Thị B', dateOfBirth: '2003-08-20', phoneNumber: '0987654321' },
    { id: '3', studentCode: 'SV003', fullName: 'Lê Văn C', dateOfBirth: '2003-03-10', phoneNumber: '0912345678' },
  ]);

  const filteredStudents = students.filter((s) =>
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.studentCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Danh sách lớp</h1>

      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Chọn lớp</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Khoa</label>
            <select
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">-- Chọn khoa --</option>
              {mockFaculties.map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ngành</label>
            <select
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">-- Chọn ngành --</option>
              {mockMajors.filter(m => !selectedFaculty || m.facultyId === selectedFaculty).map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lớp</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">-- Chọn lớp --</option>
              {mockClasses.filter(c => !selectedMajor || c.majorId === selectedMajor).map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {selectedClass && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Danh sách sinh viên</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus size={20} />
              Thêm sinh viên
            </button>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm sinh viên..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Mã SV</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Họ tên</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Ngày sinh</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Số ĐT</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono">{student.studentCode}</td>
                    <td className="py-3 px-4">{student.fullName}</td>
                    <td className="py-3 px-4">{new Date(student.dateOfBirth).toLocaleDateString('vi-VN')}</td>
                    <td className="py-3 px-4">{student.phoneNumber}</td>
                    <td className="py-3 px-4">
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

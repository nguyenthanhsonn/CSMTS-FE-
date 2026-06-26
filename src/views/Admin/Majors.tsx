'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { mockMajors, mockFaculties } from '../../services/mockData';
import { Major } from '../../types';

export const AdminMajors = () => {
  const [majors, setMajors] = useState<Major[]>(mockMajors);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMajors = majors.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa ngành này?')) {
      setMajors((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const getFacultyName = (facultyId: string) => {
    return mockFaculties.find((f) => f.id === facultyId)?.name || '';
  };

  return (
    <div className="max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Ngành học</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          Thêm ngành
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm ngành học..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Mã ngành</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Tên ngành</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Khoa</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredMajors.map((major) => (
                <tr key={major.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono">{major.code}</td>
                  <td className="py-3 px-4">{major.name}</td>
                  <td className="py-3 px-4">{getFacultyName(major.facultyId)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(major.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

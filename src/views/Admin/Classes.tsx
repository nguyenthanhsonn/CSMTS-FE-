'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { mockClasses, mockMajors, mockFaculties } from '../../services/mockData';
import { Class } from '../../types';

export const AdminClasses = () => {
  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClasses = classes.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa lớp này?')) {
      setClasses((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const getMajorName = (majorId: string) => {
    return mockMajors.find((m) => m.id === majorId)?.name || '';
  };

  const getFacultyName = (facultyId: string) => {
    return mockFaculties.find((f) => f.id === facultyId)?.name || '';
  };

  return (
    <div className="max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Lớp</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          Thêm lớp
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
              placeholder="Tìm kiếm lớp..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Mã lớp</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Tên lớp</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Ngành</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Khoa</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredClasses.map((cls) => (
                <tr key={cls.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono">{cls.code}</td>
                  <td className="py-3 px-4">{cls.name}</td>
                  <td className="py-3 px-4">{getMajorName(cls.majorId)}</td>
                  <td className="py-3 px-4">{getFacultyName(cls.facultyId)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(cls.id)}
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

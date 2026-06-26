'use client';

import { Users, GraduationCap, Building2, School, UserCog, BookOpen } from 'lucide-react';
import { mockDashboardStats } from '../../services/mockData';

export const AdminDashboard = () => {
  const stats = [
    {
      icon: Users,
      label: 'Tổng số tài khoản',
      value: mockDashboardStats.totalUsers,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: GraduationCap,
      label: 'Sinh viên',
      value: mockDashboardStats.totalStudents,
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: UserCog,
      label: 'Quản trị viên',
      value: mockDashboardStats.totalAdmins,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Building2,
      label: 'Khoa',
      value: mockDashboardStats.totalFaculties,
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: BookOpen,
      label: 'Ngành học',
      value: mockDashboardStats.totalMajors,
      color: 'bg-pink-100 text-pink-600',
    },
    {
      icon: School,
      label: 'Lớp',
      value: mockDashboardStats.totalClasses,
      color: 'bg-cyan-100 text-cyan-600',
    },
  ];

  return (
    <div className="max-w-7xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border">
              <div className={`inline-flex p-3 rounded-lg ${stat.color} mb-4`}>
                <Icon size={24} />
              </div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Thống kê theo khoa</h2>
          <div className="space-y-4">
            {['Công nghệ thông tin', 'Kinh tế - Du lịch', 'Ngoại ngữ', 'Giáo dục thể chất'].map((faculty, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-700">{faculty}</span>
                <span className="font-semibold text-blue-600">
                  {Math.floor(Math.random() * 300) + 100} SV
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Hoạt động gần đây</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Thêm 25 sinh viên mới</p>
                <p className="text-xs text-gray-600">2 giờ trước</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Tạo lớp CNTT-K19</p>
                <p className="text-xs text-gray-600">5 giờ trước</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Import danh sách lớp QTKD</p>
                <p className="text-xs text-gray-600">1 ngày trước</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

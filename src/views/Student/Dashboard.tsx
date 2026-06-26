'use client';

import { FileText, AlertCircle, CheckCircle, Clock, Award } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Student } from '../../types';

export const StudentDashboard = () => {
  const user = useAuthStore((state) => state.user) as Student;

  const stats = [
    {
      icon: FileText,
      label: 'Phiếu chờ nộp',
      value: '1',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Clock,
      label: 'Đang xét duyệt',
      value: '0',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: CheckCircle,
      label: 'Đã hoàn thành',
      value: '2',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Award,
      label: 'Điểm TB',
      value: '85',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Chào mừng, {user.fullName}!
        </h1>
        <p className="text-gray-600 mt-2">
          Mã sinh viên: {user.studentCode} | Lớp: {user.className}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border">
              <div className={`inline-flex p-3 rounded-lg ${stat.color} mb-4`}>
                <Icon size={24} />
              </div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="text-orange-500" size={20} />
            Thông báo quan trọng
          </h2>
          <div className="space-y-3">
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm font-medium text-orange-900">
                Hạn nộp phiếu đánh giá HK1 2024-2025
              </p>
              <p className="text-sm text-orange-700 mt-1">
                Thời hạn: 31/12/2024
              </p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-900">
                Cập nhật minh chứng hoạt động
              </p>
              <p className="text-sm text-blue-700 mt-1">
                Vui lòng tải lên minh chứng cho các hoạt động đã tham gia
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Lịch sử đánh giá gần đây</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">HK2 2023-2024</p>
                <p className="text-sm text-gray-600">Đã phê duyệt</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">88</p>
                <p className="text-sm text-gray-600">Xuất sắc</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">HK1 2023-2024</p>
                <p className="text-sm text-gray-600">Đã phê duyệt</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">82</p>
                <p className="text-sm text-gray-600">Tốt</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

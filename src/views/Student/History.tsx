'use client';

import { Calendar, Eye } from 'lucide-react';

interface HistoryItem {
  id: string;
  semester: string;
  academicYear: string;
  submittedAt: string;
  status: string;
  totalScore: number;
  rating: string;
}

export const StudentHistory = () => {
  const history: HistoryItem[] = [
    {
      id: '1',
      semester: 'HK2',
      academicYear: '2023-2024',
      submittedAt: '2024-05-15',
      status: 'faculty_approved',
      totalScore: 88,
      rating: 'Xuất sắc',
    },
    {
      id: '2',
      semester: 'HK1',
      academicYear: '2023-2024',
      submittedAt: '2023-12-20',
      status: 'faculty_approved',
      totalScore: 82,
      rating: 'Tốt',
    },
    {
      id: '3',
      semester: 'HK2',
      academicYear: '2022-2023',
      submittedAt: '2023-05-18',
      status: 'faculty_approved',
      totalScore: 79,
      rating: 'Khá',
    },
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      draft: { text: 'Nháp', class: 'bg-gray-100 text-gray-700' },
      submitted: { text: 'Đã nộp', class: 'bg-blue-100 text-blue-700' },
      class_reviewed: { text: 'Lớp đánh giá', class: 'bg-yellow-100 text-yellow-700' },
      advisor_reviewed: { text: 'CVHT xét duyệt', class: 'bg-orange-100 text-orange-700' },
      faculty_approved: { text: 'Đã phê duyệt', class: 'bg-green-100 text-green-700' },
    };
    return badges[status as keyof typeof badges] || badges.draft;
  };

  const getRatingColor = (rating: string) => {
    if (rating === 'Xuất sắc') return 'text-green-600';
    if (rating === 'Tốt') return 'text-blue-600';
    if (rating === 'Khá') return 'text-purple-600';
    return 'text-gray-600';
  };

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Lịch sử đánh giá</h1>

      <div className="space-y-4">
        {history.map((item) => {
          const statusBadge = getStatusBadge(item.status);
          return (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="text-blue-600" size={28} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {item.semester} - Năm học {item.academicYear}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Nộp ngày: {new Date(item.submittedAt).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadge.class}`}>
                  {statusBadge.text}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-600">Tổng điểm</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{item.totalScore}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Xếp loại</p>
                  <p className={`text-lg font-semibold mt-1 ${getRatingColor(item.rating)}`}>
                    {item.rating}
                  </p>
                </div>
                <div className="flex items-end justify-end">
                  <button className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                    <Eye size={18} />
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {history.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
          <Calendar className="mx-auto mb-4 text-gray-400" size={64} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có lịch sử đánh giá</h3>
          <p className="text-gray-600">
            Bạn chưa nộp phiếu đánh giá nào
          </p>
        </div>
      )}
    </div>
  );
};

'use client';

import { Award, TrendingUp, Calendar } from 'lucide-react';

export const StudentResults = () => {
  const currentResult = {
    semester: 'HK2',
    academicYear: '2023-2024',
    scores: {
      academic: 28,
      discipline: 25,
      politicalSocial: 18,
      community: 12,
      leadership: 5,
      total: 88,
    },
    rating: 'Xuất sắc',
    reviewerComments: 'Sinh viên có ý thức học tập tốt, tích cực tham gia các hoạt động. Tiếp tục phát huy!',
  };

  const scoreBreakdown = [
    { label: 'Ý thức học tập', score: currentResult.scores.academic, max: 30, color: 'bg-blue-500' },
    { label: 'Chấp hành nội quy', score: currentResult.scores.discipline, max: 25, color: 'bg-green-500' },
    { label: 'Hoạt động CT-XH', score: currentResult.scores.politicalSocial, max: 20, color: 'bg-purple-500' },
    { label: 'Ý thức cộng đồng', score: currentResult.scores.community, max: 15, color: 'bg-orange-500' },
    { label: 'Vai trò cán bộ', score: currentResult.scores.leadership, max: 10, color: 'bg-pink-500' },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto w-full space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Kết quả đánh giá</h1>

      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-4">
          <Award size={32} />
          <div>
            <p className="text-blue-100 text-sm">
              {currentResult.semester} - Năm học {currentResult.academicYear}
            </p>
            <h2 className="text-2xl font-bold">Kết quả đánh giá rèn luyện</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6">
          <div className="bg-white bg-opacity-20 rounded-lg p-4 sm:p-6 backdrop-blur-sm">
            <p className="text-blue-100 text-sm mb-2">Tổng điểm</p>
            <p className="text-4xl sm:text-5xl font-bold">{currentResult.scores.total}</p>
            <p className="text-blue-100 mt-2">/ 100 điểm</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 sm:p-6 backdrop-blur-sm">
            <p className="text-blue-100 text-sm mb-2">Xếp loại</p>
            <p className="text-2xl sm:text-3xl font-bold">{currentResult.rating}</p>
            <div className="flex items-center gap-2 mt-2 text-green-300">
              <TrendingUp size={18} />
              <span className="text-xs sm:text-sm">+6 điểm so với kỳ trước</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Chi tiết điểm</h2>
        <div className="space-y-6">
          {scoreBreakdown.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-700">{item.label}</span>
                <span className="text-gray-900 font-semibold">
                  {item.score}/{item.max}
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} transition-all duration-500`}
                  style={{ width: `${(item.score / item.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calendar size={24} className="text-blue-600" />
          Nhận xét từ người đánh giá
        </h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-gray-700 leading-relaxed">
            {currentResult.reviewerComments}
          </p>
        </div>
      </div>

      <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
        <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
          <Award className="text-green-600" size={20} />
          Lợi ích của xếp loại Xuất sắc
        </h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>✓ Được ưu tiên xét học bổng</li>
          <li>✓ Được ưu tiên giới thiệu việc làm</li>
          <li>✓ Được xét khen thưởng cuối năm</li>
          <li>✓ Cộng điểm trong hồ sơ xét tuyển sau đại học</li>
        </ul>
      </div>
    </div>
  );
};

export default StudentResults;

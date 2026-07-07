'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Clock, CheckCircle, Award, ArrowRight as ArrowRightIcon } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import type { Student } from '../../types/student';
import { API_Student } from '../../api/API_Student';
import { WelcomeBanner } from '../../components/student/WelcomeBanner';
import { StatsGrid } from '../../components/student/StatsGrid';
import { NotificationCard } from '../../components/student/NotificationCard';

export const StudentDashboard = () => {
  const user = useAuthStore((state) => state.user) as Student;
  const [history, setHistory] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [semesterFilter, setSemesterFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken || accessToken === 'mock-access-token') {
          setHistory([
            {
              id: '1',
              status: 'draft',
              studentScore: 85,
              classScore: null,
              finalScore: null,
              rank: 'GOOD',
              submittedAt: null,
              semester: {
                year: 2024,
                semester: 'SEMESTER_1'
              }
            },
            {
              id: '2',
              status: 'faculty_approved',
              studentScore: 88,
              classScore: 88,
              finalScore: 88,
              rank: 'EXCELLENT',
              submittedAt: '2024-05-15T00:00:00.000Z',
              semester: {
                year: 2024,
                semester: 'SEMESTER_2'
              }
            },
            {
              id: '3',
              status: 'faculty_approved',
              studentScore: 82,
              classScore: 82,
              finalScore: 82,
              rank: 'GOOD',
              submittedAt: '2023-12-20T00:00:00.000Z',
              semester: {
                year: 2023,
                semester: 'SEMESTER_1'
              }
            },
            {
              id: '4',
              status: 'faculty_approved',
              studentScore: 79,
              classScore: 79,
              finalScore: 79,
              rank: 'FAIR',
              submittedAt: '2023-05-18T00:00:00.000Z',
              semester: {
                year: 2023,
                semester: 'SEMESTER_2'
              }
            },
            {
              id: '5',
              status: 'faculty_approved',
              studentScore: 75,
              classScore: 75,
              finalScore: 75,
              rank: 'FAIR',
              submittedAt: '2022-12-22T00:00:00.000Z',
              semester: {
                year: 2022,
                semester: 'SEMESTER_1'
              }
            },
            {
              id: '6',
              status: 'faculty_approved',
              studentScore: 91,
              classScore: 91,
              finalScore: 91,
              rank: 'EXCELLENT',
              submittedAt: '2022-05-14T00:00:00.000Z',
              semester: {
                year: 2022,
                semester: 'SEMESTER_2'
              }
            },
            {
              id: '7',
              status: 'faculty_approved',
              studentScore: 84,
              classScore: 84,
              finalScore: 84,
              rank: 'GOOD',
              submittedAt: '2021-12-18T00:00:00.000Z',
              semester: {
                year: 2021,
                semester: 'SEMESTER_1'
              }
            },
            {
              id: '8',
              status: 'faculty_approved',
              studentScore: 68,
              classScore: 68,
              finalScore: 68,
              rank: 'AVERAGE',
              submittedAt: '2021-05-20T00:00:00.000Z',
              semester: {
                year: 2021,
                semester: 'SEMESTER_2'
              }
            },
            {
              id: '9',
              status: 'faculty_approved',
              studentScore: 72,
              classScore: 72,
              finalScore: 72,
              rank: 'FAIR',
              submittedAt: '2020-12-19T00:00:00.000Z',
              semester: {
                year: 2020,
                semester: 'SEMESTER_1'
              }
            },
            {
              id: '10',
              status: 'faculty_approved',
              studentScore: 86,
              classScore: 86,
              finalScore: 86,
              rank: 'GOOD',
              submittedAt: '2020-05-15T00:00:00.000Z',
              semester: {
                year: 2020,
                semester: 'SEMESTER_2'
              }
            }
          ]);
        } else {
          const res = await API_Student.getEvaluations(accessToken);
          const data = res.data || res;
          setHistory(data || []);
        }
      } catch (err) {
        console.error('Failed to fetch dashboard history:', err);
      }
    };
    fetchHistory();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const [list, unread] = await Promise.all([
          API_Student.getNotifications({ page: 1, limit: 5 }),
          API_Student.getUnreadCount(),
        ]);
        const items = Array.isArray((list as any)?.items)
          ? (list as any).items
          : Array.isArray((list as any)?.data?.items)
          ? (list as any).data.items
          : Array.isArray(list)
          ? list
          : [];

        setNotifications(
          items.map((item: any) => ({
            type: item.type || 'info',
            title: item.title || 'Thông báo',
            description: item.content || item.description || item.message || '',
            borderColor: item.isRead ? 'border-l-[#3B82F6]' : 'border-l-[#F59E0B]',
            bg: item.isRead ? 'bg-[#EFF6FF]' : 'bg-[#FFFBEB]',
            textColor: item.isRead ? 'text-[#1E40AF]' : 'text-[#92400E]',
            descColor: item.isRead ? 'text-[#2563EB]' : 'text-[#B45309]',
            dot: item.isRead ? 'bg-[#3B82F6]' : 'bg-[#F59E0B]',
          }))
        );
        setUnreadCount((unread as any)?.count ?? (unread as any)?.data?.count ?? 0);
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
        setNotifications([]);
        setUnreadCount(0);
      }
    };

    fetchNotifications();
  }, []);

  const submittedCount = history.filter((item) => item.status && item.status !== 'draft').length;
  const approvedCount = history.filter((item) => item.status === 'faculty_approved').length;
  const draftCount = history.filter((item) => !item.status || item.status === 'draft').length;
  const averageScore = history.length
    ? Math.round(
        history.reduce((total, item) => total + (item.finalScore ?? item.classScore ?? item.studentScore ?? 0), 0) /
          history.length
      )
    : 0;

  const stats = [
    {
      icon: FileText,
      label: 'Phiếu chờ nộp',
      value: draftCount,
      bg: 'bg-amber-50',
      iconColor: 'text-[#F59E0B]',
      trend: unreadCount > 0 ? `${unreadCount} thông báo mới` : 'Không có thông báo mới',
      trendColor: 'text-[#F59E0B]',
    },
    {
      icon: Clock,
      label: 'Đang xét duyệt',
      value: submittedCount - approvedCount,
      bg: 'bg-blue-50',
      iconColor: 'text-[#3B82F6]',
      trend: 'Không có',
      trendColor: 'text-gray-400',
    },
    {
      icon: CheckCircle,
      label: 'Đã hoàn thành',
      value: approvedCount,
      bg: 'bg-emerald-50',
      iconColor: 'text-[#10B981]',
      trend: `${history.length} phiếu đã ghi nhận`,
      trendColor: 'text-[#10B981]',
    },
    {
      icon: Award,
      label: 'Điểm TB',
      value: averageScore,
      bg: 'bg-purple-50',
      iconColor: 'text-[#8B5CF6]',
      trend: history.length ? 'Tính từ dữ liệu hiện có' : 'Chưa có dữ liệu',
      trendColor: 'text-[#10B981]',
    },
  ];

  const getStatusText = (status: string) => {
    const statuses = {
      draft: 'Nháp',
      submitted: 'Đã nộp',
      class_reviewed: 'Lớp đánh giá',
      advisor_reviewed: 'CVHT xét duyệt',
      faculty_approved: 'Đã phê duyệt',
    };
    return statuses[status as keyof typeof statuses] || status;
  };

  const getRankText = (rank: string | null | undefined) => {
    if (!rank) return 'Chưa xếp loại';
    const ranks = {
      EXCELLENT: 'Xuất sắc',
      GOOD: 'Tốt',
      FAIR: 'Khá',
      AVERAGE: 'Trung bình',
      POOR: 'Yếu',
      'Xuất sắc': 'Xuất sắc',
      'Tốt': 'Tốt',
      'Khá': 'Khá',
      'Trung bình': 'Trung bình',
      'Yếu': 'Yếu',
    };
    return ranks[rank as keyof typeof ranks] || rank;
  };

  const getBadgeColors = (status: string) => {
    if (status === 'faculty_approved') {
      return { bg: 'bg-emerald-50', text: 'text-[#10B981]' };
    }
    if (status === 'submitted') {
      return { bg: 'bg-blue-50', text: 'text-[#3B82F6]' };
    }
    return { bg: 'bg-gray-50', text: 'text-gray-500' };
  };

  const getRankBadgeColors = (rank: string | null | undefined) => {
    if (!rank) return { bg: 'bg-gray-50', text: 'text-gray-500' };
    const r = rank.toUpperCase();
    if (r === 'EXCELLENT' || r === 'XUẤT SẮC') {
      return { bg: 'bg-emerald-50', text: 'text-[#10B981]' };
    }
    if (r === 'GOOD' || r === 'TỐT') {
      return { bg: 'bg-blue-50', text: 'text-[#3B82F6]' };
    }
    if (r === 'FAIR' || r === 'KHÁ') {
      return { bg: 'bg-purple-50', text: 'text-[#8B5CF6]' };
    }
    return { bg: 'bg-amber-50', text: 'text-[#F59E0B]' };
  };

  // Compile academic years dynamically from evaluations
  const uniqueYears = Array.from(new Set(
    history.map(item => {
      if (item.semester && typeof item.semester === 'object') {
        return item.semester.year.toString();
      }
      return item.academicYear || '';
    }).filter(Boolean)
  )).sort((a, b) => b.localeCompare(a));

  // Client-side filtering logic
  const filteredHistory = history.filter(item => {
    // Filter by Semester
    if (semesterFilter !== 'all') {
      const sem = item.semester && typeof item.semester === 'object'
        ? item.semester.semester
        : item.semester;
      if (semesterFilter === 'HK1' && sem !== 'SEMESTER_1' && sem !== 'HK1') return false;
      if (semesterFilter === 'HK2' && sem !== 'SEMESTER_2' && sem !== 'HK2') return false;
    }
    // Filter by Academic Year
    if (yearFilter !== 'all') {
      const y = item.semester && typeof item.semester === 'object'
        ? item.semester.year.toString()
        : item.academicYear;
      if (y !== yearFilter) return false;
    }
    return true;
  });

  const displayName = user
    ? 'fullName' in user && typeof user.fullName === 'string'
      ? user.fullName
      : user.username
    : 'Sinh viên';

  return (
    <div className="p-4 sm:p-5 max-w-6xl mx-auto w-full space-y-5">
      {/* Welcome Banner */}
      <WelcomeBanner displayName={displayName} />

      {/* Quick Stats Grid */}
      <StatsGrid stats={stats} />

      {/* Grid: Notifications + Recent History */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 items-stretch">
        
        {/* Notifications */}
        <NotificationCard notifications={notifications} />

        {/* History */}
        <section className="ui-card p-5 h-full flex flex-col">
          <div className="mb-3 flex items-center justify-between shrink-0 flex-wrap gap-2">
            <h2 className="text-sm sm:text-base font-bold text-[#1A1B1E] shrink-0">Lịch sử gần đây</h2>
            
            {/* Inline Header Filters */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <select
                value={semesterFilter}
                onChange={(e) => setSemesterFilter(e.target.value)}
                className="text-[10px] sm:text-xs border border-gray-200 rounded-md px-1.5 py-0.5 bg-white text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer h-7"
              >
                <option value="all">Tất cả kỳ</option>
                <option value="HK1">Học kỳ I</option>
                <option value="HK2">Học kỳ II</option>
              </select>

              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="text-[10px] sm:text-xs border border-gray-200 rounded-md px-1.5 py-0.5 bg-white text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer h-7"
              >
                <option value="all">Tất cả năm</option>
                {uniqueYears.map(yr => (
                  <option key={yr} value={yr}>{yr}</option>
                ))}
              </select>

              <Link
                href="/student/history"
                className="flex items-center gap-0.5 text-xs font-bold text-[#3B5BDB] transition-colors hover:text-[#4C6EF5] ml-1 whitespace-nowrap"
              >
                Xem tất cả <ArrowRightIcon size={12} />
              </Link>
            </div>
          </div>

          {/* Scrollable list with empty state */}
          <div className="divide-y divide-gray-100 overflow-y-auto pr-1 flex-1 max-h-[300px] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
            {filteredHistory.length === 0 ? (
              <div className="py-12 text-center text-xs text-gray-400 italic">
                Không có dữ liệu phù hợp
              </div>
            ) : (
              filteredHistory.map((item, index) => {
                const semLabel = item.semester && typeof item.semester === 'object'
                  ? `${item.semester.semester === 'SEMESTER_1' ? 'HK1' : 'HK2'} ${item.semester.year}`
                  : `${item.semester}`;
                const score = item.finalScore !== null && item.finalScore !== undefined 
                  ? item.finalScore 
                  : item.classScore !== null && item.classScore !== undefined 
                  ? item.classScore 
                  : item.studentScore;
                const badgeColors = getBadgeColors(item.status);
                const rankColors = getRankBadgeColors(item.rank || item.rating);
                const rankText = getRankText(item.rank || item.rating);
                const statusText = getStatusText(item.status);

                return (
                  <div
                    key={item.id || index}
                    className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0 animate-fade-in"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-[#1A1B1E]">{semLabel}</p>
                      <span className={`mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${badgeColors.bg} ${badgeColors.text}`}>
                        {statusText}
                      </span>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-2xl font-semibold text-[#1A1B1E]">{score}</p>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold mt-1 ${rankColors.bg} ${rankColors.text}`}>{rankText}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;

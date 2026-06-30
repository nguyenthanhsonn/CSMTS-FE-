'use client';

import Link from 'next/link';
import { FileText, Bell, CheckCircle, Clock, Award, ArrowRight, TrendingUp, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import type { Student } from '../../types/student';

export const StudentDashboard = () => {
  const user = useAuthStore((state) => state.user) as Student;

  const stats = [
    {
      icon: FileText,
      label: 'Phiếu chờ nộp',
      value: '1',
      bg: 'bg-[#FFF3BF]',
      iconColor: 'text-[#E67700]',
      trend: '+0 tuần này',
      trendColor: 'text-[#E67700]',
    },
    {
      icon: Clock,
      label: 'Đang xét duyệt',
      value: '0',
      bg: 'bg-[#E7F5FF]',
      iconColor: 'text-[#3B5BDB]',
      trend: 'Không có',
      trendColor: 'text-[#868E96]',
    },
    {
      icon: CheckCircle,
      label: 'Đã hoàn thành',
      value: '2',
      bg: 'bg-[#EBFBEE]',
      iconColor: 'text-[#2F9E44]',
      trend: '+1 học kỳ này',
      trendColor: 'text-[#2F9E44]',
    },
    {
      icon: Award,
      label: 'Điểm TB',
      value: '85',
      bg: 'bg-[#F3F0FF]',
      iconColor: 'text-[#6741D9]',
      trend: '+3 so với kỳ trước',
      trendColor: 'text-[#2F9E44]',
    },
  ];

  const notifications = [
    {
      type: 'deadline',
      title: 'Hạn nộp phiếu đánh giá HK1 2024-2025',
      description: 'Thời hạn: 31/12/2024 — Còn 5 ngày',
      borderColor: 'border-l-[#E67700]',
      bg: 'bg-[#FFF9DB]',
      textColor: 'text-[#7C4A03]',
      descColor: 'text-[#9B5E13]',
      dot: 'bg-[#E67700]',
    },
    {
      type: 'info',
      title: 'Cập nhật minh chứng hoạt động',
      description: 'Vui lòng tải lên minh chứng cho các hoạt động đã tham gia',
      borderColor: 'border-l-[#3B5BDB]',
      bg: 'bg-[#EDF2FF]',
      textColor: 'text-[#1E3A8A]',
      descColor: 'text-[#3151BE]',
      dot: 'bg-[#3B5BDB]',
    },
  ];

  const history = [
    {
      semester: 'HK2 2023-2024',
      status: 'Đã phê duyệt',
      score: 88,
      rating: 'Xuất sắc',
      badgeBg: 'bg-[#EBFBEE]',
      badgeText: 'text-[#2F9E44]',
      scoreColor: 'text-[#2F9E44]',
    },
    {
      semester: 'HK1 2023-2024',
      status: 'Đã phê duyệt',
      score: 82,
      rating: 'Tốt',
      badgeBg: 'bg-[#E7F5FF]',
      badgeText: 'text-[#3B5BDB]',
      scoreColor: 'text-[#3B5BDB]',
    },
    {
      semester: 'HK2 2022-2023',
      status: 'Đã phê duyệt',
      score: 79,
      rating: 'Khá',
      badgeBg: 'bg-[#F3F0FF]',
      badgeText: 'text-[#6741D9]',
      scoreColor: 'text-[#6741D9]',
    },
  ];

  const quickLinks = [
    { label: 'Nộp phiếu đánh giá', href: '/student/evaluation', color: 'bg-[#3B5BDB]', hover: 'hover:bg-[#4C6EF5]' },
    { label: 'Quản lý minh chứng', href: '/student/evidence', color: 'bg-[#2F9E44]', hover: 'hover:bg-[#37B24D]' },
    { label: 'Xem kết quả', href: '/student/results', color: 'bg-[#6741D9]', hover: 'hover:bg-[#7950F2]' },
  ];

  return (
    <div className="p-4 sm:p-6 flex flex-col gap-5 max-w-7xl mx-auto w-full">
      {/* Greeting */}
      <div className="rounded-2xl bg-gradient-to-br from-[#3B5BDB] via-[#4C6EF5] to-[#6741D9] p-6 text-white shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-200">Xin chào trở lại 👋</p>
            <h1 className="mt-1 text-2xl font-bold leading-tight">
              {user?.fullName ?? 'Sinh viên'}
            </h1>
            <p className="mt-1.5 text-sm text-blue-200">
              Mã SV: <span className="font-semibold text-white">{user?.studentCode ?? '---'}</span>
              {' '}·{' '}
              Lớp: <span className="font-semibold text-white">{user?.className ?? '---'}</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end">
            <span className="rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold text-white backdrop-blur-sm">
              HK1 2024-2025
            </span>
            <span className="text-xs text-blue-200">Học kỳ hiện tại</span>
          </div>
        </div>

        {/* Quick links inside greeting */}
        <div className="mt-5 flex flex-wrap gap-2">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1.5 rounded-lg ${link.color} ${link.hover} px-4 py-2 text-sm font-semibold text-white transition-all duration-150 hover:shadow-lg`}
            >
              {link.label}
              <ChevronRight size={14} />
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="ui-card group flex items-center justify-between p-3 sm:px-5 sm:py-4 transition-all duration-200 hover:-translate-y-0.5">
              <div>
                <p className="text-[13px] font-medium text-[#868E96]">{stat.label}</p>
                <p className="mt-1 text-[26px] sm:text-[30px] font-bold leading-none text-[#1A1B1E]">{stat.value}</p>
                <p className={`mt-1.5 text-[11px] font-semibold ${stat.trendColor}`}>
                  <TrendingUp size={10} className="mr-0.5 inline" />
                  {stat.trend}
                </p>
              </div>
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] ${stat.bg} ${stat.iconColor} transition-transform duration-200 group-hover:scale-110`}>
                <Icon size={22} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Row 2: Notifications + History */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[5fr_7fr]">
        {/* Notifications */}
        <section className="ui-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-bold text-[#1A1B1E]">
              <Bell size={18} className="text-[#E67700]" />
              Thông báo
            </h2>
            <span className="rounded-full bg-[#FFF3BF] px-2.5 py-0.5 text-xs font-bold text-[#E67700]">
              {notifications.length}
            </span>
          </div>
          <div className="space-y-2">
            {notifications.map((item) => (
              <div
                key={item.type}
                className={`relative flex gap-3 rounded-lg border-l-[3px] ${item.borderColor} ${item.bg} px-3.5 py-3 transition-opacity hover:opacity-90`}
              >
                <span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${item.dot}`} />
                <div className="min-w-0">
                  <p className={`text-sm font-semibold ${item.textColor}`}>{item.title}</p>
                  <p className={`mt-0.5 text-xs leading-relaxed ${item.descColor}`}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* History */}
        <section className="ui-card p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold text-[#1A1B1E]">Lịch sử gần đây</h2>
            <Link
              href="/student/history"
              className="flex items-center gap-1 text-sm font-semibold text-[#3B5BDB] transition-colors hover:text-[#4C6EF5]"
            >
              Xem tất cả <ArrowRight size={14} />
            </Link>
          </div>
          <div>
            {history.map((item, index) => (
              <div
                key={item.semester}
                className={`flex items-center justify-between gap-4 py-3 ${
                  index !== history.length - 1 ? 'border-b border-[#E9ECEF]' : ''
                }`}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#1A1B1E]">{item.semester}</p>
                  <span className="mt-1 inline-flex items-center rounded-md bg-[#EBFBEE] px-2 py-0.5 text-[11px] font-semibold text-[#2F9E44]">
                    {item.status}
                  </span>
                </div>
                <div className="shrink-0 text-right">
                  <p className={`text-xl font-bold ${item.scoreColor}`}>{item.score}</p>
                  <span className={`ui-badge ${item.badgeBg} ${item.badgeText}`}>{item.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;

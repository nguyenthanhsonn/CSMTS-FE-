'use client';

import Link from 'next/link';
import { Users, GraduationCap, Building2, School, UserCog, BookOpen, ArrowRight } from 'lucide-react';
import { mockDashboardStats, mockFaculties } from '../../services/mockData';

export const AdminDashboard = () => {
  const stats = [
    {
      icon: Users,
      label: 'Tổng số tài khoản',
      value: mockDashboardStats.totalUsers.toLocaleString('vi-VN'),
      borderColor: 'border-t-[#3B5BDB]',
      iconBg: 'bg-[#EDF2FF]',
      iconColor: 'text-[#3B5BDB]',
      sub: 'Toàn hệ thống',
    },
    {
      icon: GraduationCap,
      label: 'Sinh viên',
      value: mockDashboardStats.totalStudents.toLocaleString('vi-VN'),
      borderColor: 'border-t-[#2F9E44]',
      iconBg: 'bg-[#EBFBEE]',
      iconColor: 'text-[#2F9E44]',
      sub: 'Đang theo học',
    },
    {
      icon: UserCog,
      label: 'Quản trị viên',
      value: mockDashboardStats.totalAdmins.toLocaleString('vi-VN'),
      borderColor: 'border-t-[#6741D9]',
      iconBg: 'bg-[#F3F0FF]',
      iconColor: 'text-[#6741D9]',
      sub: 'Tài khoản admin',
    },
    {
      icon: Building2,
      label: 'Khoa',
      value: mockDashboardStats.totalFaculties.toLocaleString('vi-VN'),
      borderColor: 'border-t-[#E67700]',
      iconBg: 'bg-[#FFF9DB]',
      iconColor: 'text-[#E67700]',
      sub: 'Đang hoạt động',
    },
    {
      icon: BookOpen,
      label: 'Ngành học',
      value: mockDashboardStats.totalMajors.toLocaleString('vi-VN'),
      borderColor: 'border-t-[#F06595]',
      iconBg: 'bg-[#FFF0F6]',
      iconColor: 'text-[#D6336C]',
      sub: 'Chuyên ngành',
    },
    {
      icon: School,
      label: 'Lớp',
      value: mockDashboardStats.totalClasses.toLocaleString('vi-VN'),
      borderColor: 'border-t-[#20C997]',
      iconBg: 'bg-[#E6FCF5]',
      iconColor: 'text-[#0CA678]',
      sub: 'Lớp học phần',
    },
  ];

  const today = new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date());

  const facultyStats = mockFaculties.map((faculty, index) => {
    const values = [420, 330, 260, 190];
    return {
      name: faculty.name,
      students: values[index] ?? 0,
    };
  });
  const totalFacultyStudents = facultyStats.reduce((sum, item) => sum + item.students, 0);
  const maxStudents = Math.max(...facultyStats.map((f) => f.students));

  const activities = [
    { color: 'bg-[#2F9E44]', ring: 'ring-[#EBFBEE]', label: 'Thêm mới', content: 'Thêm 25 sinh viên mới vào hệ thống', time: '2 giờ trước' },
    { color: 'bg-[#E67700]', ring: 'ring-[#FFF9DB]', label: 'Cập nhật', content: 'Cập nhật thông tin lớp CNTT-K19', time: '5 giờ trước' },
    { color: 'bg-[#6741D9]', ring: 'ring-[#F3F0FF]', label: 'Import', content: 'Import danh sách lớp QTKD từ Excel', time: '1 ngày trước' },
    { color: 'bg-[#3B5BDB]', ring: 'ring-[#EDF2FF]', label: 'Thêm mới', content: 'Tạo ngành học mới: Trí tuệ nhân tạo', time: '2 ngày trước' },
  ];

  const activityLabelColor: Record<string, string> = {
    'Thêm mới': 'bg-[#EBFBEE] text-[#2F9E44]',
    'Cập nhật': 'bg-[#FFF9DB] text-[#E67700]',
    'Import': 'bg-[#F3F0FF] text-[#6741D9]',
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5">

      {/* Header Section */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="ui-page-title">Dashboard</h1>
          <p className="mt-1 text-sm capitalize text-[#868E96]">{today}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`ui-card group flex items-center gap-4 border-t-[3px] p-5 transition-all duration-200 hover:-translate-y-0.5 ${stat.borderColor}`}
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor} transition-transform duration-200 group-hover:scale-110`}>
                <Icon size={24} />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-[#868E96]">{stat.label}</p>
                <p className="mt-0.5 text-[30px] font-bold leading-none text-[#1A1B1E]">{stat.value}</p>
                <p className="mt-1 text-xs text-[#ADB5BD]">{stat.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Row 2: Faculty stats + Activity feed */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

        {/* Faculty stats */}
        <section className="ui-card p-5">
          <div className="mb-5">
            <h2 className="text-base font-bold text-[#1A1B1E]">Thống kê theo khoa</h2>
            <p className="mt-1 text-sm text-[#868E96]">Tổng số sinh viên theo từng khoa</p>
          </div>
          <div className="space-y-5">
            {facultyStats.map((faculty) => {
              const percent = totalFacultyStudents ? (faculty.students / totalFacultyStudents) * 100 : 0;
              const isMax = faculty.students === maxStudents;
              return (
                <div key={faculty.name}>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-2">
                      {isMax && (
                        <span className="shrink-0 rounded-full bg-[#EDF2FF] px-1.5 py-0.5 text-[10px] font-bold text-[#3B5BDB]">
                          TOP
                        </span>
                      )}
                      <span className="truncate text-sm font-semibold text-[#1A1B1E]">{faculty.name}</span>
                    </div>
                    <span className="shrink-0 text-sm font-bold text-[#3B5BDB]">{faculty.students} SV</span>
                  </div>
                  <div className="relative h-2 overflow-hidden rounded-full bg-[#EDF2FF]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#3B5BDB] to-[#4C6EF5] transition-all duration-700"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <p className="mt-1 text-right text-[11px] text-[#ADB5BD]">{percent.toFixed(1)}% tổng SV</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Activity feed */}
        <section className="ui-card p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-base font-bold text-[#1A1B1E]">Hoạt động gần đây</h2>
            <Link
              href="/admin/users"
              className="flex items-center gap-1 text-sm font-semibold text-[#3B5BDB] transition-colors hover:text-[#4C6EF5]"
            >
              Xem tất cả <ArrowRight size={14} />
            </Link>
          </div>
          <div className="relative space-y-4">
            {/* Timeline line */}
            <div className="absolute bottom-2 left-[7px] top-2 w-px bg-[#E9ECEF]" />
            {activities.map((activity, index) => (
              <div key={index} className="relative flex items-start gap-4">
                <span
                  className={`relative z-10 mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full ring-4 ring-white ${activity.color}`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${activityLabelColor[activity.label] ?? 'bg-gray-100 text-gray-600'}`}>
                      {activity.label}
                    </span>
                    <p className="text-sm font-semibold text-[#1A1B1E]">{activity.content}</p>
                  </div>
                  <p className="mt-0.5 text-xs text-[#868E96]">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;

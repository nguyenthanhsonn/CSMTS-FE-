import { LucideIcon } from 'lucide-react';

export interface AdminStatItem {
  icon: LucideIcon;
  label: string;
  value: string;
  borderColor: string;
  iconBg: string;
  iconColor: string;
  sub: string;
}

export interface AdminStatsGridProps {
  stats: AdminStatItem[];
}

export interface FacultyStatItem {
  name: string;
  students: number;
}

export interface AdminFacultyStatsCardProps {
  facultyStats: FacultyStatItem[];
  totalFacultyStudents: number;
  maxStudents: number;
}

export interface ActivityItem {
  color: string;
  ring: string;
  label: string;
  content: string;
  time: string;
}

export interface AdminActivityFeedCardProps {
  activities: ActivityItem[];
  activityLabelColor: Record<string, string>;
}

export interface ImportResult {
  success: number;
  failed: number;
  errors: string[];
}

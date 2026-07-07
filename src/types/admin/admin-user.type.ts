import type { User } from '../common';

export interface Admin extends User {
  role: 'admin';
  fullName: string;
  email: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalStudents: number;
  totalAdmins: number;
  totalFaculties: number;
  totalMajors: number;
  totalClasses: number;
}

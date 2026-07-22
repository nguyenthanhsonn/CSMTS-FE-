import type { User } from '../common';

export interface StudentClass {
  id: string;
  code: string;
  name: string;
  enrollmentYear: number;
}

export interface StudentMajor {
  id: string;
  code: string;
  name: string;
}

export interface StudentFaculty {
  id: string;
  code: string;
  name: string;
}

export interface Student extends User {
  role: 'student';
  studentCode: string;
  fullName: string;
  email?: string;
  dateOfBirth: string;
  className?: string;
  major?: string | StudentMajor;
  faculty?: string | StudentFaculty;
  admissionYear?: number;
  phoneNumber?: string;
  phone?: string;
  class?: StudentClass;
}

export interface StudentInfo {
  admissionYear: string;
  majorId: string;
  facultyId: string;
  classId: string;
  studentCode: string;
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
}

export type ManagedClass = {
  classId?: string;
  classCode?: string;
  className?: string;
  enrollmentYear?: number;
  studentCount?: number;
  major?: { name?: string } | null;
  faculty?: { name?: string } | null;
};

export type ProfileUser = User & Partial<Omit<Student, 'role'>> & {
  managedClasses?: ManagedClass[];
};

export type StudentProfilePayload = Partial<Student> & {
  user?: Partial<Student> | null;
  studentCode?: string | null;
  fullName?: string | null;
  email?: string | null;
  phone?: string | null;
  phoneNumber?: string | null;
  dateOfBirth?: string | null;
};

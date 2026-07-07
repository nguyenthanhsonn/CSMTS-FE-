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

import type { User } from '../common';

export interface Student extends User {
  role: 'student';
  studentCode: string;
  fullName: string;
  dateOfBirth: string;
  className: string;
  major: string;
  faculty: string;
  admissionYear: number;
  phoneNumber?: string;
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

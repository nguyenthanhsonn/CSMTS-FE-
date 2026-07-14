export interface Faculty {
  id: string;
  code: string;
  name: string;
  isActive: boolean;
}

export interface Major {
  id: string;
  code: string;
  name: string;
  facultyId: string;
  isActive: boolean;
  faculty?: Faculty;
}

export interface Class {
  id: string;
  code: string;
  name: string;
  majorId: string;
  facultyId: string;
  isActive: boolean;
  enrollmentYear?: number;
  createdAt?: string;
  deletedAt?: string | null;
  studentCount?: number;
  major?: Major;
  faculty?: Faculty;
  councils?: ClassCouncil[];
}

export interface ClassCouncil {
  id: string;
  userId: string;
  username: string;
  fullName: string;
  email: string;
  isActive: boolean;
  assignedAt?: string;
}

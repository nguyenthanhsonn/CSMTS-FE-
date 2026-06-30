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
}

export interface Class {
  id: string;
  code: string;
  name: string;
  majorId: string;
  facultyId: string;
  isActive: boolean;
}

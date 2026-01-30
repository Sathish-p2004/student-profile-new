export interface StudentInfo {
  registerNumber: string;
  name: string;
  age: number | '';
  fatherName: string;
  motherName: string;
  address: string;
}

export type SubjectName = 'Math' | 'English' | 'Science' | 'Social Studies' | 'Computer';

export interface SubjectData {
  name: SubjectName;
  marks: number | '';
}

export interface AttendanceData {
  percentage: number | '';
}

export interface FullStudentProfile {
  info: StudentInfo;
  subjects: SubjectData[];
  attendance: AttendanceData;
}

// Authentication Types
export interface User {
  name: string;
  email: string;
}

// Logic Types
export enum Grade {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  F = 'F'
}

export enum AttendanceStatus {
  Excellent = 'Excellent',
  Satisfactory = 'Satisfactory',
  Low = 'Low Attendance'
}
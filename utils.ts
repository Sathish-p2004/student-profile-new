import { Grade, AttendanceStatus } from './types';

export const calculateGrade = (marks: number): Grade => {
  if (marks >= 90) return Grade.A;
  if (marks >= 75) return Grade.B;
  if (marks >= 60) return Grade.C;
  if (marks >= 40) return Grade.D;
  return Grade.F;
};

export const getAttendanceStatus = (percentage: number): AttendanceStatus => {
  if (percentage >= 90) return AttendanceStatus.Excellent;
  if (percentage >= 75) return AttendanceStatus.Satisfactory;
  return AttendanceStatus.Low;
};

export const getGradeColor = (grade: Grade): string => {
  switch (grade) {
    case Grade.A: return 'text-green-600 bg-green-50 border-green-200';
    case Grade.B: return 'text-blue-600 bg-blue-50 border-blue-200';
    case Grade.C: return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case Grade.D: return 'text-orange-600 bg-orange-50 border-orange-200';
    case Grade.F: return 'text-red-600 bg-red-50 border-red-200';
    default: return 'text-gray-600';
  }
};

export const getAttendanceColor = (status: AttendanceStatus): string => {
  switch (status) {
    case AttendanceStatus.Excellent: return 'text-emerald-700 bg-emerald-100 border-emerald-300';
    case AttendanceStatus.Satisfactory: return 'text-blue-700 bg-blue-100 border-blue-300';
    case AttendanceStatus.Low: return 'text-rose-700 bg-rose-100 border-rose-300';
    default: return 'text-gray-600';
  }
};
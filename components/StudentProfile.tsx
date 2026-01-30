import React from 'react';
import { FullStudentProfile } from '../types';
import { calculateGrade, getAttendanceStatus, getGradeColor, getAttendanceColor } from '../utils';
import { CheckCircle, Award, Printer, RotateCcw, LayoutDashboard } from 'lucide-react';

interface StudentProfileProps {
  data: FullStudentProfile;
  onReset: () => void;
  onBackToDashboard?: () => void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ data, onReset, onBackToDashboard }) => {
  const attendanceStatus = getAttendanceStatus(Number(data.attendance.percentage));
  const attendanceColorClass = getAttendanceColor(attendanceStatus);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 no-print">
        <h2 className="text-xl font-bold text-slate-800">Student Academic Record</h2>
        <div className="flex flex-wrap gap-3">
          {onBackToDashboard && (
            <button 
              onClick={onBackToDashboard}
              className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </button>
          )}
          <button 
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Create Another
          </button>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 shadow-sm transition-colors"
          >
            <Printer className="w-4 h-4" /> Print Record
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden print-shadow-none print:border-none">
        
        {/* Header Ribbon */}
        <div className="bg-slate-900 h-2 w-full print:bg-slate-900"></div>
        
        <div className="p-8 md:p-10 space-y-8">
          
          {/* 1. Profile Header & Info */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-8 gap-6">
            <div>
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                Official Record
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">{data.info.name}</h1>
              <p className="text-slate-500 font-medium">Reg. No: <span className="text-slate-900">{data.info.registerNumber}</span></p>
            </div>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <div className="text-slate-500">Age:</div>
              <div className="font-medium text-slate-900">{data.info.age} Years</div>
              
              <div className="text-slate-500">Father:</div>
              <div className="font-medium text-slate-900">{data.info.fatherName}</div>
              
              <div className="text-slate-500">Mother:</div>
              <div className="font-medium text-slate-900">{data.info.motherName}</div>
              
              <div className="text-slate-500">Address:</div>
              <div className="font-medium text-slate-900 max-w-[200px] truncate" title={data.info.address}>{data.info.address}</div>
            </div>
          </div>

          {/* 2. Academic Performance Table */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-lg text-slate-800">Academic Evaluation</h3>
            </div>
            
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Subject</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Marks Scored</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Grade</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {data.subjects.map((subject) => {
                    const grade = calculateGrade(Number(subject.marks));
                    return (
                      <tr key={subject.name}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{subject.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-slate-600 font-mono">{subject.marks} / 100</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getGradeColor(grade)}`}>
                            {grade}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. Attendance Status */}
          <section className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-lg text-slate-800">Attendance Record</h3>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative">
                 {/* Simple Progress Circle Visual */}
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    className="text-slate-200"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="48"
                    cy="48"
                  />
                  <circle
                    className={attendanceColorClass.split(' ')[0]} // Use the text color class for the stroke
                    strokeWidth="8"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * Number(data.attendance.percentage)) / 100}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="48"
                    cy="48"
                  />
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <span className="text-lg font-bold text-slate-800">{data.attendance.percentage}%</span>
                </div>
              </div>

              <div className="flex-1">
                <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-1">Interpretation</h4>
                <div className={`inline-flex items-center px-4 py-2 rounded-lg border ${attendanceColorClass} font-bold`}>
                  {attendanceStatus}
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  *Based on total working days within the academic session.
                </p>
              </div>
            </div>
          </section>

          {/* Footer for print */}
          <div className="hidden print:flex justify-between items-end pt-12 mt-8 border-t border-slate-200">
            <div className="text-center">
              <div className="h-px w-32 bg-slate-400 mb-2"></div>
              <p className="text-xs text-slate-500">Principal Signature</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-400">Generated on {new Date().toLocaleDateString()}</p>
            </div>
            <div className="text-center">
              <div className="h-px w-32 bg-slate-400 mb-2"></div>
              <p className="text-xs text-slate-500">Class Teacher Signature</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
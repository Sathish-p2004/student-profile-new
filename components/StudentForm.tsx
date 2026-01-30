import React, { useState } from 'react';
import { FullStudentProfile, SubjectName } from '../types';
import { Layers, User, BookOpen, Clock, AlertCircle } from 'lucide-react';

interface StudentFormProps {
  onSubmit: (data: FullStudentProfile) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ onSubmit }) => {
  const [registerNumber, setRegisterNumber] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [address, setAddress] = useState('');
  
  const [marks, setMarks] = useState<Record<SubjectName, number | ''>>({
    Math: '',
    English: '',
    Science: '',
    'Social Studies': '',
    Computer: ''
  });

  const [attendance, setAttendance] = useState<number | ''>('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleMarkChange = (subject: SubjectName, value: string) => {
    const numVal = value === '' ? '' : Number(value);
    if (numVal !== '' && (numVal < 0 || numVal > 100)) return; // Basic clamp
    setMarks(prev => ({ ...prev, [subject]: numVal }));
  };

  const validate = (): boolean => {
    const newErrors: string[] = [];
    if (!registerNumber.trim()) newErrors.push("Register Number is required.");
    if (!name.trim()) newErrors.push("Student Name is required.");
    if (age === '' || age < 1) newErrors.push("Valid Age is required.");
    if (!fatherName.trim()) newErrors.push("Father's Name is required.");
    if (!motherName.trim()) newErrors.push("Mother's Name is required.");
    if (!address.trim()) newErrors.push("Address is required.");
    
    Object.entries(marks).forEach(([subject, mark]) => {
      if (mark === '') newErrors.push(`${subject} marks are required.`);
    });

    if (attendance === '') newErrors.push("Attendance percentage is required.");

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        info: { registerNumber, name, age, fatherName, motherName, address },
        subjects: Object.entries(marks).map(([name, marks]) => ({ name: name as SubjectName, marks })),
        attendance: { percentage: attendance }
      });
    } else {
      // Scroll to top to see errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-900 p-6 text-white">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-400" />
          Create Student Profile
        </h2>
        <p className="text-slate-400 text-sm mt-1">Enter details below to generate the academic record.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
        
        {/* Error Display */}
        {errors.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex items-center gap-2 text-red-700 font-semibold mb-2">
              <AlertCircle className="w-5 h-5" />
              <span>Please correct the following errors:</span>
            </div>
            <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
              {errors.map((err, idx) => <li key={idx}>{err}</li>)}
            </ul>
          </div>
        )}

        {/* Section 1: Student Information */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-slate-800 border-b pb-2">
            <User className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-lg">Student Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Register Number <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                value={registerNumber}
                onChange={(e) => setRegisterNumber(e.target.value)}
                placeholder="e.g. 2024-001"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Full Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Age <span className="text-red-500">*</span></label>
              <input 
                type="number" 
                value={age}
                onChange={(e) => setAge(e.target.value === '' ? '' : parseInt(e.target.value))}
                placeholder="e.g. 15"
                min="1" max="100"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Father's Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                placeholder="John Doe Sr."
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Mother's Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                value={motherName}
                onChange={(e) => setMotherName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div className="col-span-1 md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-slate-700">Address <span className="text-red-500">*</span></label>
              <textarea 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Education Lane, Knowledge City"
                rows={2}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Academic Performance */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-slate-800 border-b pb-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-lg">Academic Performance (Marks out of 100)</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {(['Math', 'English', 'Science', 'Social Studies', 'Computer'] as SubjectName[]).map((subject) => (
              <div key={subject} className="space-y-2">
                <label className="text-sm font-medium text-slate-700 block truncate" title={subject}>{subject}</label>
                <input 
                  type="number" 
                  value={marks[subject]}
                  onChange={(e) => handleMarkChange(subject, e.target.value)}
                  placeholder="0-100"
                  min="0" max="100"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-center font-mono"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Attendance */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-slate-800 border-b pb-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-lg">Attendance</h3>
          </div>
          
          <div className="max-w-xs">
            <label className="text-sm font-medium text-slate-700">Overall Attendance Percentage <span className="text-red-500">*</span></label>
            <div className="relative mt-2">
              <input 
                type="number" 
                value={attendance}
                onChange={(e) => {
                  const val = e.target.value === '' ? '' : Number(e.target.value);
                  if (val === '' || (val >= 0 && val <= 100)) setAttendance(val);
                }}
                placeholder="e.g. 92"
                min="0" max="100"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all pr-8"
              />
              <span className="absolute right-3 top-2.5 text-slate-400 font-medium">%</span>
            </div>
          </div>
        </section>

        <div className="pt-4 flex justify-end">
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Generate Profile
          </button>
        </div>

      </form>
    </div>
  );
};

export default StudentForm;
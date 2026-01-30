import React from 'react';
import { User, LogOut, Plus, Users, TrendingUp, GraduationCap, FileText } from 'lucide-react';
import { User as UserType } from '../types';

interface DashboardProps {
  user: UserType;
  onNavigateToForm: () => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigateToForm, onLogout }) => {
  return (
    <div className="animate-fade-in space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-slate-300">Here's what's happening in your academic portal today.</p>
        </div>
        <button 
          onClick={onNavigateToForm}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg shadow-blue-900/30 transition-all transform hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          Create New Profile
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Students</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-2">1,248</h3>
            <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
              <span className="font-semibold">+12%</span> from last term
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Class Average</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-2">B+</h3>
            <p className="text-sm text-slate-400 mt-1">
              Stable performance
            </p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Reports Generated</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-2">84</h3>
            <p className="text-sm text-blue-600 mt-1">
              This month
            </p>
          </div>
          <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
            <FileText className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Activity Mockup */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-lg text-slate-800">Recent Student Profiles</h3>
          <button className="text-blue-600 text-sm font-medium hover:text-blue-700">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50">
              <tr>
                <th className="px-6 py-3 font-semibold">Student Name</th>
                <th className="px-6 py-3 font-semibold">Register No.</th>
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">Sarah Williams</td>
                <td className="px-6 py-4 text-slate-500">2024-042</td>
                <td className="px-6 py-4 text-slate-500">Oct 24, 2024</td>
                <td className="px-6 py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Completed</span></td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">Michael Chen</td>
                <td className="px-6 py-4 text-slate-500">2024-038</td>
                <td className="px-6 py-4 text-slate-500">Oct 23, 2024</td>
                <td className="px-6 py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Completed</span></td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">Emily Rodriguez</td>
                <td className="px-6 py-4 text-slate-500">2024-035</td>
                <td className="px-6 py-4 text-slate-500">Oct 22, 2024</td>
                <td className="px-6 py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Draft</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
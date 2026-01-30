import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import StudentForm from './components/StudentForm';
import StudentProfile from './components/StudentProfile';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import { FullStudentProfile } from './types';
import { GraduationCap, Sparkles, LogOut, ArrowLeft } from 'lucide-react';

function App() {
  const { user, userData, logout } = useAuth();
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState<FullStudentProfile | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [view, setView] = useState<'dashboard' | 'form' | 'profile'>('dashboard');

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  // Student Profile Handlers
  const handleFormSubmit = (data: FullStudentProfile) => {
    setIsGenerating(true);
    setTimeout(() => {
      setStudentData(data);
      setIsGenerating(false);
      setView('profile');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500); // 1.5s delay for realistic "processing" feel
  };

  const handleResetProfile = () => {
    setStudentData(null);
    setView('form');
  };

  const handleBackToDashboard = () => {
    setStudentData(null);
    setView('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12 font-inter">
      {/* Header - Only show full header when logged in */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-200">
              <GraduationCap size={20} />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 leading-none">Student Profile Gen</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide mt-0.5">Academic Portal</p>
            </div>
          </div>

          {user && (
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-slate-800">{userData?.name || user.email}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
              <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 mt-8">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/" element={
            <ProtectedRoute>
              {
                // This section mimics the original internal routing for the main feature
                // You could also split these into separate Routes if desired
                isGenerating ? (
                  /* Loading State */
                  <div className="flex flex-col items-center justify-center h-[60vh] animate-fade-in">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-blue-600 animate-pulse" />
                      </div>
                    </div>
                    <h2 className="mt-6 text-xl font-semibold text-slate-800">Generating Academic Profile...</h2>
                    <p className="text-slate-500 mt-2 text-sm">Calculating grades and verifying attendance records.</p>
                  </div>
                ) : (
                  <div className="transition-opacity duration-300">
                    {/* Breadcrumb / Back Button */}
                    {(view === 'form' || view === 'profile') && (
                      <button
                        onClick={handleBackToDashboard}
                        className="mb-6 flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                      </button>
                    )}

                    {view === 'dashboard' && (
                      <Dashboard
                        user={{ name: userData?.name || 'User', email: user?.email || '' }}
                        onNavigateToForm={() => setView('form')}
                        onLogout={handleLogout}
                      />
                    )}

                    {view === 'form' && (
                      <StudentForm onSubmit={handleFormSubmit} />
                    )}

                    {view === 'profile' && studentData && (
                      <StudentProfile
                        data={studentData}
                        onReset={handleResetProfile}
                        onBackToDashboard={handleBackToDashboard}
                      />
                    )}
                  </div>
                )
              }
            </ProtectedRoute>
          } />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center text-slate-400 text-sm pb-8 no-print">
        <p>&copy; {new Date().getFullYear()} School Academic Demo System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
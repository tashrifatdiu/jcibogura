import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import AdminLogin from './AdminLogin';
import Profile from './Profile';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import CourseView from './CourseView';
import PublicCourseView from './PublicCourseView';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import { client, authService } from './lib/appwrite';

function App() {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    client.ping()
      .then(() => console.log('Appwrite connection successful!'))
      .catch((error) => console.error('Appwrite connection failed:', error));

    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        const isAdmin = authService.isAdmin(currentUser.email);
        setUserType(isAdmin ? 'admin' : 'user');
      }
    } catch (error) {
      console.error('Failed to check user:', error);
    } finally {
      setLoading(false);
      setInitialCheckDone(true);
    }
  };

  const handleLoginSuccess = () => {
    checkUser();
  };

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
    setUserType(null);
  };

  // Don't render anything until initial auth check is complete
  if (!initialCheckDone) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f3fafd' }}>
        <div style={{ textAlign: 'center' }}>
          <img 
            src="/jcilogo.jpeg" 
            alt="JCI Bogura" 
            style={{ 
              width: '120px', 
              height: '120px', 
              objectFit: 'contain', 
              marginBottom: '1rem',
              animation: 'pulse 1.5s ease-in-out infinite'
            }} 
          />
          <p style={{ fontSize: '1.25rem', color: '#7cc7d0' }}>Loading...</p>
          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.7; transform: scale(0.95); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Home Page */}
          <Route path="/" element={<Home />} />

          {/* Public Course Preview */}
          <Route path="/course/:courseId" element={<PublicCourseView />} />

          {/* Auth Routes */}
          <Route path="/login" element={
            user ? <Navigate to={userType === 'admin' ? '/admin' : '/courses'} replace /> : 
            <Login onLoginSuccess={handleLoginSuccess} />
          } />
          <Route path="/register" element={
            user ? <Navigate to="/courses" replace /> : 
            <Register onRegisterSuccess={handleLoginSuccess} />
          } />
          <Route path="/admin-login" element={
            user ? <Navigate to="/admin" replace /> : 
            <AdminLogin onLoginSuccess={handleLoginSuccess} />
          } />

          {/* Protected User Routes */}
          <Route path="/courses" element={
            user && userType === 'user' ? 
            <UserDashboard user={user} onLogout={handleLogout} /> : 
            <Navigate to="/login" replace />
          } />
          <Route path="/courses/:courseId" element={
            user && userType === 'user' ? 
            <CourseView user={user} onLogout={handleLogout} /> : 
            <Navigate to="/login" replace />
          } />
          <Route path="/profile" element={
            user && userType === 'user' ? 
            <Profile user={user} onLogout={handleLogout} /> : 
            <Navigate to="/login" replace />
          } />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={
            user && userType === 'admin' ? 
            <AdminDashboard onLogout={handleLogout} /> : 
            <Navigate to="/admin-login" replace />
          } />
          <Route path="/admin/submissions" element={
            user && userType === 'admin' ? 
            <AdminDashboard onLogout={handleLogout} initialView="submissions" /> : 
            <Navigate to="/admin-login" replace />
          } />

          {/* Public Info Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* 404 Route */}
          <Route path="*" element={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f3fafd' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</div>
                <p style={{ fontSize: '1.5rem', color: '#1d1a36', marginBottom: '1rem' }}>Page Not Found</p>
                <a href="/" style={{ color: '#2197cd', textDecoration: 'underline' }}>Go Home</a>
              </div>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

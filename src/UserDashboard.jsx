import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { courseService } from './lib/courseService';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import LoadingSpinner from './components/LoadingSpinner';

function UserDashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { colors, isDark, toggleTheme } = theme;
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState([]);
  const [courseStats, setCourseStats] = useState({ inProgress: 0, completed: 0 });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [coursesData, progressStats] = await Promise.all([
        courseService.getAllCourses(),
        courseService.getCourseProgressStats(user.$id)
      ]);
      setCourses(coursesData);
      setUserProgress(progressStats);
      setCourseStats({
        inProgress: progressStats.inProgress.length,
        completed: progressStats.completed.length
      });
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.overview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.background, transition: 'background-color 0.3s', display: 'flex', flexDirection: 'column' }}>
      <Navbar user={user} onLogout={onLogout} />
      
      <div style={{ flex: 1 }}>
      {/* Hero Section */}
      <div style={{ 
        background: isDark 
          ? 'linear-gradient(135deg, rgba(33, 151, 205, 0.05) 0%, rgba(124, 199, 208, 0.05) 100%)'
          : 'linear-gradient(135deg, rgba(33, 151, 205, 0.1) 0%, rgba(124, 199, 208, 0.1) 100%)',
        padding: 'clamp(2rem, 4vw, 3rem) clamp(1rem, 2vw, 1.5rem)',
        borderBottom: `1px solid ${colors.border}`
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: '700', color: colors.text, margin: 0, letterSpacing: '-1px' }}>
            Welcome back, {user.name?.split(' ')[0] || 'Student'}!
          </h1>
          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: colors.textSecondary, margin: '0.5rem 0 0 0' }}>
            Continue your learning journey
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(2rem, 4vw, 3rem) clamp(1rem, 2vw, 1.5rem)' }}>
        {/* Welcome Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ 
            fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', 
            fontWeight: '700', 
            color: colors.text, 
            marginBottom: '0.5rem',
            letterSpacing: '-1px'
          }}>
            Welcome back, {user.name}! 👋
          </h2>
          <p style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.125rem)', color: colors.textSecondary, marginBottom: '1.5rem' }}>
            Continue your learning journey
          </p>

          {/* Modern Search Bar */}
          <div style={{ maxWidth: '700px', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1.25rem', color: colors.textSecondary }}>
              🔍
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for courses..."
              style={{ 
                width: '100%',
                padding: '1rem 1.25rem 1rem 3.5rem',
                fontSize: '1rem',
                background: colors.inputBg,
                color: colors.text,
                border: `2px solid ${colors.border}`,
                borderRadius: '14px',
                outline: 'none',
                transition: 'all 0.3s',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = colors.primary;
                e.target.style.boxShadow = `0 4px 12px ${isDark ? 'rgba(33, 151, 205, 0.2)' : 'rgba(33, 151, 205, 0.15)'}`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = colors.border;
                e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
              }}
            />
          </div>
        </div>

        {/* Stats Cards with Modern Design */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          <div style={{ 
            background: colors.cardBg,
            borderRadius: '16px',
            padding: '1.75rem',
            boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)',
            border: `1px solid ${colors.border}`,
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '5rem', opacity: 0.1 }}>📚</div>
            <div style={{ fontSize: '3rem', fontWeight: '700', color: colors.primary, marginBottom: '0.5rem', position: 'relative' }}>
              {filteredCourses.length}
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: '600', color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Available Courses
            </div>
          </div>

          <div style={{ 
            background: colors.cardBg,
            borderRadius: '16px',
            padding: '1.75rem',
            boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)',
            border: `1px solid ${colors.border}`,
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '5rem', opacity: 0.1 }}>⏳</div>
            <div style={{ fontSize: '3rem', fontWeight: '700', color: colors.secondary, marginBottom: '0.5rem', position: 'relative' }}>
              {courseStats.inProgress}
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: '600', color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              In Progress
            </div>
          </div>

          <div style={{ 
            background: colors.cardBg,
            borderRadius: '16px',
            padding: '1.75rem',
            boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)',
            border: `1px solid ${colors.border}`,
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '5rem', opacity: 0.1 }}>✅</div>
            <div style={{ fontSize: '3rem', fontWeight: '700', color: colors.accent, marginBottom: '0.5rem', position: 'relative' }}>
              {courseStats.completed}
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: '600', color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Completed
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <LoadingSpinner message="Loading courses..." size="large" />
        ) : filteredCourses.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem', 
            background: colors.cardBg, 
            borderRadius: '16px', 
            boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)',
            border: `1px solid ${colors.border}`
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📚</div>
            <p style={{ fontSize: '1.25rem', fontWeight: '600', color: colors.text }}>No courses found</p>
            <p style={{ fontSize: '1rem', color: colors.textSecondary, marginTop: '0.5rem' }}>Try adjusting your search</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {filteredCourses.map((course) => (
              <div
                key={course.$id}
                onClick={() => navigate(`/courses/${course.$id}`)}
                style={{ 
                  background: colors.cardBg,
                  borderRadius: '16px',
                  boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: `1px solid ${colors.border}`,
                  transition: 'all 0.3s',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = isDark ? '0 12px 40px rgba(0,0,0,0.4)' : '0 12px 40px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)';
                }}
              >
                <div style={{ 
                  height: '180px',
                  background: isDark 
                    ? 'linear-gradient(135deg, rgba(33, 151, 205, 0.3) 0%, rgba(124, 199, 208, 0.3) 100%)'
                    : 'linear-gradient(135deg, #2197cd 0%, #7cc7d0 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ fontSize: '4rem', opacity: 0.3, position: 'relative', zIndex: 1 }}>📖</div>
                  <div style={{ 
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(155, 89, 182, 0.9)',
                    color: 'white',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    backdropFilter: 'blur(10px)'
                  }}>
                    NEW
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ 
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: colors.text,
                    marginBottom: '0.75rem',
                    lineHeight: '1.4'
                  }}>
                    {course.title}
                  </h3>
                  <p style={{ 
                    fontSize: '0.9rem',
                    color: colors.textSecondary,
                    marginBottom: '1.25rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: '1.6'
                  }}>
                    {course.overview}
                  </p>
                  <button style={{ 
                    width: '100%',
                    padding: '0.875rem',
                    background: colors.primary,
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    fontSize: '0.95rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = colors.primaryHover;
                    e.target.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = colors.primary;
                    e.target.style.transform = 'scale(1)';
                  }}
                  >
                    Start Learning →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>

      <Footer />
      <BackToTop />
    </div>
  );
}

export default UserDashboard;

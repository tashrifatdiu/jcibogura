import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { courseService } from './lib/courseService';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { colors, isDark } = theme;
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const coursesData = await courseService.getAllCourses();
      setCourses(coursesData);
    } catch (error) {
      console.error('Failed to load courses:', error);
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
      <Navbar user={null} onLogout={() => {}} />
      
      <div style={{ flex: 1 }}>
        {/* Hero Section */}
        <div style={{ 
          background: isDark 
            ? 'linear-gradient(135deg, rgba(33, 151, 205, 0.1) 0%, rgba(124, 199, 208, 0.1) 100%)'
            : 'linear-gradient(135deg, #2197cd 0%, #7cc7d0 100%)',
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1rem, 2vw, 1.5rem)',
          textAlign: 'center',
          color: isDark ? colors.text : 'white'
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{ 
              fontSize: 'clamp(2rem, 6vw, 3.5rem)', 
              fontWeight: '800', 
              marginBottom: '1rem',
              letterSpacing: '-2px',
              textShadow: isDark ? 'none' : '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              JCI Bogura Learning Platform
            </h1>
            <p style={{ 
              fontSize: 'clamp(1rem, 3vw, 1.25rem)', 
              marginBottom: '2rem',
              opacity: 0.95,
              lineHeight: 1.6
            }}>
              Explore our courses and start your learning journey today
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/register')}
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  background: isDark ? colors.primary : 'white',
                  color: isDark ? 'white' : colors.primary,
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }}
              >
                Get Started Free
              </button>
              <button
                onClick={() => navigate('/login')}
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  background: 'transparent',
                  color: isDark ? colors.text : 'white',
                  border: `2px solid ${isDark ? colors.border : 'white'}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = isDark ? colors.surface : 'rgba(255,255,255,0.1)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(2rem, 4vw, 3rem) clamp(1rem, 2vw, 1.5rem)' }}>
          {/* Search Bar */}
          <div style={{ maxWidth: '700px', margin: '0 auto 3rem', position: 'relative' }}>
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

          {/* Info Banner */}
          <div style={{
            background: isDark 
              ? 'linear-gradient(135deg, rgba(33, 151, 205, 0.1) 0%, rgba(124, 199, 208, 0.1) 100%)'
              : 'linear-gradient(135deg, rgba(33, 151, 205, 0.1) 0%, rgba(124, 199, 208, 0.1) 100%)',
            padding: '1.5rem',
            borderRadius: '12px',
            marginBottom: '2.5rem',
            border: `1px solid ${colors.border}`,
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '1rem', color: colors.text, margin: 0 }}>
              📚 Browse all courses freely. <strong>Register or login to start learning!</strong>
            </p>
          </div>

          {/* Courses Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <img 
                src="/jcilogo.png" 
                alt="JCI Bogura" 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  objectFit: 'contain', 
                  margin: '0 auto 1.5rem',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }} 
              />
              <div style={{ fontSize: '1.25rem', color: colors.textSecondary, fontWeight: '500' }}>Loading courses...</div>
              <style>{`
                @keyframes pulse {
                  0%, 100% { opacity: 1; transform: scale(1); }
                  50% { opacity: 0.7; transform: scale(0.95); }
                }
              `}</style>
            </div>
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
                  onClick={() => navigate(`/course/${course.$id}`)}
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
                      View Course →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;

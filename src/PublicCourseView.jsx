import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { courseService } from './lib/courseService';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function PublicCourseView() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const { colors, isDark } = theme;
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    loadCourse();
    loadModules();

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [courseId]);

  useEffect(() => {
    if (selectedModule) {
      loadVideos(selectedModule.$id);
    }
  }, [selectedModule]);

  const loadCourse = async () => {
    try {
      const data = await courseService.getCourse(courseId);
      setCourse(data);
    } catch (error) {
      console.error('Failed to load course:', error);
    }
  };

  const loadModules = async () => {
    try {
      const data = await courseService.getModulesByCourse(courseId);
      setModules(data);
      if (data.length > 0) setSelectedModule(data[0]);
    } catch (error) {
      console.error('Failed to load modules:', error);
    }
  };

  const loadVideos = async (moduleId) => {
    try {
      const data = await courseService.getVideosByModule(moduleId);
      setVideos(data);
    } catch (error) {
      console.error('Failed to load videos:', error);
    }
  };

  if (!course) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: colors.background, transition: 'background-color 0.3s' }}>
        <div style={{ textAlign: 'center' }}>
          <img 
            src="/jcilogo.jpeg" 
            alt="JCI Bogura" 
            style={{ 
              width: '80px', 
              height: '80px', 
              objectFit: 'contain', 
              margin: '0 auto 1rem',
              animation: 'pulse 1.5s ease-in-out infinite'
            }} 
          />
          <p style={{ fontSize: '1.25rem', color: colors.textSecondary }}>Loading course...</p>
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

  const totalVideos = videos.length;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.background, transition: 'background-color 0.3s', display: 'flex', flexDirection: 'column' }}>
      <Navbar user={null} onLogout={() => {}} />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
        {/* Sidebar */}
        <div style={{ 
          width: isMobile ? '100%' : '320px',
          backgroundColor: colors.surface,
          boxShadow: isDark ? '2px 0 8px rgba(0,0,0,0.3)' : '2px 0 8px rgba(0,0,0,0.1)',
          height: isMobile ? 'auto' : 'calc(100vh - 80px)',
          maxHeight: isMobile ? '400px' : 'calc(100vh - 80px)',
          overflowY: 'auto',
          position: isMobile ? 'relative' : 'sticky',
          top: isMobile ? '0' : '80px',
          borderRight: isMobile ? 'none' : `1px solid ${colors.border}`,
          borderBottom: isMobile ? `1px solid ${colors.border}` : 'none'
        }}>
          <div style={{ padding: '1.5rem' }}>
            {/* Login Prompt */}
            <div style={{
              marginBottom: '1.5rem',
              padding: '1.25rem',
              borderRadius: '12px',
              background: isDark 
                ? 'linear-gradient(135deg, rgba(33, 151, 205, 0.1) 0%, rgba(124, 199, 208, 0.1) 100%)'
                : 'linear-gradient(135deg, rgba(33, 151, 205, 0.1) 0%, rgba(124, 199, 208, 0.1) 100%)',
              border: `2px solid ${colors.primary}`,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔒</div>
              <p style={{ fontSize: '0.9rem', color: colors.text, marginBottom: '1rem', fontWeight: '600' }}>
                Login to start learning
              </p>
              <button
                onClick={() => navigate('/login')}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: colors.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.background = colors.primaryHover}
                onMouseLeave={(e) => e.target.style.background = colors.primary}
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'transparent',
                  color: colors.primary,
                  border: `2px solid ${colors.primary}`,
                  borderRadius: '10px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.background = colors.surface}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                Register Free
              </button>
            </div>

            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: colors.text, marginBottom: '1rem' }}>Course Content</h3>
            
            {modules.map((module) => (
              <div key={module.$id} style={{ marginBottom: '1rem' }}>
                <button
                  onClick={() => setSelectedModule(module)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.875rem',
                    borderRadius: '10px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: selectedModule?.$id === module.$id ? colors.primary : colors.surfaceHover,
                    color: selectedModule?.$id === module.$id ? 'white' : colors.text,
                    transition: 'all 0.2s',
                    fontSize: '0.95rem'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedModule?.$id !== module.$id) {
                      e.target.style.backgroundColor = colors.border;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedModule?.$id !== module.$id) {
                      e.target.style.backgroundColor = colors.surfaceHover;
                    }
                  }}
                >
                  {module.title}
                </button>
                
                {selectedModule?.$id === module.$id && (
                  <div style={{ marginTop: '0.5rem', marginLeft: '1rem' }}>
                    {videos.map((video) => (
                      <div
                        key={video.$id}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.625rem',
                          marginBottom: '0.25rem',
                          borderRadius: '8px',
                          fontSize: '0.875rem',
                          backgroundColor: colors.background,
                          color: colors.textSecondary,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          opacity: 0.7
                        }}
                      >
                        <span style={{ fontSize: '1rem' }}>🔒</span>
                        <span>{video.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Course Overview */}
        <div style={{ flex: 1, padding: isMobile ? '1rem' : '2rem' }}>
          <div style={{ 
            backgroundColor: colors.cardBg,
            borderRadius: '16px',
            boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)',
            overflow: 'hidden',
            border: `1px solid ${colors.border}`
          }}>
            {/* Course Header */}
            <div style={{ 
              padding: 'clamp(2rem, 4vw, 3rem)',
              background: isDark 
                ? 'linear-gradient(135deg, rgba(33, 151, 205, 0.1) 0%, rgba(124, 199, 208, 0.1) 100%)'
                : 'linear-gradient(135deg, rgba(33, 151, 205, 0.1) 0%, rgba(124, 199, 208, 0.1) 100%)',
              borderBottom: `1px solid ${colors.border}`
            }}>
              <h1 style={{ 
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', 
                fontWeight: '800', 
                color: colors.text, 
                marginBottom: '1rem',
                letterSpacing: '-1px'
              }}>
                {course.title}
              </h1>
              <p style={{ 
                fontSize: 'clamp(1rem, 2vw, 1.125rem)', 
                color: colors.textSecondary, 
                lineHeight: 1.7,
                marginBottom: '1.5rem'
              }}>
                {course.overview}
              </p>
              
              {/* Course Stats */}
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>📚</span>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.primary }}>{modules.length}</div>
                    <div style={{ fontSize: '0.875rem', color: colors.textSecondary }}>Modules</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🎥</span>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.secondary }}>{totalVideos}</div>
                    <div style={{ fontSize: '0.875rem', color: colors.textSecondary }}>Videos</div>
                  </div>
                </div>
                {course.requiresProject && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>📝</span>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.accent }}>✓</div>
                      <div style={{ fontSize: '0.875rem', color: colors.textSecondary }}>Project Required</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Course Details */}
            <div style={{ padding: 'clamp(2rem, 4vw, 3rem)' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.text, marginBottom: '1rem' }}>
                About This Course
              </h2>
              <p style={{ fontSize: '1rem', color: colors.textSecondary, lineHeight: 1.7, marginBottom: '2rem' }}>
                {course.overview}
              </p>

              {course.requiresProject && (
                <div style={{
                  padding: '1.5rem',
                  borderRadius: '12px',
                  background: isDark ? colors.surface : colors.surfaceHover,
                  border: `1px solid ${colors.border}`,
                  marginBottom: '2rem'
                }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: colors.text, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>📝</span> Project Requirements
                  </h3>
                  {course.projectRequirements && (
                    <p style={{ fontSize: '0.95rem', color: colors.textSecondary, lineHeight: 1.7, marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>
                      {course.projectRequirements}
                    </p>
                  )}
                  {course.projectInstructions && (
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: '600', color: colors.text, marginBottom: '0.5rem' }}>Instructions:</h4>
                      <p style={{ fontSize: '0.95rem', color: colors.textSecondary, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                        {course.projectInstructions}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* CTA */}
              <div style={{
                padding: '2rem',
                borderRadius: '12px',
                background: isDark 
                  ? 'linear-gradient(135deg, rgba(33, 151, 205, 0.1) 0%, rgba(124, 199, 208, 0.1) 100%)'
                  : 'linear-gradient(135deg, #2197cd 0%, #7cc7d0 100%)',
                textAlign: 'center'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: isDark ? colors.text : 'white', marginBottom: '0.75rem' }}>
                  Ready to Start Learning?
                </h3>
                <p style={{ fontSize: '1rem', color: isDark ? colors.textSecondary : 'rgba(255,255,255,0.9)', marginBottom: '1.5rem' }}>
                  Register now to access all course videos and earn your certificate
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => navigate('/register')}
                    style={{
                      padding: '1rem 2rem',
                      background: isDark ? colors.primary : 'white',
                      color: isDark ? 'white' : colors.primary,
                      border: 'none',
                      borderRadius: '12px',
                      fontWeight: '600',
                      fontSize: '1rem',
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
                    Register Free
                  </button>
                  <button
                    onClick={() => navigate('/login')}
                    style={{
                      padding: '1rem 2rem',
                      background: 'transparent',
                      color: isDark ? colors.text : 'white',
                      border: `2px solid ${isDark ? colors.border : 'white'}`,
                      borderRadius: '12px',
                      fontWeight: '600',
                      fontSize: '1rem',
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
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PublicCourseView;

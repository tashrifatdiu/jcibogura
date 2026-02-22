import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { authService } from './lib/auth';
import { courseService } from './lib/courseService';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function Profile({ user, onLogout }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { colors, isDark, toggleTheme } = theme;
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [courseProgress, setCourseProgress] = useState({ inProgress: [], completed: [] });
  const [certifications, setCertifications] = useState([]);
  const [courses, setCourses] = useState({});

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [profile, progressStats] = await Promise.all([
        authService.getUserProfile(user.$id),
        courseService.getCourseProgressStats(user.$id)
      ]);
      
      setProfileData(profile);
      setCourseProgress({
        inProgress: progressStats.inProgress,
        completed: progressStats.completed
      });
      
      // Try to load certifications, but don't fail if collection doesn't exist
      try {
        const [certs, allCourses] = await Promise.all([
          courseService.getUserCertifications(user.$id),
          courseService.getAllCourses()
        ]);
        setCertifications(certs);
        
        // Create courses lookup
        const coursesMap = {};
        allCourses.forEach(course => {
          coursesMap[course.$id] = course;
        });
        setCourses(coursesMap);
      } catch (certError) {
        // Silently fail if collection doesn't exist yet
        if (certError.code === 404 || certError.message?.includes('Collection') || certError.message?.includes('not found')) {
          console.log('Project submissions collection not set up yet');
        } else {
          console.error('Failed to load certifications:', certError);
        }
      }
    } catch (err) {
      setError('Failed to load profile data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: colors.background,
        transition: 'background-color 0.3s'
      }}>
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
          <p style={{ fontSize: '1.25rem', color: colors.textSecondary }}>Loading profile...</p>
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

  if (error) {
    return (
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: colors.background,
        transition: 'background-color 0.3s'
      }}>
        <div style={{
          background: colors.cardBg,
          padding: '2.5rem',
          borderRadius: '20px',
          boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '440px',
          border: `1px solid ${colors.border}`,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <p style={{ color: colors.error, marginBottom: '1.5rem', fontSize: '1.1rem' }}>{error}</p>
          <button
            onClick={onLogout}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: colors.primary,
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  const InfoField = ({ label, value }) => (
    <div style={{ marginBottom: '1.25rem' }}>
      <label style={{ 
        display: 'block',
        fontSize: '0.875rem',
        fontWeight: '600',
        marginBottom: '0.5rem',
        color: colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        {label}
      </label>
      <p style={{ 
        fontSize: '1.05rem',
        color: colors.text,
        fontWeight: '500'
      }}>
        {value || 'N/A'}
      </p>
    </div>
  );

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: colors.background,
      transition: 'background-color 0.3s',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navbar user={user} onLogout={onLogout} />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem', width: '100%', flex: 1 }}>
        {/* Content */}
        <div style={{
          background: colors.cardBg,
          borderRadius: '20px',
          boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)',
          border: `1px solid ${colors.border}`,
          padding: '2.5rem'
        }}>
          <h1 style={{ 
            fontSize: '2rem',
            fontWeight: '700',
            color: colors.text,
            margin: '0 0 2rem 0',
            letterSpacing: '-0.5px'
          }}>
            My Profile
          </h1>
          {/* Personal Information */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '1.5rem',
              fontWeight: '700',
              color: colors.text,
              marginBottom: '1.5rem',
              paddingBottom: '0.75rem',
              borderBottom: `2px solid ${colors.border}`,
              letterSpacing: '-0.5px'
            }}>
              Personal Information
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <InfoField label="First Name" value={profileData?.firstName} />
              <InfoField label="Last Name" value={profileData?.lastName} />
              <InfoField label="Age" value={profileData?.age} />
              <InfoField label="Email" value={profileData?.email || user.email} />
            </div>
          </div>

          {/* Professional Information */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '1.5rem',
              fontWeight: '700',
              color: colors.text,
              marginBottom: '1.5rem',
              paddingBottom: '0.75rem',
              borderBottom: `2px solid ${colors.border}`,
              letterSpacing: '-0.5px'
            }}>
              Professional Information
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <InfoField label="Profession" value={profileData?.profession} />
              {profileData?.institute && <InfoField label="Institute" value={profileData.institute} />}
              {profileData?.company && <InfoField label="Company" value={profileData.company} />}
              {profileData?.position && <InfoField label="Position" value={profileData.position} />}
            </div>
          </div>

          {/* Contact Information */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '1.5rem',
              fontWeight: '700',
              color: colors.text,
              marginBottom: '1.5rem',
              paddingBottom: '0.75rem',
              borderBottom: `2px solid ${colors.border}`,
              letterSpacing: '-0.5px'
            }}>
              Contact Information
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <InfoField label="Phone Number" value={profileData?.phoneNumber} />
              <InfoField label="Address" value={profileData?.address} />
            </div>
          </div>

          {/* Course Progress */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ 
              fontSize: '1.5rem',
              fontWeight: '700',
              color: colors.text,
              marginBottom: '1.5rem',
              paddingBottom: '0.75rem',
              borderBottom: `2px solid ${colors.border}`,
              letterSpacing: '-0.5px'
            }}>
              My Learning Progress
            </h2>

            {/* Stats Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ 
                padding: '1.5rem',
                borderRadius: '12px',
                textAlign: 'center',
                background: isDark ? 'rgba(124, 199, 208, 0.1)' : colors.secondary,
                border: `1px solid ${isDark ? colors.border : 'transparent'}`
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: isDark ? colors.secondary : 'white', marginBottom: '0.5rem' }}>
                  {courseProgress.inProgress.length}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600', color: isDark ? colors.textSecondary : 'white', opacity: isDark ? 1 : 0.9 }}>
                  In Progress
                </div>
              </div>
              <div style={{ 
                padding: '1.5rem',
                borderRadius: '12px',
                textAlign: 'center',
                background: isDark ? 'rgba(155, 89, 182, 0.1)' : colors.accent,
                border: `1px solid ${isDark ? colors.border : 'transparent'}`
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: isDark ? colors.accent : 'white', marginBottom: '0.5rem' }}>
                  {courseProgress.completed.length}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600', color: isDark ? colors.textSecondary : 'white', opacity: isDark ? 1 : 0.9 }}>
                  Completed
                </div>
              </div>
              <div style={{ 
                padding: '1.5rem',
                borderRadius: '12px',
                textAlign: 'center',
                background: isDark ? 'rgba(16, 185, 129, 0.1)' : '#10b981',
                border: `1px solid ${isDark ? colors.border : 'transparent'}`
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: isDark ? '#10b981' : 'white', marginBottom: '0.5rem' }}>
                  {certifications.length}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600', color: isDark ? colors.textSecondary : 'white', opacity: isDark ? 1 : 0.9 }}>
                  Certified
                </div>
              </div>
            </div>

            {/* In Progress Courses */}
            {courseProgress.inProgress.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: colors.secondary, marginBottom: '1rem' }}>
                  In Progress Courses
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {courseProgress.inProgress.map((course) => (
                    <div
                      key={course.$id}
                      onClick={() => navigate(`/courses/${course.$id}`)}
                      style={{ 
                        padding: '1.25rem',
                        borderRadius: '12px',
                        border: `2px solid ${colors.secondary}`,
                        backgroundColor: colors.surfaceHover,
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateX(4px)';
                        e.currentTarget.style.boxShadow = isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: colors.text, margin: 0 }}>
                          {course.title}
                        </h4>
                        <span style={{ 
                          fontSize: '0.875rem',
                          fontWeight: '700',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '8px',
                          backgroundColor: colors.secondary,
                          color: 'white'
                        }}>
                          {course.progressPercentage}%
                        </span>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: colors.textSecondary, marginBottom: '0.75rem' }}>
                        {course.completedVideos} of {course.totalVideos} videos completed
                      </p>
                      <div style={{ width: '100%', height: '6px', borderRadius: '3px', backgroundColor: isDark ? colors.border : '#e0e0e0', overflow: 'hidden' }}>
                        <div style={{ 
                          height: '100%',
                          width: `${course.progressPercentage}%`,
                          backgroundColor: colors.secondary,
                          transition: 'width 0.3s'
                        }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Courses */}
            {courseProgress.completed.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: colors.accent, marginBottom: '1rem' }}>
                  Completed Courses
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {courseProgress.completed.map((course) => (
                    <div
                      key={course.$id}
                      onClick={() => navigate(`/courses/${course.$id}`)}
                      style={{ 
                        padding: '1.25rem',
                        borderRadius: '12px',
                        border: `2px solid ${colors.accent}`,
                        backgroundColor: colors.surfaceHover,
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateX(4px)';
                        e.currentTarget.style.boxShadow = isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: colors.text, margin: 0 }}>
                          {course.title}
                        </h4>
                        <span style={{ 
                          fontSize: '0.875rem',
                          fontWeight: '700',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '8px',
                          backgroundColor: colors.accent,
                          color: 'white'
                        }}>
                          ✓ 100%
                        </span>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: colors.textSecondary }}>
                        All {course.totalVideos} videos completed
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#10b981', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>🏆</span> Certifications
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {certifications.map((cert) => {
                    const course = courses[cert.courseId];
                    return (
                      <div
                        key={cert.$id}
                        style={{ 
                          padding: '1.5rem',
                          borderRadius: '12px',
                          border: '2px solid #10b981',
                          background: isDark 
                            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)'
                            : 'linear-gradient(135deg, #d1fae5 0%, #ecfdf5 100%)',
                          transition: 'all 0.3s'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <div>
                            <h4 style={{ fontSize: '1.15rem', fontWeight: '700', color: colors.text, margin: 0, marginBottom: '0.25rem' }}>
                              {course?.title || 'Course'}
                            </h4>
                            <p style={{ fontSize: '0.875rem', color: colors.textSecondary, margin: 0 }}>
                              Certified on {new Date(cert.submittedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span style={{ 
                            fontSize: '0.875rem',
                            fontWeight: '700',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            backgroundColor: '#10b981',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            ✓ Certified
                          </span>
                        </div>
                        {cert.projectLink && (
                          <div style={{ 
                            padding: '0.75rem',
                            borderRadius: '8px',
                            background: isDark ? colors.surface : 'white',
                            marginTop: '0.75rem'
                          }}>
                            <p style={{ fontSize: '0.8rem', fontWeight: '600', color: colors.text, marginBottom: '0.25rem' }}>
                              Project Link:
                            </p>
                            <a
                              href={cert.projectLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ 
                                fontSize: '0.85rem',
                                color: colors.primary,
                                wordBreak: 'break-all',
                                textDecoration: 'none'
                              }}
                              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                            >
                              {cert.projectLink}
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* No Progress */}
            {courseProgress.inProgress.length === 0 && courseProgress.completed.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>📚</div>
                <p style={{ fontSize: '1.1rem', color: colors.textSecondary, marginBottom: '1.5rem' }}>
                  No courses started yet. Start learning today!
                </p>
                <button
                  onClick={() => navigate('/courses')}
                  style={{
                    padding: '0.875rem 2rem',
                    backgroundColor: colors.primary,
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.backgroundColor = colors.primaryHover;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.backgroundColor = colors.primary;
                  }}
                >
                  Browse Courses
                </button>
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/courses')}
              style={{
                flex: 1,
                minWidth: '200px',
                padding: '1rem',
                backgroundColor: colors.secondary,
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(124, 199, 208, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Back to Courses
            </button>
            <button
              onClick={onLogout}
              style={{
                flex: 1,
                minWidth: '200px',
                padding: '1rem',
                backgroundColor: colors.accent,
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.backgroundColor = colors.accentHover;
                e.target.style.boxShadow = '0 4px 12px rgba(155, 89, 182, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.backgroundColor = colors.accent;
                e.target.style.boxShadow = 'none';
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;

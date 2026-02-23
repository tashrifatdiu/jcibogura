import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { courseService } from './lib/courseService';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BunnyVideoPlayer from './components/BunnyVideoPlayer';

function CourseView({ user, onLogout }) {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const { colors, isDark, toggleTheme } = theme;
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [userProgress, setUserProgress] = useState([]);
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [projectSubmission, setProjectSubmission] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectLink, setProjectLink] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadCourse();
    loadModules();
    loadUserProgress();
    loadProjectSubmission();
    loadYouTubeAPI();

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [courseId]);

  useEffect(() => {
    if (selectedModule) {
      loadVideos(selectedModule.$id);
    }
  }, [selectedModule]);

  useEffect(() => {
    if (selectedVideo && window.YT) {
      initializePlayer();
    }
  }, [selectedVideo]);

  useEffect(() => {
    if (player && isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(player.getCurrentTime());
      }, 100);
      return () => clearInterval(interval);
    }
  }, [player, isPlaying]);

  const loadCourse = async () => {
    try {
      const data = await courseService.getCourse(courseId);
      setCourse(data);
    } catch (error) {
      console.error('Failed to load course:', error);
    }
  };

  const loadYouTubeAPI = () => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  };

  const initializePlayer = () => {
    if (player) {
      player.destroy();
    }

    const videoId = getYouTubeVideoId(selectedVideo.youtubeLink);
    
    if (!videoId) {
      console.error('Invalid YouTube URL:', selectedVideo.youtubeLink);
      return;
    }
    
    if (!window.YT || !window.YT.Player) {
      console.error('YouTube API not loaded yet');
      setTimeout(initializePlayer, 500);
      return;
    }
    
    try {
      const newPlayer = new window.YT.Player('youtube-player', {
        videoId: videoId,
        playerVars: {
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          fs: 1,
          playsinline: 1
        },
        events: {
          onReady: (event) => {
            setPlayer(event.target);
            setDuration(event.target.getDuration());
          },
          onStateChange: (event) => {
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
          },
          onError: (event) => {
            console.error('YouTube player error:', event.data);
          }
        }
      });
    } catch (error) {
      console.error('Failed to initialize player:', error);
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
      if (data.length > 0 && !selectedVideo) setSelectedVideo(data[0]);
    } catch (error) {
      console.error('Failed to load videos:', error);
    }
  };

  const loadUserProgress = async () => {
    try {
      const data = await courseService.getUserProgress(user.$id);
      setUserProgress(data);
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
  };

  const loadProjectSubmission = async () => {
    try {
      const data = await courseService.getProjectSubmission(user.$id, courseId);
      setProjectSubmission(data);
      if (data) {
        setProjectLink(data.projectLink);
      }
    } catch (error) {
      // Silently fail if collection doesn't exist yet
      if (error.code === 404 || error.message?.includes('Collection') || error.message?.includes('not found')) {
        console.log('Project submissions collection not set up yet');
      } else {
        console.error('Failed to load project submission:', error);
      }
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!projectLink.trim()) {
      alert('Please enter a valid project link');
      return;
    }
    
    setSubmitting(true);
    try {
      await courseService.submitProject(user.$id, courseId, projectLink);
      alert('Project submitted successfully!');
      setShowProjectForm(false);
      loadProjectSubmission();
    } catch (error) {
      console.error('Failed to submit project:', error);
      alert('Failed to submit project. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const isVideoCompleted = (videoId) => {
    return userProgress.some(p => p.videoId === videoId && p.completed);
  };

  const markComplete = async () => {
    if (selectedVideo && !isVideoCompleted(selectedVideo.$id)) {
      try {
        await courseService.markVideoComplete(user.$id, selectedVideo.$id);
        loadUserProgress();
      } catch (error) {
        console.error('Failed to mark complete:', error);
      }
    }
  };

  const getVideoType = (url) => {
    if (!url) return null;
    
    if (url.startsWith('bunny:') || url.includes('mediadelivery.net') || url.includes('bunnycdn.com')) {
      return 'bunny';
    }
    
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'youtube';
    }
    
    return null;
  };

  const getBunnyVideoId = (url) => {
    if (!url) return '';
    
    // Format: bunny:LIBRARY_ID/VIDEO_ID
    if (url.startsWith('bunny:')) {
      return url.replace('bunny:', '');
    }
    
    // Format: https://iframe.mediadelivery.net/embed/LIBRARY_ID/VIDEO_ID
    if (url.includes('mediadelivery.net/embed/')) {
      const parts = url.split('/embed/')[1];
      return parts ? parts.split('?')[0] : '';
    }
    
    return '';
  };

  const getYouTubeVideoId = (url) => {
    if (!url) return '';
    
    let videoId = '';
    
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1]?.split('?')[0];
    }
    
    return videoId || '';
  };

  const togglePlay = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    }
  };

  const seekTo = (seconds) => {
    if (player) {
      player.seekTo(seconds);
    }
  };

  const skipForward = () => {
    if (player) {
      player.seekTo(currentTime + 10);
    }
  };

  const skipBackward = () => {
    if (player) {
      player.seekTo(Math.max(0, currentTime - 10));
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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

  const completedVideos = videos.filter(v => isVideoCompleted(v.$id)).length;
  const progressPercentage = videos.length > 0 ? Math.round((completedVideos / videos.length) * 100) : 0;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.background, transition: 'background-color 0.3s', display: 'flex', flexDirection: 'column' }}>
      <Navbar user={user} onLogout={onLogout} />
      
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
            {/* Progress */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: colors.text }}>Progress</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: colors.primary }}>{progressPercentage}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: isDark ? colors.border : '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progressPercentage}%`, backgroundColor: colors.primary, transition: 'width 0.3s' }}></div>
              </div>
            </div>

            {/* Project Submission */}
            {course.requiresProject && (
              <div style={{ 
                marginBottom: '1.5rem',
                padding: '1rem',
                borderRadius: '12px',
                background: isDark ? colors.surface : colors.surfaceHover,
                border: `2px solid ${projectSubmission?.certified ? '#10b981' : colors.border}`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>📝</span>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: colors.text, margin: 0 }}>
                    Project Submission
                  </h4>
                </div>
                
                {projectSubmission?.certified ? (
                  <div style={{
                    padding: '0.75rem',
                    borderRadius: '8px',
                    background: '#d1fae5',
                    border: '1px solid #10b981',
                    marginBottom: '0.5rem'
                  }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#10b981', margin: 0 }}>
                      ✓ Certified! Check your email for the certificate.
                    </p>
                  </div>
                ) : projectSubmission ? (
                  <div>
                    <div style={{
                      padding: '0.75rem',
                      borderRadius: '8px',
                      background: projectSubmission.status === 'approved' ? '#d1fae5' : 
                                 projectSubmission.status === 'rejected' ? '#fee2e2' : '#fef3c7',
                      border: `1px solid ${projectSubmission.status === 'approved' ? '#10b981' : 
                                          projectSubmission.status === 'rejected' ? '#ef4444' : '#f59e0b'}`,
                      marginBottom: '0.5rem'
                    }}>
                      <p style={{ 
                        fontSize: '0.875rem', 
                        fontWeight: '600', 
                        color: projectSubmission.status === 'approved' ? '#10b981' : 
                               projectSubmission.status === 'rejected' ? '#ef4444' : '#f59e0b',
                        margin: 0,
                        marginBottom: projectSubmission.adminNotes ? '0.5rem' : 0
                      }}>
                        Status: {projectSubmission.status.charAt(0).toUpperCase() + projectSubmission.status.slice(1)}
                      </p>
                      {projectSubmission.adminNotes && (
                        <p style={{ fontSize: '0.8rem', color: colors.text, margin: 0 }}>
                          {projectSubmission.adminNotes}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => setShowProjectForm(!showProjectForm)}
                      style={{
                        width: '100%',
                        padding: '0.625rem',
                        borderRadius: '8px',
                        border: `2px solid ${colors.primary}`,
                        background: 'transparent',
                        color: colors.primary,
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                    >
                      {showProjectForm ? 'Cancel' : 'Resubmit Project'}
                    </button>
                  </div>
                ) : progressPercentage === 100 ? (
                  <button
                    onClick={() => setShowProjectForm(!showProjectForm)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: colors.primary,
                      color: 'white',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
                    {showProjectForm ? 'Cancel' : 'Submit Project'}
                  </button>
                ) : (
                  <p style={{ fontSize: '0.8rem', color: colors.textSecondary, margin: 0 }}>
                    Complete all videos to submit your project
                  </p>
                )}

                {showProjectForm && (
                  <form onSubmit={handleProjectSubmit} style={{ marginTop: '1rem' }}>
                    {course.projectRequirements && (
                      <div style={{ 
                        marginBottom: '0.75rem',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        background: isDark ? colors.background : '#f3fafd'
                      }}>
                        <p style={{ fontSize: '0.8rem', fontWeight: '600', color: colors.text, marginBottom: '0.25rem' }}>
                          Requirements:
                        </p>
                        <p style={{ fontSize: '0.75rem', color: colors.textSecondary, margin: 0, whiteSpace: 'pre-wrap' }}>
                          {course.projectRequirements}
                        </p>
                      </div>
                    )}
                    {course.projectInstructions && (
                      <div style={{ 
                        marginBottom: '0.75rem',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        background: isDark ? colors.background : '#f3fafd'
                      }}>
                        <p style={{ fontSize: '0.8rem', fontWeight: '600', color: colors.text, marginBottom: '0.25rem' }}>
                          Instructions:
                        </p>
                        <p style={{ fontSize: '0.75rem', color: colors.textSecondary, margin: 0, whiteSpace: 'pre-wrap' }}>
                          {course.projectInstructions}
                        </p>
                      </div>
                    )}
                    <input
                      type="url"
                      value={projectLink}
                      onChange={(e) => setProjectLink(e.target.value)}
                      placeholder="Enter GitHub or Google Drive link"
                      required
                      style={{
                        width: '100%',
                        padding: '0.625rem',
                        borderRadius: '8px',
                        border: `2px solid ${colors.border}`,
                        background: colors.inputBg,
                        color: colors.text,
                        fontSize: '0.875rem',
                        marginBottom: '0.5rem',
                        boxSizing: 'border-box'
                      }}
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: 'none',
                        background: colors.primary,
                        color: 'white',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        cursor: submitting ? 'not-allowed' : 'pointer',
                        opacity: submitting ? 0.6 : 1
                      }}
                    >
                      {submitting ? 'Submitting...' : 'Submit Project'}
                    </button>
                  </form>
                )}
              </div>
            )}

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
                      <button
                        key={video.$id}
                        onClick={() => setSelectedVideo(video)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.625rem',
                          marginBottom: '0.25rem',
                          borderRadius: '8px',
                          fontSize: '0.875rem',
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: selectedVideo?.$id === video.$id ? colors.secondary : colors.background,
                          color: selectedVideo?.$id === video.$id ? 'white' : colors.text,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedVideo?.$id !== video.$id) {
                            e.target.style.backgroundColor = colors.border;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedVideo?.$id !== video.$id) {
                            e.target.style.backgroundColor = colors.background;
                          }
                        }}
                      >
                        <span style={{ fontSize: '1rem' }}>{isVideoCompleted(video.$id) ? '✓' : '○'}</span>
                        <span>{video.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Video Player */}
        <div style={{ flex: 1, padding: isMobile ? '1rem' : '1.5rem' }}>
          {selectedVideo ? (
            <div style={{ 
              backgroundColor: colors.cardBg,
              borderRadius: '16px',
              boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              border: `1px solid ${colors.border}`
            }}>
              {/* Video */}
              {getVideoType(selectedVideo.youtubeLink) === 'bunny' ? (
                <BunnyVideoPlayer 
                  videoId={getBunnyVideoId(selectedVideo.youtubeLink)}
                  onReady={() => console.log('Bunny video ready')}
                />
              ) : (
                <>
                  <div style={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#000' }}>
                    <div id="youtube-player" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}></div>
                  </div>

                  {/* Custom Controls for YouTube */}
                  <div style={{ padding: '1rem', backgroundColor: isDark ? colors.surface : '#1d1a36' }}>
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      value={currentTime}
                      onChange={(e) => seekTo(parseFloat(e.target.value))}
                      style={{ width: '100%', marginBottom: '1rem', cursor: 'pointer' }}
                    />

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                          onClick={skipBackward}
                          style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer', transition: 'transform 0.2s' }}
                          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        >
                          ⏪
                        </button>
                        <button
                          onClick={togglePlay}
                          style={{ background: 'none', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer', transition: 'transform 0.2s' }}
                          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        >
                          {isPlaying ? '⏸' : '▶'}
                        </button>
                        <button
                          onClick={skipForward}
                          style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer', transition: 'transform 0.2s' }}
                          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        >
                          ⏩
                        </button>
                        <span style={{ color: 'white', fontSize: '0.875rem', fontWeight: '500' }}>
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Video Info */}
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.text, margin: 0, letterSpacing: '-0.5px' }}>
                    {selectedVideo.title}
                  </h2>
                  {!isVideoCompleted(selectedVideo.$id) && (
                    <button
                      onClick={markComplete}
                      style={{ 
                        padding: '0.75rem 1.5rem',
                        backgroundColor: colors.success,
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        fontSize: '0.9rem'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      ✓ Mark Complete
                    </button>
                  )}
                </div>
                <p style={{ color: colors.textSecondary, lineHeight: 1.6, fontSize: '0.95rem' }}>
                  {selectedVideo.description}
                </p>
              </div>
            </div>
          ) : (
            <div style={{ 
              backgroundColor: colors.cardBg,
              borderRadius: '16px',
              boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)',
              padding: '4rem',
              textAlign: 'center',
              border: `1px solid ${colors.border}`
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>🎥</div>
              <p style={{ fontSize: '1.25rem', fontWeight: '600', color: colors.textSecondary }}>Select a video to start learning</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CourseView;

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { courseService } from './lib/courseService';
import VideoUploader from './components/VideoUploader';

function AdminDashboard({ onLogout, initialView }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [view, setView] = useState(initialView || 'courses');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    // Update view based on route
    if (location.pathname === '/admin/submissions') {
      setView('submissions');
    } else if (location.pathname === '/admin') {
      setView('courses');
    }
  }, [location.pathname]);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const data = await courseService.getAllCourses();
      setCourses(data);
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

  const handleDeleteCourse = async (courseId) => {
    if (confirm('Delete this course and all its content?')) {
      try {
        await courseService.deleteCourse(courseId);
        loadCourses();
      } catch (error) {
        alert('Failed to delete course');
      }
    }
  };

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    setView('editCourse');
  };

  if (view === 'editCourse' && selectedCourse) {
    return (
      <CourseEditor
        course={selectedCourse}
        onBack={() => {
          setView('courses');
          setSelectedCourse(null);
          loadCourses();
        }}
        onLogout={onLogout}
      />
    );
  }

  if (view === 'submissions') {
    return <SubmissionsManager onBack={() => navigate('/admin')} onLogout={onLogout} />;
  }

  return (
    <div style={{ backgroundColor: '#f3fafd', minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#2197cd' }} className="p-6 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <button
              onClick={onLogout}
              className="px-6 py-2 rounded-md text-white font-medium"
              style={{ backgroundColor: '#9b59b6' }}
            >
              Logout
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/admin')}
              className="px-6 py-2 rounded-md font-medium transition-all"
              style={{ 
                backgroundColor: view === 'courses' ? 'white' : 'transparent',
                color: view === 'courses' ? '#2197cd' : 'white',
                border: view === 'courses' ? 'none' : '2px solid white'
              }}
            >
              Courses
            </button>
            <button
              onClick={() => navigate('/admin/submissions')}
              className="px-6 py-2 rounded-md font-medium transition-all"
              style={{ 
                backgroundColor: view === 'submissions' ? 'white' : 'transparent',
                color: view === 'submissions' ? '#2197cd' : 'white',
                border: view === 'submissions' ? 'none' : '2px solid white'
              }}
            >
              Project Submissions
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Add Course Button */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => setShowAddCourse(true)}
            className="px-6 py-3 rounded-md text-white font-medium"
            style={{ backgroundColor: '#7cc7d0' }}
          >
            + New Course
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search courses by title or overview..."
              className="w-full px-6 py-4 text-lg border-2 rounded-xl focus:outline-none focus:ring-2"
              style={{ borderColor: '#7cc7d0', color: '#1d1a36' }}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-6 h-6" style={{ color: '#7cc7d0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          {searchTerm && (
            <div className="mt-2 text-sm" style={{ color: '#7cc7d0' }}>
              Found {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        {showAddCourse && (
          <div className="mb-6 bg-white rounded-lg shadow-lg p-6" style={{ borderTop: '4px solid #2197cd' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#1d1a36' }}>Create New Course</h3>
            <CourseForm
              onSuccess={() => {
                setShowAddCourse(false);
                loadCourses();
              }}
              onCancel={() => setShowAddCourse(false)}
            />
          </div>
        )}

        {loading ? (
          <p style={{ color: '#1d1a36' }}>Loading courses...</p>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl mb-4" style={{ color: '#7cc7d0' }}>
              {searchTerm ? 'No courses found matching your search' : 'No courses yet. Create your first course!'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="px-6 py-2 rounded-md text-white font-medium"
                style={{ backgroundColor: '#2197cd' }}
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.$id}>
                {editingCourse === course.$id ? (
                  <div className="bg-white rounded-lg shadow-lg p-6" style={{ borderTop: '4px solid #9b59b6' }}>
                    <h3 className="text-lg font-bold mb-4" style={{ color: '#1d1a36' }}>Edit Course</h3>
                    <CourseForm
                      course={course}
                      onSuccess={() => {
                        setEditingCourse(null);
                        loadCourses();
                      }}
                      onCancel={() => setEditingCourse(null)}
                    />
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ borderTop: '4px solid #9b59b6' }}>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2" style={{ color: '#1d1a36' }}>
                        {course.title}
                      </h3>
                      <p className="text-sm mb-4" style={{ color: '#7cc7d0' }}>
                        {course.overview}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewCourse(course)}
                          className="flex-1 px-4 py-2 rounded-md text-white font-medium"
                          style={{ backgroundColor: '#2197cd' }}
                        >
                          Manage
                        </button>
                        <button
                          onClick={() => setEditingCourse(course.$id)}
                          className="px-4 py-2 rounded-md text-white font-medium"
                          style={{ backgroundColor: '#7cc7d0' }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.$id)}
                          className="px-4 py-2 rounded-md text-white font-medium"
                          style={{ backgroundColor: '#c33' }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CourseForm({ course, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    title: course?.title || '',
    overview: course?.overview || '',
    requiresProject: course?.requiresProject || false,
    projectRequirements: course?.projectRequirements || '',
    projectInstructions: course?.projectInstructions || ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (course) {
        await courseService.updateCourse(course.$id, formData);
      } else {
        await courseService.createCourse(formData);
      }
      onSuccess();
    } catch (error) {
      alert(`Failed to ${course ? 'update' : 'create'} course`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: '#1d1a36' }}>
          Course Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border-2 rounded-md"
          style={{ borderColor: '#7cc7d0', color: '#1d1a36' }}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: '#1d1a36' }}>
          Course Overview
        </label>
        <textarea
          value={formData.overview}
          onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
          className="w-full px-4 py-2 border-2 rounded-md"
          style={{ borderColor: '#7cc7d0', color: '#1d1a36' }}
          rows="4"
          required
        />
      </div>
      
      <div style={{ 
        padding: '1rem', 
        borderRadius: '8px', 
        border: '2px solid #7cc7d0',
        backgroundColor: '#f3fafd'
      }}>
        <div className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            id="requiresProject"
            checked={formData.requiresProject}
            onChange={(e) => setFormData({ ...formData, requiresProject: e.target.checked })}
            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
          />
          <label htmlFor="requiresProject" className="font-medium" style={{ color: '#1d1a36', cursor: 'pointer' }}>
            This course requires a project submission for certification
          </label>
        </div>
        
        {formData.requiresProject && (
          <>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1" style={{ color: '#1d1a36' }}>
                Project Requirements
              </label>
              <textarea
                value={formData.projectRequirements}
                onChange={(e) => setFormData({ ...formData, projectRequirements: e.target.value })}
                className="w-full px-4 py-2 border-2 rounded-md"
                style={{ borderColor: '#7cc7d0', color: '#1d1a36' }}
                rows="3"
                placeholder="What should students build? (e.g., Build a responsive website, Create a mobile app...)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#1d1a36' }}>
                Project Instructions
              </label>
              <textarea
                value={formData.projectInstructions}
                onChange={(e) => setFormData({ ...formData, projectInstructions: e.target.value })}
                className="w-full px-4 py-2 border-2 rounded-md"
                style={{ borderColor: '#7cc7d0', color: '#1d1a36' }}
                rows="4"
                placeholder="Detailed instructions for the project submission (e.g., Submit via GitHub link or Google Drive link...)"
              />
            </div>
          </>
        )}
      </div>
      
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-2 rounded-md text-white font-medium"
          style={{ backgroundColor: '#2197cd' }}
        >
          {loading ? 'Saving...' : course ? 'Update Course' : 'Create Course'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md font-medium"
          style={{ backgroundColor: '#e0e0e0', color: '#1d1a36' }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function CourseEditor({ course, onBack, onLogout }) {
  const [modules, setModules] = useState([]);
  const [videosByModule, setVideosByModule] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAddModule, setShowAddModule] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [showAddVideo, setShowAddVideo] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);

  useEffect(() => {
    loadCourseData();
  }, []);

  const loadCourseData = async () => {
    try {
      setLoading(true);
      const modulesData = await courseService.getModulesByCourse(course.$id);
      setModules(modulesData);

      const videosData = {};
      for (const module of modulesData) {
        const videos = await courseService.getVideosByModule(module.$id);
        videosData[module.$id] = videos;
      }
      setVideosByModule(videosData);
    } catch (error) {
      console.error('Failed to load course data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteModule = async (moduleId) => {
    if (confirm('Delete this module and all its videos?')) {
      try {
        await courseService.deleteModule(moduleId);
        loadCourseData();
      } catch (error) {
        alert('Failed to delete module');
      }
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (confirm('Delete this video?')) {
      try {
        await courseService.deleteVideo(videoId);
        loadCourseData();
      } catch (error) {
        alert('Failed to delete video');
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#f3fafd', minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#2197cd' }} className="p-6 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <button onClick={onBack} className="text-white hover:underline text-lg">
              ← Back to Courses
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-md text-white font-medium"
              style={{ backgroundColor: '#9b59b6' }}
            >
              Logout
            </button>
          </div>
          <h1 className="text-3xl font-bold text-white">{course.title}</h1>
          <p className="text-white mt-2">{course.overview}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold" style={{ color: '#1d1a36' }}>Course Content</h2>
          <button
            onClick={() => setShowAddModule(true)}
            className="px-6 py-3 rounded-md text-white font-medium"
            style={{ backgroundColor: '#2197cd' }}
          >
            + Add Module
          </button>
        </div>

        {showAddModule && (
          <div className="mb-6 bg-white rounded-lg shadow-lg p-6" style={{ borderTop: '4px solid #7cc7d0' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#1d1a36' }}>Add New Module</h3>
            <ModuleForm
              courseId={course.$id}
              moduleCount={modules.length}
              onSuccess={() => {
                setShowAddModule(false);
                loadCourseData();
              }}
              onCancel={() => setShowAddModule(false)}
            />
          </div>
        )}

        {loading ? (
          <p style={{ color: '#7cc7d0' }}>Loading...</p>
        ) : modules.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-xl mb-4" style={{ color: '#7cc7d0' }}>
              No modules yet. Add your first module!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {modules.map((module) => (
              <div
                key={module.$id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                style={{ borderLeft: '6px solid #7cc7d0' }}
              >
                {editingModule === module.$id ? (
                  <div className="p-6" style={{ backgroundColor: '#f8f9fa' }}>
                    <h3 className="text-lg font-bold mb-4" style={{ color: '#1d1a36' }}>Edit Module</h3>
                    <ModuleForm
                      courseId={course.$id}
                      module={module}
                      moduleCount={modules.length}
                      onSuccess={() => {
                        setEditingModule(null);
                        loadCourseData();
                      }}
                      onCancel={() => setEditingModule(null)}
                    />
                  </div>
                ) : (
                  <>
                    <div className="p-6" style={{ backgroundColor: '#f8f9fa' }}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded-full text-white font-bold" style={{ backgroundColor: '#7cc7d0' }}>
                            Module {module.order}
                          </span>
                          <h3 className="text-xl font-bold" style={{ color: '#1d1a36' }}>{module.title}</h3>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setShowAddVideo(module.$id)}
                            className="px-4 py-2 rounded-md text-white font-medium"
                            style={{ backgroundColor: '#9b59b6' }}
                          >
                            + Add Video
                          </button>
                          <button
                            onClick={() => setEditingModule(module.$id)}
                            className="px-4 py-2 rounded-md text-white font-medium"
                            style={{ backgroundColor: '#7cc7d0' }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteModule(module.$id)}
                            className="px-4 py-2 rounded-md text-white font-medium"
                            style={{ backgroundColor: '#c33' }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>

                    {showAddVideo === module.$id && (
                      <div className="p-6" style={{ backgroundColor: '#f3fafd' }}>
                        <h4 className="text-lg font-bold mb-4" style={{ color: '#1d1a36' }}>Add New Video</h4>
                        <VideoForm
                          moduleId={module.$id}
                          videoCount={videosByModule[module.$id]?.length || 0}
                          onSuccess={() => {
                            setShowAddVideo(null);
                            loadCourseData();
                          }}
                          onCancel={() => setShowAddVideo(null)}
                        />
                      </div>
                    )}

                    <div className="p-6">
                      {!videosByModule[module.$id] || videosByModule[module.$id].length === 0 ? (
                        <p style={{ color: '#7cc7d0' }}>No videos in this module yet.</p>
                      ) : (
                        <div className="space-y-3">
                          {videosByModule[module.$id].map((video) => (
                            <div key={video.$id}>
                              {editingVideo === video.$id ? (
                                <div className="p-4 rounded-lg border-2" style={{ borderColor: '#9b59b6', backgroundColor: '#fafafa' }}>
                                  <h5 className="text-md font-bold mb-3" style={{ color: '#1d1a36' }}>Edit Video</h5>
                                  <VideoForm
                                    moduleId={module.$id}
                                    video={video}
                                    videoCount={videosByModule[module.$id]?.length || 0}
                                    onSuccess={() => {
                                      setEditingVideo(null);
                                      loadCourseData();
                                    }}
                                    onCancel={() => setEditingVideo(null)}
                                  />
                                </div>
                              ) : (
                                <div className="p-4 rounded-lg border-2" style={{ borderColor: '#e0e0e0', backgroundColor: '#fafafa' }}>
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-1 rounded text-white text-sm font-bold" style={{ backgroundColor: '#9b59b6' }}>
                                          Video {video.order}
                                        </span>
                                        <h4 className="text-lg font-bold" style={{ color: '#1d1a36' }}>{video.title}</h4>
                                      </div>
                                      <p className="mb-2" style={{ color: '#7cc7d0' }}>{video.description}</p>
                                      <a
                                        href={video.youtubeLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm hover:underline inline-flex items-center gap-1"
                                        style={{ color: '#9b59b6' }}
                                      >
                                        <span>🎥</span>
                                        {video.youtubeLink}
                                      </a>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                      <button
                                        onClick={() => setEditingVideo(video.$id)}
                                        className="px-3 py-1 rounded-md text-white font-medium"
                                        style={{ backgroundColor: '#7cc7d0' }}
                                      >
                                        Edit
                                      </button>
                                      <button
                                        onClick={() => handleDeleteVideo(video.$id)}
                                        className="px-3 py-1 rounded-md text-white font-medium"
                                        style={{ backgroundColor: '#c33' }}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ModuleForm({ courseId, module, moduleCount, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    title: module?.title || '',
    order: module?.order || moduleCount + 1
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (module) {
        await courseService.updateModule(module.$id, {
          title: formData.title,
          order: parseInt(formData.order)
        });
      } else {
        await courseService.createModule({
          courseId,
          title: formData.title,
          order: parseInt(formData.order)
        });
      }
      onSuccess();
    } catch (error) {
      alert(`Failed to ${module ? 'update' : 'add'} module`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1" style={{ color: '#1d1a36' }}>Module Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border-2 rounded-md"
            style={{ borderColor: '#7cc7d0', color: '#1d1a36' }}
            placeholder="e.g., Introduction to React"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#1d1a36' }}>Order</label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: e.target.value })}
            className="w-full px-4 py-2 border-2 rounded-md"
            style={{ borderColor: '#7cc7d0', color: '#1d1a36' }}
            min="1"
            required
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button type="submit" disabled={loading} className="flex-1 px-4 py-2 rounded-md text-white font-medium" style={{ backgroundColor: '#7cc7d0' }}>
          {loading ? 'Saving...' : module ? 'Update Module' : 'Add Module'}
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md font-medium" style={{ backgroundColor: '#e0e0e0', color: '#1d1a36' }}>
          Cancel
        </button>
      </div>
    </form>
  );
}

function VideoForm({ moduleId, video, videoCount, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    title: video?.title || '',
    description: video?.description || '',
    youtubeLink: video?.youtubeLink || '',
    order: video?.order || videoCount + 1
  });
  const [loading, setLoading] = useState(false);
  const [showUploader, setShowUploader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (video) {
        await courseService.updateVideo(video.$id, {
          title: formData.title,
          description: formData.description,
          youtubeLink: formData.youtubeLink,
          order: parseInt(formData.order)
        });
      } else {
        await courseService.createVideo({
          moduleId,
          title: formData.title,
          description: formData.description,
          youtubeLink: formData.youtubeLink,
          order: parseInt(formData.order)
        });
      }
      onSuccess();
    } catch (error) {
      alert(`Failed to ${video ? 'update' : 'add'} video`);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadComplete = (uploadData) => {
    // Auto-fill form with uploaded video data
    setFormData({
      ...formData,
      title: uploadData.title,
      youtubeLink: uploadData.videoLink
    });
    setShowUploader(false);
    alert('Video uploaded successfully! Please add description and save.');
  };

  return (
    <>
      {showUploader && (
        <VideoUploader
          onUploadComplete={handleUploadComplete}
          onCancel={() => setShowUploader(false)}
        />
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <label className="block text-sm font-medium mb-1" style={{ color: '#1d1a36' }}>Video Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border-2 rounded-md"
              style={{ borderColor: '#7cc7d0', color: '#1d1a36' }}
              placeholder="e.g., What is React?"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#1d1a36' }}>Order</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: e.target.value })}
              className="w-full px-4 py-2 border-2 rounded-md"
              style={{ borderColor: '#7cc7d0', color: '#1d1a36' }}
              min="1"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#1d1a36' }}>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border-2 rounded-md"
            style={{ borderColor: '#7cc7d0', color: '#1d1a36' }}
            rows="3"
            placeholder="Brief description of what this video covers"
            required
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium" style={{ color: '#1d1a36' }}>
              Video Link (YouTube or Bunny.net)
            </label>
            {!video && (
              <button
                type="button"
                onClick={() => setShowUploader(true)}
                className="px-3 py-1 rounded-md text-white text-sm font-medium"
                style={{ backgroundColor: '#2197cd' }}
              >
                📤 Upload to Bunny.net
              </button>
            )}
          </div>
          <input
            type="text"
            value={formData.youtubeLink}
            onChange={(e) => setFormData({ ...formData, youtubeLink: e.target.value })}
            className="w-full px-4 py-2 border-2 rounded-md"
            style={{ borderColor: '#7cc7d0', color: '#1d1a36' }}
            placeholder="YouTube URL or Bunny Video ID"
            required
          />
          <p className="text-xs mt-1" style={{ color: '#64748b' }}>
            Paste YouTube URL, Bunny Video ID, or click "Upload to Bunny.net" to upload directly
          </p>
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={loading} className="flex-1 px-4 py-2 rounded-md text-white font-medium" style={{ backgroundColor: '#9b59b6' }}>
            {loading ? 'Saving...' : video ? 'Update Video' : 'Add Video'}
          </button>
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md font-medium" style={{ backgroundColor: '#e0e0e0', color: '#1d1a36' }}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default AdminDashboard;


// Submissions Manager Component
function SubmissionsManager({ onBack, onLogout }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [users, setUsers] = useState({});
  const [courses, setCourses] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [submissionsData, coursesData] = await Promise.all([
        courseService.getAllSubmissions(),
        courseService.getAllCourses()
      ]);
      
      setSubmissions(submissionsData);
      
      // Create courses lookup
      const coursesMap = {};
      coursesData.forEach(course => {
        coursesMap[course.$id] = course;
      });
      setCourses(coursesMap);
      
      // Load user data
      const { databases } = await import('./lib/appwrite');
      const usersMap = {};
      for (const sub of submissionsData) {
        if (!usersMap[sub.userId]) {
          try {
            const userData = await databases.getDocument(
              import.meta.env.VITE_APPWRITE_DATABASE_ID,
              import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
              sub.userId
            );
            usersMap[sub.userId] = userData;
          } catch (err) {
            console.error('Failed to load user:', err);
          }
        }
      }
      setUsers(usersMap);
    } catch (error) {
      console.error('Failed to load submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSubmissions = submissions.filter(sub => {
    // Filter by status
    if (filter !== 'all' && sub.status !== filter) return false;
    
    // Filter by search term
    if (searchTerm) {
      const user = users[sub.userId];
      const course = courses[sub.courseId];
      const searchLower = searchTerm.toLowerCase();
      
      return (
        user?.firstName?.toLowerCase().includes(searchLower) ||
        user?.lastName?.toLowerCase().includes(searchLower) ||
        user?.email?.toLowerCase().includes(searchLower) ||
        course?.title?.toLowerCase().includes(searchLower) ||
        sub.projectLink?.toLowerCase().includes(searchLower) ||
        sub.$id?.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  const handleApprove = async (submission) => {
    if (confirm('Approve this project and grant certification?')) {
      try {
        await courseService.updateSubmissionStatus(
          submission.$id,
          'approved',
          'Project approved. Certificate will be sent via email.',
          true
        );
        alert('Project approved! Please send the certificate to: ' + users[submission.userId]?.email);
        loadData();
      } catch (error) {
        alert('Failed to approve submission');
      }
    }
  };

  const handleReject = async (submission) => {
    const notes = prompt('Enter rejection reason:');
    if (notes) {
      try {
        await courseService.updateSubmissionStatus(
          submission.$id,
          'rejected',
          notes,
          false
        );
        loadData();
      } catch (error) {
        alert('Failed to reject submission');
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#f3fafd', minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#2197cd' }} className="p-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="text-white text-2xl hover:scale-110 transition-transform"
            >
              ←
            </button>
            <h1 className="text-3xl font-bold text-white">Project Submissions</h1>
          </div>
          <button
            onClick={onLogout}
            className="px-6 py-2 rounded-md text-white font-medium"
            style={{ backgroundColor: '#9b59b6' }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by student name, email, course, submission ID, or project link..."
            className="w-full px-6 py-4 text-lg border-2 rounded-xl focus:outline-none focus:ring-2"
            style={{ borderColor: '#7cc7d0', color: '#1d1a36' }}
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {['all', 'pending', 'approved', 'rejected'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className="px-4 py-2 rounded-md font-medium transition-all capitalize"
              style={{
                backgroundColor: filter === status ? '#2197cd' : 'white',
                color: filter === status ? 'white' : '#1d1a36',
                border: `2px solid ${filter === status ? '#2197cd' : '#7cc7d0'}`
              }}
            >
              {status} ({submissions.filter(s => status === 'all' || s.status === status).length})
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl" style={{ color: '#7cc7d0' }}>Loading submissions...</p>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl" style={{ color: '#1d1a36' }}>No submissions found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredSubmissions.map(submission => {
              const user = users[submission.userId];
              const course = courses[submission.courseId];
              
              return (
                <div
                  key={submission.$id}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                  style={{ border: '2px solid #7cc7d0' }}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1" style={{ color: '#1d1a36' }}>
                          {course?.title || 'Unknown Course'}
                        </h3>
                        <p className="text-sm mb-2" style={{ color: '#7cc7d0' }}>
                          Submitted by: {user?.firstName} {user?.lastName} ({user?.email})
                        </p>
                        <p className="text-sm" style={{ color: '#1d1a36' }}>
                          Submitted: {new Date(submission.submittedAt).toLocaleString()}
                        </p>
                      </div>
                      <span
                        className="px-4 py-2 rounded-full text-sm font-bold capitalize"
                        style={{
                          backgroundColor: 
                            submission.status === 'approved' ? '#10b981' :
                            submission.status === 'rejected' ? '#ef4444' :
                            '#f59e0b',
                          color: 'white'
                        }}
                      >
                        {submission.status}
                      </span>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium mb-1" style={{ color: '#1d1a36' }}>
                        Project Link:
                      </p>
                      <a
                        href={submission.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm break-all hover:underline"
                        style={{ color: '#2197cd' }}
                      >
                        {submission.projectLink}
                      </a>
                    </div>

                    {submission.adminNotes && (
                      <div className="mb-4 p-3 rounded-md" style={{ backgroundColor: '#f3fafd' }}>
                        <p className="text-sm font-medium mb-1" style={{ color: '#1d1a36' }}>
                          Admin Notes:
                        </p>
                        <p className="text-sm" style={{ color: '#7cc7d0' }}>
                          {submission.adminNotes}
                        </p>
                      </div>
                    )}

                    {submission.certified && (
                      <div className="mb-4 p-3 rounded-md" style={{ backgroundColor: '#d1fae5', border: '1px solid #10b981' }}>
                        <p className="text-sm font-bold" style={{ color: '#10b981' }}>
                          ✓ Certificate Granted
                        </p>
                      </div>
                    )}

                    {submission.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(submission)}
                          className="flex-1 px-4 py-2 rounded-md text-white font-medium"
                          style={{ backgroundColor: '#10b981' }}
                        >
                          ✓ Approve & Certify
                        </button>
                        <button
                          onClick={() => handleReject(submission)}
                          className="flex-1 px-4 py-2 rounded-md text-white font-medium"
                          style={{ backgroundColor: '#ef4444' }}
                        >
                          ✗ Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

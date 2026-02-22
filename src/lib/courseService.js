import { databases } from './appwrite';
import { ID, Query } from 'appwrite';

export const courseService = {
  // Course Management
  async createCourse(courseData) {
    try {
      return await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COURSES_COLLECTION_ID,
        ID.unique(),
        courseData
      );
    } catch (error) {
      throw error;
    }
  },

  async getAllCourses() {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COURSES_COLLECTION_ID
      );
      return response.documents;
    } catch (error) {
      throw error;
    }
  },

  async getCourse(courseId) {
    try {
      return await databases.getDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COURSES_COLLECTION_ID,
        courseId
      );
    } catch (error) {
      throw error;
    }
  },

  async updateCourse(courseId, courseData) {
    try {
      return await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COURSES_COLLECTION_ID,
        courseId,
        courseData
      );
    } catch (error) {
      throw error;
    }
  },

  async deleteCourse(courseId) {
    try {
      return await databases.deleteDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COURSES_COLLECTION_ID,
        courseId
      );
    } catch (error) {
      throw error;
    }
  },

  async searchCourses(searchTerm) {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COURSES_COLLECTION_ID,
        [Query.search('title', searchTerm)]
      );
      return response.documents;
    } catch (error) {
      throw error;
    }
  },

  // Module Management
  async createModule(moduleData) {
    try {
      return await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_MODULES_COLLECTION_ID,
        ID.unique(),
        moduleData
      );
    } catch (error) {
      throw error;
    }
  },

  async getModulesByCourse(courseId) {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_MODULES_COLLECTION_ID,
        [Query.equal('courseId', courseId), Query.orderAsc('order')]
      );
      return response.documents;
    } catch (error) {
      throw error;
    }
  },

  async updateModule(moduleId, moduleData) {
    try {
      return await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_MODULES_COLLECTION_ID,
        moduleId,
        moduleData
      );
    } catch (error) {
      throw error;
    }
  },

  async deleteModule(moduleId) {
    try {
      return await databases.deleteDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_MODULES_COLLECTION_ID,
        moduleId
      );
    } catch (error) {
      throw error;
    }
  },

  // Video Management
  async createVideo(videoData) {
    try {
      return await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_VIDEOS_COLLECTION_ID,
        ID.unique(),
        videoData
      );
    } catch (error) {
      throw error;
    }
  },

  async getVideosByModule(moduleId) {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_VIDEOS_COLLECTION_ID,
        [Query.equal('moduleId', moduleId), Query.orderAsc('order')]
      );
      return response.documents;
    } catch (error) {
      throw error;
    }
  },

  async updateVideo(videoId, videoData) {
    try {
      return await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_VIDEOS_COLLECTION_ID,
        videoId,
        videoData
      );
    } catch (error) {
      throw error;
    }
  },

  async deleteVideo(videoId) {
    try {
      return await databases.deleteDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_VIDEOS_COLLECTION_ID,
        videoId
      );
    } catch (error) {
      throw error;
    }
  },

  // User Progress
  async markVideoComplete(userId, videoId) {
    try {
      return await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_USER_PROGRESS_COLLECTION_ID,
        ID.unique(),
        {
          userId,
          videoId,
          completed: true,
          completedAt: new Date().toISOString()
        }
      );
    } catch (error) {
      throw error;
    }
  },

  async getUserProgress(userId) {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_USER_PROGRESS_COLLECTION_ID,
        [Query.equal('userId', userId)]
      );
      return response.documents;
    } catch (error) {
      throw error;
    }
  },

  // Optimized batch queries for better performance
  async getAllVideosForCourse(courseId) {
    try {
      // Get all modules for the course
      const modules = await this.getModulesByCourse(courseId);
      
      if (modules.length === 0) return [];

      // Get all videos for all modules in one query using OR condition
      const moduleIds = modules.map(m => m.$id);
      
      // Fetch videos for all modules
      const allVideos = [];
      for (const moduleId of moduleIds) {
        const videos = await this.getVideosByModule(moduleId);
        allVideos.push(...videos);
      }
      
      return allVideos;
    } catch (error) {
      throw error;
    }
  },

  async getCourseProgressStats(userId) {
    try {
      // Get all data in parallel
      const [courses, userProgress] = await Promise.all([
        this.getAllCourses(),
        this.getUserProgress(userId)
      ]);

      // Create a Set of completed video IDs for fast lookup
      const completedVideoIds = new Set(
        userProgress.filter(p => p.completed).map(p => p.videoId)
      );

      const stats = {
        inProgress: [],
        completed: [],
        notStarted: []
      };

      // Process each course
      for (const course of courses) {
        const videos = await this.getAllVideosForCourse(course.$id);
        
        if (videos.length === 0) {
          stats.notStarted.push(course);
          continue;
        }

        const completedCount = videos.filter(v => completedVideoIds.has(v.$id)).length;
        const progressPercentage = Math.round((completedCount / videos.length) * 100);

        const courseWithProgress = {
          ...course,
          totalVideos: videos.length,
          completedVideos: completedCount,
          progressPercentage
        };

        if (completedCount === 0) {
          stats.notStarted.push(course);
        } else if (completedCount === videos.length) {
          stats.completed.push(courseWithProgress);
        } else {
          stats.inProgress.push(courseWithProgress);
        }
      }

      return stats;
    } catch (error) {
      throw error;
    }
  },

  // Project Submission Management
  async submitProject(userId, courseId, projectLink) {
    try {
      // Check if already submitted
      const existing = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_PROJECT_SUBMISSIONS_COLLECTION_ID,
        [
          Query.equal('userId', userId),
          Query.equal('courseId', courseId)
        ]
      );

      const now = new Date().toISOString();

      if (existing.documents.length > 0) {
        // Update existing submission
        return await databases.updateDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_PROJECT_SUBMISSIONS_COLLECTION_ID,
          existing.documents[0].$id,
          {
            projectLink,
            submittedAt: now,
            status: 'pending'
          }
        );
      }

      // Create new submission
      return await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_PROJECT_SUBMISSIONS_COLLECTION_ID,
        ID.unique(),
        {
          userId,
          courseId,
          projectLink,
          submittedAt: now,
          status: 'pending',
          certified: false
        }
      );
    } catch (error) {
      throw error;
    }
  },

  async getProjectSubmission(userId, courseId) {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_PROJECT_SUBMISSIONS_COLLECTION_ID,
        [
          Query.equal('userId', userId),
          Query.equal('courseId', courseId)
        ]
      );
      return response.documents.length > 0 ? response.documents[0] : null;
    } catch (error) {
      throw error;
    }
  },

  async getAllSubmissions() {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_PROJECT_SUBMISSIONS_COLLECTION_ID
      );
      return response.documents;
    } catch (error) {
      throw error;
    }
  },

  async getPendingSubmissions() {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_PROJECT_SUBMISSIONS_COLLECTION_ID,
        [Query.equal('status', 'pending')]
      );
      return response.documents;
    } catch (error) {
      throw error;
    }
  },

  async updateSubmissionStatus(submissionId, status, adminNotes, certified = false) {
    try {
      return await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_PROJECT_SUBMISSIONS_COLLECTION_ID,
        submissionId,
        {
          status,
          adminNotes,
          certified
        }
      );
    } catch (error) {
      throw error;
    }
  },

  async getUserCertifications(userId) {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_PROJECT_SUBMISSIONS_COLLECTION_ID,
        [
          Query.equal('userId', userId),
          Query.equal('certified', true)
        ]
      );
      return response.documents;
    } catch (error) {
      throw error;
    }
  }
};

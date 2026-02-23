// Bunny.net Stream API Service

const BUNNY_LIBRARY_ID = import.meta.env.VITE_BUNNY_LIBRARY_ID;
const BUNNY_API_KEY = import.meta.env.VITE_BUNNY_API_KEY;
const BUNNY_API_BASE = 'https://video.bunnycdn.com';

class BunnyService {
  // Create a video entry in Bunny.net
  async createVideo(title, collectionId = null) {
    try {
      const response = await fetch(`${BUNNY_API_BASE}/library/${BUNNY_LIBRARY_ID}/videos`, {
        method: 'POST',
        headers: {
          'AccessKey': BUNNY_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          collectionId: collectionId
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to create video: ${response.statusText}`);
      }

      const data = await response.json();
      return data; // Returns { guid, libraryId, ... }
    } catch (error) {
      console.error('Error creating video in Bunny.net:', error);
      throw error;
    }
  }

  // Upload video file to Bunny.net
  async uploadVideo(videoId, file, onProgress) {
    try {
      const response = await fetch(`${BUNNY_API_BASE}/library/${BUNNY_LIBRARY_ID}/videos/${videoId}`, {
        method: 'PUT',
        headers: {
          'AccessKey': BUNNY_API_KEY,
          'Content-Type': 'application/octet-stream'
        },
        body: file
      });

      if (!response.ok) {
        throw new Error(`Failed to upload video: ${response.statusText}`);
      }

      return { success: true, videoId };
    } catch (error) {
      console.error('Error uploading video to Bunny.net:', error);
      throw error;
    }
  }

  // Combined: Create and upload video
  async createAndUploadVideo(title, file, onProgress) {
    try {
      // Step 1: Create video entry
      onProgress?.({ stage: 'creating', progress: 0, message: 'Creating video entry...' });
      const videoData = await this.createVideo(title);
      const videoId = videoData.guid;

      // Step 2: Upload video file
      onProgress?.({ stage: 'uploading', progress: 0, message: 'Uploading video file...' });
      await this.uploadVideo(videoId, file, onProgress);

      // Step 3: Return video ID
      onProgress?.({ stage: 'complete', progress: 100, message: 'Upload complete!' });
      return {
        videoId: videoId,
        libraryId: BUNNY_LIBRARY_ID,
        videoLink: `bunny:${BUNNY_LIBRARY_ID}/${videoId}`,
        embedUrl: `https://iframe.mediadelivery.net/embed/${BUNNY_LIBRARY_ID}/${videoId}`
      };
    } catch (error) {
      onProgress?.({ stage: 'error', progress: 0, message: error.message });
      throw error;
    }
  }

  // Get video information
  async getVideo(videoId) {
    try {
      const response = await fetch(`${BUNNY_API_BASE}/library/${BUNNY_LIBRARY_ID}/videos/${videoId}`, {
        headers: {
          'AccessKey': BUNNY_API_KEY
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get video: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting video from Bunny.net:', error);
      throw error;
    }
  }

  // Delete video from Bunny.net
  async deleteVideo(videoId) {
    try {
      const response = await fetch(`${BUNNY_API_BASE}/library/${BUNNY_LIBRARY_ID}/videos/${videoId}`, {
        method: 'DELETE',
        headers: {
          'AccessKey': BUNNY_API_KEY
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to delete video: ${response.statusText}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Error deleting video from Bunny.net:', error);
      throw error;
    }
  }

  // Check if video is ready (processing complete)
  async isVideoReady(videoId) {
    try {
      const video = await this.getVideo(videoId);
      // Status: 0 = Queued, 1 = Processing, 2 = Encoding, 3 = Finished, 4 = Resolution Finished, 5 = Failed
      return video.status >= 3;
    } catch (error) {
      console.error('Error checking video status:', error);
      return false;
    }
  }

  // Format video link for storage
  formatVideoLink(videoId) {
    return `bunny:${BUNNY_LIBRARY_ID}/${videoId}`;
  }

  // Extract video ID from various formats
  extractVideoId(link) {
    if (!link) return null;

    // Format: bunny:LIBRARY_ID/VIDEO_ID
    if (link.startsWith('bunny:')) {
      const parts = link.split('/');
      return parts[parts.length - 1];
    }

    // Format: https://iframe.mediadelivery.net/embed/LIBRARY_ID/VIDEO_ID
    if (link.includes('mediadelivery.net')) {
      const parts = link.split('/');
      return parts[parts.length - 1].split('?')[0];
    }

    // Assume it's just the video ID
    return link;
  }
}

export const bunnyService = new BunnyService();

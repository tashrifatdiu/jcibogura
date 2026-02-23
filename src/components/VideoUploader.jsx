import { useState } from 'react';
import { useTheme } from '../ThemeContext';
import { bunnyService } from '../lib/bunnyService';

function VideoUploader({ onUploadComplete, onCancel }) {
  const { colors, isDark } = useTheme();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({ stage: '', progress: 0, message: '' });
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check if it's a video file
      if (!selectedFile.type.startsWith('video/')) {
        setError('Please select a valid video file');
        return;
      }
      
      // Check file size (max 2GB)
      const maxSize = 2 * 1024 * 1024 * 1024; // 2GB
      if (selectedFile.size > maxSize) {
        setError('File size must be less than 2GB');
        return;
      }

      setFile(selectedFile);
      setError('');
      
      // Auto-fill title from filename if empty
      if (!title) {
        const filename = selectedFile.name.replace(/\.[^/.]+$/, ''); // Remove extension
        setTitle(filename);
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !title.trim()) {
      setError('Please provide both a file and title');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const result = await bunnyService.createAndUploadVideo(
        title,
        file,
        (progressData) => {
          setProgress(progressData);
        }
      );

      // Call parent callback with video information
      onUploadComplete({
        videoId: result.videoId,
        videoLink: result.videoLink,
        title: title
      });
    } catch (err) {
      setError(err.message || 'Failed to upload video');
      setUploading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: colors.cardBg,
        borderRadius: '16px',
        padding: '2rem',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        border: `1px solid ${colors.border}`
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.text, marginBottom: '1.5rem' }}>
          Upload Video to Bunny.net
        </h2>

        {error && (
          <div style={{
            padding: '1rem',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            color: colors.error,
            marginBottom: '1rem',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        {!uploading ? (
          <>
            {/* Title Input */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: colors.text,
                marginBottom: '0.5rem'
              }}>
                Video Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter video title"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  borderRadius: '8px',
                  border: `2px solid ${colors.border}`,
                  backgroundColor: colors.inputBg,
                  color: colors.text,
                  outline: 'none',
                  transition: 'border-color 0.3s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = colors.primary}
                onBlur={(e) => e.target.style.borderColor = colors.border}
              />
            </div>

            {/* File Input */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: colors.text,
                marginBottom: '0.5rem'
              }}>
                Video File *
              </label>
              <div style={{
                border: `2px dashed ${colors.border}`,
                borderRadius: '8px',
                padding: '2rem',
                textAlign: 'center',
                backgroundColor: colors.surface,
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = colors.primary}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = colors.border}
              >
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  id="video-file-input"
                />
                <label htmlFor="video-file-input" style={{ cursor: 'pointer' }}>
                  {file ? (
                    <div>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
                      <p style={{ color: colors.text, fontWeight: '600', marginBottom: '0.25rem' }}>
                        {file.name}
                      </p>
                      <p style={{ color: colors.textSecondary, fontSize: '0.875rem' }}>
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      <p style={{ color: colors.primary, fontSize: '0.875rem', marginTop: '0.5rem' }}>
                        Click to change file
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📹</div>
                      <p style={{ color: colors.text, fontWeight: '600', marginBottom: '0.25rem' }}>
                        Click to select video file
                      </p>
                      <p style={{ color: colors.textSecondary, fontSize: '0.875rem' }}>
                        or drag and drop
                      </p>
                      <p style={{ color: colors.textSecondary, fontSize: '0.75rem', marginTop: '0.5rem' }}>
                        Max size: 2GB • Formats: MP4, MOV, AVI, etc.
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Info Box */}
            <div style={{
              padding: '1rem',
              backgroundColor: isDark ? 'rgba(33, 151, 205, 0.1)' : 'rgba(33, 151, 205, 0.1)',
              border: `1px solid ${colors.primary}`,
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}>
              <p style={{ fontSize: '0.875rem', color: colors.text, margin: 0 }}>
                💡 <strong>Note:</strong> Video will be uploaded to Bunny.net and automatically saved to your course. Processing may take a few minutes depending on video length.
              </p>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={handleUpload}
                disabled={!file || !title.trim()}
                style={{
                  flex: 1,
                  padding: '0.875rem',
                  backgroundColor: (!file || !title.trim()) ? colors.border : colors.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '1rem',
                  cursor: (!file || !title.trim()) ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  opacity: (!file || !title.trim()) ? 0.5 : 1
                }}
                onMouseEnter={(e) => {
                  if (file && title.trim()) {
                    e.target.style.backgroundColor = colors.primaryHover;
                    e.target.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (file && title.trim()) {
                    e.target.style.backgroundColor = colors.primary;
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              >
                Upload Video
              </button>
              <button
                onClick={onCancel}
                style={{
                  flex: 1,
                  padding: '0.875rem',
                  backgroundColor: 'transparent',
                  color: colors.text,
                  border: `2px solid ${colors.border}`,
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = colors.surface;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            {/* Progress Indicator */}
            <div style={{
              width: '80px',
              height: '80px',
              border: `4px solid ${colors.border}`,
              borderTop: `4px solid ${colors.primary}`,
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1.5rem'
            }}></div>
            
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: colors.text, marginBottom: '0.5rem' }}>
              {progress.stage === 'creating' && 'Creating video entry...'}
              {progress.stage === 'uploading' && 'Uploading video...'}
              {progress.stage === 'complete' && 'Upload complete!'}
            </h3>
            
            <p style={{ fontSize: '0.95rem', color: colors.textSecondary, marginBottom: '1.5rem' }}>
              {progress.message}
            </p>

            {progress.stage === 'uploading' && (
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: colors.border,
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '1rem'
              }}>
                <div style={{
                  height: '100%',
                  width: `${progress.progress}%`,
                  backgroundColor: colors.primary,
                  transition: 'width 0.3s'
                }}></div>
              </div>
            )}

            <p style={{ fontSize: '0.875rem', color: colors.textSecondary }}>
              Please don't close this window...
            </p>

            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoUploader;

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../ThemeContext';

function BunnyVideoPlayer({ videoId, onTimeUpdate, onEnded, onReady }) {
  const { colors, isDark } = useTheme();
  const iframeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get library ID from environment or extract from videoId if it includes library ID
  const getLibraryAndVideoId = () => {
    if (!videoId) return { libraryId: null, videoGuid: null };
    
    // If videoId contains /, it's in format LIBRARY_ID/VIDEO_GUID
    if (videoId.includes('/')) {
      const [lib, vid] = videoId.split('/');
      return { libraryId: lib, videoGuid: vid };
    }
    
    // Otherwise, use env library ID and videoId as the GUID
    return { 
      libraryId: import.meta.env.VITE_BUNNY_LIBRARY_ID || '604606', 
      videoGuid: videoId 
    };
  };

  const { libraryId, videoGuid } = getLibraryAndVideoId();

  useEffect(() => {
    if (!videoGuid || !libraryId) return;

    // Reset loading state when video changes
    setIsLoading(true);

    // Notify parent when iframe loads
    const handleLoad = () => {
      setIsLoading(false);
      if (onReady) onReady();
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleLoad);
      return () => iframe.removeEventListener('load', handleLoad);
    }
  }, [videoGuid, libraryId, onReady]);

  if (!videoGuid || !libraryId) {
    return (
      <div style={{
        width: '100%',
        paddingTop: '56.25%',
        position: 'relative',
        backgroundColor: colors.surface,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: colors.textSecondary
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎥</div>
          <p>No video selected</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#000' }}>
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.surface,
          zIndex: 1
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '50px',
              height: '50px',
              border: `4px solid ${colors.border}`,
              borderTop: `4px solid ${colors.primary}`,
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }}></div>
            <p style={{ color: colors.textSecondary }}>Loading video...</p>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={`https://iframe.mediadelivery.net/embed/${libraryId}/${videoGuid}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`}
        loading="lazy"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default BunnyVideoPlayer;

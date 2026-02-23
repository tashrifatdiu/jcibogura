import { useTheme } from '../ThemeContext';

function LoadingSpinner({ message = 'Loading...', size = 'medium' }) {
  const { colors } = useTheme();
  
  const sizes = {
    small: { spinner: '40px', text: '0.875rem' },
    medium: { spinner: '60px', text: '1rem' },
    large: { spinner: '80px', text: '1.25rem' }
  };

  const currentSize = sizes[size];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      minHeight: '200px'
    }}>
      <div style={{
        width: currentSize.spinner,
        height: currentSize.spinner,
        border: `4px solid ${colors.border}`,
        borderTop: `4px solid ${colors.primary}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '1rem'
      }}></div>
      <p style={{
        fontSize: currentSize.text,
        color: colors.textSecondary,
        fontWeight: '500'
      }}>
        {message}
      </p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default LoadingSpinner;

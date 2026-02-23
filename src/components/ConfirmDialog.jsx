import { useTheme } from '../ThemeContext';

function ConfirmDialog({ title, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel', type = 'danger' }) {
  const { colors, isDark } = useTheme();

  const typeColors = {
    danger: '#ef4444',
    warning: '#f59e0b',
    info: '#2197cd',
    success: '#10b981'
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
      zIndex: 9999,
      padding: '1rem',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{
        backgroundColor: colors.cardBg,
        borderRadius: '16px',
        padding: '2rem',
        maxWidth: '450px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        border: `1px solid ${colors.border}`,
        animation: 'scaleIn 0.2s ease-out'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: colors.text,
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          {type === 'danger' && <span style={{ color: typeColors.danger }}>⚠️</span>}
          {type === 'warning' && <span style={{ color: typeColors.warning }}>⚠️</span>}
          {type === 'info' && <span style={{ color: typeColors.info }}>ℹ️</span>}
          {type === 'success' && <span style={{ color: typeColors.success }}>✓</span>}
          {title}
        </h3>
        <p style={{
          fontSize: '1rem',
          color: colors.textSecondary,
          marginBottom: '2rem',
          lineHeight: 1.6
        }}>
          {message}
        </p>
        <div style={{
          display: 'flex',
          gap: '1rem'
        }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              padding: '0.875rem',
              backgroundColor: 'transparent',
              color: colors.text,
              border: `2px solid ${colors.border}`,
              borderRadius: '10px',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = colors.surface}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: '0.875rem',
              backgroundColor: typeColors[type],
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default ConfirmDialog;

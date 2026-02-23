import { useEffect } from 'react';
import { useTheme } from '../ThemeContext';

function Toast({ message, type = 'info', onClose, duration = 3000 }) {
  const { colors, isDark } = useTheme();

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const typeStyles = {
    success: {
      bg: isDark ? 'rgba(16, 185, 129, 0.2)' : '#d1fae5',
      border: '#10b981',
      icon: '✓',
      color: '#10b981'
    },
    error: {
      bg: isDark ? 'rgba(239, 68, 68, 0.2)' : '#fee2e2',
      border: '#ef4444',
      icon: '✕',
      color: '#ef4444'
    },
    warning: {
      bg: isDark ? 'rgba(245, 158, 11, 0.2)' : '#fef3c7',
      border: '#f59e0b',
      icon: '⚠',
      color: '#f59e0b'
    },
    info: {
      bg: isDark ? 'rgba(33, 151, 205, 0.2)' : '#dbeafe',
      border: '#2197cd',
      icon: 'ℹ',
      color: '#2197cd'
    }
  };

  const style = typeStyles[type];

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      minWidth: '300px',
      maxWidth: '500px',
      backgroundColor: style.bg,
      border: `2px solid ${style.border}`,
      borderRadius: '12px',
      padding: '1rem 1.5rem',
      boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      animation: 'slideIn 0.3s ease-out'
    }}>
      <div style={{
        fontSize: '1.5rem',
        color: style.color,
        fontWeight: 'bold'
      }}>
        {style.icon}
      </div>
      <p style={{
        flex: 1,
        margin: 0,
        color: colors.text,
        fontSize: '0.95rem',
        fontWeight: '500'
      }}>
        {message}
      </p>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: colors.textSecondary,
          fontSize: '1.25rem',
          cursor: 'pointer',
          padding: '0',
          lineHeight: 1
        }}
      >
        ×
      </button>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default Toast;

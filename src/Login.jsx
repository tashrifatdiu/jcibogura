import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { authService } from './lib/auth';

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { colors, isDark } = theme;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.loginUser(email, password);
      onLoginSuccess();
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
        transition: 'background-color 0.3s'
      }}
    >
      <div 
        style={{
          background: colors.cardBg,
          padding: '2.5rem',
          borderRadius: '20px',
          boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '440px',
          border: `1px solid ${colors.border}`
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            background: '#1d1a36',
            borderRadius: '16px',
            padding: '12px',
            display: 'inline-block',
            marginBottom: '1rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}>
            <img src="/jcilogo.png" alt="JCI Bogura" style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
          </div>
          <h2 style={{ 
            fontSize: '2rem',
            fontWeight: '700',
            color: colors.text,
            margin: 0,
            letterSpacing: '-0.5px'
          }}>
            Welcome Back
          </h2>
          <p style={{ fontSize: '0.95rem', color: colors.textSecondary, marginTop: '0.5rem' }}>
            Sign in to continue learning
          </p>
        </div>
        
        {error && (
          <div style={{ 
            marginBottom: '1.5rem',
            padding: '1rem',
            borderRadius: '12px',
            backgroundColor: isDark ? 'rgba(239, 68, 68, 0.1)' : '#fee',
            color: colors.error,
            border: `1px solid ${isDark ? 'rgba(239, 68, 68, 0.3)' : '#fcc'}`,
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label 
              htmlFor="email" 
              style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: colors.text
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                fontSize: '1rem',
                borderRadius: '12px',
                border: `2px solid ${colors.border}`,
                backgroundColor: colors.inputBg,
                color: colors.text,
                outline: 'none',
                transition: 'all 0.3s',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your email"
              required
              onFocus={(e) => {
                e.target.style.borderColor = colors.primary;
                e.target.style.boxShadow = `0 0 0 3px ${isDark ? 'rgba(33, 151, 205, 0.1)' : 'rgba(33, 151, 205, 0.1)'}`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = colors.border;
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          <div>
            <label 
              htmlFor="password" 
              style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: colors.text
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                fontSize: '1rem',
                borderRadius: '12px',
                border: `2px solid ${colors.border}`,
                backgroundColor: colors.inputBg,
                color: colors.text,
                outline: 'none',
                transition: 'all 0.3s',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your password"
              required
              onFocus={(e) => {
                e.target.style.borderColor = colors.primary;
                e.target.style.boxShadow = `0 0 0 3px ${isDark ? 'rgba(33, 151, 205, 0.1)' : 'rgba(33, 151, 205, 0.1)'}`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = colors.border;
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ 
              width: '100%',
              padding: '1rem',
              fontSize: '1rem',
              fontWeight: '600',
              color: 'white',
              backgroundColor: loading ? colors.primaryHover : colors.primary,
              border: 'none',
              borderRadius: '12px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              boxShadow: `0 4px 12px ${isDark ? 'rgba(33, 151, 205, 0.3)' : 'rgba(33, 151, 205, 0.2)'}`,
              opacity: loading ? 0.7 : 1
            }}
            onMouseEnter={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div style={{ marginTop: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div>
            <button 
              onClick={() => navigate('/')}
              style={{
                color: colors.textSecondary,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '0.9rem',
                textDecoration: 'underline',
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.color = colors.text}
              onMouseLeave={(e) => e.target.style.color = colors.textSecondary}
            >
              ← Back to Home
            </button>
          </div>
          <div style={{ fontSize: '0.9rem' }}>
            <span style={{ color: colors.textSecondary }}>Don't have an account? </span>
            <button 
              onClick={() => navigate('/register')}
              style={{
                color: colors.primary,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem',
                textDecoration: 'underline'
              }}
            >
              Register here
            </button>
          </div>
          <div>
            <button 
              onClick={() => navigate('/admin-login')}
              style={{
                color: colors.accent,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem',
                textDecoration: 'underline'
              }}
            >
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

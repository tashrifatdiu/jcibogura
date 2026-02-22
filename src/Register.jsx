import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { authService } from './lib/auth';

function Register({ onRegisterSuccess }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { colors, isDark } = theme;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    profession: '',
    institute: '',
    company: '',
    position: '',
    address: '',
    phoneNumber: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userData = {
        ...formData,
        age: parseInt(formData.age, 10)
      };
      await authService.registerUser(userData);
      onRegisterSuccess();
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const isProfessionStudent = formData.profession.toLowerCase() === 'student';
  const isProfessionJobHolder = formData.profession.toLowerCase() === 'job holder' || 
                                 formData.profession.toLowerCase() === 'employed';

  const inputStyle = {
    width: '100%',
    padding: '0.875rem 1rem',
    fontSize: '0.95rem',
    borderRadius: '12px',
    border: `2px solid ${colors.border}`,
    backgroundColor: colors.inputBg,
    color: colors.text,
    outline: 'none',
    transition: 'all 0.3s',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.9rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: colors.text
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
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
          maxWidth: '700px',
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
            Create Account
          </h2>
          <p style={{ fontSize: '0.95rem', color: colors.textSecondary, marginTop: '0.5rem' }}>
            Join us and start learning today
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label htmlFor="firstName" style={labelStyle}>First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                style={inputStyle}
                placeholder="First name"
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
              <label htmlFor="lastName" style={labelStyle}>Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Last name"
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
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label htmlFor="age" style={labelStyle}>Age *</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Age"
                required
                min="1"
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
              <label htmlFor="profession" style={labelStyle}>Profession *</label>
              <select
                id="profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                style={inputStyle}
                required
                onFocus={(e) => {
                  e.target.style.borderColor = colors.primary;
                  e.target.style.boxShadow = `0 0 0 3px ${isDark ? 'rgba(33, 151, 205, 0.1)' : 'rgba(33, 151, 205, 0.1)'}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.border;
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="">Select profession</option>
                <option value="Student">Student</option>
                <option value="Job Holder">Job Holder</option>
                <option value="Business">Business</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {isProfessionStudent && (
            <div>
              <label htmlFor="institute" style={labelStyle}>Institute *</label>
              <input
                type="text"
                id="institute"
                name="institute"
                value={formData.institute}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Institute name"
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
          )}

          {isProfessionJobHolder && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label htmlFor="company" style={labelStyle}>Company *</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="Company name"
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
                <label htmlFor="position" style={labelStyle}>Position *</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="Position"
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
            </div>
          )}

          <div>
            <label htmlFor="address" style={labelStyle}>Address *</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              style={{...inputStyle, minHeight: '80px', resize: 'vertical'}}
              placeholder="Full address"
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
            <label htmlFor="phoneNumber" style={labelStyle}>Phone Number *</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Phone number"
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
            <label htmlFor="email" style={labelStyle}>Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Email address"
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
            <label htmlFor="password" style={labelStyle}>Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Password (min 8 characters)"
              required
              minLength={8}
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
            {loading ? 'Creating Account...' : 'Register'}
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
            <span style={{ color: colors.textSecondary }}>Already have an account? </span>
            <button 
              onClick={() => navigate('/login')}
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
              Login here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

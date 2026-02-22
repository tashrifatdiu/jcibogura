import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { 
  FaBook, 
  FaUser, 
  FaInfoCircle, 
  FaEnvelope, 
  FaQuestionCircle,
  FaSun,
  FaMoon,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { colors, isDark, toggleTheme } = theme;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const publicLinks = [
    { name: 'Home', path: '/', icon: FaBook },
    { name: 'About', path: '/about', icon: FaInfoCircle },
    { name: 'Contact', path: '/contact', icon: FaEnvelope },
    { name: 'FAQ', path: '/faq', icon: FaQuestionCircle }
  ];

  const userLinks = [
    { name: 'Courses', path: '/courses', icon: FaBook },
    { name: 'Profile', path: '/profile', icon: FaUser },
    { name: 'About', path: '/about', icon: FaInfoCircle },
    { name: 'Contact', path: '/contact', icon: FaEnvelope },
    { name: 'FAQ', path: '/faq', icon: FaQuestionCircle }
  ];

  const navLinks = user ? userLinks : publicLinks;

  return (
    <nav style={{
      background: isDark 
        ? 'linear-gradient(135deg, rgba(33, 151, 205, 0.1) 0%, rgba(124, 199, 208, 0.1) 100%)'
        : 'linear-gradient(135deg, #2197cd 0%, #7cc7d0 100%)',
      backdropFilter: 'blur(10px)',
      boxShadow: isDark ? '0 4px 30px rgba(0, 0, 0, 0.3)' : '0 4px 30px rgba(0, 0, 0, 0.1)',
      borderBottom: `1px solid ${colors.border}`,
      position: 'sticky',
      top: 0,
      zIndex: 100,
      transition: 'all 0.3s'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link 
            to={user ? "/courses" : "/"} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              textDecoration: 'none',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{
              background: '#1d1a36',
              borderRadius: '10px',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img src="/jcilogo.png" alt="JCI Bogura" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
            </div>
            <span style={{ 
              fontSize: '1.25rem', 
              fontWeight: '700', 
              color: isDark ? colors.text : 'white',
              letterSpacing: '-0.5px'
            }}>
              JCI Bogura
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            '@media (max-width: 768px)': { display: 'none' }
          }} className="desktop-nav">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    padding: '0.625rem 1rem',
                    borderRadius: '8px',
                    color: isDark ? colors.text : 'white',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s',
                    background: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = isDark ? colors.surface : 'rgba(255,255,255,0.2)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <IconComponent />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem'
          }} className="desktop-actions">
            <button
              onClick={toggleTheme}
              style={{ 
                padding: '0.625rem',
                background: colors.surface,
                color: colors.text,
                border: `1px solid ${colors.border}`,
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
                minWidth: '40px',
                minHeight: '40px'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              {isDark ? <FaSun /> : <FaMoon />}
            </button>
            
            {user ? (
              <button
                onClick={onLogout}
                style={{
                  padding: '0.625rem 1.25rem',
                  background: colors.accent,
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  transition: 'all 0.3s',
                  minHeight: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(155, 89, 182, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  style={{
                    padding: '0.625rem 1.25rem',
                    background: 'transparent',
                    color: isDark ? colors.text : 'white',
                    border: `2px solid ${isDark ? colors.border : 'white'}`,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    transition: 'all 0.3s',
                    minHeight: '40px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = isDark ? colors.surface : 'rgba(255,255,255,0.2)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/register')}
                  style={{
                    padding: '0.625rem 1.25rem',
                    background: isDark ? colors.primary : 'white',
                    color: isDark ? 'white' : colors.primary,
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    transition: 'all 0.3s',
                    minHeight: '40px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(33, 151, 205, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Register
                </button>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                padding: '0.625rem',
                background: colors.surface,
                color: colors.text,
                border: `1px solid ${colors.border}`,
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '1.25rem',
                minWidth: '40px',
                minHeight: '40px',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              className="mobile-menu-btn"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={{
            display: 'none',
            flexDirection: 'column',
            gap: '0.5rem',
            marginTop: '1rem',
            padding: '1rem',
            background: colors.surface,
            borderRadius: '12px',
            border: `1px solid ${colors.border}`
          }} className="mobile-menu">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    padding: '0.875rem 1rem',
                    borderRadius: '8px',
                    color: colors.text,
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transition: 'all 0.3s',
                    background: 'transparent'
                  }}
                  onMouseEnter={(e) => e.target.style.background = colors.surfaceHover}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  <IconComponent style={{ fontSize: '1.25rem' }} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
            
            <div style={{ 
              height: '1px', 
              background: colors.border, 
              margin: '0.5rem 0' 
            }} />
            
            {user ? (
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                style={{
                  padding: '0.875rem 1rem',
                  background: colors.accent,
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  justifyContent: 'center'
                }}
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate('/login');
                    setMobileMenuOpen(false);
                  }}
                  style={{
                    padding: '0.875rem 1rem',
                    background: 'transparent',
                    color: colors.text,
                    border: `2px solid ${colors.border}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    justifyContent: 'center'
                  }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    navigate('/register');
                    setMobileMenuOpen(false);
                  }}
                  style={{
                    padding: '0.875rem 1rem',
                    background: colors.primary,
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    justifyContent: 'center'
                  }}
                >
                  Register
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-actions button:not(.mobile-menu-btn) {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .mobile-menu {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;

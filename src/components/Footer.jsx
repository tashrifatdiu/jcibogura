import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

function Footer() {
  const theme = useTheme();
  const { colors, isDark } = theme;
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: isDark 
        ? 'linear-gradient(135deg, rgba(33, 151, 205, 0.05) 0%, rgba(124, 199, 208, 0.05) 100%)'
        : 'linear-gradient(135deg, #1d1a36 0%, #2a2847 100%)',
      borderTop: `1px solid ${colors.border}`,
      marginTop: 'auto',
      transition: 'background-color 0.3s'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(2rem, 4vw, 3rem) clamp(1rem, 2vw, 1.5rem)' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* About Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                background: '#1d1a36',
                borderRadius: '10px',
                padding: '8px',
                display: 'inline-block'
              }}>
                <img src="/jcilogo.png" alt="JCI Bogura" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
              </div>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '700', 
                color: isDark ? colors.text : 'white',
                margin: 0 
              }}>
                JCI Bogura
              </h3>
            </div>
            <p style={{ 
              fontSize: '0.9rem', 
              color: isDark ? colors.textSecondary : 'rgba(255,255,255,0.8)',
              lineHeight: 1.6,
              marginBottom: '1rem'
            }}>
              Empowering the next generation through quality education and skill development programs.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a 
                href="https://www.facebook.com/jcibogura" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: isDark ? colors.surface : 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isDark ? colors.text : 'white',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  border: `1px solid ${isDark ? colors.border : 'rgba(255,255,255,0.2)'}`
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = colors.primary;
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = isDark ? colors.surface : 'rgba(255,255,255,0.1)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/jcibogura?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: isDark ? colors.surface : 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isDark ? colors.text : 'white',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  border: `1px solid ${isDark ? colors.border : 'rgba(255,255,255,0.2)'}`
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = colors.primary;
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = isDark ? colors.surface : 'rgba(255,255,255,0.1)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/jci-bogura/?lipi=urn%3Ali%3Apage%3Ad_flagship3_company_posts%3BA4nYZ6I7TTWgf5Acpt8TlA%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: isDark ? colors.surface : 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isDark ? colors.text : 'white',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  border: `1px solid ${isDark ? colors.border : 'rgba(255,255,255,0.2)'}`
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = colors.primary;
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = isDark ? colors.surface : 'rgba(255,255,255,0.1)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ 
              fontSize: '1rem', 
              fontWeight: '700', 
              color: isDark ? colors.text : 'white',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Courses', path: '/courses' },
                { name: 'Contact', path: '/contact' },
                { name: 'FAQ', path: '/faq' },
                { name: 'Terms of Service', path: '/terms' },
                { name: 'Privacy Policy', path: '/privacy' }
              ].map((link) => (
                <li key={link.name} style={{ marginBottom: '0.75rem' }}>
                  <Link 
                    to={link.path} 
                    style={{ 
                      color: isDark ? colors.textSecondary : 'rgba(255,255,255,0.8)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.3s',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => e.target.style.color = colors.primary}
                    onMouseLeave={(e) => e.target.style.color = isDark ? colors.textSecondary : 'rgba(255,255,255,0.8)'}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ 
              fontSize: '1rem', 
              fontWeight: '700', 
              color: isDark ? colors.text : 'white',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.1rem', marginTop: '2px' }}>📍</span>
                <div>
                  <p style={{ 
                    color: isDark ? colors.textSecondary : 'rgba(255,255,255,0.8)',
                    fontSize: '0.9rem',
                    margin: 0,
                    lineHeight: 1.5
                  }}>
                    Puran Bogra<br />
                    Rajshahi Division<br />
                    Bangladesh
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.1rem' }}>📧</span>
                <a 
                  href="mailto:jcibogura@gmail.com" 
                  style={{ 
                    color: isDark ? colors.textSecondary : 'rgba(255,255,255,0.8)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.target.style.color = colors.primary}
                  onMouseLeave={(e) => e.target.style.color = isDark ? colors.textSecondary : 'rgba(255,255,255,0.8)'}
                >
                  jcibogura@gmail.com
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.1rem' }}>📞</span>
                <a 
                  href="tel:+8801737349637" 
                  style={{ 
                    color: isDark ? colors.textSecondary : 'rgba(255,255,255,0.8)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.target.style.color = colors.primary}
                  onMouseLeave={(e) => e.target.style.color = isDark ? colors.textSecondary : 'rgba(255,255,255,0.8)'}
                >
                  01737-349637
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ 
              fontSize: '1rem', 
              fontWeight: '700', 
              color: isDark ? colors.text : 'white',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Newsletter
            </h4>
            <p style={{ 
              color: isDark ? colors.textSecondary : 'rgba(255,255,255,0.8)',
              fontSize: '0.9rem',
              marginBottom: '1rem',
              lineHeight: 1.5
            }}>
              Subscribe to get updates on new courses and events.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="email" 
                placeholder="Your email"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: `1px solid ${isDark ? colors.border : 'rgba(255,255,255,0.2)'}`,
                  background: isDark ? colors.surface : 'rgba(255,255,255,0.1)',
                  color: isDark ? colors.text : 'white',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <button
                style={{
                  padding: '0.75rem 1.25rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: colors.primary,
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = colors.primaryHover;
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = colors.primary;
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ 
          borderTop: `1px solid ${isDark ? colors.border : 'rgba(255,255,255,0.1)'}`,
          paddingTop: '1.5rem',
          marginTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{ 
            color: isDark ? colors.textSecondary : 'rgba(255,255,255,0.7)',
            fontSize: '0.875rem',
            margin: 0
          }}>
            © {currentYear} JCI Bogura. All rights reserved.
          </p>
          <p style={{ 
            color: isDark ? colors.textSecondary : 'rgba(255,255,255,0.7)',
            fontSize: '0.875rem',
            margin: 0
          }}>
            Made with ❤️ for education
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

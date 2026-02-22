import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import Footer from '../components/Footer';

function Privacy() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { colors, isDark, toggleTheme } = theme;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.background, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ 
        background: isDark 
          ? 'linear-gradient(135deg, rgba(33, 151, 205, 0.1) 0%, rgba(124, 199, 208, 0.1) 100%)'
          : 'linear-gradient(135deg, #2197cd 0%, #7cc7d0 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: isDark ? '0 4px 30px rgba(0, 0, 0, 0.3)' : '0 4px 30px rgba(0, 0, 0, 0.1)',
        borderBottom: `1px solid ${colors.border}`,
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <button
              onClick={() => navigate(-1)}
              style={{ 
                color: isDark ? colors.text : 'white',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                fontSize: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateX(-4px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateX(0)'}
            >
              ←
            </button>
            <h1 style={{ 
              fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
              fontWeight: '700',
              color: isDark ? colors.text : 'white',
              margin: 0,
              letterSpacing: '-0.5px'
            }}>
              Privacy Policy
            </h1>
            <button
              onClick={toggleTheme}
              style={{ 
                padding: '0.5rem',
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
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, maxWidth: '900px', margin: '0 auto', padding: 'clamp(2rem, 4vw, 4rem) clamp(1rem, 2vw, 2rem)', width: '100%' }}>
        <div style={{
          background: colors.cardBg,
          borderRadius: '20px',
          boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.1)',
          border: `1px solid ${colors.border}`,
          padding: 'clamp(2rem, 4vw, 3rem)'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.9rem', color: colors.textSecondary, marginBottom: '1rem' }}>
              Last Updated: February 23, 2026
            </p>
            <p style={{ fontSize: '1rem', color: colors.textSecondary, lineHeight: 1.7 }}>
              At JCI Bogura, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <section>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.text, marginBottom: '1rem' }}>
                1. Information We Collect
              </h2>
              <p style={{ fontSize: '0.95rem', color: colors.textSecondary, lineHeight: 1.7, marginBottom: '0.75rem' }}>
                We collect the following information when you register:
              </p>
              <ul style={{ fontSize: '0.95rem', color: colors.textSecondary, lineHeight: 1.7, paddingLeft: '1.5rem' }}>
                <li>Name (First and Last)</li>
                <li>Email address</li>
                <li>Age</li>
                <li>Profession</li>
                <li>Institute/Company/Position</li>
                <li>Address</li>
                <li>Phone number</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.text, marginBottom: '1rem' }}>
                2. How We Use Your Information
              </h2>
              <p style={{ fontSize: '0.95rem', color: colors.textSecondary, lineHeight: 1.7, marginBottom: '0.75rem' }}>
                Your information is used to:
              </p>
              <ul style={{ fontSize: '0.95rem', color: colors.textSecondary, lineHeight: 1.7, paddingLeft: '1.5rem' }}>
                <li>Provide access to our learning platform</li>
                <li>Track your course progress</li>
                <li>Send important updates about courses and events</li>
                <li>Improve our services and user experience</li>
                <li>Communicate with you regarding platform-related matters</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.text, marginBottom: '1rem' }}>
                3. Data Security
              </h2>
              <p style={{ fontSize: '0.95rem', color: colors.textSecondary, lineHeight: 1.7 }}>
                We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Your data is stored securely using industry-standard encryption and security protocols.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.text, marginBottom: '1rem' }}>
                4. Information Sharing
              </h2>
              <p style={{ fontSize: '0.95rem', color: colors.textSecondary, lineHeight: 1.7 }}>
                We do not sell, trade, or rent your personal information to third parties. Your information is used solely for the purposes of operating the JCI Bogura Learning Platform and may only be shared with authorized personnel within JCI Bogura.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.text, marginBottom: '1rem' }}>
                5. Cookies and Tracking
              </h2>
              <p style={{ fontSize: '0.95rem', color: colors.textSecondary, lineHeight: 1.7 }}>
                We use cookies and similar tracking technologies to enhance your experience on our platform. These help us remember your preferences and track your progress through courses. You can control cookie settings through your browser.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.text, marginBottom: '1rem' }}>
                6. Your Rights
              </h2>
              <p style={{ fontSize: '0.95rem', color: colors.textSecondary, lineHeight: 1.7, marginBottom: '0.75rem' }}>
                You have the right to:
              </p>
              <ul style={{ fontSize: '0.95rem', color: colors.textSecondary, lineHeight: 1.7, paddingLeft: '1.5rem' }}>
                <li>Access your personal information</li>
                <li>Request corrections to your data</li>
                <li>Request deletion of your account</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.text, marginBottom: '1rem' }}>
                7. Changes to Privacy Policy
              </h2>
              <p style={{ fontSize: '0.95rem', color: colors.textSecondary, lineHeight: 1.7 }}>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.text, marginBottom: '1rem' }}>
                8. Contact Us
              </h2>
              <p style={{ fontSize: '0.95rem', color: colors.textSecondary, lineHeight: 1.7 }}>
                If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us at jcibogura@gmail.com or call 01737-349637.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Privacy;

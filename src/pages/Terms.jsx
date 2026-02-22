import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Terms() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { colors, isDark } = theme;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.background, display: 'flex', flexDirection: 'column' }}>
      <Navbar user={null} onLogout={() => navigate('/login')} />
      
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
              Welcome to JCI Bogura Learning Platform. By accessing and using our platform, you agree to comply with and be bound by the following terms and conditions.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <section>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.text, marginBottom: '1rem' }}>
                1. Acceptance of Terms
              </h2>
              <p style={{ fontSize: '0.95rem', color: colors.textSecondary, lineHeight: 1.7 }}>
                By registering for and using the JCI Bogura Learning Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.text, marginBottom: '1rem' }}>
                2. User Accounts
              </h2>
              <p style={{ fontSize: '0.95rem', color: colors.textSecondary, lineHeight: 1.7, marginBottom: '0.75rem' }}>
                When creating an account, you agree to:
              </p>
              <ul style={{ fontSize: '0.95rem', color: colors.textSecondary, lineHeight: 1.7, paddingLeft: '1.5rem' }}>
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Be responsible for all activities under your account</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.text, marginBottom: '1rem' }}>
                3. Course Access and Usage
              </h2>
              <p style={{ fontSize: '0.95rem', color: colors.textSecondary, lineHeight: 1.7 }}>
                All courses provided on this platform are for educational purposes only. You may not reproduce, distribute, or create derivative works from our course content without explicit written permission from JCI Bogura.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.text, marginBottom: '1rem' }}>
                4. User Conduct
              </h2>
              <p style={{ fontSize: '0.95rem', color: colors.textSecondary, lineHeight: 1.7, marginBottom: '0.75rem' }}>
                You agree not to:
              </p>
              <ul style={{ fontSize: '0.95rem', color: colors.textSecondary, lineHeight: 1.7, paddingLeft: '1.5rem' }}>
                <li>Use the platform for any illegal or unauthorized purpose</li>
                <li>Attempt to gain unauthorized access to any part of the platform</li>
                <li>Interfere with or disrupt the platform's functionality</li>
                <li>Share your account credentials with others</li>
                <li>Upload malicious code or harmful content</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.text, marginBottom: '1rem' }}>
                5. Intellectual Property
              </h2>
              <p style={{ fontSize: '0.95rem', color: colors.textSecondary, lineHeight: 1.7 }}>
                All content on the JCI Bogura Learning Platform, including but not limited to text, graphics, logos, videos, and software, is the property of JCI Bogura and is protected by copyright and intellectual property laws.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.text, marginBottom: '1rem' }}>
                6. Limitation of Liability
              </h2>
              <p style={{ fontSize: '0.95rem', color: colors.textSecondary, lineHeight: 1.7 }}>
                JCI Bogura shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the platform. We provide the platform "as is" without warranties of any kind.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.text, marginBottom: '1rem' }}>
                7. Modifications to Terms
              </h2>
              <p style={{ fontSize: '0.95rem', color: colors.textSecondary, lineHeight: 1.7 }}>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the platform. Your continued use of the platform after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.text, marginBottom: '1rem' }}>
                8. Termination
              </h2>
              <p style={{ fontSize: '0.95rem', color: colors.textSecondary, lineHeight: 1.7 }}>
                We reserve the right to suspend or terminate your account at any time for violation of these terms or for any other reason we deem appropriate.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.text, marginBottom: '1rem' }}>
                9. Contact Information
              </h2>
              <p style={{ fontSize: '0.95rem', color: colors.textSecondary, lineHeight: 1.7 }}>
                If you have any questions about these Terms of Service, please contact us at jcibogura@gmail.com or call 01737-349637.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Terms;

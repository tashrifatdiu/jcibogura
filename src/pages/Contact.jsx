import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Contact() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { colors, isDark, toggleTheme } = theme;
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.background, display: 'flex', flexDirection: 'column' }}>
      <Navbar user={null} onLogout={() => navigate('/login')} />
      
      <div style={{ flex: 1 }}>
      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(2rem, 4vw, 4rem) clamp(1rem, 2vw, 2rem)', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Contact Info */}
          <div style={{
            background: colors.cardBg,
            borderRadius: '20px',
            boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.1)',
            border: `1px solid ${colors.border}`,
            padding: '2rem'
          }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: colors.text, marginBottom: '1.5rem' }}>
              Get in Touch
            </h2>
            <p style={{ fontSize: '1rem', color: colors.textSecondary, marginBottom: '2rem', lineHeight: 1.6 }}>
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ 
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: isDark ? colors.surface : colors.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  flexShrink: 0
                }}>
                  📍
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', color: colors.text, marginBottom: '0.25rem' }}>Address</h3>
                  <p style={{ fontSize: '0.95rem', color: colors.textSecondary, lineHeight: 1.5, margin: 0 }}>
                    Puran Bogra<br />
                    Rajshahi Division<br />
                    Bangladesh
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ 
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: isDark ? colors.surface : colors.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  flexShrink: 0
                }}>
                  📧
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', color: colors.text, marginBottom: '0.25rem' }}>Email</h3>
                  <a href="mailto:jcibogura@gmail.com" style={{ fontSize: '0.95rem', color: colors.primary, textDecoration: 'none' }}>
                    jcibogura@gmail.com
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ 
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: isDark ? colors.surface : colors.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  flexShrink: 0
                }}>
                  📞
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', color: colors.text, marginBottom: '0.25rem' }}>Phone</h3>
                  <a href="tel:+8801737349637" style={{ fontSize: '0.95rem', color: colors.primary, textDecoration: 'none' }}>
                    01737-349637
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            background: colors.cardBg,
            borderRadius: '20px',
            boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.1)',
            border: `1px solid ${colors.border}`,
            padding: '2rem'
          }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: colors.text, marginBottom: '1.5rem' }}>
              Send Message
            </h2>

            {submitted && (
              <div style={{
                padding: '1rem',
                borderRadius: '12px',
                background: isDark ? 'rgba(16, 185, 129, 0.1)' : '#d1fae5',
                color: colors.success,
                marginBottom: '1.5rem',
                border: `1px solid ${colors.success}`
              }}>
                ✓ Message sent successfully! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: colors.text }}>
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    borderRadius: '12px',
                    border: `2px solid ${colors.border}`,
                    background: colors.inputBg,
                    color: colors.text,
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: colors.text }}>
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    borderRadius: '12px',
                    border: `2px solid ${colors.border}`,
                    background: colors.inputBg,
                    color: colors.text,
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s',
                    boxSizing: 'border-box'
                  }}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: colors.text }}>
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    borderRadius: '12px',
                    border: `2px solid ${colors.border}`,
                    background: colors.inputBg,
                    color: colors.text,
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s',
                    boxSizing: 'border-box'
                  }}
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: colors.text }}>
                  Message *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows="5"
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    borderRadius: '12px',
                    border: `2px solid ${colors.border}`,
                    background: colors.inputBg,
                    color: colors.text,
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                style={{
                  padding: '1rem',
                  background: colors.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.background = colors.primaryHover;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.background = colors.primary;
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;

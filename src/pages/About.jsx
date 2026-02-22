import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function About() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { colors, isDark, toggleTheme } = theme;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.background, display: 'flex', flexDirection: 'column' }}>
      <Navbar user={null} onLogout={() => navigate('/login')} />
      
      <div style={{ flex: 1 }}>
      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(2rem, 4vw, 4rem) clamp(1rem, 2vw, 2rem)' }}>
        <div style={{
          background: colors.cardBg,
          borderRadius: '20px',
          boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.1)',
          border: `1px solid ${colors.border}`,
          padding: 'clamp(2rem, 4vw, 3rem)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{
              background: '#1d1a36',
              borderRadius: '16px',
              padding: '16px',
              display: 'inline-block',
              marginBottom: '1.5rem'
            }}>
              <img src="/jcilogo.png" alt="JCI Bogura" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
            </div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '700', color: colors.text, marginBottom: '1rem', letterSpacing: '-1px' }}>
              Junior Chamber International Bogura
            </h2>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: colors.primary, fontWeight: '600' }}>
              Empowering Young Leaders Since Inception
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <section>
              <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: '700', color: colors.text, marginBottom: '1rem' }}>
                Our Mission
              </h3>
              <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: colors.textSecondary, lineHeight: 1.8 }}>
                JCI Bogura is dedicated to providing development opportunities that empower young people to create positive change. 
                We believe in the power of collective action and individual growth to transform communities and create a better world.
              </p>
            </section>

            <section>
              <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: '700', color: colors.text, marginBottom: '1rem' }}>
                What We Do
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                {[
                  { icon: '🎓', title: 'Education', desc: 'Quality learning programs and skill development courses' },
                  { icon: '🤝', title: 'Community Service', desc: 'Impactful projects that benefit our local community' },
                  { icon: '💼', title: 'Leadership', desc: 'Training and mentorship for emerging leaders' },
                  { icon: '🌍', title: 'Global Network', desc: 'Connection to JCI members worldwide' }
                ].map((item) => (
                  <div key={item.title} style={{
                    padding: '1.5rem',
                    borderRadius: '12px',
                    background: isDark ? colors.surface : colors.surfaceHover,
                    border: `1px solid ${colors.border}`,
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: colors.text, marginBottom: '0.5rem' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.9rem', color: colors.textSecondary, lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: '700', color: colors.text, marginBottom: '1rem' }}>
                Our Values
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['Leadership Development', 'Social Responsibility', 'Entrepreneurship', 'International Cooperation', 'Individual Development'].map((value) => (
                  <li key={value} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.5rem', color: colors.primary }}>✓</span>
                    <span style={{ fontSize: '1.05rem', color: colors.text, fontWeight: '500' }}>{value}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section style={{
              padding: '2rem',
              borderRadius: '12px',
              background: isDark 
                ? 'linear-gradient(135deg, rgba(33, 151, 205, 0.1) 0%, rgba(124, 199, 208, 0.1) 100%)'
                : 'linear-gradient(135deg, #2197cd 0%, #7cc7d0 100%)',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: '700', color: isDark ? colors.text : 'white', marginBottom: '1rem' }}>
                Join Us Today
              </h3>
              <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: isDark ? colors.textSecondary : 'rgba(255,255,255,0.9)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Be part of a global movement of young active citizens creating positive change in their communities.
              </p>
              <button
                onClick={() => navigate('/register')}
                style={{
                  padding: '1rem 2rem',
                  background: isDark ? colors.primary : 'white',
                  color: isDark ? 'white' : colors.primary,
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Get Started
              </button>
            </section>
          </div>
        </div>
      </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;

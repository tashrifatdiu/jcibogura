import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function FAQ() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { colors, isDark, toggleTheme } = theme;
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I register for courses?',
      answer: 'Simply create an account using the Register button, fill in your details, and you\'ll have access to all available courses on the platform.'
    },
    {
      question: 'Are the courses free?',
      answer: 'Yes, all courses on the JCI Bogura Learning Platform are completely free for registered members.'
    },
    {
      question: 'How do I track my progress?',
      answer: 'Your progress is automatically tracked as you watch videos. You can view your progress on the dashboard and in your profile section.'
    },
    {
      question: 'Can I access courses on mobile devices?',
      answer: 'Absolutely! Our platform is fully responsive and works seamlessly on mobile phones, tablets, and desktop computers.'
    },
    {
      question: 'What if I forget my password?',
      answer: 'Please contact us at jcibogura@gmail.com with your registered email, and we\'ll help you reset your password.'
    },
    {
      question: 'How often are new courses added?',
      answer: 'We regularly update our course catalog. Check the dashboard frequently for new courses and modules.'
    },
    {
      question: 'Can I download course videos?',
      answer: 'Currently, videos are available for streaming only. You need an internet connection to watch the courses.'
    },
    {
      question: 'Who can I contact for technical support?',
      answer: 'For any technical issues or questions, please reach out to us via email at jcibogura@gmail.com or call 01737-349637.'
    }
  ];

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
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❓</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: '700', color: colors.text, marginBottom: '0.5rem' }}>
              How Can We Help?
            </h2>
            <p style={{ fontSize: '1rem', color: colors.textSecondary }}>
              Find answers to common questions about our platform
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                style={{
                  background: isDark ? colors.surface : colors.surfaceHover,
                  borderRadius: '12px',
                  border: `1px solid ${colors.border}`,
                  overflow: 'hidden',
                  transition: 'all 0.3s'
                }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  style={{
                    width: '100%',
                    padding: '1.25rem',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: '1rem'
                  }}
                >
                  <span style={{ fontSize: '1.05rem', fontWeight: '600', color: colors.text }}>
                    {faq.question}
                  </span>
                  <span style={{ 
                    fontSize: '1.25rem', 
                    color: colors.primary,
                    transition: 'transform 0.3s',
                    transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                    flexShrink: 0
                  }}>
                    ▼
                  </span>
                </button>
                {openIndex === index && (
                  <div style={{
                    padding: '0 1.25rem 1.25rem 1.25rem',
                    color: colors.textSecondary,
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    borderTop: `1px solid ${colors.border}`
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '3rem',
            padding: '2rem',
            borderRadius: '12px',
            background: isDark 
              ? 'linear-gradient(135deg, rgba(33, 151, 205, 0.1) 0%, rgba(124, 199, 208, 0.1) 100%)'
              : 'linear-gradient(135deg, #2197cd 0%, #7cc7d0 100%)',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: isDark ? colors.text : 'white', marginBottom: '0.75rem' }}>
              Still have questions?
            </h3>
            <p style={{ fontSize: '0.95rem', color: isDark ? colors.textSecondary : 'rgba(255,255,255,0.9)', marginBottom: '1.25rem' }}>
              We're here to help! Contact us anytime.
            </p>
            <button
              onClick={() => navigate('/contact')}
              style={{
                padding: '0.875rem 1.75rem',
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
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default FAQ;

import { useState, useEffect } from 'react';
import { useTheme } from '../../context/themeContext';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: 'clamp(16px, 4vw, 20px)',
        left: 'clamp(16px, 4vw, 20px)',
        width: 'clamp(40px, 10vw, 45px)',
        height: 'clamp(40px, 10vw, 45px)',
        borderRadius: '50%',
        backgroundColor: colors.copper,
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        zIndex: 99,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'clamp(18px, 5vw, 20px)',
        boxShadow: colors.shadow,
        transition: 'all 0.3s ease',
        animation: 'fadeInUp 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.backgroundColor = colors.copperLight;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.backgroundColor = colors.copper;
      }}
    >
      ↑
    </button>
  );
};
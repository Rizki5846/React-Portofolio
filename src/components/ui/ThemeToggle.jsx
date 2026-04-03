import { useTheme } from '../../context/themeContext';
import { C } from '../../constants/theme';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: 'relative',
        width: '60px',
        height: '30px',
        borderRadius: '30px',
        background: theme === 'dark' 
          ? 'linear-gradient(135deg, #2a2a2a, #1a1a1a)'
          : 'linear-gradient(135deg, #e0e0e0, #f5f5f5)',
        border: `1px solid ${theme === 'dark' ? '#3a3a3a' : '#ccc'}`,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: theme === 'dark' 
          ? 'inset 0 1px 3px rgba(0,0,0,0.3)'
          : 'inset 0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      {/* Toggle Circle */}
      <div
        style={{
          position: 'absolute',
          top: '3px',
          left: theme === 'dark' ? '3px' : '30px',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: theme === 'dark'
            ? 'linear-gradient(135deg, #ffd700, #ffed4e)'
            : 'linear-gradient(135deg, #f39c12, #e67e22)',
          transition: 'left 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        }}
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </div>
    </button>
  );
};
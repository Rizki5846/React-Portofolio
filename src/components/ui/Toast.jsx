import { useEffect } from 'react';
import { useTheme } from '../../context/themeContext';

export const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  const { colors } = useTheme();

  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️'
  };

  const bgColors = {
    success: '#10b981',
    error: '#ef4444',
    info: '#3b82f6',
    warning: '#f59e0b'
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: colors.card,
        borderLeft: `4px solid ${bgColors[type]}`,
        borderRadius: 8,
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 1000,
        animation: 'slideUp 0.3s ease',
      }}
    >
      <span>{icons[type]}</span>
      <span style={{ color: colors.text }}>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: colors.muted,
          fontSize: 16,
        }}
      >
        ✕
      </button>
    </div>
  );
};
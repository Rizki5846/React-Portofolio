import { useEffect, useState } from 'react';
import { useTheme } from '../../context/themeContext';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('button, a, .clickable')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          left: position.x - 4,
          top: position.y - 4,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: colors.copper,
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'transform 0.1s ease',
          transform: isHovering ? 'scale(2)' : 'scale(1)',
        }}
      />
      <div
        style={{
          position: 'fixed',
          left: position.x - 20,
          top: position.y - 20,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: `1px solid ${colors.copper}`,
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'all 0.2s ease',
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
          opacity: 0.5,
        }}
      />
    </>
  );
};
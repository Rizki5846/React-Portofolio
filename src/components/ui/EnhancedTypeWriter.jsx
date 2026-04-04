import { useState, useEffect } from 'react';
import { useTheme } from '../../context/themeContext';

const roles = [
  "Web Developer",
  "IT Support",
  "UI/UX Enthusiast",
  "Problem Solver",
  "Tech Enthusiast"
];

export const EnhancedTypeWriter = () => {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentRole.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }, 50);
    } else {
      timer = setTimeout(() => {
        setText(currentRole.substring(0, text.length + 1));
        if (text.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }, 100);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  return (
    <div style={{ fontSize: 24, fontWeight: 500, color: colors.copper }}>
      {text}
      <span style={{
        display: 'inline-block',
        width: 3,
        height: 28,
        backgroundColor: colors.copper,
        marginLeft: 4,
        animation: 'blink 1s infinite',
        verticalAlign: 'middle'
      }} />
    </div>
  );
};
import { useEffect, useState } from 'react';
import { useTheme } from '../../context/themeContext';

export const CircularProgress = ({ value, label, size = 100 }) => {
  const [progress, setProgress] = useState(0);
  const { colors } = useTheme();
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div style={{ textAlign: 'center', display: 'inline-block', margin: 16 }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.surface}
          strokeWidth="8"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.copper}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 1s ease-in-out',
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
          }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fill={colors.text}
          fontSize={size * 0.2}
          fontWeight="bold"
        >
          {progress}%
        </text>
      </svg>
      <p style={{ marginTop: 12, color: colors.text, fontSize: 14, fontWeight: 500 }}>
        {label}
      </p>
    </div>
  );
};
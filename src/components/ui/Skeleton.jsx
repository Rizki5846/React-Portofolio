import { useTheme } from '../../context/themeContext';

export const Skeleton = ({ width, height, borderRadius = 8 }) => {
  const { colors } = useTheme();

  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        background: `linear-gradient(90deg, ${colors.surface} 25%, ${colors.card} 50%, ${colors.surface} 75%)`,
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }}
    />
  );
};

// Add this to your animations.css
// @keyframes shimmer {
//   0% { background-position: 200% 0; }
//   100% { background-position: -200% 0; }
// }
import { useTheme } from "../../context/themeContext";

export const Footer = () => {
  const { colors } = useTheme();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer style={{ 
      borderTop: `1px solid ${colors.border}`, 
      padding: "clamp(20px, 5vw, 24px) 20px", 
      textAlign: "center" 
    }}>
      <span style={{ 
        fontFamily: colors.mono, 
        fontSize: "clamp(10px, 3vw, 11px)", 
        color: colors.muted 
      }}>
        © {currentYear} Muhamad Rizki Ardiansyah — Built with React & ☕
      </span>
    </footer>
  );
};
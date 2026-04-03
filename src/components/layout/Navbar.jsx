import { KeyboardNav } from "../navigation/KeyboardNav";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useTheme } from "../../context/themeContext";

export const Navbar = ({ activeSection, scrollTo }) => {
  const { colors } = useTheme();

  return (
    <nav style={{
      position: "fixed", 
      top: 0, 
      left: 0, 
      right: 0, 
      zIndex: 100,
      background: `${colors.bg}ee`, 
      backdropFilter: "blur(16px)",
      borderBottom: `1px solid ${colors.border}`,
      padding: "6px 32px", 
      display: "flex", 
      justifyContent: "space-between",
      alignItems: "center", 
      height: 62,
      flexWrap: "wrap",
      gap: 16,
    }}>
      <span style={{ 
        fontFamily: colors.mono, 
        fontSize: 13, 
        color: colors.copper, 
        letterSpacing: 1 
      }}>
        &lt;mrizki /&gt;
      </span>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <KeyboardNav active={activeSection} scrollTo={scrollTo} />
        <ThemeToggle />
      </div>
    </nav>
  );
};
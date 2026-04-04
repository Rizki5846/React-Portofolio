import { useState } from "react";
import { KeyboardNav } from "../navigation/KeyboardNav";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useTheme } from "../../context/themeContext";

export const Navbar = ({ activeSection, scrollTo }) => {
  const { colors } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      padding: "12px 20px",
      transition: "all 0.3s ease",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: 1200,
        margin: "0 auto",
        gap: 16,
      }}>
        {/* Logo */}
        <span style={{ 
          fontFamily: colors.mono, 
          fontSize: "clamp(11px, 4vw, 13px)", 
          color: colors.copper, 
          letterSpacing: 1,
          flexShrink: 0,
        }}>
          &lt;mrizki /&gt;
        </span>
        
        {/* Desktop Navigation */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}>
          <div className="hide-mobile">
            <KeyboardNav active={activeSection} scrollTo={scrollTo} />
          </div>
          <ThemeToggle />
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: colors.text,
              fontSize: 24,
              cursor: "pointer",
              padding: 8,
              '@media (max-width: 768px)': {
                display: "block",
              }
            }}
            className="show-mobile"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          background: colors.bg,
          borderBottom: `1px solid ${colors.border}`,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          zIndex: 99,
        }}>
          <KeyboardNav active={activeSection} scrollTo={(id) => {
            scrollTo(id);
            setIsMobileMenuOpen(false);
          }} />
        </div>
      )}
    </nav>
  );
};

// Add media query styles
const styles = document.createElement('style');
styles.textContent = `
  @media (max-width: 768px) {
    .hide-mobile {
      display: none !important;
    }
    .show-mobile {
      display: block !important;
    }
  }
  @media (min-width: 769px) {
    .show-mobile {
      display: none !important;
    }
  }
`;
document.head.appendChild(styles);
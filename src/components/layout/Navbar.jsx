import { useState } from "react";
import { KeyboardNav } from "../navigation/KeyboardNav";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useTheme } from "../../context/themeContext";
import { useHonest } from "../../context/honestContext";

export const Navbar = ({ activeSection, scrollTo }) => {
  const { colors, theme } = useTheme();
  const { isHonest, toggleHonest } = useHonest();
  const isDark = theme === 'dark';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav style={{
      position: "fixed", 
      top: 0, left: 0, right: 0, 
      zIndex: 100,
      // Midnight Navy — dark: sangat gelap, light: navy #0f172a
      background: isDark ? "#080d1a" : "#0f172a",
      borderBottom: `1px solid ${isDark ? "#1a2332" : "#1e2d45"}`,
      boxShadow: "0 2px 24px rgba(0,0,0,0.35)",
      padding: "0 20px",
      transition: "background 0.3s ease",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: 1200,
        margin: "0 auto",
        gap: 16,
        height: 62,
      }}>
        {/* Logo — copper di dark, putih di light (di atas hitam) */}
        <span style={{ 
          fontFamily: colors.mono, 
          fontSize: "clamp(11px, 4vw, 13px)", 
          letterSpacing: 1,
          flexShrink: 0,
          fontWeight: 700,
          color: isDark ? colors.copper : "#e8e8e8",
        }}>
          &lt;mrizki /&gt;
        </span>
        
        {/* Desktop Navigation */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div className="hide-mobile">
            <KeyboardNav active={activeSection} scrollTo={scrollTo} />
          </div>

          {/* Social icons */}
          <div className="hide-mobile" style={{ 
            display: "flex", gap: 10, alignItems: "center", 
            borderLeft: "1px solid #333333", 
            paddingLeft: 16,
          }}>
            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/rizkiardiansyah02/" 
              target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" 
              style={{ 
                color: "#888888",
                display: "flex", alignItems: "center", 
                transition: "all 0.2s",
                padding: "6px",
                borderRadius: 8,
              }} 
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#e8e8e8";
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              }} 
              onMouseOut={(e) => {
                e.currentTarget.style.color = "#888888";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>

            {/* GitHub */}
            <a 
              href="https://github.com/Rizki5846" 
              target="_blank" rel="noopener noreferrer" aria-label="GitHub" 
              style={{ 
                color: "#888888",
                display: "flex", alignItems: "center", 
                transition: "all 0.2s",
                padding: "6px",
                borderRadius: 8,
              }} 
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#e8e8e8";
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              }} 
              onMouseOut={(e) => {
                e.currentTarget.style.color = "#888888";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </a>

            {/* WhatsApp */}
            <a 
              href="https://wa.me/628xxxxxxxxxx" 
              target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" 
              style={{ 
                color: "#888888",
                display: "flex", alignItems: "center", 
                transition: "all 0.2s",
                padding: "6px",
                borderRadius: 8,
              }} 
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#e8e8e8";
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              }} 
              onMouseOut={(e) => {
                e.currentTarget.style.color = "#888888";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
            </a>
          </div>

          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {/* Honest Toggle */}
            <button
              onClick={toggleHonest}
              title={isHonest ? "Kembali Profesional" : "Mode Jujur"}
              style={{
                background: isHonest ? "rgba(239, 68, 68, 0.15)" : "transparent",
                border: `1px solid ${isHonest ? "#ef4444" : "#555555"}`,
                borderRadius: 8,
                color: isHonest ? "#ef4444" : "#e8e8e8",
                fontSize: 14,
                cursor: "pointer",
                padding: "6px 10px",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: 5
              }}
            >
              {isHonest ? "🎭 Jujur" : "👔 Pro"}
            </button>
            <ThemeToggle />
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: isMobileMenuOpen ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
              border: `1px solid ${isMobileMenuOpen ? "#555555" : "#333333"}`,
              borderRadius: 8,
              color: "#e8e8e8",
              fontSize: 18,
              cursor: "pointer",
              padding: "6px 10px",
              transition: "all 0.2s",
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
          top: "100%", left: 0, right: 0,
          background: "#0f172a",
          borderBottom: "1px solid #1e2d45",
          boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
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
          
          <div style={{ 
            display: "flex", gap: 24, marginTop: 8, 
            borderTop: "1px solid #2a2a2a",
            paddingTop: 20, justifyContent: "center",
          }}>
            <a href="https://www.linkedin.com/in/rizkiardiansyah02/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" 
              style={{ color: "#888888", transition: "color 0.2s" }} 
              onMouseOver={(e) => e.currentTarget.style.color = "#e8e8e8"}
              onMouseOut={(e) => e.currentTarget.style.color = "#888888"}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="https://github.com/Rizki5846" target="_blank" rel="noopener noreferrer" aria-label="GitHub" 
              style={{ color: "#888888", transition: "color 0.2s" }} 
              onMouseOver={(e) => e.currentTarget.style.color = "#e8e8e8"}
              onMouseOut={(e) => e.currentTarget.style.color = "#888888"}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </a>
            <a href="https://wa.me/628xxxxxxxxxx" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" 
              style={{ color: "#888888", transition: "color 0.2s" }} 
              onMouseOver={(e) => e.currentTarget.style.color = "#e8e8e8"}
              onMouseOut={(e) => e.currentTarget.style.color = "#888888"}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

// Add media query styles
const styles = document.createElement('style');
styles.textContent = `
  @media (max-width: 768px) {
    .hide-mobile { display: none !important; }
    .show-mobile { display: block !important; }
  }
  @media (min-width: 769px) {
    .show-mobile { display: none !important; }
  }
`;
document.head.appendChild(styles);
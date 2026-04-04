import { TypeWriter } from "../ui/TypeWriter";
import { KeyboardStrip } from "../layout/KeyboardStrip";
import { useTheme } from "../../context/themeContext";

export const Hero = ({ scrollTo }) => {
  const { colors } = useTheme();

  const handleButtonPress = (e, type) => {
    const btn = e.currentTarget;
    btn.style.transform = "translateY(3px)";
    if (type === 'primary') {
      btn.style.boxShadow = `0 1px 0 ${colors.copperDim}`;
    } else {
      btn.style.boxShadow = "0 1px 0 #080808";
    }
  };

  const handleButtonRelease = (e, type) => {
    const btn = e.currentTarget;
    btn.style.transform = "";
    if (type === 'primary') {
      btn.style.boxShadow = `0 4px 0 ${colors.copperDim}, 0 6px 20px ${colors.copper}33`;
    } else {
      btn.style.boxShadow = "0 4px 0 #080808";
    }
  };

  return (
    <div id="home" style={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      padding: "80px 20px 40px",
      gap: "clamp(30px, 8vw, 48px)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background Image */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: "url('/images/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        opacity: 0.15,
        zIndex: 0,
      }} />
      
      {/* Gradient Overlay untuk membuat teks lebih terbaca */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(135deg, ${colors.bg} 0%, transparent 40%, ${colors.bg} 100%)`,
        zIndex: 0,
      }} />

      {/* Content Container */}
      <div style={{ 
        textAlign: "center", 
        maxWidth: "min(90%, 680px)", 
        position: "relative", 
        zIndex: 1 
      }}>
      

        {/* Status Badge */}
        <div style={{
          display: "inline-flex", 
          alignItems: "center", 
          gap: 8,
          fontFamily: colors.mono, 
          fontSize: "clamp(10px, 3vw, 11px)", 
          color: colors.copper,
          border: `1px solid ${colors.copper}33`, 
          borderRadius: 6,
          padding: "5px 14px", 
          marginBottom: "clamp(20px, 5vw, 28px)", 
          background: `${colors.copper}0d`,
          backdropFilter: "blur(4px)",
        }}>
          <span style={{ 
            width: 7, 
            height: 7, 
            borderRadius: "50%", 
            background: "#4ade80", 
            boxShadow: "0 0 8px #4ade8088", 
            display: "inline-block" 
          }} />
          Open to Work
        </div>
        
        {/* Title dengan Gradient */}
        <h1 style={{
          fontSize: "clamp(1.8rem, 8vw, 3.5rem)", 
          fontWeight: 800,
          lineHeight: 1.2, 
          margin: "0 0 14px",
          background: `linear-gradient(135deg, ${colors.text} 50%, ${colors.copper})`,
          WebkitBackgroundClip: "text", 
          WebkitTextFillColor: "transparent",
          textShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}>
          Muhamad Rizki<br />Ardiansyah
        </h1>
        
        {/* Typing Animation */}
        <div style={{ 
          fontSize: "clamp(12px, 4vw, 14px)", 
          marginBottom: 14, 
          height: "clamp(20px, 6vw, 24px)" 
        }}>
          <TypeWriter text="Web Developer  ·  IT Support" speed={55} />
        </div>
        
        {/* Description */}
        <p style={{ 
          fontSize: "clamp(13px, 3.5vw, 14px)", 
          color: colors.muted, 
          lineHeight: 1.8, 
          margin: "0 auto 36px", 
          maxWidth: "min(90%, 480px)",
          textShadow: "0 1px 2px rgba(0,0,0,0.1)",
        }}>
          Fresh graduate yang bersemangat membangun solusi digital dan memastikan sistem berjalan optimal.
        </p>
        
        {/* CTA Buttons */}
        <div style={{ 
          display: "flex", 
          gap: "clamp(10px, 4vw, 16px)", 
          justifyContent: "center", 
          flexWrap: "wrap",
          padding: "0 10px",
        }}>
          <button
            onClick={() => scrollTo("projects")}
            className="cta-button"
            style={{
              background: `linear-gradient(135deg, ${colors.copper}, ${colors.copperLight})`,
              border: "none", 
              borderRadius: 8, 
              padding: "clamp(10px, 3vw, 12px) clamp(20px, 5vw, 28px)",
              color: "#fff", 
              fontWeight: 600, 
              fontSize: "clamp(12px, 3.5vw, 14px)", 
              cursor: "pointer",
              boxShadow: `0 4px 0 ${colors.copperDim}, 0 6px 20px ${colors.copper}33`,
              transition: "transform 0.1s, box-shadow 0.1s",
              fontFamily: colors.sans,
              whiteSpace: "nowrap",
            }}
            onMouseDown={(e) => handleButtonPress(e, 'primary')}
            onMouseUp={(e) => handleButtonRelease(e, 'primary')}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = `0 4px 0 ${colors.copperDim}, 0 6px 20px ${colors.copper}33`;
            }}
          >
            Lihat Proyek
          </button>
          
          <button
            onClick={() => scrollTo("contact")}
            className="cta-button-secondary"
            style={{
              background: "none",
              border: `1px solid ${colors.border}`, 
              borderRadius: 8, 
              padding: "clamp(10px, 3vw, 12px) clamp(20px, 5vw, 28px)",
              color: colors.text, 
              fontSize: "clamp(12px, 3.5vw, 14px)", 
              cursor: "pointer",
              fontFamily: colors.sans, 
              boxShadow: "0 4px 0 #080808",
              transition: "transform 0.1s, box-shadow 0.1s",
              whiteSpace: "nowrap",
              backdropFilter: "blur(4px)",
            }}
            onMouseDown={(e) => handleButtonPress(e, 'secondary')}
            onMouseUp={(e) => handleButtonRelease(e, 'secondary')}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "0 4px 0 #080808";
            }}
          >
            Hubungi Saya
          </button>
        </div>
      </div>

      {/* Keyboard Strip Decoration */}
      <KeyboardStrip />
      
      {/* Scroll Indicator */}
      <div style={{ 
        fontFamily: colors.mono, 
        fontSize: "clamp(10px, 3vw, 11px)", 
        color: colors.muted, 
        animation: "blink 2s infinite",
        position: "relative",
        zIndex: 1,
      }}>
        ↓ scroll
      </div>
    </div>
  );
};
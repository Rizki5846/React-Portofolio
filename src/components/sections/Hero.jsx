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
      padding: "90px 32px 40px", 
      gap: 48
    }}>
      <div style={{ textAlign: "center", maxWidth: 680 }}>
        <div style={{
          display: "inline-flex", 
          alignItems: "center", 
          gap: 8,
          fontFamily: colors.mono, 
          fontSize: 11, 
          color: colors.copper,
          border: `1px solid ${colors.copper}33`, 
          borderRadius: 6,
          padding: "5px 14px", 
          marginBottom: 28, 
          background: `${colors.copper}0d`,
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
        
        <h1 style={{
          fontSize: "clamp(2.2rem, 6vw, 3.6rem)", 
          fontWeight: 800,
          lineHeight: 1.1, 
          margin: "0 0 14px",
          background: `linear-gradient(135deg, ${colors.text} 50%, ${colors.copper})`,
          WebkitBackgroundClip: "text", 
          WebkitTextFillColor: "transparent",
        }}>
          Muhamad Rizki<br />Ardiansyah
        </h1>
        
        <div style={{ fontSize: 14, marginBottom: 14, height: 24 }}>
          <TypeWriter text="Web Developer  ·  IT Support" speed={55} />
        </div>
        
        <p style={{ 
          fontSize: 14, 
          color: colors.muted, 
          lineHeight: 1.8, 
          margin: "0 auto 36px", 
          maxWidth: 480 
        }}>
          Fresh graduate yang bersemangat membangun solusi digital dan memastikan sistem berjalan optimal.
        </p>
        
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => scrollTo("projects")}
            style={{
              background: `linear-gradient(135deg, ${colors.copper}, ${colors.copperLight})`,
              border: "none", 
              borderRadius: 8, 
              padding: "12px 28px",
              color: "#fff", 
              fontWeight: 600, 
              fontSize: 14, 
              cursor: "pointer",
              boxShadow: `0 4px 0 ${colors.copperDim}, 0 6px 20px ${colors.copper}33`,
              transition: "transform 0.1s, box-shadow 0.1s",
              fontFamily: colors.sans,
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
            style={{
              background: "none",
              border: `1px solid ${colors.border}`, 
              borderRadius: 8, 
              padding: "12px 28px",
              color: colors.text, 
              fontSize: 14, 
              cursor: "pointer",
              fontFamily: colors.sans, 
              boxShadow: "0 4px 0 #080808",
              transition: "transform 0.1s, box-shadow 0.1s",
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

      <KeyboardStrip />
      
      <div style={{ 
        fontFamily: colors.mono, 
        fontSize: 11, 
        color: colors.muted, 
        animation: "blink 2s infinite" 
      }}>
        ↓ scroll
      </div>
    </div>
  );
};
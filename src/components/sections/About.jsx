import { Reveal } from "../ui/Reveal";
import { useTheme } from "../../context/themeContext";
import { aboutInfo } from "../../constants/data";

export const About = () => {
  const { colors } = useTheme();

  const infoItems = [
    ["🎓", aboutInfo.education],
    ["📍", aboutInfo.location],
    ["💼", aboutInfo.status],
  ];

  return (
    <div id="about" style={{ padding: "60px 20px", maxWidth: 860, margin: "0 auto" }}>
      <Reveal>
        <div style={{ 
          display: "flex", 
          gap: "clamp(20px, 6vw, 40px)", 
          flexWrap: "wrap", 
          alignItems: "flex-start",
          flexDirection: window.innerWidth < 768 ? "column" : "row",
        }}>
          <div style={{
            width: "clamp(80px, 20vw, 110px)", 
            height: "clamp(80px, 20vw, 110px)", 
            borderRadius: 14, 
            flexShrink: 0,
            background: colors.gradient,
            border: `2px solid ${colors.copper}44`,
            boxShadow: colors.shadow,
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            fontSize: "clamp(36px, 10vw, 48px)",
            margin: "0 auto",
          }}>
            👨‍💻
          </div>
          
          <div style={{ flex: 1, minWidth: "min(100%, 240px)" }}>
            <p style={{ fontFamily: colors.mono, fontSize: 11, color: colors.copper, marginBottom: 8 }}>
              // about_me
            </p>
            <h2 style={{ fontSize: "clamp(1.3rem, 5vw, 1.8rem)", fontWeight: 700, margin: "0 0 14px", color: colors.text }}>
              Tentang Saya
            </h2>
            <p style={{ fontSize: "clamp(13px, 3.5vw, 14px)", color: colors.muted, lineHeight: 1.8, marginBottom: 10 }}>
              {aboutInfo.description}
            </p>
            <p style={{ fontSize: "clamp(13px, 3.5vw, 14px)", color: colors.muted, lineHeight: 1.8, marginBottom: 20 }}>
              {aboutInfo.belief}
            </p>
            
            <div style={{ 
              display: "flex", 
              gap: "clamp(8px, 3vw, 12px)", 
              flexWrap: "wrap",
              justifyContent: window.innerWidth < 768 ? "center" : "flex-start",
            }}>
              {infoItems.map(([icon, text]) => (
                <div key={text} style={{
                  display: "flex", 
                  alignItems: "center", 
                  gap: 8,
                  background: colors.card, 
                  border: `1px solid ${colors.border}`,
                  borderRadius: 7, 
                  padding: "7px 14px",
                  boxShadow: colors.shadow,
                  flexWrap: "wrap",
                }}>
                  <span style={{ fontSize: "clamp(12px, 3.5vw, 14px)" }}>{icon}</span>
                  <span style={{ fontFamily: colors.mono, fontSize: "clamp(10px, 3vw, 11px)", color: colors.muted }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
};
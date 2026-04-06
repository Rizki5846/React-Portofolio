import { useState, useEffect } from "react";
import { Reveal } from "../ui/Reveal";
import { useTheme } from "../../context/themeContext";
import { aboutInfo } from "../../constants/data";

export const About = () => {
  const { colors } = useTheme();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

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
          flexDirection: isMobile ? "column" : "row",
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
            <p style={{ fontSize: "clamp(13px, 3.5vw, 14px)", color: colors.muted, lineHeight: 1.8, marginBottom: 14, textAlign: "justify" }}>
              {aboutInfo.description}
            </p>
            <p style={{ fontSize: "clamp(13px, 3.5vw, 14px)", color: colors.muted, lineHeight: 1.8, marginBottom: 24, textAlign: "justify" }}>
              {aboutInfo.belief}
            </p>
            
            <div style={{ 
              display: "flex", 
              gap: "clamp(8px, 3vw, 12px)", 
              flexWrap: "wrap",
              justifyContent: isMobile ? "center" : "flex-start",
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

            {/* Sertifikasi Buttons */}
            <div style={{ 
              marginTop: 28, 
              display: "flex", 
              gap: "clamp(10px, 3vw, 16px)", 
              flexWrap: "wrap", 
              justifyContent: isMobile ? "center" : "flex-start" 
            }}>
              <a 
                href="/files/Sertifikat_BNSP_Rizki.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 18px",
                  borderRadius: 8,
                  fontSize: "clamp(12px, 3.5vw, 13px)",
                  fontWeight: 600,
                  color: colors.copper,
                  background: `${colors.copper}10`,
                  border: `1px solid ${colors.copper}40`,
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = `${colors.copper}20`; e.currentTarget.style.borderColor = colors.copper; }}
                onMouseOut={(e) => { e.currentTarget.style.background = `${colors.copper}10`; e.currentTarget.style.borderColor = `${colors.copper}40`; }}
              >
                <span>📜</span> Sertifikat BNSP
              </a>
              <a 
                href="/files/Sertifikat_MSIB_Rizki.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 18px",
                  borderRadius: 8,
                  fontSize: "clamp(12px, 3.5vw, 13px)",
                  fontWeight: 600,
                  color: colors.text,
                  background: colors.card,
                  border: `1px solid ${colors.border}`,
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = colors.copper; e.currentTarget.style.color = colors.copper; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.color = colors.text; }}
              >
                <span>🎓</span> Sertifikat MSIB
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
};
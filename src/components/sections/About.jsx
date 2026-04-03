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
    <div id="about" style={{ padding: "80px 32px", maxWidth: 860, margin: "0 auto" }}>
      <Reveal>
        <div style={{ display: "flex", gap: 40, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{
            width: 110, 
            height: 110, 
            borderRadius: 14, 
            flexShrink: 0,
            background: colors.gradient,
            border: `2px solid ${colors.copper}44`,
            boxShadow: colors.shadow,
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            fontSize: 48,
          }}>
            👨‍💻
          </div>
          
          <div style={{ flex: 1, minWidth: 240 }}>
            <p style={{ fontFamily: colors.mono, fontSize: 11, color: colors.copper, marginBottom: 8 }}>
              // about_me
            </p>
            <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 14px", color: colors.text }}>
              Tentang Saya
            </h2>
            <p style={{ fontSize: 14, color: colors.muted, lineHeight: 1.8, marginBottom: 10 }}>
              {aboutInfo.description}
            </p>
            <p style={{ fontSize: 14, color: colors.muted, lineHeight: 1.8, marginBottom: 20 }}>
              {aboutInfo.belief}
            </p>
            
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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
                }}>
                  <span style={{ fontSize: 14 }}>{icon}</span>
                  <span style={{ fontFamily: colors.mono, fontSize: 11, color: colors.muted }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
};
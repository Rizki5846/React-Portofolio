import { useScrollReveal } from "../../hooks/UseScrollReveal";
import { useTheme } from "../../context/themeContext";

export const SkillBar = ({ name, level }) => {
  const { colors } = useTheme();
  const { ref, isVisible } = useScrollReveal(0.3);

  return (
    <div ref={ref} style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
        <span style={{ fontFamily: colors.mono, fontSize: 12, color: colors.text }}>{name}</span>
        <span style={{ fontFamily: colors.mono, fontSize: 11, color: colors.copper }}>{level}%</span>
      </div>
      <div style={{ 
        background: colors.surface, 
        borderRadius: 3, 
        height: 5, 
        overflow: "hidden", 
        border: `1px solid ${colors.border}` 
      }}>
        <div style={{
          width: isVisible ? `${level}%` : "0%",
          height: "100%",
          background: `linear-gradient(90deg, ${colors.copperDim}, ${colors.copper}, ${colors.copperLight})`,
          borderRadius: 3,
          transition: "width 1.3s cubic-bezier(.4,0,.2,1)",
          boxShadow: `0 0 10px ${colors.copper}66`,
        }} />
      </div>
    </div>
  );
};
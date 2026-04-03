import { useState } from "react";
import { useTheme } from "../../context/themeContext";

export const Keycap = ({ label, sub, size = 1, onClick, active, disabled = false }) => {
  const { colors } = useTheme();
  const [pressed, setPressed] = useState(false);
  const width = 42 * size + (size - 1) * 4;

  const handlePress = () => {
    if (disabled) return;
    setPressed(true);
    setTimeout(() => setPressed(false), 130);
    onClick?.();
  };

  const isActive = pressed || active;

  return (
    <div
      onClick={handlePress}
      style={{
        width, 
        height: 44,
        borderRadius: 6,
        background: isActive
          ? `linear-gradient(180deg, ${colors.surface} 0%, ${colors.bg} 100%)`
          : `linear-gradient(180deg, ${colors.card} 0%, ${colors.surface} 100%)`,
        boxShadow: isActive
          ? `0 1px 0 #0a0a0a, inset 0 1px 3px #00000055`
          : `${colors.shadow}, inset 0 1px 0 ${colors.border}`,
        border: `1px solid ${active ? colors.copper + "88" : colors.border}`,
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex", 
        flexDirection: "column",
        alignItems: "center", 
        justifyContent: "center",
        transition: "box-shadow 0.08s, transform 0.08s, background 0.08s",
        transform: isActive ? "translateY(3px)" : "translateY(0)",
        userSelect: "none", 
        position: "relative", 
        overflow: "hidden",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <div style={{
        position: "absolute", 
        top: 0, 
        left: 0, 
        right: 0, 
        height: "45%",
        background: "linear-gradient(180deg, #ffffff08 0%, transparent 100%)",
        borderRadius: "5px 5px 0 0", 
        pointerEvents: "none",
      }} />
      <span style={{ 
        fontFamily: colors.mono, 
        fontSize: 11, 
        color: active ? colors.copper : colors.text, 
        lineHeight: 1, 
        fontWeight: 600 
      }}>
        {label}
      </span>
      {sub && (
        <span style={{ 
          fontFamily: colors.mono, 
          fontSize: 8, 
          color: colors.muted, 
          marginTop: 2 
        }}>
          {sub}
        </span>
      )}
    </div>
  );
};
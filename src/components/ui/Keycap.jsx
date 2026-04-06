import { useState } from "react";
import { useTheme } from "../../context/themeContext";

export const Keycap = ({ label, sub, size = 1, onClick, active, disabled = false }) => {
  const { colors, theme } = useTheme();
  const isDark = theme === 'dark';
  const [pressed, setPressed] = useState(false);
  const width = 42 * size + (size - 1) * 4;

  const handlePress = () => {
    if (disabled) return;
    setPressed(true);
    setTimeout(() => setPressed(false), 130);
    onClick?.();
  };

  const isActive = pressed || active;

  // Navbar selalu hitam → keycap selalu pakai dark style
  const activeStyle = {
    background: "linear-gradient(180deg, #1e2d45 0%, #0f1f35 100%)",
    boxShadow: "0 1px 0 #050505, inset 0 1px 3px #00000066",
    border: `1px solid ${isDark ? colors.copper + "88" : "#2563eb80"}`,
  };
  const idleStyle = {
    background: "linear-gradient(180deg, #1a2a40 0%, #111e30 100%)",
    boxShadow: "0 3px 0 #040a15, inset 0 1px 0 #1e3050",
    border: "1px solid #1a2d48",
  };

  return (
    <div
      onClick={handlePress}
      style={{
        width, 
        height: 44,
        borderRadius: 6,
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
        ...(isActive ? activeStyle : idleStyle),
      }}
    >
      {/* Shine overlay */}
      <div style={{
        position: "absolute", 
        top: 0, left: 0, right: 0, 
        height: "45%",
        background: "linear-gradient(180deg, #ffffff08 0%, transparent 100%)",
        borderRadius: "5px 5px 0 0", 
        pointerEvents: "none",
      }} />
      <span style={{ 
        fontFamily: colors.mono, 
        fontSize: 11, 
        // Active: copper (dark) atau electric blue (light) | Idle: abu-abu terang
        color: active
          ? (isDark ? colors.copper : "#60a5fa")
          : "#aaaaaa",
        lineHeight: 1, 
        fontWeight: active ? 700 : 600,
      }}>
        {label}
      </span>
      {sub && (
        <span style={{ 
          fontFamily: colors.mono, 
          fontSize: 8, 
          color: "#555555",
          marginTop: 2,
        }}>
          {sub}
        </span>
      )}
    </div>
  );
};
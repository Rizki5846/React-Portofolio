import { useState, useEffect } from "react";
import { useTheme } from "../../context/themeContext";

export const KeyboardStrip = () => {
  const { colors } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  
  const keys = [
    { l: "ESC" }, { l: "F1" }, { l: "F2" }, { l: "F3" }, { l: "F4" },
    { l: "F5" }, { l: "F6" }, { l: "F7" }, { l: "F8" }, { l: "F9" },
    { l: "F10" }, { l: "F11" }, { l: "F12" }, { l: "DEL" },
  ];
  
  const [lit, setLit] = useState(-1);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLit(i % keys.length);
      i++;
      if (i > keys.length + 3) {
        setLit(-1);
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Sembunyikan di mobile karena terlalu panjang
  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth > 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isVisible) return null;

  return (
    <div style={{
      display: "flex", 
      gap: "clamp(2px, 1.5vw, 4px)", 
      alignItems: "center", 
      justifyContent: "center",
      padding: "clamp(10px, 3vw, 14px) clamp(12px, 4vw, 20px)", 
      background: colors.surface,
      borderRadius: 10, 
      border: `1px solid ${colors.border}`,
      boxShadow: colors.shadow,
      flexWrap: "wrap",
      maxWidth: "100%",
      overflowX: "auto",
    }}>
      {keys.map((k, i) => (
        <div key={i} style={{
          width: "clamp(28px, 8vw, 36px)", 
          height: "clamp(28px, 8vw, 32px)", 
          borderRadius: 5,
          background: lit === i
            ? `linear-gradient(180deg, ${colors.copper}cc, ${colors.copperDim})` 
            : `linear-gradient(180deg, ${colors.card}, ${colors.surface})`,
          boxShadow: lit === i
            ? `0 0 12px ${colors.copper}88, 0 3px 0 #080808`
            : `0 3px 0 #080808, inset 0 1px 0 ${colors.border}`,
          border: `1px solid ${lit === i ? colors.copper + "55" : colors.border}`,
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          transition: "all 0.12s",
          flexShrink: 0,
        }}>
          <span style={{ 
            fontFamily: colors.mono, 
            fontSize: "clamp(8px, 2.5vw, 9px)", 
            color: lit === i ? "#fff" : colors.muted 
          }}>
            {k.l}
          </span>
        </div>
      ))}
    </div>
  );
};
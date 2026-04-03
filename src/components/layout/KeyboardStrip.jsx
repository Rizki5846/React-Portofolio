import { useState, useEffect } from "react";
import { C, borderRadius } from "../../constants/theme";

export const KeyboardStrip = () => {
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
  }, [keys.length]);

  return (
    <div style={{
      display: "flex", 
      gap: 4, 
      alignItems: "center", 
      justifyContent: "center",
      padding: "14px 20px", 
      background: "#131313",
      borderRadius: borderRadius.lg, 
      border: `1px solid ${C.border}`,
      boxShadow: "0 8px 32px #00000066",
      flexWrap: "wrap",
    }}>
      {keys.map((k, i) => (
        <div key={i} style={{
          width: 36, 
          height: 32, 
          borderRadius: borderRadius.sm,
          background: lit === i
            ? `linear-gradient(180deg, ${C.copper}cc, ${C.copperDim})` 
            : "linear-gradient(180deg, #272727, #1e1e1e)",
          boxShadow: lit === i
            ? `0 0 12px ${C.copper}88, 0 3px 0 #080808`
            : "0 3px 0 #080808, inset 0 1px 0 #333",
          border: `1px solid ${lit === i ? C.copper + "55" : "#2e2e2e"}`,
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          transition: "all 0.12s",
        }}>
          <span style={{ 
            fontFamily: C.mono, 
            fontSize: 9, 
            color: lit === i ? "#fff" : C.muted 
          }}>
            {k.l}
          </span>
        </div>
      ))}
    </div>
  );
};
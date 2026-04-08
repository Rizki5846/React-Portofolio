import { useState, useEffect } from "react";
import { useKeyboardPress } from "../../hooks/useKeyboardPress";
import { C, borderRadius } from "../../constants/theme";

const KEY_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const ALL_KEYS = KEY_ROWS.flat();

export const InteractiveKeys = () => {
  const { pressed, typed, pressKey, setTyped } = useKeyboardPress(ALL_KEYS);
  const [isHacked, setIsHacked] = useState(false);
  const MAX_LENGTH = 24;

  useEffect(() => {
    const text = typed.toUpperCase();
    if (text.includes("HIREME") || text.includes("KERJA") || text.includes("HACK") || text.includes("SUDO")) {
      setIsHacked(true);
    }
  }, [typed]);

  const handleSpacePress = () => {
    setTyped(prev => (prev + " ").slice(-MAX_LENGTH));
  };

  if (isHacked) {
    return (
      <div className="hack-terminal" style={{
        textAlign: "left", 
        width: "100%", 
        padding: "clamp(20px, 5vw, 30px)", 
        background: "#080c08", 
        border: `1px solid ${C.copper}`, 
        borderRadius: borderRadius.lg, 
        color: "#4af626", 
        fontFamily: C.mono, 
        boxShadow: `0 0 30px ${C.copper}44`,
        position: "relative",
        overflow: "hidden"
      }}>
        <style>
          {`
            .hack-terminal p { margin: 8px 0; font-size: clamp(12px, 3.5vw, 15px); }
            @keyframes scanline {
              0% { transform: translateY(-100%); }
              100% { transform: translateY(100vh); }
            }
            @keyframes textGlow {
              0%, 100% { text-shadow: 0 0 5px #4af626; }
              50% { text-shadow: 0 0 20px #4af626, 0 0 30px #4af626; }
            }
            .delay-1 { animation: fadeIn 0.1s forwards; opacity: 0; animation-delay: 0.5s; }
            .delay-2 { animation: fadeIn 0.1s forwards; opacity: 0; animation-delay: 1.5s; }
            .delay-3 { animation: fadeIn 0.1s forwards; opacity: 0; animation-delay: 2.5s; }
            .delay-4 { animation: fadeIn 0.5s forwards; opacity: 0; animation-delay: 3.5s; }
            @keyframes fadeIn { to { opacity: 1; } }
          `}
        </style>
        
        {/* Scanline effect */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "10px",
          background: "rgba(74, 246, 38, 0.3)",
          boxShadow: "0 0 20px rgba(74, 246, 38, 0.5)",
          animation: "scanline 3s linear infinite",
          pointerEvents: "none"
        }} />

        <h3 style={{ margin: "0 0 15px 0", color: "#fff", animation: "textGlow 2s infinite" }}>
          [ SYSTEM OVERRIDE INITIATED ]
        </h3>
        <p className="delay-1">&gt; Access code accepted...</p>
        <p className="delay-2">&gt; Analyzing user intent: <span style={{ color: "#fff" }}>"RECRUITMENT / PROJECT"</span></p>
        <p className="delay-3">&gt; MATCH FOUND: <strong>Rizki is fully available for new opportunities!</strong></p>
        
        <div className="delay-4" style={{ marginTop: "30px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <a href="#contact" 
             onClick={() => {
               const el = document.getElementById("contact");
               if(el) el.scrollIntoView({ behavior: "smooth" });
             }}
             style={{
               display: "inline-block", 
               background: "#4af626", 
               color: "#000", 
               padding: "10px 24px", 
               textDecoration: "none", 
               fontWeight: "bold", 
               borderRadius: borderRadius.sm,
               textTransform: "uppercase",
               cursor: "pointer"
             }}>
            &gt; INITIATE_CONTACT()
          </a>
          <button 
             onClick={() => setIsHacked(false)}
             style={{
               background: "transparent", 
               border: "linear-gradient(135deg, #1f5e1f, #051005)",
               boxShadow: "inset 0 0 5px #4af62633",
               color: "#4af626", 
               padding: "10px 24px", 
               fontWeight: "bold", 
               borderRadius: borderRadius.sm,
               cursor: "pointer"
             }}>
            ABORT
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", width: "100%", overflowX: "hidden" }}>
      <style>
        {`
          .interactive-key-row {
            display: flex;
            gap: 5px;
            justify-content: center;
            margin-bottom: 5px;
          }
          .interactive-key {
            width: 38px;
            height: 38px;
          }
          .interactive-space {
            width: 240px;
            height: 36px;
          }
          .offset-0 { margin-left: 0; }
          .offset-1 { margin-left: 12px; }
          .offset-2 { margin-left: 24px; }
          
          @media (max-width: 480px) {
            .interactive-key-row { gap: 3px; }
            .interactive-key { 
              width: clamp(26px, 8vw, 38px); 
              height: clamp(32px, 10vw, 38px); 
            }
            .interactive-key span { 
              font-size: clamp(9px, 3.5vw, 12px) !important; 
            }
            .interactive-space { 
              width: clamp(160px, 60vw, 240px); 
            }
            .offset-1 { margin-left: clamp(6px, 4vw, 12px); }
            .offset-2 { margin-left: clamp(12px, 8vw, 24px); }
            .interactive-display {
              font-size: 12px !important;
              padding: 10px 14px !important;
              letter-spacing: 1px !important;
            }
          }
        `}
      </style>

      {/* Display Screen */}
      <div className="interactive-display" style={{
        background: "#0d0d0d", 
        border: `1px solid ${C.border}`,
        borderRadius: borderRadius.lg, 
        padding: "12px 20px", 
        marginBottom: 20,
        fontFamily: C.mono, 
        fontSize: 14, 
        color: C.copper,
        minHeight: 44, 
        display: "flex", 
        alignItems: "center",
        boxShadow: "inset 0 2px 8px #00000088",
        letterSpacing: 2,
        maxWidth: "100%",
        overflow: "hidden"
      }}>
        <span style={{ color: C.muted, marginRight: 8, fontSize: 11, flexShrink: 0 }}>
          &gt;
        </span>
        <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {typed || <span style={{ color: "#444", fontSize: 12 }}>ketik 'kerja' atau 'hireme'...</span>}
        </span>
        <span style={{ 
          animation: "blink 1s infinite", 
          marginLeft: 1, 
          color: C.copper,
          flexShrink: 0
        }}>
          ▌
        </span>
      </div>
      
      {/* Keyboard */}
      <div style={{ display: "inline-block", maxWidth: "100%" }}>
        {KEY_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className={`interactive-key-row offset-${rowIndex}`}>
            {row.map(key => {
              const isPressed = pressed[key];
              return (
                <div 
                  key={key} 
                  className="interactive-key"
                  onClick={() => pressKey(key)} 
                  style={{
                    borderRadius: borderRadius.md,
                    background: isPressed
                      ? `linear-gradient(180deg, ${C.copperDim}, #1a1a1a)`
                      : "linear-gradient(180deg, #2b2b2b, #202020)",
                    boxShadow: isPressed
                      ? "0 1px 0 #080808, inset 0 2px 4px #00000066"
                      : "0 4px 0 #080808, 0 5px 0 #060606, inset 0 1px 0 #363636",
                    border: `1px solid ${isPressed ? C.copper + "66" : "#303030"}`,
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    cursor: "pointer", 
                    userSelect: "none",
                    transform: isPressed ? "translateY(3px)" : "translateY(0)",
                    transition: "all 0.1s ease",
                  }}>
                  <span style={{ 
                    fontFamily: C.mono, 
                    fontSize: 12, 
                    color: isPressed ? C.copper : C.text, 
                    fontWeight: 600 
                  }}>
                    {key}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
        
        {/* Space Bar */}
        <div className="interactive-key-row" style={{ marginTop: 5 }}>
          <div 
            className="interactive-space"
            onClick={handleSpacePress} 
            style={{
              borderRadius: borderRadius.md,
              background: "linear-gradient(180deg, #2b2b2b, #202020)",
              boxShadow: "0 4px 0 #080808, 0 5px 0 #060606, inset 0 1px 0 #363636",
              border: `1px solid #303030`,
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              cursor: "pointer", 
              userSelect: "none",
            }}>
            <span style={{ fontFamily: C.mono, fontSize: 10, color: C.muted }}>
              SPACE
            </span>
          </div>
        </div>
      </div>
      
      <p style={{ 
        fontFamily: C.mono, 
        fontSize: 11, 
        color: "#666", 
        marginTop: 14,
        letterSpacing: 0.5,
      }}>
        *psst... ada rahasia kalau mengetik kata kunci tertentu! (misal: "KERJA")
      </p>
    </div>
  );
};